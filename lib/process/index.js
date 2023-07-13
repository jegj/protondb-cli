import { getGamesReport } from '../core/index.js'
import { oraPromise } from 'ora'
import { presentData } from '../presenter/index.js'
import getConfig from '../config/index.js'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import os from 'node:os'
import { join } from 'node:path'
import fs from 'node:fs'

const config = getConfig()

export default async function start (protondbCLI) {
  let cache
  if (protondbCLI.disable_cache) {
    cache = null
  } else {
    cache = await createCache()
  }
  const algoliaUrl = protondbCLI.algolia_query_url ?? config.DEFAULT_ALGOLIA_QUERY_URL
  const algoliaApiKey = protondbCLI.algolia_api_key ?? Buffer.from(config.DEFAULT_X_ALGOLIA_API_KEY, 'base64').toString('utf-8')
  const algoliaApplicationId = protondbCLI.algolia_application_id ?? Buffer.from(config.DEFAULT_X_ALGOLIA_APPLICATION_ID, 'base64').toString('utf-8')
  const protondbUrl = protondbCLI.protondb_url ?? config.DEFAULT_PROTONDB_URL
  const query = protondbCLI.game
  const hitsPerPage = protondbCLI.hits
  const concurrency = protondbCLI.concurrency
  const verbose = protondbCLI.verbose
  const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl, concurrency, verbose }
  const result = await oraPromise(getGamesReport(options, cache), { text: `fetching results for "${protondbCLI.game}"` })
  presentData(result)
}

async function createCache () {
  const protondbcliFolder = join(os.homedir(), '.config', 'protondbcli')
  await fs.promises.mkdir(protondbcliFolder, { recursive: true, mode: 0o775 })
  const protondbcliCacheFile = join(protondbcliFolder, 'protondb.cache.json')
  const adapter = new JSONFile(protondbcliCacheFile)
  const defaultData = { etags: {}, games: {} }
  const cache = new Low(adapter, defaultData)
  return cache
}
