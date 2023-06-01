/* eslint-disable new-cap */
import blessed from 'blessed'
import contrib from 'blessed-contrib'
import fs from 'fs'
// import terminalImage from 'terminal-image'

export default async function displayGame (gameData, blenderList, screen) {
  // const image = await terminalImage.file('sample.jpg', { width: '25%', height: '25%' })

  // const table = contrib.table(
  //   {
  //     keys: fale,
  //     fg: 'white',
  //     selectedFg: 'white',
  //     selectedBg: 'blue',
  //     interactive: true,
  //     label: 'Active Processes',
  //     width: '30%',
  //     height: '30%',
  //     border: { type: 'line', fg: 'cyan' },
  //     columnSpacing: 10, // in chars
  //     columnWidth: [16, 12, 12] /* in chars */,
  //     data
  //   }
  // )

  // table.setData(
  //   {
  //     headers: ['col1', 'col2', 'col3'],
  //     data:
  //      [[1, 2, 3],
  //        [4, 5, 6]]
  //   })

  const data = {
    // headers: ['col1', 'col2'],
    data:
     [
       ['OS List', 'Windows, Linux'],
       ['OS List', 'Windows, Linux'],
       ['OS List', 'Windows, Linux'],
       ['OS List', 'Windows, Linux'],
       ['OS List', 'Windows, Linux']
     ]
  }

  const osDataSettings = {
    label: 'supported OS',
    data,
    width: '30%',
    height: '30%',
    interactive: false,
    keys: false,
    columnWidth: [16, 16],
    border: { type: 'line', fg: 'cyan' }
  }

  // console.log('===>', gameData)
  fs.writeFileSync('/tmp/game.json', JSON.stringify(gameData))
  blenderList.hide()
  const grid = new contrib.grid({ rows: 1, cols: 2, screen })
  grid.set(0, 0, 1, 2, blessed.text, { label: gameData.name, content: 'test' })
  // grid.set(0, 0, 1, 1, contrib.map, {label: 'World Map'})
  grid.set(0, 1, 1, 2, contrib.table, osDataSettings)
  // grid.set(0, 2, 1, 1, blessed.text, { label: gameData.name, content: 'test' })
  screen.render()
  return grid
}
