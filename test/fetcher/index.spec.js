const tap = require('tap')
const { fetchMockedData } = require('./index.mock')

const mockFetchErr = async (url) => {
  throw new Error('unknown url: ' + url)
}

const mockFetchOk = async (url) => {
  return fetchMockedData
}

/*
  TODO:
  - check payload is serialized
  - check url can be customize
*/

tap.test('algoliaFetcher', (t) => {
  t.plan(6)

  const fetcher = t.mock('../../lib/fetcher/index.js', {
    'node-fetch': mockFetchOk
  })

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
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchErr
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

tap.test('protondbFetcher', (t) => {
  t.plan(4)

  const fetcher = t.mock('../../lib/fetcher/index.js', {
    'node-fetch': mockFetchOk
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

  t.test('protondbFetcher must throw an error if there is a problem requesting to protondb API', async tt => {
    tt.plan(1)
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchErr
    })
    try {
      await fetcher.protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
    }
  })
})
