const store = require('../main/store')
const envvars = require('../main/envvars')
const assert = require('assert')
const MockRes = require('mock-res')

describe('Store should process response', () => {
    var res = new MockRes()
    res.write(`
      ${envvars.openingMarker}
      link/my-short-link https://my-very-long-link.with-a-long-domain.com Other-comments
      ${envvars.closingMarker}
    `)
    res.end()
    const s = store.newStore()
    s.processHttpResponseFromStore(res)
    setTimeout(() => {
        it('should be one URL', () => {
            assert.equal(Object.keys(s.urls).length, 1)
        })
        it('short URL should be in store', () => {
            assert.equal(s.urls['link/my-short-link'] != undefined, true)
        })
        it('long URL should be in store', () => {
            assert.equal(s.urls['link/my-short-link'], 'https://my-very-long-link.with-a-long-domain.com')
        })
    }, 0)
})

describe('Malformed entry should not stop loading valid entries', () => {
    var res = new MockRes()
    res.write(`
      ${envvars.openingMarker}
      link/my-short-link https://my-very-long-link.with-a-long-domain.com tamas@example.com
      link/goog http://google.com
      link/my-malformed-entry
      ${envvars.closingMarker}
    `)
    res.end()
    const s = store.newStore()
    s.processHttpResponseFromStore(res)
    setTimeout(() => {
        it('should be two URL', () => {
            assert.equal(Object.keys(s.urls).length, 2)
        })
        it('URLs should be in store', () => {
            assert.equal(s.urls['link/my-short-link'], 'https://my-very-long-link.with-a-long-domain.com')
            assert.equal(s.urls['link/goog'], 'http://google.com')
        })
    }, 0)
})