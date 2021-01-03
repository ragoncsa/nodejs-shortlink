
const envvars = require('./envvars')

exports.verboseLog = verboseLog

// Oversimplified verbose logging.
function verboseLog(msg) {
    if (envvars.verbose) {
        console.log(msg)
    }
}