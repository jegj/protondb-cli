const fetch = require('node-fetch')
const { buildBodyRequest, builddHeaderRequest } = require('./algolia.builder')
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

  const headers = builddHeaderRequest({
    'x-algolia-api-key': algoliaApiKey,
    'x-algolia-application-id': algoliaApplicationId
  })
  const requestPayload = buildBodyRequest({ query, hitsPerPage })
  requestPayload.body = JSON.stringify(requestPayload.body)
  const requestOpt = { ...{ headers }, ...requestPayload }
  return await fetch(url, requestOpt)
}

module.exports = {
  algoliaFetcher
}
