export const GAME_NA = '{gray-fg}N/A{/gray-fg}'

const SILVER_TIER = '{#C0C0C0-fg}silver{/}'
const GOLD_TIER = '{yellow-fg}gold{/}'
const BRONZE_TIER = '{#cd7f32-fg}bronze{/}'
const PLATINUM_TIER = '{#E5E4E2-fg}platinum{/}'
const PENDING_TIER = '{magenta-fg}pending{/}'

export const TAG_TIERS = Object.freeze({
  silver: Symbol(SILVER_TIER),
  gold: Symbol(GOLD_TIER),
  bronze: Symbol(BRONZE_TIER),
  platinum: Symbol(PLATINUM_TIER),
  pending: Symbol(PENDING_TIER)
})

const STRONG_CONFIDENCE = '{#AAFF00-fg}strong{/}'
const GOOD_CONFIDENCE = '{green-fg}good{/}'
const MODERATE_CONFIDENCE = '{yellow-fg}moderate{/}'
const LOW_CONFIDENCE = '{red-fg}low{/}'
const INADEQUATE_CONFIDENCE = '{#8B0000-fg}inadequate{/}'

export const TAG_CONFIDENCE = Object.freeze({
  strong: Symbol(STRONG_CONFIDENCE),
  good: Symbol(GOOD_CONFIDENCE),
  moderate: Symbol(MODERATE_CONFIDENCE),
  low: Symbol(LOW_CONFIDENCE),
  inadequate: Symbol(INADEQUATE_CONFIDENCE)
})
