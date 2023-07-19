import blessed from 'blessed'
import { formatGame } from './formatter.js'

export default async function displayGame (gameData, blenderList, screen) {
  // FIXME: Limit data because the display is broken when there are too manyl elements to show in the cell
//  const tags = gameData.tags.slice(0, 5)
  const tags = ['Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure']

  const technologies = gameData.technologies.slice(0, 5)
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

  blenderList.hide()
  screen.append(table)
  // screen.render()

  // Function to wrap text into an array of lines
  function wrapText (text, width, separator = ',') {
    const lines = []
    let line = ''
    const words = text.split(separator)

    for (const word of words) {
      if (line.length + word.length > width) {
        lines.push(line)
        line = ''
      }

      line += word + ' '
    }

    if (line.length > 0) {
      lines.push(line)
    }

    return lines
  }

  function generateWrappedEntries (title, data) {
    console.log('=====>', table.width)
    const wrappedData = wrapText(data, table.width - 2)

    return wrappedData.map(line => [title, line])
  }

  // Function to update the table with wrapped text
  function updateTable (text) {
    // const res = generateWrappedEntries('{bold}Tags{/bold}', gameData.tags.join(','))
    // console.log('===>', res)
    const data = [[`${name}`, '-'],
      ['{bold}Steam ObjectId{/bold}', `${gameData.objectID}`],
      ['{bold}Release Year{/bold}', `${gameData.releaseYear}`],
      ['{bold}Steam Info{/bold}', `https://steamdb.info/app/${gameData.objectID}`],
      ['{bold}Tier{/bold}', `${tier}`],
      ['{bold}Confidence{/bold}', `${confidence}`],
      ['{bold}OS List{/bold}', `${gameData.oslist.join(',')}`],
      // ['{bold}Technologies{/bold}', `${technologies.join(',')}`],
      ['{bold}Steam Followers{/bold}', `${gameData.followers}`],
      ['{bold}Steam Score{/bold}', `${gameData.userScore}`]
      // ['{bold}Tags{/bold}', `${tags.join('\n')}`]
    ].concat(
      // []
      generateWrappedEntries('{bold}Tags{/bold}', gameData.tags.join(','))
    )
    // const wrappedLines = wrapText(text, table.width - 2) // Subtract 2 for cell padding

    // Populate the table with wrapped lines
    // table.setData(wrappedLines.map(line => ['title', line]))
    table.setData(data)

    screen.render()
  }

  // Example usage
  const longText = 'This is a long text that needs to be wrapped within the table component aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaa a a a a abbbbbbbbbbbbbbbbbbb.'

  updateTable(longText)
  updateTable(longText)
  return table
}
