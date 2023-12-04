import { test } from 'node:test'
import assert from 'node:assert'
import { checkAlgoliaResponse } from '../../lib/fetcher/algolia.response.js'

test('checkAlgoliaResponse function must return an error if the responde from Algolia does not have the "hits" properties', () => {
  assert.throws(() => {
    checkAlgoliaResponse({})
  }, {
    name: 'Error',
    message: 'algolia response does not have "hits" property'
  })
})

test('checkAlgoliaResponse function must return an error if the "hits" property from Algolia response is not an array', () => {
  assert.throws(() => {
    checkAlgoliaResponse({ hits: 'response' })
  }, {
    name: 'Error',
    message: 'algolia "hits" is not an array'
  })
})

test('checkAlgoliaResponse function must return an error if a game from the "hits" does not have the required properties', () => {
  assert.throws(() => {
    checkAlgoliaResponse({
      hits: [
        {
          lastUpdated: 1653580973,
          name: 'FIFA 22',
          oslist: ['Windows', 'Steam Deck Unsupported'],
          userScore: 79.45,
          objectID: '1506830'
        }
      ]
    })
  }, {
    name: 'Error',
    message: 'algolia "hit" doesnt have the property "releaseYear"'
  })
})

test('checkAlgoliaResponse function must throw an error if the oslist is not a valid array', () => {
  assert.throws(() => {
    checkAlgoliaResponse({
      hits: [
        {
          lastUpdated: 1653580973,
          name: 'FIFA 22',
          oslist: 'Windows',
          userScore: 79.45,
          objectID: '1506830',
          releaseYear: 2021

        }
      ]
    })
  }, {
    name: 'Error',
    message: 'algolia "hit" doesnt have a valid "oslist" property'
  })
})
