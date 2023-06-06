import blessed from 'blessed'
import { formatGame } from './formatter.js'

export default async function displayGame (gameData, blenderList, screen) {
  // FIXME: Limit data because the display is broken when there are too manyl elements to show in the cell
  const tags = gameData.tags.slice(0, 5)
  const technologies = gameData.technologies.slice(0, 5)
  const [name, tier, confidence] = formatGame(gameData)
  const table = blessed.table({
    tags: true,
    mouse: true,
    keys: true,
    interactive: true,
    data: [
      [`${name}`, '-'],
      ['{bold}Steam ObjectId{/bold}', `${gameData.objectID}`],
      ['{bold}Release Year{/bold}', `${gameData.releaseYear}`],
      ['{bold}Steam Info{/bold}', `https://steamdb.info/app/${gameData.objectID}`],
      ['{bold}Tier{/bold}', `${tier}`],
      ['{bold}Confidence{/bold}', `${confidence}`],
      ['{bold}OS List{/bold}', `${gameData.oslist.join(',')}`],
      ['{bold}Technologies{/bold}', `${technologies.join(',')}`],
      ['{bold}Steam Followers{/bold}', `${gameData.followers}`],
      ['{bold}Steam Score{/bold}', `${gameData.userScore}`],
      ['{bold}Tags{/bold}', `${tags.join(',')}`]
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
