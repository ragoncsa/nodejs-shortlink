
const port = (process.env.PORT != undefined)?(process.env.PORT):(8080)
const openingMarker = (process.env.OPENING_MARKER != undefined)?(process.env.OPENING_MARKER):('---LIST OF SHORT LINKS START---')
const closingMarker = (process.env.CLOSING_MARKER != undefined)?(process.env.CLOSING_MARKER):('---LIST OF SHORT LINKS END---')
const shortLinkDomain = (process.env.LINK_DOMAIN != undefined)?(process.env.LINK_DOMAIN):('link')
const verbose = (process.env.VERBOSE != undefined)?(process.env.VERBOSE):(false)
const urlStore = (process.env.URL_STORE != undefined)?(process.env.URL_STORE):('ADD A SAMPLE HERE')

exports.port = port
exports.openingMarker = openingMarker
exports.closingMarker = closingMarker
exports.shortLinkDomain = shortLinkDomain
exports.verbose = verbose
exports.urlStore = urlStore
