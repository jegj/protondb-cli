import blessed from 'blessed'
import { format } from './formatter.js'

export function presentData (data) {
  const formatedData = format(data)
  const screen = blessed.screen()
  const list = blessed.listtable({
    mouse: true,
    keys: true,
    interactive: true,
    data: formatedData,
    border: 'line',
    width: '100%',
    height: '50%',
    style: {
      fg: 'white',
      bg: 'blue',
      border: {
        fg: 'white',
        bg: 'blue'
      },
      header: {
        fg: 'white',
        bg: 'blue',
        bold: 'true'
      },
      cell: {
        selected: {
          fg: 'blue',
          bg: 'white'
        }
      }
    }
  })
  list.on('select', (item, index) => {
    console.log('data', index)
  })

  list.focus()

  screen.append(list)

  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0)
  })

  screen.render()
}
