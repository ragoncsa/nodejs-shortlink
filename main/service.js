const envvars = require('./envvars')
const logging = require('./logging')

exports.newService = function (store) {
    var service = {}
    service.s = store
    service.serveRedirects = function (req, res) {
        logging.verboseLog('URL requested: ' + req.url)
        key = envvars.shortLinkDomain + req.url
        if (service.s.urls[key] != undefined) {
            res.statusCode = 307
            res.setHeader('Location', service.s.urls[key])
            res.end()
        } else {
            res.statusCode = 404
            res.end('The short link ' + key + ' is not registered!\n')
        }
    }
    return service
}