import getConfig from '../config/index.js'
import { checkAlgoliaResponse } from './algolia.response.js'
import {
  algoliaFetcher,
  protondbFetcher,
  protondbProxyFetcher
} from './index.js'
import { checkProtondbResponse } from './protondb.response.js'
import { checkProtondbProxyResponse } from './protondbProxy.response.js'

const config = getConfig('../../default.json')

const algoliaUrl = config.DEFAULT_ALGOLIA_QUERY_URL
const algoliaApiKey = Buffer.from(
  config.DEFAULT_X_ALGOLIA_API_KEY,
  'base64'
).toString('utf-8')
const algoliaApplicationId = Buffer.from(
  config.DEFAULT_X_ALGOLIA_APPLICATION_ID,
  'base64'
).toString('utf-8')
const protondbUrl = config.DEFAULT_PROTONDB_URL
const protondbProxyUrl = config.DEFAULT_PROTONDBPROXY_URL

const query = process.argv[2] ?? 'fifa'
const hitsPerPage = Number(process.argv[3] ?? 10)

const algoliaOptions = {
  query,
  hitsPerPage,
  algoliaApiKey,
  algoliaApplicationId,
  url: algoliaUrl
}
;(async () => {
  try {
    const result = await algoliaFetcher(algoliaOptions)
    checkAlgoliaResponse(result)
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
})()

const protondbOptions = {
  query,
  url: protondbUrl,
  cache: null,
  verbose: false,
  name: 'FIFA 22',
  objectId: '1506830'
}
;(async () => {
  try {
    const result = await protondbFetcher(protondbOptions)
    checkProtondbResponse(result)
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
})()

const protondbProxyOptions = { appid: 72850, url: protondbProxyUrl }
;(async () => {
  try {
    const result = await protondbProxyFetcher(protondbProxyOptions)
    checkProtondbProxyResponse(result)
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
})()
