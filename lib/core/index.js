import { algoliaFetcher, protondbFetcher } from '../fetcher/index.js'
import pMap from 'p-map'

export async function getGamesReport (queryOpts, cache = null) {
  const results = []
  const { query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl, concurrency, verbose } = queryOpts
  if (cache) {
    await cache.read()
  }
  const algoliaGames = await algoliaFetcher({ query, hitsPerPage, algoliaApiKey, algoliaApplicationId, url: algoliaUrl })
  const mapper = async game => {
    return protondbFetcher({ query, objectId: game.objectID, url: protondbUrl, name: game.name, verbose, cache })
  }
  const protondbGames = await pMap(algoliaGames.hits, mapper, { concurrency })

  protondbGames.forEach((protondbGame, index) => {
    if (protondbGame) {
      results.push({ ...algoliaGames.hits[index], ...protondbGame })
    } else {
      results.push({ ...algoliaGames.hits[index], ...{ protondbNotFound: true, tier: null, confidence: null } })
    }
  })

  return results
}
