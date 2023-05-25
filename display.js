/* eslint-disable new-cap */
import blessed from 'blessed'
import contrib from 'blessed-contrib'
import terminalImage from 'terminal-image'

const image = await terminalImage.file('header.jpg', { width: '25%', height: '25%' })

const screen = blessed.screen()
const grid = new contrib.grid({ rows: 1, cols: 2, screen })

grid.set(0, 0, 1, 1, blessed.text, { label: 'Image', content: image })

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

screen.render()
