/* eslint-disable new-cap */
import blessed from 'blessed'
import contrib from 'blessed-contrib'
// import terminalImage from 'terminal-image'

// const image = await terminalImage.file('header.jpg', { width: '25%', height: '25%' })

// const screen = blessed.screen()

// screen.key(['escape', 'q', 'C-c'], function (ch, key) {
//   return process.exit(0)
// })

// eslint-disable-next-line space-before-function-paren
export default function displayGame(gameData, blenderList, screen) {
  blenderList.hide()
  const grid = new contrib.grid({ rows: 1, cols: 2, screen })
  grid.set(0, 0, 1, 1, blessed.text, { label: 'Image', content: 'aaaaaaa' })
  screen.render()
  return grid
}
