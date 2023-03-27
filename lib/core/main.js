import { getGamesReport } from './index.js'

const algoliaUrl = 'https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query'
const algoliaApiKey = '9ba0e69fb2974316cdaec8f5f257088f'
const algoliaApplicationId = '94HE6YATEI'
const protondbUrl = 'https://www.protondb.com/api/v1/reports/summaries'

const query = (process.argv[2] ?? 'fifa')
const hitsPerPage = (process.argv[3] ?? 10)

// eslint-disable-next-line func-call-spacing
const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl }

;(async function () {
  try {
    const result = await getGamesReport(options)
    console.log('===>', result.hits)
  } catch (e) {
    console.error(e)
  }
// eslint-disable-next-line semi
})();
