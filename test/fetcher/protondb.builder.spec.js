import tap from 'tap'
import { buildHeaderRequest, buildUrl } from '../../lib/fetcher/protondb.builder.js'

const query = 'some game'

tap.test('protondb.builder', (t) => {
  t.plan(6)

  t.test('buildHeaderRequest function must return an object always', (tt) => {
    tt.plan(1)
    const response = buildHeaderRequest(query)
    tt.equal(typeof response === 'object', true)
  })

  t.test('buildHeaderRequest function must throw an error if the argument "query" is not provided in the function', (tt) => {
    tt.plan(1)
    tt.throws(() => {
      buildHeaderRequest()
    }, new Error('query is required for build the referer header'))
  })

  t.test('buildHeaderRequest function must return an object with the property "accept" and must be equal to "*/*" for protondb http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(query)
    tt.hasProp(headers, 'accept', 'does not has accept property')
    tt.equal(headers.accept, '*/*', 'accept property is not equal to */*')
  })

  t.test('buildHeaderRequest function must return an object with the property "authority" and must be equal to "www.protondb.com" for protondb http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(query)
    tt.hasProp(headers, 'authority', 'does not has authority property')
    tt.equal(headers.authority, 'www.protondb.com', 'authority property is not equal to www.protondb.com')
  })

  t.test('buildHeaderRequest function must return an object with the property "accept-language" and must be equal to "www.protondb.com" for protondb http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(query)
    tt.hasProp(headers, 'accept-language', 'does not has accept-language property')
    tt.equal(headers['accept-language'], 'en-US,en;q=0.8', 'accept-language property is not equal to en-US,en;q=0.8')
  })

  t.test('buildHeaderRequest function must return an object with the property "referer" and must be equal to "https://www.protondb.com/search?q=" + the query for protondb http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(query)
    tt.hasProp(headers, 'referer', 'does not has referer property')
    tt.equal(headers.referer, `https://www.protondb.com/search?q=${query}`, 'referer property is not equal to the protondb search url')
  })
})

tap.test('protondb.buildUrl', (t) => {
  t.plan(4)

  t.test('buildUrl function must throw an error if the url is not provided', (tt) => {
    tt.plan(2)
    try {
      buildUrl()
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'url is required')
    }
  })

  t.test('buildUrl function must throw an error if the objectId is not provided', (tt) => {
    tt.plan(2)
    try {
      buildUrl('https://www.protondb.com/api/v1/reports/summaries')
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'objectId is required')
    }
  })

  t.test('buildUrl function must return the final url even if the url params comes without a slash at the end', (tt) => {
    tt.plan(1)
    try {
      const url = buildUrl('https://www.protondb.com/api/v1/reports/summaries', '1486440')
      tt.equal(url, 'https://www.protondb.com/api/v1/reports/summaries/1486440.json')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('buildUrl function must return a final url with objectId', (tt) => {
    tt.plan(1)
    try {
      const url = buildUrl('https://www.protondb.com/api/v1/reports/summaries/', '1486440')
      tt.equal(url, 'https://www.protondb.com/api/v1/reports/summaries/1486440.json')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })
})
