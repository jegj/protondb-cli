import { isValidUrl, isValidGameName } from '../lib/utils.js'
import { test } from 'node:test'
import assert from 'node:assert'

test('isValidUrl must throw an error when the url param is not a valid URL', () => {
  assert.throws(() => {
    isValidUrl(111)
  }, {
    name: 'TypeError',
    message: 'Invalid URL'
  })

  assert.throws(() => {
    isValidUrl(false)
  }, {
    name: 'TypeError',
    message: /Invalid URL/
  })

  assert.throws(() => {
    isValidUrl({})
  }, {
    name: 'TypeError',
    message: /Invalid URL/
  })

  assert.throws(() => {
    isValidUrl('some.random.string')
  }, {
    name: 'TypeError',
    message: /Invalid URL/
  })

  assert.throws(() => {
    isValidUrl('www.page.com')
  }, {
    name: 'TypeError',
    message: /Invalid URL/
  })

  assert.throws(() => {
    isValidUrl('ftp://some.ftp.server.com')
  }, {
    name: 'Error',
    message: /Invalid url protocol/
  })
})

test('isValidUrl must not throw an error when the url param is a valid URL', () => {
  assert.doesNotThrow(() => {
    isValidUrl('http://some.api.com')
  })

  assert.doesNotThrow(() => {
    isValidUrl('https://some.api.com')
  })
})

test('isValidGameName must throw an error when the game name is not a valid or empty string', () => {
  assert.throws(() => {
    isValidGameName(false)
  }, {
    name: 'Error',
    message: /Invalid game name/
  })

  assert.throws(() => {
    isValidGameName({}, 'for a empty object')
  }, {
    name: 'Error',
    message: /Invalid game name/
  })

  assert.throws(() => {
    isValidGameName(null)
  }, {
    name: 'Error',
    message: /Invalid game name/
  })

  assert.throws(() => {
    isValidGameName(undefined)
  }, {
    name: 'Error',
    message: /Invalid game name/
  })
})

test('isValidGameName must not throw an error when the game name is a valid string', () => {
  assert.doesNotThrow(() => {
    isValidGameName('game1')
  })
})
