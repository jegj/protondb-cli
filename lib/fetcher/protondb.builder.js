const HEADER_REQUEST_TEMPLATE = {
  accept: '*/*',
  authority: 'www.protondb.com',
  'accept-language': 'en-US,en;q=0.8',
  referer: 'https://www.protondb.com/search?q='
}

const builddHeaderRequest = function _builddHeaderRequest (query) {
  if (!query) {
    throw new Error('query is required for build the referer header')
  }
  return { ...HEADER_REQUEST_TEMPLATE, ...{ referer: HEADER_REQUEST_TEMPLATE.referer + query } }
}

module.exports = {
  builddHeaderRequest
}
