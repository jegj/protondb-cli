const fetch = require('node-fetch')
const { buildBodyRequest, buildHeaderRequest: algoliaHeaders } = require('./algolia.builder')
const { buildHeaderRequest: protondbHeaders, buildUrl: protondbBuildUrl } = require('./protondb.builder')
const dparams = { query: null, hitsPerPage: 10, url: null, algoliaApiKey: null, algoliaApplicationId: null }

async function algoliaFetcher ({ query, hitsPerPage, url, algoliaApiKey, algoliaApplicationId } = dparams) {
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
  return result.json()
}

async function protondbFetcher ({ query, objectId, url } = { query: null, objectId: null, url: null }) {
  if (!query) {
    throw new Error('query is required')
  }

  if (!objectId) {
    throw new Error('objectId is required')
  }

  if (!url) {
    throw new Error('url is required')
  }

  const headers = protondbHeaders({
    query
  })

  const requestOpt = { ...{ headers } }

  const finalUrl = protondbBuildUrl(url, objectId)
  const result = await fetch(finalUrl, requestOpt)
  return result.json()
}

async function mainFetcher ({ query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl }) {
  const games = await algoliaFetcher({ query, hitsPerPage, algoliaApiKey, algoliaApplicationId, url: algoliaUrl })
  return games
}

module.exports = {
  algoliaFetcher,
  protondbFetcher,
  mainFetcher
}
