const tap = require('tap')
const { buildBodyRequest } = require('../../lib/fetcher/algolia.builder')

tap.test('buildBodyRequest', (t) => {
  t.plan(7)

  t.test('buildBodyRequest function must return an object always', (tt) => {
    tt.plan(1)
    const qry = 'gta'
    const response = buildBodyRequest(qry)
    tt.equal(typeof response === 'object', true)
  })

  t.test('buildBodyRequest function must return an object with the property "method" and must be equal to POST', (tt) => {
    tt.plan(2)
    const qry = 'gta'
    const response = buildBodyRequest(qry)
    tt.hasProp(response, 'method', 'does not has method property')
    tt.equal(response.method, 'POST', 'method property is not equal')
  })

  t.test('buildBodyRequest function must return an object with the property "body" and must be an object always', (tt) => {
    tt.plan(2)
    const qry = 'gta'
    const response = buildBodyRequest(qry)
    tt.hasProp(response, 'body', 'does not has query body')
    tt.equal(typeof response.body === 'object', true, 'body property is not an object')
  })

  t.test('body property must has the query property', (tt) => {
    tt.plan(1)
    const qry = 'gta'
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'query', 'body does not has query property')
  })

  t.test('body property must has the attributesToHighlight property and must be an empty array', (tt) => {
    tt.plan(3)
    const qry = 'gta'
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'attributesToHighlight', 'body does not has attributesToHighlight property')
    tt.ok(Array.isArray(response.body.attributesToHighlight))
    tt.equal(response.body.attributesToHighlight.length, 0)
  })

  t.test('body property must has the attributesToSnippet property and must be an empty array', (tt) => {
    tt.plan(3)
    const qry = 'gta'
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'attributesToSnippet', 'body does not has attributesToSnippet property')
    tt.ok(Array.isArray(response.body.attributesToSnippet))
    tt.equal(response.body.attributesToSnippet.length, 0)
  })

  t.test('body property must has the facets property and must be an array with tags as the only value as default', (tt) => {
    tt.plan(4)
    const qry = 'gta'
    const response = buildBodyRequest(qry)
    tt.hasProp(response.body, 'facets', 'body does not has facets property')
    tt.ok(Array.isArray(response.body.facets))
    tt.equal(response.body.facets.length, 1)
    tt.equal(response.body.facets[0], 'tags')
  })
})
