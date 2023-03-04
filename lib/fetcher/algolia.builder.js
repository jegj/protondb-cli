const BODY_REQUEST_TEMPLATE = {
  body: {
    attributesToHighlight: [],
    attributesToSnippet: [],
    facets: ['tags']
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
const buildBodyRequest = function _buildBodyRequest (query) {
  const newBody = { ...BODY_REQUEST_TEMPLATE.body, ...{ query } }
  return { ...BODY_REQUEST_TEMPLATE, body: newBody }
}

module.exports = {
  buildBodyRequest
}
