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

export default async function start (protondbCLI, logger = console) {
  let cache
  if (protondbCLI.disable_cache) {
    cache = null
  } else {
    cache = await createCache()
  }

  if (protondbCLI.clear_cache) {
    if (protondbCLI.verbose) {
      logger.info('\n[INFO]Cleaning up local cache')
    }
    cache.data.etags = {}
    cache.data.games = {}
    await cache.write()
  }

  const algoliaUrl = config.DEFAULT_ALGOLIA_QUERY_URL
  const algoliaApiKey = Buffer.from(config.DEFAULT_X_ALGOLIA_API_KEY, 'base64').toString('utf-8')
  const algoliaApplicationId = Buffer.from(config.DEFAULT_X_ALGOLIA_APPLICATION_ID, 'base64').toString('utf-8')
  const protondbUrl = config.DEFAULT_PROTONDB_URL
  const query = protondbCLI.game
  const hitsPerPage = protondbCLI.hits
  const concurrency = protondbCLI.concurrency
  const verbose = protondbCLI.verbose
  const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl, concurrency, verbose }
  const result = await oraPromise(getGamesReport(options, cache), { text: `fetching results for "${protondbCLI.game}"` })
  if (cache) {
    await cache.write()
  }
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
