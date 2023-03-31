import fetch from 'node-fetch'
import { buildBodyRequest, buildHeaderRequest as algoliaHeaders } from './algolia.builder.js'
import { buildHeaderRequest as protondbHeaders, buildUrl as protondbBuildUrl } from './protondb.builder.js'
const dparams = { query: null, hitsPerPage: 10, url: null, algoliaApiKey: null, algoliaApplicationId: null }

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

export async function protondbFetcher ({ query, objectId, url, name, verbose } = { query: null, objectId: null, url: null, verbose: false }, logger = console) {
  if (!query) {
    throw new Error('query is required')
  }

  if (!objectId) {
    throw new Error('objectId is required')
  }

  if (!url) {
    throw new Error('url is required')
  }

  try {
    const headers = protondbHeaders({
      query
    })

    const requestOpt = { ...{ headers } }

    const finalUrl = protondbBuildUrl(url, objectId)
    const result = await fetch(finalUrl, requestOpt)
    if (!result.ok) throw new Error(`request for game ${name}(${objectId}) failed with status ${result.status}`)
    return result.json()
  } catch (error) {
    if (verbose) {
      logger.warn(`\n[WARN] ${error.message}`)
    }
    return null
  }
}
