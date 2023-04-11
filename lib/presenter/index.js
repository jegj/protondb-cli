import blessed from 'blessed'
import { format } from './formatter.js'

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
    // console.log('data', index)
  })

  list.focus()

  screen.append(list)

  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0)
  })

  screen.render()
}
