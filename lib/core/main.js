import { getGamesReport } from './index.js'
import getConfig from '../config/index.js'
import assert from 'node:assert'

const config = getConfig('../../default.json')

const algoliaUrl = config.DEFAULT_ALGOLIA_QUERY_URL
const algoliaApiKey = Buffer.from(config.DEFAULT_X_ALGOLIA_API_KEY, 'base64').toString('utf-8')
const algoliaApplicationId = Buffer.from(config.DEFAULT_X_ALGOLIA_APPLICATION_ID, 'base64').toString('utf-8')
const protondbUrl = config.DEFAULT_PROTONDB_URL
const protondbProxyUrl = config.DEFAULT_PROTONDBPROXY_URL

const query = (process.argv[2] ?? 'fifa')
const hitsPerPage = (process.argv[3] ?? 10)

// eslint-disable-next-line func-call-spacing
const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl, protondbProxyUrl }

;(async function () {
  try {
    const result = await getGamesReport(options)
    assert(Array.isArray(result), 'failed to fetch from algolia or protondb')
    assert(result.length > 0, 'result set came empty')
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
// eslint-disable-next-line semi
})();
