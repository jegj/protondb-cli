import { getGamesReport } from './index.js'
import assert from 'node:assert'
import fs from 'fs'

// TODO: use config module ??
const config = JSON.parse(fs.readFileSync('../../default.json'))

const algoliaUrl = config.DEFAULT_ALGOLIA_QUERY_URL
const algoliaApiKey = config.DEFAULT_X_ALGOLIA_API_KEY
const algoliaApplicationId = config.DEFAULT_X_ALGOLIA_APPLICATION_ID
const protondbUrl = config.DEFAULT_PROTONDB_URL

const query = (process.argv[2] ?? 'fifa')
const hitsPerPage = (process.argv[3] ?? 10)

// eslint-disable-next-line func-call-spacing
const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl }

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
