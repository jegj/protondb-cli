import { algoliaFetcher, protondbFetcher } from '../fetcher/index.js'
import pMap from 'p-map'

export async function getGamesReport ({ query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl }) {
  const games = await algoliaFetcher({ query, hitsPerPage, algoliaApiKey, algoliaApplicationId, url: algoliaUrl })

  const mapper = async game => {
    return protondbFetcher({ query, objectId: game.objectID, url: protondbUrl })
  }

  const result = await pMap(games.hits, mapper, { concurrency: 2 })

  // TODO: merge result

  return result
}
