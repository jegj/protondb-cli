import tap from 'tap'
import { checkAlgoliaResponse } from '../../lib/fetcher/algolia.response.js'

tap.test('checkAlgoliaResponse function must return an error if the responde from Algolia does not have the "hits" properties', (tt) => {
  tt.plan(1)
  tt.throws(() => {
    checkAlgoliaResponse({})
  }, new Error('algolia response does not have "hits" property'), 'algolia response does not have "hits" property')
})

tap.test('checkAlgoliaResponse function must return an error if the "hits" property from Algolia response is not an array', (tt) => {
  tt.plan(1)
  tt.throws(() => {
    checkAlgoliaResponse({ hits: 'response' })
  }, new Error('algolia "hits" is not an array'), 'algolia "hits" is not an array')
})

tap.test('checkAlgoliaResponse function must return an error if a game from the "hits" does not have the required properties', (tt) => {
  tt.plan(1)
  tt.throws(() => {
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
  }, new Error('algolia "hit" doesnt have the property "releaseYear"'), 'algolia "hit" doesnt have the property "releaseYear"')
})

tap.test('checkAlgoliaResponse function must throw an error if the oslist is not a valid array', (tt) => {
  tt.plan(1)
  tt.throws(() => {
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
  }, new Error('algolia "hit" doesnt have a valid "oslist" property'), 'algolia "hit" doesnt have a valid "oslist" property')
})
