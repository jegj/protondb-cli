import { GAME_NA, TAG_TIERS } from './formats.js'

// tier -> platinum > gold > silver > bronze > pending
// confidence -> string, moderate,low, good, inadequate

export function format (games) {
  const data = games.map(formatGame)
  const header = [['name', 'tier', 'confidence']]
  return header.concat(data)
}

export function formatGame (game) {
  let tier = formatGameTier(game.tier)
  let confidence = game.confidence
  if (game.protondbNotFound) {
    tier = GAME_NA
    confidence = GAME_NA
  }
  return [
    formatGameName(game.name),
    tier,
    confidence
  ]
}

export function formatGameTier (tier) {
  return TAG_TIERS[tier] ?? tier
}

export function formatGameName (name, limit = 35) {
  if (name.length > limit) { return name.substring(0, limit) + '...' } else { return name }
}
