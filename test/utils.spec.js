import tap from 'tap'
import { isValidUrl } from '../lib/utils.js'

tap.test('isValidUrl', async (t) => {
  t.plan(2)
  t.test('isValidUrl must throw an error when the url param is not a valid URL', (tt) => {
    tt.plan(6)
    tt.throws(() => {
      isValidUrl(111)
    }, Error)

    tt.throws(() => {
      isValidUrl(false)
    }, Error)

    tt.throws(() => {
      isValidUrl({})
    }, Error)

    tt.throws(() => {
      isValidUrl('some.random.string')
    }, Error)

    tt.throws(() => {
      isValidUrl('www.page.com')
    }, Error)

    tt.throws(() => {
      isValidUrl('ftp://some.ftp.server.com')
    }, Error)
  })

  t.test('isValidUrl must not throw an error when the url param is a valid URL', (tt) => {
    tt.plan(2)
    tt.doesNotThrow(() => {
      isValidUrl('http://some.api.com')
    }, Error)

    tt.doesNotThrow(() => {
      isValidUrl('https://some.api.com')
    }, Error)
  })
})