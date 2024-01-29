import { test } from 'node:test'
import assert from 'node:assert'
import { fetchAlgoliaMockedData, fetchProtondbMockedData, protondbProxyMock } from '../mock/index.mock.js'
import esmock from 'esmock'
import sinon from 'sinon'

const algoliaUrl = 'https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query'
const algoliaApiKey = '9basom4fb297k3Y16cdaec8f5f257088f'
const algoliaApplicationId = '94HE6YATEI'
const protondbUrl = 'https://www.protondb.com/api/v1/reports/summaries'
const protondbProxyUrl = 'https://www.protondb.com/proxy/steam/api/appdetails'
const query = 'fifa'
const hitsPerPage = 5
const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl, protondbProxyUrl }

test('getGamesReport must throw an error when Algolia API is not reachable', async () => {
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => { throw new Error('unreachable') }
    }
  })

  try {
    await core.getGamesReport(options)
    assert.fail('error is expected')
  } catch (error) {
    assert(error instanceof Error)
    assert.match(error.message, /unreachable/)
  }
})

test('getGamesReport must return an array of results always', async () => {
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: () => fetchProtondbMockedData,
      protondbProxyFetcher: () => null
    }
  })

  try {
    const games = await core.getGamesReport(options)
    assert(Array.isArray(games))
  } catch (error) {
    assert.fail('error is not expected')
  }
})

test('getGamesReport must call the cache read method if the cache is a valid object', async () => {
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: () => fetchProtondbMockedData,
      protondbProxyFetcher: () => null
    }
  })
  const cache = { read: sinon.spy() }
  await core.getGamesReport(options, cache)
  assert(cache.read.calledOnce, 'cache read method is not being called')
})

test('getGamesReport must return an array of objects, the merge from algolia call + protondb call', async () => {
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: () => fetchProtondbMockedData,
      protondbProxyFetcher: () => null
    }
  })

  try {
    const games = await core.getGamesReport(options)
    assert(Array.isArray(games))
    games.forEach(game => {
      assert(Object.prototype.hasOwnProperty.call(game, 'lastUpdated'))
      assert(Object.prototype.hasOwnProperty.call(game, 'name'))
      assert(Object.prototype.hasOwnProperty.call(game, 'oslist'))
      assert(Object.prototype.hasOwnProperty.call(game, 'userScore'))
      assert(Object.prototype.hasOwnProperty.call(game, 'followers'))
      assert(Object.prototype.hasOwnProperty.call(game, 'technologies'))
      assert(Object.prototype.hasOwnProperty.call(game, 'releaseYear'))
      assert(Object.prototype.hasOwnProperty.call(game, 'tags'))
      assert(Object.prototype.hasOwnProperty.call(game, 'objectID'))
      assert(Object.prototype.hasOwnProperty.call(game, 'bestReportedTier'))
      assert(Object.prototype.hasOwnProperty.call(game, 'confidence'))
      assert(Object.prototype.hasOwnProperty.call(game, 'score'))
      assert(Object.prototype.hasOwnProperty.call(game, 'tier'))
      assert(Object.prototype.hasOwnProperty.call(game, 'total'))
      assert(Object.prototype.hasOwnProperty.call(game, 'trendingTier'))
    })
  } catch (error) {
    assert.fail('error is not expected')
  }
})

test('getGamesReport must return an array of objects, the information from algolia with the key protondbNotFound as true and the tier and confidence as null when the protondb api returns a 404', async () => {
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: ({ objectId }) => {
        if (objectId === '1313860') {
          return null // 404 from protondb api
        } else {
          return fetchProtondbMockedData
        }
      },
      protondbProxyFetcher: () => null
    }
  })

  try {
    const games = await core.getGamesReport(options)
    assert(Array.isArray(games))
    Object.prototype.hasOwnProperty.call(games[1], 'lastUpdated')
    Object.prototype.hasOwnProperty.call(games[1], 'name')
    Object.prototype.hasOwnProperty.call(games[1], 'oslist')
    Object.prototype.hasOwnProperty.call(games[1], 'userScore')
    Object.prototype.hasOwnProperty.call(games[1], 'followers')
    Object.prototype.hasOwnProperty.call(games[1], 'technologies')
    Object.prototype.hasOwnProperty.call(games[1], 'releaseYear')
    Object.prototype.hasOwnProperty.call(games[1], 'tags')
    Object.prototype.hasOwnProperty.call(games[1], 'objectID')
    Object.prototype.hasOwnProperty.call(games[1], 'protondbNotFound')
    Object.prototype.hasOwnProperty.call(games[1], 'tier')
    Object.prototype.hasOwnProperty.call(games[1], 'confidence')
    assert.equal(games[1].tier, null)
    assert.equal(games[1].confidence, null)
    assert(games[1].protondbNotFound)
  } catch (error) {
    assert.fail('error is not expected')
  }
})

test('getGamesReport must get data from the protondbProxy API, add it to the algolia + protondb response and include recommendations and genres as new properties', async () => {
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: () => fetchProtondbMockedData,
      protondbProxyFetcher: ({ appid }) => {
        if (appid !== '72850') {
          return null // 404 from protondbProxy api
        } else {
          return protondbProxyMock
        }
      }
    }
  })

  try {
    const games = await core.getGamesReport(options)
    assert(Array.isArray(games))
    Object.prototype.hasOwnProperty.call(games[2], 'lastUpdated')
    Object.prototype.hasOwnProperty.call(games[2], 'name')
    Object.prototype.hasOwnProperty.call(games[2], 'oslist')
    Object.prototype.hasOwnProperty.call(games[2], 'userScore')
    Object.prototype.hasOwnProperty.call(games[2], 'followers')
    Object.prototype.hasOwnProperty.call(games[2], 'technologies')
    Object.prototype.hasOwnProperty.call(games[2], 'releaseYear')
    Object.prototype.hasOwnProperty.call(games[2], 'tags')
    Object.prototype.hasOwnProperty.call(games[2], 'objectID')
    Object.prototype.hasOwnProperty.call(games[2], 'tier')
    Object.prototype.hasOwnProperty.call(games[2], 'confidence')
    Object.prototype.hasOwnProperty.call(games[2], 'recommendations', 'does not have recommendations')
    Object.prototype.hasOwnProperty.call(games[2], 'genres', 'does not have genres')
  } catch (error) {
    assert.fail('error is not expected')
  }
})
