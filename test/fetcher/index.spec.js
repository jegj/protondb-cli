import tap from 'tap'
import sinon from 'sinon'
import { fetchAlgoliaMockedData, fetchProtondbMockedData, protondbProxyMock } from '../mock/index.mock.js'
import { algoliaFetcher, protondbFetcher, protondbProxyFetcher } from '../../lib/fetcher/index.js'
import { MockAgent, setGlobalDispatcher } from 'undici'

const mockAgent = new MockAgent()
mockAgent.disableNetConnect()
setGlobalDispatcher(mockAgent)

const etag = 'ee98d63c9d4b7d42725a91260be97daf-ss'

tap.test('algoliaFetcher', async (t) => {
  t.plan(6)

  t.test('algoliaFetcher must throw an error if the query is not provided', async tt => {
    tt.plan(2)
    try {
      await algoliaFetcher()
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'query is required')
    }
  })

  t.test('algoliaFetcher must throw an error if the url is not provided', async tt => {
    tt.plan(2)
    try {
      await algoliaFetcher({ query: 'fifa' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'url is required')
    }
  })

  t.test('algoliaFetcher must throw an error if the algoliaApiKey is not provided', async tt => {
    tt.plan(2)
    try {
      await algoliaFetcher({ query: 'fifa', url: 'https://angolia.test.api.com/test' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'algoliaApiKey is required')
    }
  })

  t.test('algoliaFetcher must throw an error if the algoliaApplicationId is not provided', async tt => {
    tt.plan(2)
    try {
      await algoliaFetcher({ query: 'fifa', url: 'https://angolia.test.api.com/test', algoliaApiKey: 'x1x11212' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'algoliaApplicationId is required')
    }
  })

  t.test('algoliaFetcher must return an error if algolia API return an invalid http code for the initial fetch', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://angolia.test.api.com')
    mockClient.intercept({
      path: '/test',
      method: 'POST'
    }).reply(500, { status: 'failed' })

    try {
      await algoliaFetcher({ query: 'fifa', url: 'https://angolia.test.api.com/test', algoliaApiKey: 'x1x11212', algoliaApplicationId: 'X2123ZAS123' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
    }
  })

  t.test('algoliaFetcher must return an array of hits(games) if there is not a problem with the algolia API', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://example.com')
    mockClient.intercept({
      path: '/test',
      method: 'POST'
    }).reply(200, fetchAlgoliaMockedData)

    try {
      const result = await algoliaFetcher({ query: 'fifa', url: 'https://example.com/test', algoliaApiKey: 'x1x11212', algoliaApplicationId: 'X2123ZAS123' })
      tt.hasProp(result, 'hits', 'does not has hits property')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })
})

tap.test('protondbFetcher', async (t) => {
  t.plan(12)

  t.test('protondbFetcher must throw an error if the query is not provided', async tt => {
    tt.plan(2)
    try {
      await protondbFetcher()
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'query is required')
    }
  })

  t.test('protondbFetcher must throw an error if the objectId is not provided', async tt => {
    tt.plan(2)
    try {
      await protondbFetcher({ query: 'fifa' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'objectId is required')
    }
  })

  t.test('protondbFetcher must throw an error if the url is not provided', async tt => {
    tt.plan(2)
    try {
      await protondbFetcher({ query: 'fifa', objectId: '1486440' })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'url is required')
    }
  })

  t.test('protondbFetcher must return null if there is a problem requesting to protondb API', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(200, () => {
      throw new Error('unexpected error before sending request')
    })

    try {
      const logger = { warn: sinon.spy() }
      const result = await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries' }, logger)
      tt.equal(result, null)
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must call the logger warn method when verbose is true and when there is a problem requesting to protondb API', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(200, () => {
      throw new Error('unexpected error before sending request')
    })

    try {
      const logger = { warn: sinon.spy() }
      await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', verbose: true }, logger)
      tt.ok(logger.warn.calledOnce, 'logger is not being called')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must not call the logger warn method when verbose is false and when there is a problem requesting to protondb API', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(200, () => {
      throw new Error('unexpected error before sending request')
    })

    try {
      const logger = { warn: sinon.spy() }
      await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', verbose: false }, logger)
      tt.equal(logger.warn.calledOnce, false, 'logger is being called when verbose is false')
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must return null if protondb API return an invalid http code for the game', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(500, { status: 'failed' })
    try {
      const logger = { warn: sinon.spy() }
      const result = await protondbFetcher({ name: 'fifa', query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries' }, logger)
      tt.equal(result, null)
    } catch (error) {
      tt.fail('error is not expected')
    }
  })

  t.test('protondbFetcher must return a json if there is not a problem with the algolia API', async tt => {
    tt.plan(6)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(200, fetchProtondbMockedData)
    try {
      const result = await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries' })
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

  t.test('protondbFetcher must return the data from the server if there is a cache miss and add a new item in the cache for future writing', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(200, fetchProtondbMockedData)
    const cache = {
      write: sinon.spy(),
      data: {
        etags: {} // after read()
      }
    }
    await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', cache })
    tt.ok(Object.prototype.hasOwnProperty.call(cache.data.etags, '1486440'), 'cache must have a new entry from the server')
  })

  t.test('protondbFetcher must return the data from the cache if there is a cache hit and the server responded 304 with the respective If-None-Match header', async tt => {
    tt.plan(2)
    const cache = {
      write: sinon.spy(),
      data: {
        etags: {
          1486440: {
            ...fetchProtondbMockedData, ...{ etag }
          }
        }
      }
    }

    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(304, {})
    const game = await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', cache })
    tt.notOk(cache.write.calledOnce, 'cache write is being called on a cache hit')
    tt.equal(game, cache.data.etags['1486440'], 'game response should be the same as the cache now')
  })

  t.test('protondbFetcher must return the data from the server if there is a cache hit but the server responded with a 200 and also add a new item in the cache', async tt => {
    tt.plan(2)
    const newETag = 'aa23dc3c9d457da272b79126k8le97daf-ss'
    const cache = {
      write: sinon.spy(),
      data: {
        etags: {
          1486440: {
            ...fetchProtondbMockedData, ...{ etag }
          }
        }
      } // after cache read()
    }

    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(200, fetchProtondbMockedData, {
      headers: {
        etag: newETag
      }
    })

    const game = await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', cache })
    tt.equal(cache.data.etags['1486440'].etag, newETag, 'cache must have the new etag in the cache')
    tt.equal(game, cache.data.etags['1486440'], 'game response should be the same as the cache now')
  })

  t.test('protondbFetcher must call the logger.info method when the verbose mode is enabled', async tt => {
    tt.plan(2)
    const cache = {
      write: sinon.spy(),
      data: {
        etags: {
          1486440: {
            ...fetchProtondbMockedData, ...{ etag }
          }
        }
      }
    }

    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/api/v1/reports/summaries/1486440.json',
      method: 'GET'
    }).reply(304, {})

    const logger = {
      info: sinon.spy(),
      warn: sinon.spy()
    }

    const game = await protondbFetcher({ query: 'fifa', objectId: '1486440', url: 'https://www.protondb.com/api/v1/reports/summaries', cache, verbose: true }, logger)

    tt.ok(logger.info.calledOnce, 'on verbose mode the logger.info method is not being called')
    tt.equal(game, cache.data.etags['1486440'], 'game response should be the same as the cache now')
  })
})

tap.test('protondbProxyFetcher', async (t) => {
  t.plan(6)

  t.test('protondbProxyFetcher must throw an error if the appid(objectId) is not provided', async tt => {
    tt.plan(2)
    try {
      await protondbProxyFetcher()
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'appid is required')
    }
  })

  t.test('protondbProxyFetcher must throw an error if the url is not provided', async tt => {
    tt.plan(2)
    try {
      await protondbProxyFetcher({ appid: 72850 })
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
      tt.match(error.message, 'url is required')
    }
  })

  t.test('protondbProxyFetcher must return null if there is a problem requesting to protondbProxy API', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/proxy/steam/api/appdetails/?appids=72850',
      method: 'GET'
    }).reply(200, () => {
      throw new Error('unexpected error before sending request')
    })
    const result = await protondbProxyFetcher({ appid: 72850, url: 'https://www.protondb.com/proxy/steam/api/appdetails' })
    tt.equal(result, null, 'result is not null')
  })

  t.test('protondbProxyFetcher must return null if protondbProxy API return an invalid http code for the initial fetch', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/proxy/steam/api/appdetails/?appids=72850',
      method: 'GET'
    }).reply(500, {})
    const result = await protondbProxyFetcher({ appid: 72850, url: 'https://www.protondb.com/proxy/steam/api/appdetails' })
    tt.equal(result, null, 'result is not null')
  })

  t.test('protondbProxyFetcher  must return an object if there is not a problem with the protondbProxy API', async tt => {
    tt.plan(1)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/proxy/steam/api/appdetails/?appids=72850',
      method: 'GET'
    }).reply(200, protondbProxyMock)
    const result = await protondbProxyFetcher({ appid: 72850, url: 'https://www.protondb.com/proxy/steam/api/appdetails' })
    tt.hasProp(result, '72850', 'does not has the appid property')
  })

  t.test('protondbProxyFetcher must return null if there is problem requesting data to protondbProxy API and must logged it when verbose is on', async tt => {
    tt.plan(2)
    const mockClient = mockAgent.get('https://www.protondb.com')
    mockClient.intercept({
      path: '/proxy/steam/api/appdetails/?appids=72850',
      method: 'GET'
    }).reply(200, () => {
      throw new Error('unexpected error before sending request')
    })
    const logger = {
      warn: sinon.spy()
    }

    const result = await protondbProxyFetcher({ appid: 72850, url: 'https://www.protondb.com/proxy/steam/api/appdetails', verbose: true }, logger)
    tt.ok(logger.warn.calledOnce, 'on verbose mode the logger.warn method is not being called')
    tt.equal(result, null, 'result is not null')
  })
})
