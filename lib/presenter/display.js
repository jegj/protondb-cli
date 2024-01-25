import blessed from 'blessed'
import { formatGame, wrapCollection, formatRequirements, generateRequirementsEntries } from './formatter.js'
import * as url from 'node:url'

const DEMO_GAME_DATA = {
  name: 'Demo Game',
  objectID: 9999999,
  releaseYear: 1930,
  tier: 'silver',
  confidence: 'good',
  oslist: ['Windows', 'Linux'],
  technologies: [],
  tags: ['Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure'],
  userScore: 99.99,
  followers: 1
}

const DEFAULT_PADDING_DISPLAY = 15

export default async function displayGame (gameData = DEMO_GAME_DATA, blenderList = null, screen = blessed.screen()) {
  const [name, tier, confidence] = formatGame(gameData)
  const requirements = formatRequirements(gameData)
  gameData.requirements = requirements
  const table = blessed.listtable({
    tags: true,
    mouse: true,
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
        bold: 'true'
      },
      cell: {
        selected: {
          fg: 'white',
          bg: 'blue'
        }
      }
    }
  })

  if (blenderList) {
    blenderList.hide()
  }
  screen.append(table)

  updateTable(name, tier, confidence, gameData, table, screen)
  return table
}

function updateTable (name, tier, confidence, gameData, table, screen) {
  let data = [[`{bold}{red-fg}${name}{red-fg}{/bold}`, '-'],
    ['{bold}Steam ObjectId{/bold}', `${gameData.objectID}`],
    ['{bold}Steam URL{/bold}', `https://steamdb.info/app/${gameData.objectID}`],
    ['{bold}Protondb URL{/bold}', `https://www.protondb.com/app/${gameData.objectID}`],
    ['{bold}Tier{/bold}', `${tier}`],
    ['{bold}Confidence{/bold}', `${confidence}`],
    ['{bold}OS List{/bold}', `${gameData.oslist.join(',')}`],
    ['{bold}SteamDB Rating{/bold}', `${gameData.userScore}%`],
    ['{bold}Release Date{/bold}', `${gameData?.release_date?.date ?? '-'}`],
    ['{bold}Developers{/bold}', `${gameData?.developers ?? '-'}`],
    ['{bold}Publishers{/bold}', `${gameData?.publishers ?? '-'}`]
  ].concat(
    generateWrappedEntries('{bold}Tags{/bold}', gameData.tags, table.width, name) // REMOVED FROM PROTONDB API, SINCE COMES EMPTY NOTHING IS DISPLAYED
  ).concat(
    generateWrappedEntries('{bold}Technologies{/bold}', gameData.technologies, table.width, name) // REMOVED FROM PROTONDB API, SINCE COMES EMPTY NOTHING IS DISPLAYED
  )
  if (gameData.genres && Array.isArray(gameData.genres)) {
    const genres = gameData.genres.reduce((acum, genreObj) => acum + ',' + genreObj.description, '').slice(1)
    data.push(
      ['{bold}Genres{/bold}', genres]
    )
  }

  if (gameData.recommendations) {
    data.push(
      ['{bold}Recommendations{/bold}', `${gameData?.recommendations?.total ?? '-'}`]
    )
  }

  if (gameData.requirements) {
    if (gameData?.requirements?.minimum) {
      data.push(
        ['{bold}{yellow-fg}Minimum Requirements{/yellow-fg}{/bold}', '-']
      )
      data = generateRequirementsEntries(gameData?.requirements?.minimum, data)
    }

    if (gameData?.requirements?.recommended) {
      data.push(
        ['{bold}{green-fg}Recommended Requirements{/green-fg}{/bold}', '-']
      )
      data = generateRequirementsEntries(gameData?.requirements?.recommended, data)
    }
  }

  table.setData(data)
  screen.render()
}

function generateWrappedEntries (title, data, width, gameName) {
  if (data && Array.isArray(data)) {
    const wrappedData = wrapCollection(data, width - gameName.length - DEFAULT_PADDING_DISPLAY)
    return wrappedData.map(line => [title, line])
  } else {
    return []
  }
}

// To debug this window without call the external endpoints
if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    displayGame()
    // run: node  lib/presenter/display.js
  }
}
