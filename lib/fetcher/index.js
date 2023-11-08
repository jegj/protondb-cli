import { buildBodyRequest, buildHeaderRequest as algoliaHeaders } from './algolia.builder.js'
import { buildHeaderRequest as buildProtondbHeaders, buildUrl as buildProtondbUrl } from './protondb.builder.js'
import { buildUrl as buildProtondbProxyUrl } from './protondbProxy.builder.js'
import { fetch } from 'undici'

const dparams = { query: null, hitsPerPage: 10, url: null, algoliaApiKey: null, algoliaApplicationId: null }
const NOT_MODIFIED = 304

export async function algoliaFetcher ({ query, hitsPerPage, url, algoliaApiKey, algoliaApplicationId } = dparams) {
  if (!query) {
    throw new Error('query is required')
  }

  if (!url) {
    throw new Error('url is required')
  }

  if (!algoliaApiKey) {
    throw new Error('algoliaApiKey is required')
  }

  if (!algoliaApplicationId) {
    throw new Error('algoliaApplicationId is required')
  }

  const headers = algoliaHeaders({
    'x-algolia-api-key': algoliaApiKey,
    'x-algolia-application-id': algoliaApplicationId
  })
  const requestPayload = buildBodyRequest({ query, hitsPerPage })
  requestPayload.body = JSON.stringify(requestPayload.body)
  const requestOpt = { ...{ headers }, ...requestPayload }
  const result = await fetch(url, requestOpt)
  if (!result.ok) throw new Error(`request for algolia failed with status ${result.status}`)
  return result.json()
}

export async function protondbFetcher ({ query, objectId, url, name, verbose, cache } = { query: null, objectId: null, url: null, verbose: false, cache: null }, logger = console) {
  let cacheGame = null
  if (!query) {
    throw new Error('query is required')
  }

  if (!objectId) {
    throw new Error('objectId is required')
  }

  if (!url) {
    throw new Error('url is required')
  }

  if (cache && cache.data?.etags) {
    cacheGame = cache.data.etags[objectId]
  }

  const hasCacheEntry = cache && cacheGame

  try {
    const headers = buildProtondbHeaders(query)

    const requestOpt = { ...{ headers } }

    if (hasCacheEntry) {
      requestOpt.headers['If-None-Match'] = cacheGame.etag
    }

    const finalUrl = buildProtondbUrl(url, objectId)
    const result = await fetch(finalUrl, requestOpt)
    let game
    if (result.status === NOT_MODIFIED) {
      if (verbose) {
        logger.info(`\n[INFO]using cache for ${objectId}`)
      }
      game = cacheGame
    } else {
      if (!result.ok) throw new Error(`request for game ${name}(${objectId}) failed with status ${result.status}`)
      game = await result.json()
      if (cache) {
        game.etag = result.headers.get('etag')
        cache.data.etags[objectId] = game
      }
    }
    return game
  } catch (error) {
    if (verbose) {
      logger.warn(`\n[WARN][protondb] ${error.message}`)
    }
    return null
  }
}

export async function protondbProxyFetcher ({ appid, url, verbose, cache } = { appid: null, url: null, verbose: false }, logger = console) {
  if (!appid) {
    throw new Error('appid is required')
  }

  if (!url) {
    throw new Error('url is required')
  }

  try {
    const finalUrl = buildProtondbProxyUrl(url, appid)
    const result = await fetch(finalUrl)
    return result.json()
  } catch (error) {
    if (verbose) {
      logger.warn(`\n[WARN][protondbProxy] ${error.message}`)
    }
    return null
  }
}
