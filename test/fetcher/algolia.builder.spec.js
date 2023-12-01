import { buildBodyRequest, buildHeaderRequest } from '../../lib/fetcher/algolia.builder.js'
import { test } from 'node:test'
import assert from 'node:assert'

const qry = 'gta'

const dheaders = {
  'x-algolia-api-key': 'xxxx-yyyyy-zzzz',
  'x-algolia-application-id': 'S0M3_R4ND0M_ID'
}

test('buildBodyRequest function must return an object always', () => {
  const response = buildBodyRequest({ query: qry })
  assert.equal(typeof response === 'object', true, 'response is not an object')
})

test('buildBodyRequest function must return an object with the property "method" and must be equal to POST by default', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response, 'method'), 'does not has method property')
  assert.equal(response.method, 'POST', 'method property is not equal to POST')
})

test('buildBodyRequest function must return an object with the property "body" and must be an object always', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response, 'body'), 'does not has query body')
  assert.equal(typeof response.body === 'object', true, 'body property is not an object')
})

test('buildBodyRequest function must return an object with the body property and must has the query property based on the argument', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'query'), 'body does not has query property')
})

test('buildBodyRequest function must return an object with the body property and must has the attributesToHighlight property and must be an empty array as default', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'attributesToHighlight'), 'body does not has attributesToHighlight property')
  assert(Array.isArray(response.body.attributesToHighlight))
  assert.equal(response.body.attributesToHighlight.length, 0)
})

test('buildBodyRequest function must return an object with the body property and must has the attributesToSnippet property and must be an empty array as default', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'attributesToSnippet'), 'body does not has attributesToSnippet property')
  assert(Array.isArray(response.body.attributesToSnippet), 'attributesToSnippet is not an array')
  assert.equal(response.body.attributesToSnippet.length, 0, 'attributesToSnippet has items')
})

test('buildBodyRequest function must return an object with the body property and must has the facets property and must be an array with tags as the only value as default', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'facets'), 'body does not has facets property')
  assert(Array.isArray(response.body.facets), 'facets is not an array')
  assert.equal(response.body.facets.length, 1, 'facets should have one item')
  assert.equal(response.body.facets[0], 'tags', 'facets default value should be tags')
})

test('buildBodyRequest function must return an object with body property and must has the facetFilters property and must be an array with one value( another array, appType:Game) as default value', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'facetFilters'), 'body does not has facetFilters property')
  assert(Array.isArray(response.body.facetFilters), 'facetFilters is not an array')
  assert.equal(response.body.facetFilters.length, 1, 'facetFilters length have one item as default')
  assert.deepEqual(response.body.facetFilters[0], ['appType:Game'], 'facetFilters should have a default value')
})

test('buildBodyRequest function must return an object the body property and must has the hitsPerPage property and must be equal to 50 as default', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'hitsPerPage'), 'body does not has hitsPerPage property')
  assert.equal(response.body.hitsPerPage, 50, 'hitsPerPage is not equal to 50')
})

test('buildBodyRequest acept custom values for the hitsPerPage property', () => {
  const hitsPerPage = 20
  const response = buildBodyRequest({ query: qry, hitsPerPage })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'hitsPerPage'), 'body does not has hitsPerPage property')
  assert.equal(response.body.hitsPerPage, hitsPerPage, 'hitsPerPage is not equal to parameter provided in the function')
})

test('buildBodyRequest function must return an object with the body property and must has the attributesToRetrieve property and must be an array with a set of default values', () => {
  const response = buildBodyRequest({ query: qry })
  const attributesToRetrieve = [
    'lastUpdated',
    'name',
    'objectID',
    'followers',
    'oslist',
    'releaseYear',
    'tags',
    'technologies',
    'userScore'
  ]
  assert(Object.prototype.hasOwnProperty.call(response.body, 'attributesToRetrieve'), 'body does not has attributesToRetrieve property')
  assert(Array.isArray(response.body.attributesToRetrieve), 'attributesToRetrieve is not an array')
  assert.deepEqual(response.body.attributesToRetrieve, attributesToRetrieve, 'attributesToRetrieve should have a default set of values')
})

test('buildBodyRequest function must return an object with the body property and must has the page property and must be 0 as default', () => {
  const response = buildBodyRequest({ query: qry })
  assert(Object.prototype.hasOwnProperty.call(response.body, 'page'), 'body does not has page property')
  assert.equal(response.body.page, 0)
})

test('buildHeaderRequest function must return an object always', () => {
  const headers = buildHeaderRequest(dheaders)
  assert.equal(typeof headers === 'object', true)
})

test('buildHeaderRequest function must return an object with the property "accept" and must be equal to "*/*" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'accept'), 'does not has accept property')
  assert.equal(headers.accept, '*/*', 'accept property is not equal to */*')
})

test('buildHeaderRequest function must return an object with the property "accept-language" and must be equal to "application/x-www-form-urlencoded" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'accept-language'), 'does not has accept-language property')
  assert.equal(headers['accept-language'], 'en-US,en;q=0.9', 'accept-language property is not equal to en-US,en;q=0.9')
})

test('buildHeaderRequest function must return an object with the property "content-type" and must be equal to "application/x-www-form-urlencoded" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'content-type'), 'does not has content-type property')
  assert.equal(headers['content-type'], 'application/x-www-form-urlencoded', 'content-type property is not equal to application/x-www-form-urlencoded')
})

test('buildHeaderRequest function must return an object with the property "referer" and must be equal to "https://www.protondb.com" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'referer'), 'does not has referer property')
  assert.equal(headers.referer, 'https://www.protondb.com', 'referer property is not equal to https://www.protondb.com')
})

test('buildHeaderRequest function must return an object with the property "origin" and must be equal to "https://www.protondb.com" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'origin'), 'does not has origin property')
  assert.equal(headers.origin, 'https://www.protondb.com', 'origin property is not equal to https://www.protondb.com')
})

test('buildHeaderRequest function must return an object with the property "connection" and must be equal to "keep-alive" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'connection'), 'does not has connection property')
  assert.equal(headers.connection, 'keep-alive', 'connection property is not equal to keep-alive')
})

test('buildHeaderRequest function must throw an Error when the "x-algolia-api-key" property is not part of headers in the parameter', () => {
  assert.throws(() => {
    buildHeaderRequest({})
  }, {
    name: 'Error',
    message: 'x-algolia-api-key is required for the headers'
  })
})

test('buildHeaderRequest function must return an object with the property "x-algolia-api-key" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'x-algolia-api-key'), 'does not has x-algolia-api-key property')
  assert.equal(headers['x-algolia-api-key'], dheaders['x-algolia-api-key'], 'x-algolia-api-key property is not equal')
})

test('buildHeaderRequest function must throw an Error when the "x-algolia-application-id" property is not part of headers in the parameter', () => {
  assert.throws(() => {
    buildHeaderRequest({ 'x-algolia-api-key': 'some_ra4nd_key' })
  }, {
    name: 'Error',
    message: 'x-algolia-application-id is required for the headers'
  })
})

test('buildHeaderRequest function must return an object with the property "x-algolia-application-id" for algolia http request', () => {
  const headers = buildHeaderRequest(dheaders)
  assert(Object.prototype.hasOwnProperty.call(headers, 'x-algolia-application-id'), 'does not has x-algolia-application-id property')
  assert.equal(headers['x-algolia-application-id'], dheaders['x-algolia-application-id'], 'x-algolia-application-id property is not equal')
})
