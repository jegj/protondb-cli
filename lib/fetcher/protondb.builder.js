const HEADER_REQUEST_TEMPLATE = {
  accept: '*/*',
  authority: 'www.protondb.com',
  'accept-language': 'en-US,en;q=0.8',
  referer: 'https://www.protondb.com/search?q='
}

const buildHeaderRequest = function _builddHeaderRequest (query) {
  if (!query) {
    throw new Error('query is required for build the referer header')
  }
  return { ...HEADER_REQUEST_TEMPLATE, ...{ referer: HEADER_REQUEST_TEMPLATE.referer + query } }
}

const buildUrl = function _buildUrl (url, objectId) {
  if (!url) {
    throw new Error('url is required')
  }

  if (!objectId) {
    throw new Error('objectId is required')
  }

  if (url[url.length - 1] !== '/') {
    url += '/'
  }

  return new URL(`${objectId}.json`, url).href
}

module.exports = {
  buildHeaderRequest,
  buildUrl
}
