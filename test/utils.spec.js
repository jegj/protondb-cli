import tap from 'tap'
import { isValidUrl, isValidGameName } from '../lib/utils.js'

tap.test('isValidUrl must throw an error when the url param is not a valid URL', (tt) => {
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

tap.test('isValidUrl must not throw an error when the url param is a valid URL', (tt) => {
  tt.plan(2)
  tt.doesNotThrow(() => {
    isValidUrl('http://some.api.com')
  }, Error)

  tt.doesNotThrow(() => {
    isValidUrl('https://some.api.com')
  }, Error)
})

tap.test('isValidGameName must throw an error when the game name is not a valid or empty string', (tt) => {
  tt.plan(4)
  tt.throws(() => {
    isValidGameName(false)
  }, Error)

  tt.throws(() => {
    isValidGameName({}, 'for a empty object')
  }, Error)

  tt.throws(() => {
    isValidGameName(null)
  }, Error)

  tt.throws(() => {
    isValidGameName(undefined)
  }, Error)
})

tap.test('isValidGameName must not throw an error when the game name is a valid string', (tt) => {
  tt.plan(1)
  tt.doesNotThrow(() => {
    isValidGameName('game1')
  })
})
