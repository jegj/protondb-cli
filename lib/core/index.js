/* eslint-disable no-unused-vars */
const { algoliaFetcher, protondbFetcher } = require('../fetcher')
// const { pMap } = require('p-map')
// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

async function getGamesReport ({ query, hitsPerPage, algoliaApiKey, algoliaApplicationId, algoliaUrl, protondbUrl }) {
  const games = await algoliaFetcher({ query, hitsPerPage, algoliaApiKey, algoliaApplicationId, url: algoliaUrl })

  // const pMap = (...args) => import('p-map').then(({ default: pMap }) => pMap(...args))

  // const mapper = async game => {
  //   return protondbFetcher({ query, objectId: game.objectID, protondbUrl })
  // }

  // const result = await pMap(games, mapper, { concurrency: 2 })

  return games
}

module.exports = {
  getGamesReport
}
