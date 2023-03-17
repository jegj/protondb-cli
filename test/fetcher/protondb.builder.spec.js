const tap = require('tap')
const { builddHeaderRequest } = require('../../lib/fetcher/protondb.builder')

const query = 'some game'

tap.test('protondb.builder', (t) => {
  t.plan(6)

  t.test('builddHeaderRequest function must return an object always', (tt) => {
    tt.plan(1)
    const response = builddHeaderRequest(query)
    tt.equal(typeof response === 'object', true)
  })

  t.test('builddHeaderRequest function must throw an error if the argument "query" is not provided in the function', (tt) => {
    tt.plan(1)
    tt.throws(() => {
      builddHeaderRequest()
    }, new Error('query is required for build the referer header'))
  })

  t.test('builddHeaderRequest function must return an object with the property "accept" and must be equal to "*/*" for protondb http request', (tt) => {
    tt.plan(2)
    const headers = builddHeaderRequest(query)
    tt.hasProp(headers, 'accept', 'does not has accept property')
    tt.equal(headers.accept, '*/*', 'accept property is not equal to */*')
  })

  t.test('builddHeaderRequest function must return an object with the property "authority" and must be equal to "www.protondb.com" for protondb http request', (tt) => {
    tt.plan(2)
    const headers = builddHeaderRequest(query)
    tt.hasProp(headers, 'authority', 'does not has authority property')
    tt.equal(headers.authority, 'www.protondb.com', 'authority property is not equal to www.protondb.com')
  })

  t.test('builddHeaderRequest function must return an object with the property "accept-language" and must be equal to "www.protondb.com" for protondb http request', (tt) => {
    tt.plan(2)
    const headers = builddHeaderRequest(query)
    tt.hasProp(headers, 'accept-language', 'does not has accept-language property')
    tt.equal(headers['accept-language'], 'en-US,en;q=0.8', 'accept-language property is not equal to en-US,en;q=0.8')
  })

  t.test('builddHeaderRequest function must return an object with the property "referer" and must be equal to "https://www.protondb.com/search?q=" + the query for protondb http request', (tt) => {
    tt.plan(2)
    const headers = builddHeaderRequest(query)
    tt.hasProp(headers, 'referer', 'does not has referer property')
    tt.equal(headers.referer, `https://www.protondb.com/search?q=${query}`, 'referer property is not equal to the protondb search url')
  })
})
