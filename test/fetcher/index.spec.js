import tap from 'tap'
import esmock from 'esmock'
import sinon from 'sinon'
import { fetchAlgoliaMockedData, fetchProtondbMockedData } from '../mock/index.mock.js'

const mockFetchErr = async (url) => {
  throw new Error('unknown url: ' + url)
}

const mockFetchInvalidCode = async () => {
  return {
    ok: false,
    json: async () => null,
    status: 500
  }
}

const generateFetchMock = (responseData) => {
  return async function mockFetchOk () {
    return { json: async () => responseData, ok: true }
  }
}

tap.test('algoliaFetcher', async (t) => {
  t.plan(7)

  const fetcher = await esmock(
    '../../lib/fetcher/index.js',
    { 'node-fetch': generateFetchMock(fetchAlgoliaMockedData) }
  )

  t.test('algoliaFetcher must throw an error if the query is not provided', async tt => {
    tt.plan(2)
    try {
      await fetcher.algoliaFetcher()
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'query is required')
    }
  })

  t.test('algoliaFetcher must throw an error if the url is not provided', async tt => {
    tt.plan(2)
    try {
      await fetcher.algoliaFetcher({ query: 'fifa' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'url is required')
    }
  })

  t.test('algoliaFetcher must throw an error if the algoliaApiKey is not provided', async tt => {
    tt.plan(2)
    try {
      await fetcher.algoliaFetcher({ query: 'fifa', url: 'angolia.api' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'algoliaApiKey is required')
    }
  })

  t.test('algoliaFetcher must throw an error if the algoliaApplicationId is not provided', async tt => {
    tt.plan(2)
    try {
      await fetcher.algoliaFetcher({ query: 'fifa', url: 'angolia.api', algoliaApiKey: 'x1x11212' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'algoliaApplicationId is required')
    }
  })

  t.test('algoliaFetcher must throw an error if there is a problem requesting to algolia API', async tt => {
    tt.plan(1)
    const fetcher = await esmock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchErr
    })
    try {
      await fetcher.algoliaFetcher({ query: 'fifa', url: 'angolia.api', algoliaApiKey: 'x1x11212', algoliaApplicationId: 'X2123ZAS123' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
    }
  })

  t.test('algoliaFetcher must return an error if algolia API return an invalid http code for the initial fetch', async tt => {
    tt.plan(1)
    const fetcher = await esmock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchInvalidCode
    })
    try {
      await fetcher.algoliaFetcher({ query: 'fifa', url: 'angolia.api', algoliaApiKey: 'x1x11212', algoliaApplicationId: 'X2123ZAS123' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
    }
  })

  t.test('algoliaFetcher must return an array of hits(games) if there is not a problem with the algolia API', async tt => {
    tt.plan(1)
    try {
      const result = await fetcher.algoliaFetcher({ query: 'fifa', url: 'angolia.api', algoliaApiKey: 'x1x11212', algoliaApplicationId: 'X2123ZAS123' })
      tt.hasProp(result, 'hits', 'does not has hits property')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })
})

tap.test('protondbFetcher', async (t) => {
  t.plan(8)

  const fetcher = await esmock('../../lib/fetcher/index.js', {
    'node-fetch': generateFetchMock(fetchProtondbMockedData)
  })

  t.test('protondbFetcher must throw an error if the query is not provided', async tt => {
    tt.plan(2)
    try {
      await fetcher.protondbFetcher()
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'query is required')
    }
  })

  t.test('protondbFetcher must throw an error if the objectId is not provided', async tt => {
    tt.plan(2)
    try {
      await fetcher.protondbFetcher({ query: 'fifa' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'objectId is required')
    }
  })

  t.test('protondbFetcher must throw an error if the url is not provided', async tt => {
    tt.plan(2)
    try {
      await fetcher.protondbFetcher({ query: 'fifa', objectId: '1486440' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'url is required')
    }
  })

  t.test('protondbFetcher must return null if there is a problem requesting to protondb API', async tt => {
    tt.plan(1)
    const fetcher = await esmock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchErr
    })
    try {
      const logger = { warn: sinon.spy() }
      const result = await fetcher.protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries' }, logger)
      tt.equal(result, null)
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must call the logger warn method when verbose is true and when there is a problem requesting to protondb API', async tt => {
    tt.plan(1)
    const fetcher = await esmock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchErr
    })
    try {
      const logger = { warn: sinon.spy() }
      await fetcher.protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', verbose: true }, logger)
      tt.ok(logger.warn.calledOnce, 'logger is not being called')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must not call the logger warn method when verbose is false and when there is a problem requesting to protondb API', async tt => {
    tt.plan(1)
    const fetcher = await esmock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchErr
    })
    try {
      const logger = { warn: sinon.spy() }
      await fetcher.protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', verbose: false }, logger)
      tt.equal(logger.warn.calledOnce, false, 'logger is being called when verbose is false')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must return null if protondb API return an invalid http code for the game', async tt => {
    tt.plan(1)
    const fetcher = await esmock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchInvalidCode
    })
    try {
      const logger = { warn: sinon.spy() }
      const result = await fetcher.protondbFetcher({ name: 'fifa', query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries' }, logger)
      tt.equal(result, null)
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must return a json if there is not a problem with the algolia API', async tt => {
    tt.plan(6)
    try {
      const result = await fetcher.protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries' })
      tt.hasProp(result, 'bestReportedTier', 'does not has bestReportedTier property')
      tt.hasProp(result, 'confidence', 'does not has confidence property')
      tt.hasProp(result, 'score', 'does not has score property')
      tt.hasProp(result, 'tier', 'does not has tier property')
      tt.hasProp(result, 'total', 'does not has total property')
      tt.hasProp(result, 'trendingTier', 'does not has trendingTier property')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })
})
