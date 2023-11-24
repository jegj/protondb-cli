import { createCache } from '../../lib/cache/index.js'
import os from 'node:os'
import { join } from 'node:path'
import { rmdir } from 'node:fs/promises'
import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'

const testCacheFolder = join(os.homedir(), '.config', 'protondbcli_test')

describe('cache', async () => {
  afterEach(async () => {
    await rmdir(testCacheFolder)
  })

  test('createCache method must return always a lowdb cache object which contains the data property with all the protondb-cli keys', async () => {
    const cache = await createCache(testCacheFolder)
    assert(Object.prototype.hasOwnProperty.call(cache, 'data'), 'cache does not have the data property')
    assert(Object.prototype.hasOwnProperty.call(cache.data, 'etags'), 'cache data does not have the etags property')
    assert(Object.prototype.hasOwnProperty.call(cache.data, 'games'), 'cache data does not have the games property')
  })
})
