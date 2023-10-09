import { protondbFetcher, algoliaFetcher, protondbProxyFetcher } from './index.js'
import { checkAlgoliaResponse } from './algolia.response.js'
import { checkProtondbResponse } from './protondb.response.js'
import { checkProtondbProxyResponse } from './protondbProxy.response.js'
import getConfig from '../config/index.js'

const config = getConfig('../../default.json')

const algoliaUrl = config.DEFAULT_ALGOLIA_QUERY_URL
const algoliaApiKey = Buffer.from(config.DEFAULT_X_ALGOLIA_API_KEY, 'base64').toString('utf-8')
const algoliaApplicationId = Buffer.from(config.DEFAULT_X_ALGOLIA_APPLICATION_ID, 'base64').toString('utf-8')
const protondbUrl = config.DEFAULT_PROTONDB_URL
const protondbProxyUrl = config.DEFAULT_PROTONDBPROXY_URL

const query = (process.argv[2] ?? 'fifa')
const hitsPerPage = (process.argv[3] ?? 10)

const algoliaOptions = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, url: algoliaUrl }

;(async function () {
  try {
    const result = await algoliaFetcher(algoliaOptions)
    checkAlgoliaResponse(result)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
})()

const protondbOPtions = { query, url: protondbUrl, cache: null, verbose: false, name: 'FIFA 22', objectId: '1506830' }
;(async function () {
  try {
    const result = await protondbFetcher(protondbOPtions)
    checkProtondbResponse(result)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
})()

const protondbProxyOptions = { appid: 72850, url: protondbProxyUrl }
;(async function () {
  try {
    const result = await protondbProxyFetcher(protondbProxyOptions)
    checkProtondbProxyResponse(result, 72850)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
})()
