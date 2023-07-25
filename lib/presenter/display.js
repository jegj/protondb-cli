import blessed from 'blessed'
import { formatGame, wrapCollection } from './formatter.js'
import * as url from 'node:url'

const demoGameData = {
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

export default async function displayGame (gameData = demoGameData, blenderList = null, screen = blessed.screen()) {
  const [name, tier, confidence] = formatGame(gameData)
  const table = blessed.table({
    tags: true,
    mouse: true,
    keys: true,
    interactive: true,
    data: [[]],
    border: 'line',
    width: '100%',
    height: '100%',
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
  const data = [[`${name}`, '-'],
    ['{bold}Steam ObjectId{/bold}', `${gameData.objectID}`],
    ['{bold}Release Year{/bold}', `${gameData.releaseYear}`],
    ['{bold}Steam Info{/bold}', `https://steamdb.info/app/${gameData.objectID}`],
    ['{bold}Tier{/bold}', `${tier}`],
    ['{bold}Confidence{/bold}', `${confidence}`],
    ['{bold}OS List{/bold}', `${gameData.oslist.join(',')}`],
    ['{bold}Steam Followers{/bold}', `${gameData.followers}`],
    ['{bold}Steam Score{/bold}', `${gameData.userScore}`]
  ].concat(
    generateWrappedEntries('{bold}Tags{/bold}', gameData.tags, table.width, name)
  ).concat(
    generateWrappedEntries('{bold}Technologies{/bold}', gameData.technologies, table.width, name)
  )
  table.setData(data)
  screen.render()
}

function generateWrappedEntries (title, data, width, gameName) {
  // ganeName.length define the size of the first column in the display view
  // FIXME: Some times the game name lemngth is lower than other column name e.g Steam followers
  const wrappedData = wrapCollection(data, width - gameName.length - 15)
  return wrappedData.map(line => [title, line])
}

// To debug thi windows without call the external endpoints
if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    displayGame()
  }
}
