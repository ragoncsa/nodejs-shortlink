const store = require('../main/store')
const service = require('../main/service')
const envvars = require('../main/envvars')
const assert = require('assert');
const MockRes = require('mock-res');

describe('Registered URL should redirect', () => {
    const s = store.newStore()
    const srv = service.newService(s)
    s.urls['link/my-short-link'] = 'http://example.com'
    req = {
        url: '/my-short-link'
    }
    var res = new MockRes();

    srv.serveRedirects(req, res)
    setTimeout(() => {
        it('should be a redirect', () => {
            assert.equal(res.statusCode, 307)
        })
        it('should redirect to the long URL', () => {
            assert.equal(res.getHeader('Location'), 'http://example.com')
        })
    }, 0)
})

describe('Not registered URL should return NOT FOUND', () => {
    const s = store.newStore()
    const srv = service.newService(s)
    s.urls['link/my-short-link'] = 'http://example.com'
    req = {
        url: '/not-in-store'
    }
    var res = new MockRes()

    srv.serveRedirects(req, res)
    setTimeout(() => {
        it('should be not found', () => {
            assert.equal(res.statusCode, 404)
        })
    }, 0)
})