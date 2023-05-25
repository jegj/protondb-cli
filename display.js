/* eslint-disable new-cap */
import blessed from 'blessed'
import contrib from 'blessed-contrib'

const screen = blessed.screen()
const grid = new contrib.grid({ rows: 5, cols: 1, screen })

const line = grid.set(0, 0, 1, 1, contrib.line,
  {
    style:
       {
         line: 'yellow',
         text: 'green',
         baseline: 'black'
       },
    xLabelPadding: 3,
    xPadding: 5,
    label: 'Stocks'
  })

// eslint-disable-next-line no-unused-vars
const map = grid.set(1, 0, 1, 1, contrib.map, { label: 'Servers Location' })

const lineData = {
  x: ['t1', 't2', 't3', 't4'],
  y: [5, 1, 7, 5]
}

line.setData([lineData])

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

screen.render()
