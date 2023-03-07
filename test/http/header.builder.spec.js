const tap = require('tap')
const { buildHeaderRequest } = require('../../lib/http/header.builder')

tap.test('buildHeaderRequest', (t) => {
  t.plan(3)

  t.test('buildHeaderRequest function must return an object always', (tt) => {
    tt.plan(1)
    const header = buildHeaderRequest({ })
    tt.equal(typeof header === 'object', true)
  })

  t.test('buildHeaderRequest function must return an object with the accept property and by default must be */*', (tt) => {
    tt.plan(2)
    const header = buildHeaderRequest()
    tt.hasProp(header, 'accept', 'does not has accept property')
    tt.equal(header.accept, '*/*', 'accept property is not equal to */*')
  })

  t.test('buildHeaderRequest function must return an object with the accept property and can be customize', (tt) => {
    tt.plan(2)
    const accept = 'application/json'
    const header = buildHeaderRequest({ accept })
    tt.hasProp(header, 'accept', 'does not has accept property')
    tt.equal(header.accept, accept, 'accept property is not equal to custom value')
  })
})
