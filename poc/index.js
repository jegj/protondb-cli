const { algoliaFetcher, protondbFetcher } = require('../lib/fetcher')

const getGames = async () => {
  console.log('## get games ##')
  const url = 'https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query'
  const algoliaApiKey = '9ba0e69fb2974316cdaec8f5f257088f'
  const algoliaApplicationId = '94HE6YATEI'
  const body = await algoliaFetcher({ query: 'fifa', hitsPerPage: 5, url, algoliaApiKey, algoliaApplicationId })
  console.log('#hits===>', body.hits.length)
  // console.log('===>', body)
}

const getGameInfo = async () => {
  console.log('## get game info ##')
  const url = 'https://www.protondb.com/api/v1/reports/summaries'
  const objectId = '911240'
  const query = 'fifa'

  const response = await protondbFetcher({ query, url, objectId })
  console.log('===>', response)
}

getGames()

getGameInfo()
