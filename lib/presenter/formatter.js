export function formatGame (game) {
  let tier = game.tier
  let confidence = game.confidence
  if (game.protondbNotFound) {
    tier = 'pending'
    confidence = 'pending'
  }
  return [
    game.name,
    tier,
    confidence
  ]
}

export function format (games) {
  return games.map(formatGame)
}
