const REQUIRED_ALGOLIA_PROPS = [
  'lastUpdated',
  'name',
  'oslist',
  'userScore',
  'releaseYear',
  'objectID'
]

/*
    {
      lastUpdated: 1653580973,
      name: 'FIFA 22',
      oslist: [Array],
      userScore: 79.45,
      releaseYear: 2021,
      objectID: '1506830'
    },
*/
export function checkAlgoliaResponse (algoliaResponse, requiredProps = REQUIRED_ALGOLIA_PROPS) {
  if (!Object.prototype.hasOwnProperty.call(algoliaResponse, 'hits')) {
    throw new Error('algolia response does not have "hits" property')
  }

  if (!Array.isArray(algoliaResponse.hits)) {
    throw new Error('algolia "hits" is not an array')
  }
  const sampleDate = algoliaResponse.hits[0]
  requiredProps.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(sampleDate, key)) {
      throw new Error(`algolia "hit" doesnt have the property "${key}"`)
    }
  })
}
