/* eslint-disable new-cap */
import blessed from 'blessed'
import contrib from 'blessed-contrib'
import fs from 'fs'
import terminalImage from 'terminal-image'

export default async function displayGame (gameData, blenderList, screen) {
  const image = await terminalImage.file('sample.jpg', { width: '25%', height: '25%' })
  // console.log('===>', gameData)
  fs.writeFileSync('/tmp/game.json', JSON.stringify(gameData))
  blenderList.hide()
  const grid = new contrib.grid({ rows: 2, cols: 4, screen })
  grid.set(0, 0, 1, 1, blessed.text, { label: gameData.name, content: image })
  // grid.set(0, 0, 1, 1, contrib.map, {label: 'World Map'})
  grid.set(0, 1, 1, 1, blessed.text, { label: gameData.name, content: 'test' })
  screen.render()
  return grid
}
