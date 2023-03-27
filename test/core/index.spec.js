import tap from 'tap'
import { fetchAlgoliaMockedData, fetchProtondbMockedData } from '../mock/index.mock.js'
import esmock from 'esmock'

const algoliaUrl = 'https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query'
const algoliaApiKey = '9basom4fb297k3Y16cdaec8f5f257088f'
const algoliaApplicationId = '94HE6YATEI'
const protondbUrl = 'https://www.protondb.com/api/v1/reports/summaries'
const query = 'fifa'
const hitsPerPage = 5
const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl }

tap.test('getGamesReport', (t) => {
  t.plan(2)

  t.test('getGamesReport must throw an error when Algolia API is not reachable', async (tt) => {
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

  t.test('getGamesReport must return an array of results from protondb API', async (tt) => {
    tt.plan(1)
    const core = await esmock('../../lib/core/index.js', {
      '../../lib/fetcher/index.js': {
        algoliaFetcher: () => fetchAlgoliaMockedData,
        protondbFetcher: () => fetchProtondbMockedData
      }
    })

    try {
      const games = await core.getGamesReport(options)
      tt.ok(Array.isArray(games))
    } catch (error) {
      tt.fail('error is not expected')
    }
  })
})
