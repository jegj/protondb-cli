import tap from 'tap'
import { buildUrl } from '../../lib/fetcher/protondbProxy.builder.js'

tap.test('protondbProxy.buildUrl', (t) => {
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
      buildUrl('https://www.protondb.com/proxy/steam/api/appdetails')
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'objectId is required')
    }
  })

  t.test('buildUrl function must return the final url even if the url params comes without a slash at the end', (tt) => {
    tt.plan(1)
    try {
      const url = buildUrl('https://www.protondb.com/proxy/steam/api/appdetails', '1486440')
      tt.equal(url, 'https://www.protondb.com/proxy/steam/api/appdetails/?appids=1486440')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('buildUrl function must return a final url with objectId', (tt) => {
    tt.plan(1)
    try {
      const url = buildUrl('https://www.protondb.com/proxy/steam/api/appdetails/', '1486440')
      tt.equal(url, 'https://www.protondb.com/proxy/steam/api/appdetails/?appids=1486440')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })
})
