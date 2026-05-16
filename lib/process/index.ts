import { spinner } from '@clack/prompts'
import type { Low } from 'lowdb'
import type { CacheData } from '../cache/index.js'
import { createCache } from '../cache/index.js'
import getConfig from '../config/index.js'
import { getGamesReport } from '../core/index.js'
import type { GameData } from '../presenter/formatter.js'
import { type RenderMode, render } from '../presenter/index.js'

export interface ProtondbCLIOptions {
  game: string | null
  verbose?: boolean
  hits: number
  concurrency: number
  disable_cache: boolean
  clear_cache: boolean
  detail?: boolean
  json?: boolean
  'old-view'?: boolean
}

const config = getConfig()

function pickMode(opts: ProtondbCLIOptions): RenderMode {
  if (opts.json) return 'json'
  if (opts.detail) return 'card'
  return 'summary'
}

export default async function start(
  protondbCLI: ProtondbCLIOptions,
  logger: Pick<Console, 'info'> = console
): Promise<void> {
  let cache: Low<CacheData> | null
  if (protondbCLI.disable_cache) {
    cache = null
  } else {
    cache = await createCache()
  }

  if (protondbCLI.clear_cache && cache) {
    if (protondbCLI.verbose) {
      logger.info('\n[INFO]Cleaning up local cache')
    }
    cache.data.etags = {}
    cache.data.games = {}
    await cache.write()
  }

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

  const mode = pickMode(protondbCLI)
  const isTty = process.stdout.isTTY === true
  const showSpinner = mode !== 'json' && isTty

  const options = {
    query: protondbCLI.game ?? '',
    hitsPerPage: protondbCLI.hits,
    algoliaApiKey,
    algoliaApplicationId,
    algoliaUrl,
    protondbUrl,
    protondbProxyUrl,
    concurrency: protondbCLI.concurrency,
    verbose: protondbCLI.verbose
  }

  let result: GameData[]
  if (showSpinner) {
    const sp = spinner()
    sp.start(`fetching results for "${protondbCLI.game}"`)
    try {
      result = (await getGamesReport(options, cache)) as unknown as GameData[]
      sp.stop('done')
    } catch (err) {
      sp.stop('failed')
      throw err
    }
  } else {
    result = (await getGamesReport(options, cache)) as unknown as GameData[]
  }

  if (cache) {
    await cache.write()
  }

  if (protondbCLI['old-view'] && isTty && mode !== 'json') {
    const { presentLegacyData } = await import('../presenter/legacy/index.js')
    presentLegacyData(result)
    return
  }

  await render(result, { mode, isTty })
}
