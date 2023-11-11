import tap from 'tap'
import { createCache } from '../../lib/cache/index.js'
import os from 'node:os'
import { join } from 'node:path'
import { rmdir } from 'node:fs/promises'

const testCacheFolder = join(os.homedir(), '.config', 'protondbcli_test')

tap.after(async () => {
  await rmdir(testCacheFolder)
})

tap.test('createCache method must return always a lowdb cache object which contains the data property with all the protondb-cli keys', async (tt) => {
  tt.plan(3)
  const cache = await createCache(testCacheFolder)
  tt.hasOwnProp(cache, 'data')
  tt.hasOwnProp(cache.data, 'etags')
  tt.hasOwnProp(cache.data, 'games')
})
