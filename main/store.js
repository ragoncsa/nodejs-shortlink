const logging = require('./logging')
const envvars = require('./envvars')
const https = require('https')

exports.newStore = function () {
    // This is the map of the URLs we are serving. The index is the short form of the URL, the value is the URL to redirect to.
    var store = {}
    store.urls = []
    store.processHttpResponseFromStore = function (res) {
        logging.verboseLog('statusCode: ' + res.statusCode)
        if (res.statusCode != 200) {
            console.error('Refreshing failed: Status Code: ' + res.statusCode)
            // Consume response data to free up memory
            res.resume()
            return
        }
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (d) => {
            rawData += d
        })
        res.on('end', () => {
            const relevantPart = new RegExp(envvars.openingMarker + '.*' + envvars.closingMarker, 'sg')
            data = rawData.match(relevantPart)
            if (data == undefined) {
                console.error('Failed to parse the content from the store. The raw HTML is the following.')
                console.error(rawData)
                return
            }
            data = data[0]
            lines = data.split('\n')
            toIgnore = new RegExp(envvars.openingMarker + '|' + envvars.closingMarker)
            logging.verboseLog('Links in store:')
            store.urls = [] // unsynchronized access is ok, since this is NodeJS
            lines.forEach(element => {
                if (element.match(toIgnore)) {
                    return
                }
                element = element.trim()
                fields = element.split(/\s+/)
                if (fields.length < 2) {
                    console.error('Malformed line in store: [' + element + ']')
                    return
                }
                logging.verboseLog('Short link: [' + fields[0] + '] Long link: [' + fields[1] + ']')
                store.urls[fields[0]] = fields[1]
            })
        })
    }
    store.refreshUrls = function () {
        logging.verboseLog(`Refreshing content...`)
        https.get(envvars.urlStore, store.processHttpResponseFromStore).on('error', (e) => {
            console.error(`Got error: ${e.message}`)
        })
    }

    return store
}
