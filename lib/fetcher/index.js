import fetch from 'node-fetch'
import { buildBodyRequest, buildHeaderRequest as algoliaHeaders } from './algolia.builder.js'
import { buildHeaderRequest as buildProtondbHeaders, buildUrl as buildProtondbBuildUrl } from './protondb.builder.js'

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

    const finalUrl = buildProtondbBuildUrl(url, objectId)
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
        game.etag = result.headers.raw().etag[0]
        cache.data.etags[objectId] = game
      }
    }
    return game
  } catch (error) {
    if (verbose) {
      logger.warn(`\n[WARN] ${error.message}`)
    }
    return null
  }
}
