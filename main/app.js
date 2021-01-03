const envvars = require('./envvars')
const store = require('./store')
const service = require('./service')

const http = require('http')

const hostname = '127.0.0.1'

s = store.newStore()
srv = service.newService(s)

setInterval(s.refreshUrls, 2000)
const server = http.createServer(srv.serveRedirects)

server.listen(envvars.port, hostname, () => {
    console.log(`Server running at http://${hostname}:${envvars.port}/`)
})
