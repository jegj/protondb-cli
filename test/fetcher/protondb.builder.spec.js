import { test, describe } from 'node:test'
import assert from 'node:assert'
import { buildHeaderRequest, buildUrl } from '../../lib/fetcher/protondb.builder.js'
const query = 'skyrim'

describe('protondb.builder', () => {
  test('buildHeaderRequest function must return an object always', () => {
    const response = buildHeaderRequest(query)
    assert(typeof response === 'object')
  })

  test('buildHeaderRequest function must throw an error if the argument "query" is not provided in the function', () => {
    assert.throws(() => {
      buildHeaderRequest()
    }, {
      name: 'Error',
      message: 'query is required for build the referer header'
    })
  })

  test('buildHeaderRequest function must return an object with the property "accept" and must be equal to "*/*" for protondb http request', () => {
    const headers = buildHeaderRequest(query)
    assert(Object.prototype.hasOwnProperty.call(headers, 'accept'), 'does not has accept property')
    assert.equal(headers.accept, '*/*', 'accept property is not equal to */*')
  })

  test('buildHeaderRequest function must return an object with the property "authority" and must be equal to "www.protondb.com" for protondb http request', () => {
    const headers = buildHeaderRequest(query)
    assert(Object.prototype.hasOwnProperty.call(headers, 'authority'), 'does not has authority property')
    assert.equal(headers.authority, 'www.protondb.com', 'authority property is not equal to www.protondb.com')
  })

  test('buildHeaderRequest function must return an object with the property "accept-language" and must be equal to "www.protondb.com" for protondb http request', () => {
    const headers = buildHeaderRequest(query)
    assert(Object.prototype.hasOwnProperty.call(headers, 'accept-language'), 'does not has accept-language property')
    assert.equal(headers['accept-language'], 'en-US,en;q=0.8', 'accept-language property is not equal to en-US,en;q=0.8')
  })

  test('buildHeaderRequest function must return an object with the property "referer" and must be equal to "https://www.protondb.com/search?q=" + the query for protondb http request', () => {
    const headers = buildHeaderRequest(query)
    assert(Object.prototype.hasOwnProperty.call(headers, 'referer'), 'does not has referer property')
    assert.equal(headers.referer, `https://www.protondb.com/search?q=${query}`, 'referer property is not equal to the protondb search url')
  })

  test('buildHeaderRequest function must return an object with property "If-None-Match" and must but equal to the etag', () => {
    const etag = '686897696a7c876b7e'
    const headers = buildHeaderRequest(query, etag)
    assert(Object.prototype.hasOwnProperty.call(headers, 'If-None-Match'), 'does not has etag property')
    assert.equal(headers['If-None-Match'], etag, 'etag is not equal')
  })
})

describe('protondb.buildUrl', () => {
  test('buildUrl function must throw an error if the url is not provided', () => {
    try {
      buildUrl()
      assert.fail('error is expected')
    } catch (error) {
      assert.match(error.message, /url is required/, 'message does not match the expression "url is required"')
    }
  })

  test('buildUrl function must throw an error if the objectId is not provided', () => {
    try {
      buildUrl('https://www.protondb.com/api/v1/reports/summaries')
      assert.fail('error is expected')
    } catch (error) {
      assert.match(error.message, /objectId is required/, 'message does not match the expression "objectId is required"')
    }
  })

  test('buildUrl function must return the final url even if the url params comes without a slash at the end', () => {
    try {
      const url = buildUrl('https://www.protondb.com/api/v1/reports/summaries', '1486440')
      assert.equal(url, 'https://www.protondb.com/api/v1/reports/summaries/1486440.json', 'url is not equal')
    } catch (error) {
      assert.fail('error is not expected')
    }
  })

  test('buildUrl function must return a final url with objectId', () => {
    try {
      const url = buildUrl('https://www.protondb.com/api/v1/reports/summaries/', '1486440')
      assert.equal(url, 'https://www.protondb.com/api/v1/reports/summaries/1486440.json', 'url is not equal')
    } catch (error) {
      assert.fail('error is not expected')
    }
  })
})
