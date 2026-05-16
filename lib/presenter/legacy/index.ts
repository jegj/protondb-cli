import blessed from 'blessed'
import type {
  ListTable as BlessedListTable,
  Screen as BlessedScreen,
  Element as BlessedElement
} from 'blessed'
import type { GameData } from '../formatter.js'
import {
  formatGameName,
  wrapCollection,
  formatRequirements,
  generateRequirementsEntries
} from '../formatter.js'

const TAG_TIERS: Record<string, string> = {
  platinum: '{#E5E4E2-fg}platinum{/}',
  gold: '{yellow-fg}gold{/}',
  silver: '{#C0C0C0-fg}silver{/}',
  bronze: '{#cd7f32-fg}bronze{/}',
  pending: '{magenta-fg}pending{/}',
  borked: '{red-fg}borked{/}'
}

const TAG_CONFIDENCE: Record<string, string> = {
  strong: '{#AAFF00-fg}strong{/}',
  good: '{green-fg}good{/}',
  moderate: '{yellow-fg}moderate{/}',
  low: '{red-fg}low{/}',
  inadequate: '{#8B0000-fg}inadequate{/}'
}

const GAME_NA = '{gray-fg}N/A{/gray-fg}'
const DEFAULT_PADDING_DISPLAY = 15

function getTierValue(tier: string | undefined): number {
  switch (tier) {
    case 'platinum': return 6
    case 'gold': return 5
    case 'silver': return 4
    case 'bronze': return 3
    case 'borked': return 2
    case 'pending': return 1
    default: return 0
  }
}

function sortGames(games: GameData[]): GameData[] {
  return [...games].sort((a, b) => getTierValue(b.tier) - getTierValue(a.tier))
}

function formatTier(tier: string | undefined): string {
  if (tier && TAG_TIERS[tier]) return TAG_TIERS[tier]
  return tier ?? 'N/A'
}

function formatConfidence(confidence: string | undefined): string {
  if (confidence && TAG_CONFIDENCE[confidence]) return TAG_CONFIDENCE[confidence]
  return confidence ?? 'N/A'
}

function formatRow(game: GameData): string[] {
  const name = formatGameName(game.name)
  const tier = game.protondbNotFound ? GAME_NA : formatTier(game.tier)
  const conf = game.protondbNotFound ? GAME_NA : formatConfidence(game.confidence)
  return [name, tier, conf]
}

function generateWrappedEntries(
  title: string,
  data: string[] | undefined,
  _width: number | string | undefined,
  gameName: string
): string[][] {
  if (data && Array.isArray(data) && data.length > 0) {
    const wrappedData = wrapCollection(
      data,
      80 - gameName.length - DEFAULT_PADDING_DISPLAY
    )
    return wrappedData.map((line) => [title, line])
  }
  return []
}

function populateDetailTable(
  name: string,
  tier: string,
  confidence: string,
  gameData: GameData,
  table: BlessedListTable
): void {
  let data: string[][] = [
    [`{bold}{red-fg}${name}{/red-fg}{/bold}`, '-'],
    ['{bold}Steam ObjectId{/bold}', `${gameData.objectID}`],
    [
      '{bold}Steam URL{/bold}',
      `https://steamdb.info/app/${gameData.objectID}`
    ],
    [
      '{bold}Protondb URL{/bold}',
      `https://www.protondb.com/app/${gameData.objectID}`
    ],
    ['{bold}Tier{/bold}', tier],
    ['{bold}Confidence{/bold}', confidence],
    ['{bold}OS List{/bold}', `${gameData.oslist?.join(',') ?? 'N/A'}`],
    [
      '{bold}SteamDB Rating{/bold}',
      `${gameData.userScore != null ? `${gameData.userScore}%` : 'N/A'}`
    ],
    ['{bold}Release Date{/bold}', `${gameData?.release_date?.date ?? '-'}`],
    ['{bold}Developers{/bold}', `${gameData?.developers ?? '-'}`],
    ['{bold}Publishers{/bold}', `${gameData?.publishers ?? '-'}`]
  ]
    .concat(
      generateWrappedEntries(
        '{bold}Tags{/bold}',
        gameData.tags,
        undefined,
        name
      )
    )
    .concat(
      generateWrappedEntries(
        '{bold}Technologies{/bold}',
        gameData.technologies,
        undefined,
        name
      )
    )

  if (gameData.genres && Array.isArray(gameData.genres)) {
    const genres = gameData.genres.map((g) => g.description).join(',')
    data.push(['{bold}Genres{/bold}', genres])
  }

  if (gameData.recommendations) {
    data.push([
      '{bold}Recommendations{/bold}',
      `${gameData?.recommendations?.total ?? '-'}`
    ])
  }

  const reqs = gameData.requirements
  if (reqs) {
    if (reqs.minimum && Object.keys(reqs.minimum).length > 0) {
      data.push([
        '{bold}{yellow-fg}Minimum Requirements{/yellow-fg}{/bold}',
        '-'
      ])
      data = generateRequirementsEntries(reqs.minimum, data)
    }
    if (reqs.recommended && Object.keys(reqs.recommended).length > 0) {
      data.push([
        '{bold}{green-fg}Recommended Requirements{/green-fg}{/bold}',
        '-'
      ])
      data = generateRequirementsEntries(reqs.recommended, data)
    }
  }

  table.setData(data)
}

