const tap = require('tap')
const { buildBody } = require('../../lib/fetcher/algolia.builder')

tap.test('buildBody', (t) => {
  t.plan(3)

  t.test('buildBody function must return an object always', (tt) => {
    tt.plan(1)
    const qry = 'gta'
    const body = buildBody(qry)
    tt.equal(typeof body === 'object', true)
  })

  t.test('buildBody function must return an object with the property "method" and must be equal to POST', (tt) => {
    tt.plan(2)
    const qry = 'gta'
    const body = buildBody(qry)
    tt.hasProp(body, 'method', 'does not has method property')
    tt.equal(body.method, 'POST', 'method property is not equal')
  })

  t.test('buildBody function must return an object with the property "body"', (tt) => {
    tt.plan(1)
    const qry = 'gta'
    const body = buildBody(qry)
    tt.hasProp(body, 'body', 'does not has query body')
  })
})
