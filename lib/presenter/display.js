import blessed from 'blessed'
import fs from 'fs'
import { formatGame } from './formatter.js'
// import wrap from 'word-wrap'

export default async function displayGame (gameData, blenderList, screen) {
  fs.writeFileSync('/tmp/game.json', JSON.stringify(gameData))
  const [name, tier, confidence] = formatGame(gameData)
  const table = blessed.table({
    tags: true,
    mouse: true,
    keys: true,
    interactive: true,
    data: [
      [`${name}`, '-'],
      ['{bold}Steam ObjectId{/bold}', `${gameData.objectID}`],
      ['{bold}Tier{/bold}', `${tier}`],
      ['{bold}Confidence{/bold}', `${confidence}`],
      ['{bold}Release Year{/bold}', `${gameData.releaseYear}`],
      ['{bold}OS List{/bold}', `${gameData.oslist.join(',')}`],
      ['{bold}Technologies{/bold}', `${gameData.technologies.join(',')}`],
      ['{bold}Steam Followers{/bold}', `${gameData.followers}`],
      ['{bold}Steam Score{/bold}', `${gameData.userScore}`],
      ['{bold}Tags{/bold}', `${gameData.tags.join(',')}`]
    ],
    border: 'line',
    width: 'shrink',
    height: 'shrink',
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

  blenderList.hide()
  screen.append(table)
  screen.render()
  return table
}
