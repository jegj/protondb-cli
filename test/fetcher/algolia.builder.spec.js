import tap from 'tap'
import { buildBodyRequest, buildHeaderRequest } from '../../lib/fetcher/algolia.builder.js'

const qry = 'gta'

const dheaders = {
  'x-algolia-api-key': '9ba0e69fb2974316cdaec8f5f257088f',
  'x-algolia-application-id': '94HE6YATEI'
}

tap.test('algolia.builder', (t) => {
  t.plan(23)

  t.test('buildBodyRequest function must return an object always', (tt) => {
    tt.plan(1)
    const response = buildBodyRequest({ query: qry })
    tt.equal(typeof response === 'object', true)
  })

  t.test('buildBodyRequest function must return an object with the property "method" and must be equal to POST by default', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response, 'method', 'does not has method property')
    tt.equal(response.method, 'POST', 'method property is not equal to POST')
  })

  t.test('buildBodyRequest function must return an object with the property "body" and must be an object always', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response, 'body', 'does not has query body')
    tt.equal(typeof response.body === 'object', true, 'body property is not an object')
  })

  t.test('buildBodyRequest function must return an object with the body property and must has the query property based on the argument', (tt) => {
    tt.plan(1)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response.body, 'query', 'body does not has query property')
  })

  t.test('buildBodyRequest function must return an object with the body property and must has the attributesToHighlight property and must be an empty array as default', (tt) => {
    tt.plan(3)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response.body, 'attributesToHighlight', 'body does not has attributesToHighlight property')
    tt.ok(Array.isArray(response.body.attributesToHighlight))
    tt.equal(response.body.attributesToHighlight.length, 0)
  })

  t.test('buildBodyRequest function must return an object with the body property and must has the attributesToSnippet property and must be an empty array as default', (tt) => {
    tt.plan(3)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response.body, 'attributesToSnippet', 'body does not has attributesToSnippet property')
    tt.ok(Array.isArray(response.body.attributesToSnippet), 'attributesToSnippet is not an array')
    tt.equal(response.body.attributesToSnippet.length, 0, 'attributesToSnippet has items')
  })

  t.test('buildBodyRequest function must return an object with the body property and must has the facets property and must be an array with tags as the only value as default', (tt) => {
    tt.plan(4)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response.body, 'facets', 'body does not has facets property')
    tt.ok(Array.isArray(response.body.facets), 'facets is not an array')
    tt.equal(response.body.facets.length, 1, 'facets should have one item')
    tt.equal(response.body.facets[0], 'tags', 'facets default value should be tags')
  })

  t.test('buildBodyRequest function must return an object with body property and must has the facetFilters property and must be an array with one value( another array, appType:Game) as default value', (tt) => {
    tt.plan(4)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response.body, 'facetFilters', 'body does not has facetFilters property')
    tt.ok(Array.isArray(response.body.facetFilters), 'facetFilters is not an array')
    tt.equal(response.body.facetFilters.length, 1, 'facetFilters length have one item as default')
    tt.same(response.body.facetFilters[0], ['appType:Game'], 'facetFilters should have a default value')
  })

  t.test('buildBodyRequest function must return an object the body property and must has the hitsPerPage property and must be equal to 50 as default', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response.body, 'hitsPerPage', 'body does not has hitsPerPage property')
    tt.equal(response.body.hitsPerPage, 50, 'hitsPerPage is not equal to 50')
  })

  t.test('buildBodyRequest aceep custom values for the hitsPerPage property', (tt) => {
    tt.plan(2)
    const hitsPerPage = 20
    const response = buildBodyRequest({ query: qry, hitsPerPage })
    tt.hasProp(response.body, 'hitsPerPage', 'body does not has hitsPerPage property')
    tt.equal(response.body.hitsPerPage, hitsPerPage, 'hitsPerPage is not equal to parameter provided in the function')
  })

  t.test('buildBodyRequest function must return an object with the body property and must has the attributesToRetrieve property and must be an array with a set of default values', (tt) => {
    tt.plan(3)
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
    tt.hasProp(response.body, 'attributesToRetrieve', 'body does not has attributesToRetrieve property')
    tt.ok(Array.isArray(response.body.attributesToRetrieve), 'attributesToRetrieve is not an array')
    tt.same(response.body.attributesToRetrieve, attributesToRetrieve, 'attributesToRetrieve should have a default set of values')
  })

  t.test('buildBodyRequest function must return an object with the body property and must has the page property and must be 0 as default', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest({ query: qry })
    tt.hasProp(response.body, 'page', 'body does not has page property')
    tt.equal(response.body.page, 0)
  })

  t.test('buildHeaderRequest function must return an object always', (tt) => {
    tt.plan(1)
    const headers = buildHeaderRequest(dheaders)
    tt.equal(typeof headers === 'object', true)
  })

  t.test('buildHeaderRequest function must return an object with the property "accept" and must be equal to "*/*" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'accept', 'does not has accept property')
    tt.equal(headers.accept, '*/*', 'accept property is not equal to */*')
  })

  t.test('buildHeaderRequest function must return an object with the property "accept-language" and must be equal to "application/x-www-form-urlencoded" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'accept-language', 'does not has accept-language property')
    tt.equal(headers['accept-language'], 'en-US,en;q=0.9', 'accept-language property is not equal to en-US,en;q=0.9')
  })

  t.test('buildHeaderRequest function must return an object with the property "content-type" and must be equal to "application/x-www-form-urlencoded" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'content-type', 'does not has content-type property')
    tt.equal(headers['content-type'], 'application/x-www-form-urlencoded', 'content-type property is not equal to application/x-www-form-urlencoded')
  })

  t.test('buildHeaderRequest function must return an object with the property "referer" and must be equal to "https://www.protondb.com" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'referer', 'does not has referer property')
    tt.equal(headers.referer, 'https://www.protondb.com', 'referer property is not equal to https://www.protondb.com')
  })

  t.test('buildHeaderRequest function must return an object with the property "origin" and must be equal to "https://www.protondb.com" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'origin', 'does not has origin property')
    tt.equal(headers.origin, 'https://www.protondb.com', 'origin property is not equal to https://www.protondb.com')
  })

  t.test('buildHeaderRequest function must return an object with the property "connection" and must be equal to "keep-alive" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'connection', 'does not has connection property')
    tt.equal(headers.connection, 'keep-alive', 'connection property is not equal to keep-alive')
  })

  t.test('buildHeaderRequest function must throw an Error when the "x-algolia-api-key" property is not part of headers in the parameter', (tt) => {
    tt.plan(1)
    tt.throws(() => {
      buildHeaderRequest({})
    }, new Error('x-algolia-api-key is required for the headers'))
  })

  t.test('buildHeaderRequest function must return an object with the property "x-algolia-api-key" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'x-algolia-api-key', 'does not has x-algolia-api-key property')
    tt.equal(headers['x-algolia-api-key'], dheaders['x-algolia-api-key'], 'x-algolia-api-key property is not equal')
  })

  t.test('buildHeaderRequest function must throw an Error when the "x-algolia-application-id" property is not part of headers in the parameter', (tt) => {
    tt.plan(1)
    tt.throws(() => {
      buildHeaderRequest({ 'x-algolia-api-key': 'some_ra4nd_key' })
    }, new Error('x-algolia-application-id is required for the headers'))
  })

  t.test('buildHeaderRequest function must return an object with the property "x-algolia-application-id" for algolia http request', (tt) => {
    tt.plan(2)
    const headers = buildHeaderRequest(dheaders)
    tt.hasProp(headers, 'x-algolia-application-id', 'does not has x-algolia-application-id property')
    tt.equal(headers['x-algolia-application-id'], dheaders['x-algolia-application-id'], 'x-algolia-application-id property is not equal')
  })
})
