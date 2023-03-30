// https://www.npmjs.com/package/configstore
import { getGamesReport } from '../core/index.js'
import { oraPromise } from 'ora'
import { presentData } from '../presenter/index.js'

export default async function start (protondbCLI) {
  const algoliaUrl = 'https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query'
  const algoliaApiKey = '9ba0e69fb2974316cdaec8f5f257088f'
  const algoliaApplicationId = '94HE6YATEI'
  const protondbUrl = 'https://www.protondb.com/api/v1/reports/summaries'
  const query = protondbCLI.game
  const hitsPerPage = protondbCLI.hits
  const concurrency = protondbCLI.concurrency
  const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl, concurrency }
  const result = await oraPromise(getGamesReport(options), { text: `fetching results for "${protondbCLI.game}"` })
  presentData(result)
}
