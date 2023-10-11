import tap from 'tap'
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

tap.test('getGamesReport must throw an error when Algolia API is not reachable', async (tt) => {
  tt.plan(2)
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => { throw new Error('unreachable') }
    }
  })

  try {
    await core.getGamesReport(options)
    tt.fail('error is expected')
  } catch (error) {
    tt.type(error, Error)
    tt.match(error.message, 'unreachable')
  }
})

tap.test('getGamesReport must return an array of results always', async (tt) => {
  tt.plan(1)
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: () => fetchProtondbMockedData,
      protondbProxyFetcher: () => null
    }
  })

  try {
    const games = await core.getGamesReport(options)
    tt.ok(Array.isArray(games))
  } catch (error) {
    tt.fail('error is not expected')
  }
})

tap.test('getGamesReport must call the cache read method if the cache is a valid object', async (tt) => {
  tt.plan(1)
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: () => fetchProtondbMockedData,
      protondbProxyFetcher: () => null
    }
  })
  const cache = { read: sinon.spy() }
  await core.getGamesReport(options, cache)
  tt.ok(cache.read.calledOnce, 'cache read method is not being called')
})

tap.test('getGamesReport must return an array of objects, the merge from algolia call + protondb call', async (tt) => {
  tt.plan(46) // array of size 3 x 15 assert + 1 assert
  const core = await esmock('../../lib/core/index.js', {
    '../../lib/fetcher/index.js': {
      algoliaFetcher: () => fetchAlgoliaMockedData,
      protondbFetcher: () => fetchProtondbMockedData,
      protondbProxyFetcher: () => null
    }
  })

  try {
    const games = await core.getGamesReport(options)
    tt.ok(Array.isArray(games))
    games.forEach(game => {
      tt.hasProp(game, 'lastUpdated')
      tt.hasProp(game, 'name')
      tt.hasProp(game, 'oslist')
      tt.hasProp(game, 'userScore')
      tt.hasProp(game, 'followers')
      tt.hasProp(game, 'technologies')
      tt.hasProp(game, 'releaseYear')
      tt.hasProp(game, 'tags')
      tt.hasProp(game, 'objectID')
      tt.hasProp(game, 'bestReportedTier')
      tt.hasProp(game, 'confidence')
      tt.hasProp(game, 'score')
      tt.hasProp(game, 'tier')
      tt.hasProp(game, 'total')
      tt.hasProp(game, 'trendingTier')
    })
  } catch (error) {
    tt.fail('error is not expected')
  }
})

tap.test('getGamesReport must return an array of objects, the information from algolia with the key protondbNotFound as true and the tier and confidence as null when the protondb api returns a 404', async (tt) => {
  tt.plan(16)
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
    tt.ok(Array.isArray(games))
    tt.hasProp(games[1], 'lastUpdated')
    tt.hasProp(games[1], 'name')
    tt.hasProp(games[1], 'oslist')
    tt.hasProp(games[1], 'userScore')
    tt.hasProp(games[1], 'followers')
    tt.hasProp(games[1], 'technologies')
    tt.hasProp(games[1], 'releaseYear')
    tt.hasProp(games[1], 'tags')
    tt.hasProp(games[1], 'objectID')
    tt.hasProp(games[1], 'protondbNotFound')
    tt.hasProp(games[1], 'tier')
    tt.hasProp(games[1], 'confidence')
    tt.equal(games[1].tier, null)
    tt.equal(games[1].confidence, null)
    tt.ok(games[1].protondbNotFound)
  } catch (error) {
    tt.fail('error is not expected')
  }
})

tap.test('getGamesReport must get data from the protondbProxy API, add it to the algolia + protondb response and include recommendations and genres as new properties', async (tt) => {
  tt.plan(14)
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
    tt.ok(Array.isArray(games))
    tt.hasProp(games[2], 'lastUpdated')
    tt.hasProp(games[2], 'name')
    tt.hasProp(games[2], 'oslist')
    tt.hasProp(games[2], 'userScore')
    tt.hasProp(games[2], 'followers')
    tt.hasProp(games[2], 'technologies')
    tt.hasProp(games[2], 'releaseYear')
    tt.hasProp(games[2], 'tags')
    tt.hasProp(games[2], 'objectID')
    tt.hasProp(games[2], 'tier')
    tt.hasProp(games[2], 'confidence')
    tt.hasProp(games[2], 'recommendations', 'does not have recommendations')
    tt.hasProp(games[2], 'genres', 'does not have genres')
  } catch (error) {
    tt.fail('error is not expected')
  }
})
