import assert from 'node:assert'
import { test } from 'node:test'
import { checkProtondbProxyResponse } from '../../lib/fetcher/protondbProxy.response.js'

test('checkProtondbProxyResponse function must throw an error if the response is empty', () => {
  assert.throws(
    () => {
      checkProtondbProxyResponse({})
    },
    {
      name: 'Error',
      message: 'protondbproxy response doesnt have any appid'
    }
  )
})

test('checkProtondbProxyResponse function must not throw when the returned appid differs from the requested one', () => {
  assert.doesNotThrow(() => {
    checkProtondbProxyResponse({
      1240360: {
        success: true,
        data: {
          genres: [{ description: 'RPG' }],
          recommendations: { total: 100 }
        }
      }
    })
  })
})

test('checkProtondbProxyResponse function must throw an error if success is false', () => {
  assert.throws(
    () => {
      checkProtondbProxyResponse({
        1240360: {
          success: false
        }
      })
    },
    {
      name: 'Error',
      message:
        'protondbproxy game response doesnt have a valid success property'
    }
  )
})

test('checkProtondbProxyResponse function must throw an error if the game response doesnt have a valid game property', () => {
  assert.throws(
    () => {
      checkProtondbProxyResponse({
        1240360: {
          success: true
        }
      })
    },
    {
      name: 'Error',
      message: 'protondbproxy game response doesnt have a valid game property'
    }
  )
})

test('checkProtondbProxyResponse function must throw an error if a required property is missing', () => {
  assert.throws(
    () => {
      checkProtondbProxyResponse({
        1240360: {
          success: true,
          data: { genres: [{ description: 'RPG' }] }
        }
      })
    },
    {
      name: 'Error',
      message: 'protondbproxy response doesnt have the property "recommendations"'
    }
  )
})

test('checkProtondbProxyResponse function must throw an error if genres is not an array', () => {
  assert.throws(
    () => {
      checkProtondbProxyResponse({
        1240360: {
          success: true,
          data: { genres: 'RPG', recommendations: { total: 100 } }
        }
      })
    },
    {
      name: 'Error',
      message: 'genres is not an array'
    }
  )
})

test('checkProtondbProxyResponse function must throw an error if a genre doesnt have the description property', () => {
  assert.throws(
    () => {
      checkProtondbProxyResponse({
        1240360: {
          success: true,
          data: { genres: [{}], recommendations: { total: 100 } }
        }
      })
    },
    {
      name: 'Error',
      message: 'genre object does not have the description property'
    }
  )
})

test('checkProtondbProxyResponse function must throw an error if recommendations doesnt have the total property', () => {
  assert.throws(
    () => {
      checkProtondbProxyResponse({
        1240360: {
          success: true,
          data: { genres: [{ description: 'RPG' }], recommendations: {} }
        }
      })
    },
    {
      name: 'Error',
      message: 'recommendation object does not have the total property'
    }
  )
})
