const DEFAULT_HITS_PER_PAGE = 50
const BODY_REQUEST_TEMPLATE = {
  body: {
    attributesToHighlight: [],
    attributesToSnippet: [],
    facets: ['tags'],
    facetFilters: [['appType:Game']],
    hitsPerPage: DEFAULT_HITS_PER_PAGE,
    attributesToRetrieve: [
      'lastUpdated',
      'name',
      'objectID',
      'followers',
      'oslist',
      'releaseYear',
      'tags',
      'technologies',
      'userScore'
    ],
    page: 0
  },
  method: 'POST'
}

/**
{
  query: 'fifa',
  attributesToHighlight: [],
  attributesToSnippet: [],
  facets: [ 'tags' ],
  facetFilters: [ [ 'appType:Game' ] ],
  hitsPerPage: 50,
  attributesToRetrieve: [
    'lastUpdated',
    'name',
    'objectID',
    'followers',
    'oslist',
    'releaseYear',
    'tags',
    'technologies',
    'userScore'
  ],
  page: 0
}
*/
const buildBodyRequest = function _buildBodyRequest ({ query, hitsPerPage }) {
  const dhitsPerPage = hitsPerPage ?? DEFAULT_HITS_PER_PAGE
  const newBody = { ...BODY_REQUEST_TEMPLATE.body, ...{ query, hitsPerPage: dhitsPerPage } }
  return { ...BODY_REQUEST_TEMPLATE, body: newBody }
}

const HEADER_REQUEST_TEMPLATE = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9',
  'content-type': 'application/x-www-form-urlencoded',
  referer: 'https://www.protondb.com',
  origin: 'https://www.protondb.com',
  connection: 'keep-alive'
}

/**
{
  "accept": '*\/*',
  "accept-language": "en-US,en;q=0.9",
  "content-type": "application/x-www-form-urlencoded",
  "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Brave\";v=\"110\"" [no required],
  "sec-ch-ua-mobile": "?0" [no required],
  "sec-ch-ua-platform": "\"Linux\""[no required],
  "sec-fetch-dest": "empty" [no required],
  "sec-fetch-mode": "cors"[no required],
  "sec-fetch-site": "cross-site"[no required],
  "sec-gpc": "1"[no required],
  "Referer": "https://www.protondb.com/",
  "Origin": "https://www.protondb.com",
  "Connection": "keep-alive",
  "Referrer-Policy": "strict-origin-when-cross-origin" [no required]
  "x-algolia-api-key": "9ba0e69fb2974316cdaec8f5f257088f",
  "x-algolia-application-id": "94HE6YATEI",
}
*/
const buildHeaderRequest = function _builddHeaderRequest (headers) {
  if (!Object.prototype.hasOwnProperty.call(headers, 'x-algolia-api-key')) {
    throw new Error('x-algolia-api-key is required for the headers')
  }
  if (!Object.prototype.hasOwnProperty.call(headers, 'x-algolia-application-id')) {
    throw new Error('x-algolia-application-id is required for the headers')
  }
  return { ...HEADER_REQUEST_TEMPLATE, ...headers }
}

module.exports = {
  buildBodyRequest,
  buildHeaderRequest
}
