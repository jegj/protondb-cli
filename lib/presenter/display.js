import blessed from 'blessed'
import { formatGame } from './formatter.js'
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
    data: [[]], /* [      [`${name}`, '-'],
      ['{bold}Steam ObjectId{/bold}', `${gameData.objectID}`],
      ['{bold}Release Year{/bold}', `${gameData.releaseYear}`],
      ['{bold}Steam Info{/bold}', `https://steamdb.info/app/${gameData.objectID}`],
      ['{bold}Tier{/bold}', `${tier}`],
      ['{bold}Confidence{/bold}', `${confidence}`],
      ['{bold}OS List{/bold}', `${gameData.oslist.join(',')}`],
      ['{bold}Technologies{/bold}', `${technologies.join(',')}`],
      ['{bold}Steam Followers{/bold}', `${gameData.followers}`],
      ['{bold}Steam Score{/bold}', `${gameData.userScore}`],
      ['{bold}Tags{/bold}', `${tags.join('\n')}`]
    ] */
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

  // Function to wrap text into an array of lines
  function wrapText (text, width, separator = ',') {
    const lines = []
    let line = ''
    const words = text.split(separator)

    for (const word of words) {
      // console.warn('====>', word, word.length, line.length, width)
      if (line.length + word.length > width) {
        lines.push(line)
        line = ''
      }

      line += word + ','
    }

    if (line.length > 0) {
      lines.push(line)
    }

    return lines
  }

  function generateWrappedEntries (title, data) {
    // 22 = default padding, 5 = tags label length , 10 paddding from tags label cell
    const wrappedData = wrapText(data, table.width - 22 - 5 - 10)
    return wrappedData.map(line => [title, line])
  }

  function updateTable () {
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
      generateWrappedEntries('{bold}Tags{/bold}', gameData.tags.join(','))
    ).concat(
      generateWrappedEntries('{bold}Technologies{/bold}', gameData.technologies.join(','))
    )
    table.setData(data)
    screen.render()
  }
  updateTable()
  return table
}

// To debug thi windows without call the external services
if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    displayGame()
  }
}