function createDetailView(
  gameData: GameData,
  table: BlessedListTable,
  screen: BlessedScreen
): BlessedElement {
  const [name, tier, confidence] = [
    formatGameName(gameData.name),
    gameData.protondbNotFound ? GAME_NA : formatTier(gameData.tier),
    gameData.protondbNotFound ? GAME_NA : formatConfidence(gameData.confidence)
  ]
  gameData.requirements = formatRequirements(gameData)

  const detailTable = blessed.listtable({
    tags: true,
    mouse: false,
    keys: false,
    interactive: false,
    data: [[]],
    border: 'line',
    width: '100%',
    height: '100%',
    scrollable: true,
    noCellBorders: false,
    style: {
      fg: 'white',
      bg: 'default',
      border: {
        fg: 'green',
        bg: 'default'
      },
      header: {
        fg: 'white',
        bg: 'default',
        bold: true
      },
      cell: {
        selected: {
          fg: 'white',
          bg: 'blue'
        }
      }
    }
  })

  table.hide()
  screen.append(detailTable)
  populateDetailTable(name, tier, confidence, gameData, detailTable)
  screen.render()
  return detailTable
}

export function presentLegacyData(data: GameData[]): void {
  const games = sortGames(data)
  const headers = ['name', 'tier', 'confidence']
  const rows = games.map(formatRow)
  const tableData = [headers, ...rows]

  const screen = blessed.screen()

  const table = blessed.listtable({
    tags: true,
    keys: false,
    mouse: false,
    interactive: true,
    data: tableData,
    border: 'line',
    style: {
      fg: 'white',
      bg: 'default',
      border: {
        fg: 'green',
        bg: 'default'
      },
      header: {
        fg: 'white',
        bg: 'default',
        bold: true
      },
      cell: {
        selected: {
          fg: 'white',
          bg: 'blue'
        }
      }
    }
  })

  screen.append(table)

  let displayGameView: BlessedElement | null = null

  let lastKeyTime = 0
  function handleNav(direction: number): void {
    const now = Date.now()
    if (now - lastKeyTime < 100) return
    lastKeyTime = now
    const idx = table.selected as number
    const next = idx + direction
    if (next >= 1 && next < rows.length + 1) {
      table.select(next)
      screen.render()
    }
  }

  screen.key(['down'], () => handleNav(1))
  screen.key(['j'], () => handleNav(1))
  screen.key(['up'], () => handleNav(-1))
  screen.key(['k'], () => handleNav(-1))

  screen.key(['enter'], () => {
    const idxVal = table.selected
    const gameIndex = idxVal - 1
    const game = games[gameIndex]
    if (!game) return
    displayGameView = createDetailView(game, table, screen)
  })

  table.focus()

  screen.key(['escape', 'q', 'C-c'], () => {
    if (displayGameView) {
      displayGameView.detach()
      table.focus()
      table.show()
      screen.render()
      displayGameView = null
    } else {
      process.exit(0)
    }
  })

  table.select(1)
  screen.render()
}
