export const GAME_NA = '{gray-fg}N/A{/gray-fg}'
export const SILVER_TIER = '{#C0C0C0-fg}silver{/}'
export const GOLD_TIER = '{#d4af37-fg}gold{/}'
export const BRONZE_TIER = '{#cd7f32-fg}bronze{/}'
export const PLATINUM_TIER = '{#E5E4E2-fg}platinum{/}'
export const PENDING_TIER = '{#93CAED-fg}pending{/}'

export const TAG_TIERS = {
  silver: SILVER_TIER,
  gold: GOLD_TIER,
  bronze: BRONZE_TIER,
  platinum: PLATINUM_TIER,
  pending: PENDING_TIER
}

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
