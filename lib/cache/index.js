import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import os from 'node:os'
import { join } from 'node:path'
import fs from 'node:fs'

const DEFAULT_PATH = join(os.homedir(), '.config', 'protondbcli')

export async function createCache (cacheFolder = DEFAULT_PATH) {
  await fs.promises.mkdir(cacheFolder, { recursive: true, mode: 0o775 })
  const protondbcliCacheFile = join(cacheFolder, 'protondb.cache.json')
  const adapter = new JSONFile(protondbcliCacheFile)
  const defaultData = { etags: {}, games: {} }
  const cache = new Low(adapter, defaultData)
  return cache
}
