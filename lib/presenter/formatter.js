import { GAME_NA, TAG_TIERS, TAG_CONFIDENCE, REQUIREMENTS_TITLES } from './formats.js'
import { parse } from 'node-html-parser'

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

export function wrapCollection (collection, width) {
  if (!Array.isArray(collection)) {
    throw new Error('collection must be an array')
  }
  const lines = []
  let line = ''

  for (const item of collection) {
    if (line.length + item.length > width) {
      lines.push(line)
      line = ''
    }
    line += item + ','
  }

  if (line.length > 0) {
    lines.push(line)
  }

  return lines
}

export function formatRequirements (game) {
  function cleanUpRequirement (req, title) {
    if (req) {
      return req.replace(title, '').replace(':', '').trim()
    }
    return null
  }

  function getMinimunRequirements (root) {
    console.log('===>', root.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.text)
    const os = cleanUpRequirement(root.firstChild.nextSibling.nextSibling.firstChild.nextSibling.text, REQUIREMENTS_TITLES.os)
    const processor = cleanUpRequirement(root.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.text, REQUIREMENTS_TITLES.processor)
    const memory = cleanUpRequirement(root.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.text, REQUIREMENTS_TITLES.memory)
    const graphics = cleanUpRequirement(root.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.text, REQUIREMENTS_TITLES.graphics)
    const storage = cleanUpRequirement(root.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.text, REQUIREMENTS_TITLES.storage)
    return {
      os, processor, memory, graphics, storage
    }
  }
  const data = game?.pc_requirements?.minimum
  let minimum = {}; const recommended = {}
  if (data) {
    const root = parse(data)
    minimum = getMinimunRequirements(root)
  }
  return {
    minimum,
    recommended
  }
}
