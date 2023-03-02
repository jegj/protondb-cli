#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const protondbCLI = yargs(hideBin(process.argv))
  .scriptName('protondb-cli')
  .env('PROTONDBCLI')
  .version()
  .usage('$0 [game_name]', 'Search for game based on a key word and show protondb compatability', (yargs) => {
    yargs.positional('game_name', {
      describe: 'Game\'s name.',
      type: 'string',
      default: null,
      defaultDescription: 'null. protondb-cli Use STDIN by default',
      normalize: true,
      // coerce: (b) => validBackupFile(b, 'game_name')
    }).example([
      ['$0 gta ', 'Search for games like gta']
    ])
  }).argv

// input(protondbCLI)
