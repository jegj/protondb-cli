import blessed from 'blessed'
import { format } from './formatter.js'
import displayGame from './display.js'

let displayGameView = null

const DISPLAY_BLESSED_NODE_INDEX = 1

export function presentData (data) {
  const formatedData = format(data)
  const screen = blessed.screen()
  const list = blessed.listtable({
    tags: true,
    mouse: true,
    keys: true,
    interactive: true,
    data: formatedData,
    border: 'line',
    width: '100%',
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
  list.on('select', (item, index) => {
    displayGameView = displayGame(data, list, screen)
  })

  list.focus()

  screen.append(list)

  screen.key(['escape', 'q', 'C-c'], function () {
    if (displayGameView) {
      screen.children[DISPLAY_BLESSED_NODE_INDEX].detach()
      list.focus()
      list.show()
      screen.render()
      displayGameView = null
    } else {
      return process.exit(0)
    }
  })
  screen.render()
}
