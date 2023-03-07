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

module.exports = {
  buildBodyRequest
}
