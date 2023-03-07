const tap = require('tap')
const { buildBodyRequest } = require('../../lib/fetcher/algolia.builder')

const qry = 'gta'

tap.test('buildBodyRequest', (t) => {
  t.plan(11)

  t.test('buildBodyRequest function must return an object always', (tt) => {
    tt.plan(1)
    const response = buildBodyRequest(qry)
    tt.equal(typeof response === 'object', true)
  })

  t.test('buildBodyRequest function must return an object with the property "method" and must be equal to POST by default', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest(qry)
    tt.hasProp(response, 'method', 'does not has method property')
    tt.equal(response.method, 'POST', 'method property is not equal')
  })

  t.test('buildBodyRequest function must return an object with the property "body" and must be an object always', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest(qry)
    tt.hasProp(response, 'body', 'does not has query body')
    tt.equal(typeof response.body === 'object', true, 'body property is not an object')
  })

  t.test('body property must has the query property based on the argument', (tt) => {
    tt.plan(1)
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'query', 'body does not has query property')
  })

  t.test('body property must has the attributesToHighlight property and must be an empty array as default', (tt) => {
    tt.plan(3)
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'attributesToHighlight', 'body does not has attributesToHighlight property')
    tt.ok(Array.isArray(response.body.attributesToHighlight))
    tt.equal(response.body.attributesToHighlight.length, 0)
  })

  t.test('body property must has the attributesToSnippet property and must be an empty array as default', (tt) => {
    tt.plan(3)
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'attributesToSnippet', 'body does not has attributesToSnippet property')
    tt.ok(Array.isArray(response.body.attributesToSnippet), 'attributesToSnippet is not an array')
    tt.equal(response.body.attributesToSnippet.length, 0, 'attributesToSnippet has items')
  })

  t.test('body property must has the facets property and must be an array with tags as the only value as default', (tt) => {
    tt.plan(4)
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'facets', 'body does not has facets property')
    tt.ok(Array.isArray(response.body.facets), 'facets is not an array')
    tt.equal(response.body.facets.length, 1, 'facets should have one item')
    tt.equal(response.body.facets[0], 'tags', 'facets default value should be tags')
  })

  t.test('body property must has the facetFilters property and must be an array with one value( another array, appType:Game) as default value', (tt) => {
    tt.plan(4)
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'facetFilters', 'body does not has facetFilters property')
    tt.ok(Array.isArray(response.body.facetFilters), 'facetFilters is not an array')
    tt.equal(response.body.facetFilters.length, 1, 'facetFilters length have one item as default')
    tt.same(response.body.facetFilters[0], ['appType:Game'], 'facetFilters should have a default value')
  })

  t.test('body property must has the hitsPerPage property and must be equal to 50 as default', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'hitsPerPage', 'body does not has hitsPerPage property')
    tt.equal(response.body.hitsPerPage, 50, 'hitsPerPage is not equal to 50')
  })

  t.test('body property must has the attributesToRetrieve property and must be an array with a set of default values', (tt) => {
    tt.plan(3)
    const response = buildBodyRequest(qry)
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

  t.test('body property must has the page property and must be 0 as default', (tt) => {
    tt.plan(2)
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'page', 'body does not has page property')
    tt.equal(response.body.page, 0)
  })
})
