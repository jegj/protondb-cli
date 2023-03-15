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

tap.test('algolia.fetcher(unhappy path)', (t) => {
  t.plan(6)

  t.test('algoliaFetcher must throw an error if the query is not provided', async tt => {
    tt.plan(2)
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchOk
    })
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
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchOk
    })
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
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchOk
    })
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
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchOk
    })
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

  t.test('fetcher must return an array of hits(games) if there is not a problem with the algolia API', async tt => {
    tt.plan(1)
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': mockFetchOk
    })
    try {
      const result = await fetcher.algoliaFetcher({ query: 'fifa', url: 'angolia.api', algoliaApiKey: 'x1x11212', algoliaApplicationId: 'X2123ZAS123' })
      tt.hasProp(result, 'hits', 'does not has hits property')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })
})
