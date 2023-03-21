#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const blessed = require('blessed')

function input (protondbCLI) {
  console.log('==>', protondbCLI.game)
  const screen = blessed.screen()
  const list = blessed.list({
    mouse: true,
    keys: true,
    interactive: true,
    items: [
      'test1',
      'test2',
      'test3'
    ],
    border: 'line',
    width: '50%',
    height: '50%',
    style: {
      // bg: 'green',
      item: {
        hover: {
          bg: 'blue'
        }
      },
      selected: {
        bg: 'blue'
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

const protondbCLI = yargs(hideBin(process.argv))
  .scriptName('protondb-cli')
  .env('PROTONDB_CLI')
  .version()
  .usage('$0 [game]', 'Search for games based on a key word and show their protondb compatability and score', (yargs) => {
    yargs.positional('game', {
      describe: 'Game\'s name.',
      type: 'string',
      default: null,
      defaultDescription: 'null. protondb-cli Use STDIN by default',
      normalize: true
      // coerce: (b) => validBackupFile(b, 'game_name')
    }).option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging'
    }).option('hits', {
      alias: 'h',
      type: 'number',
      description: 'Limit the number of result on the search'
    }).example([
      ['$0 gta ', 'Search for games like gta']
    ])
  }).argv

input(protondbCLI)
