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

const HEADER_REQUEST_TEMPLATE = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9'
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

/**
{
  accept: '*\/*',
 "accept-language": "en-US,en;q=0.9",
  "content-type": "application/x-www-form-urlencoded",
  "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Brave\";v=\"110\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Linux\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "cross-site",
  "sec-gpc": "1",
  "x-algolia-api-key": "9ba0e69fb2974316cdaec8f5f257088f",
  "x-algolia-application-id": "94HE6YATEI",
  "Referer": "https://www.protondb.com/",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
*/
const builddHeaderRequest = function _builddHeaderRequest (headers) {
  return { ...HEADER_REQUEST_TEMPLATE, ...headers }
}

module.exports = {
  buildBodyRequest,
  builddHeaderRequest
}
