import { GAME_NA, TAG_TIERS, TAG_CONFIDENCE } from './formats.js'

// tier -> platinum > gold > silver > bronze > pending
// confidence -> strong > good > moderate > low > inadequate

export function format (games) {
  const data = games.map(formatGame)
  const header = [['name', 'tier', 'confidence']]
  return header.concat(data)
}

export function formatGame (game) {
  let tier = formatGameTier(game.tier)
  let confidence = formatGameConfidence(game.confidence)
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

export function formatGameConfidence (confidence) {
  return TAG_CONFIDENCE[confidence] ?? confidence
}

export function formatGameName (name, limit = 35) {
  if (name.length > limit) { return name.substring(0, limit) + '...' } else { return name }
}
