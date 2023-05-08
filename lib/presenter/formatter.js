import { GAME_NA, TAG_TIERS, TAG_CONFIDENCE } from './formats.js'

// tier -> platinum > gold > silver > bronze > pending
function getValFromTier (tier) {
  switch (tier) {
    case 'platinum':
      return 6
    case 'gold':
      return 5
    case 'silver':
      return 4
    case 'bronze':
      return 3
    case 'borked':
      return 2
    case 'pending':
      return 1
    default:
      return 0
  }
}
// confidence -> strong > good > moderate > low > inadequate

export function format (games) {
  const data = sortGames(games).map(formatGame)
  const header = [['name', 'tier', 'confidence']]
  return header.concat(data)
}

export function sortGames (games) {
  function compare (game1, game2) {
    if (getValFromTier(game1.tier) > getValFromTier(game2.tier)) return -1
    if (getValFromTier(game2.tier) > getValFromTier(game1.tier)) return 1
    return 0
  }
  return games.sort(compare)
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
  if (TAG_TIERS[tier]) { return TAG_TIERS[tier].description } else { return tier }
}

export function formatGameConfidence (confidence) {
  if (TAG_CONFIDENCE[confidence]) { return TAG_CONFIDENCE[confidence].description } else { return confidence }
}

export function formatGameName (name, limit = 35) {
  if (name.length > limit) { return name.substring(0, limit) + '...' } else { return name }
}