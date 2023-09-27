import { protondbFetcher, algoliaFetcher } from './index.js'
import { checkAlgoliaResponse } from './algolia.response.js'
import getConfig from '../config/index.js'

const config = getConfig('../../default.json')

const algoliaUrl = config.DEFAULT_ALGOLIA_QUERY_URL
const algoliaApiKey = Buffer.from(config.DEFAULT_X_ALGOLIA_API_KEY, 'base64').toString('utf-8')
const algoliaApplicationId = Buffer.from(config.DEFAULT_X_ALGOLIA_APPLICATION_ID, 'base64').toString('utf-8')
const protondbUrl = config.DEFAULT_PROTONDB_URL

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
// eslint-disable-next-line semi
})();

const protondbOPtions = { query, url: protondbUrl, cache: null, verbose: false, name: 'FIFA 22', objectId: '1506830' }
;(async function () {
  try {
    const result = await protondbFetcher(protondbOPtions)
    // TODO: Check these properties
    console.log(result)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
  // eslint-disable-next-line semi
})();
