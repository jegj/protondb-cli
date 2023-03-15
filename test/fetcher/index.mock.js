const fetchMockedData = {
  hits: [
    {
      lastUpdated: 1653580973,
      name: 'FIFA 22',
      oslist: [Array],
      userScore: 79.24,
      followers: 97900,
      technologies: [Array],
      releaseYear: 2021,
      tags: [Array],
      objectID: '1506830'
    },
    {
      lastUpdated: 1623346705,
      name: 'EA SPORTS™ FIFA 21',
      oslist: [Array],
      userScore: 75.22,
      followers: 59900,
      technologies: [Array],
      releaseYear: 2020,
      tags: [Array],
      objectID: '1313860'
    }
  ],
  exhaustiveFacetsCount: true,
  exhaustiveNbHits: true,
  exhaustiveTypo: true,
  exhaustive: { facetsCount: true, nbHits: true, typo: true },
  query: 'fifa',
  params: 'query=fifa&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&facets=%5B%22tags%22%5D&facetFilters=%5B%5B%22appType%3AGame%22%5D%5D&hitsPerPage=50&attributesToRetrieve=%5B%22lastUpdated%22%2C%22name%22%2C%22objectID%22%2C%22followers%22%2C%22oslist%22%2C%22releaseYear%22%2C%22tags%22%2C%22technologies%22%2C%22userScore%22%5D&page=0',
  processingTimeMS: 4,
  processingTimingsMS: {
    afterFetch: { total: 1 },
    fetch: { total: 3 },
    request: { roundTrip: 182 },
    total: 4
  },
  serverTimeMS: 5
}

module.exports = {
  fetchMockedData
}
