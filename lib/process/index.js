import { getGamesReport } from '../core/index.js'
import { oraPromise } from 'ora'
import { presentData } from '../presenter/index.js'
import config from '../config/index.js'

export default async function start (protondbCLI) {
  const algoliaUrl = protondbCLI.algolia_query_url ?? config.get('DEFAULT_ALGOLIA_QUERY_URL')
  const algoliaApiKey = protondbCLI.algolia_api_key
  const algoliaApplicationId = protondbCLI.algolia_application_id
  const protondbUrl = protondbCLI.protondb_url ?? config.get('DEFAULT_PROTONDB_URL')
  const query = protondbCLI.game
  const hitsPerPage = protondbCLI.hits
  const concurrency = protondbCLI.concurrency
  const verbose = protondbCLI.verbose
  const options = { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl, concurrency, verbose }
  const result = await oraPromise(getGamesReport(options), { text: `fetching results for "${protondbCLI.game}"` })
  presentData(result)
}
