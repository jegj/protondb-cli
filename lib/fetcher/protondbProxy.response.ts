const REQUIRED_PROTONDB_PROXY_PROPS = ['genres', 'recommendations']

export function checkProtondbProxyResponse(
  protondbProxyResponse: unknown,
  requiredProps: string[] = REQUIRED_PROTONDB_PROXY_PROPS
): void {
  const proxyResponse = protondbProxyResponse as Record<string, unknown>
  const returnedAppId = Object.keys(proxyResponse)[0]

  if (!returnedAppId) {
    throw new Error('protondbproxy response doesnt have any appid')
  }

  const game = proxyResponse[returnedAppId] as Record<string, unknown>

  if (!Object.hasOwn(game, 'success') || !game.success) {
    throw new Error(
      'protondbproxy game response doesnt have a valid success property'
    )
  }

  if (!Object.hasOwn(game, 'data')) {
    throw new Error(
      'protondbproxy game response doesnt have a valid game property'
    )
  }

  const gameData = game.data as Record<string, unknown>

  requiredProps.forEach((key) => {
    if (!Object.hasOwn(gameData, key)) {
      throw new Error(
        `protondbproxy response doesnt have the property "${key}"`
      )
    }
  })

  const genres = gameData.genres
  if (!Array.isArray(genres)) {
    throw new Error('genres is not an array')
  }

  const sampleGenre = genres[0] as Record<string, unknown>
  const sampleRecommendations = gameData.recommendations as Record<
    string,
    unknown
  >

  if (!Object.hasOwn(sampleGenre, 'description')) {
    throw new Error('genre object does not have the description property')
  }

  if (!Object.hasOwn(sampleRecommendations, 'total')) {
    throw new Error('recommendation object does not have the total property')
  }
}
