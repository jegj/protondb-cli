import { GAME_NA, TAG_TIERS, TAG_CONFIDENCE } from './formats.js'
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
  function getRequirements (root) {
    const requirements = {}
    let requirementsRoot = root.querySelector('ul')?.firstChild
    while (requirementsRoot) {
      const requirementTokens = requirementsRoot.text.split(':')
      // Allow to identify the data format
      // 1 - ul Htmlelement has a list with a text as first child
      // 2-  ul Htmlelement has a list with the <li> as first child
      if (requirementTokens.length > 1) {
        const key = requirementTokens[0].toLowerCase().trim().replace(' ', '_')
        const value = requirementTokens[1].trim()
        requirements[key] = value
      }
      requirementsRoot = requirementsRoot?.nextSibling
    }
    return requirements
  }
  const minimumData = game?.pc_requirements?.minimum
  const recommendedData = game?.pc_requirements?.recommended
  let minimum = {}
  let recommended = {}
  if (minimumData) {
    minimum = getRequirements(parse(minimumData))
  }
  if (recommendedData) {
    recommended = getRequirements(parse(recommendedData))
  }
  return {
    minimum,
    recommended
  }
}
