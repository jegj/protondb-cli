#!/usr/bin/env node

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import start from './lib/process/index.js'
import { isValidGameName } from './lib/utils.js'
import chalk from 'chalk'
import getConfig from './lib/config/index.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pkg = path.join(__dirname, 'package.json')
const info = JSON.parse(fs.readFileSync(pkg, 'utf8'))
const config = getConfig()

const protondbCLI = yargs(hideBin(process.argv))
  .scriptName('protondb-cli')
  .env('PROTONDB_CLI')
  .version(info.version)
  .usage('$0 [game]', 'Search for games based on a key word and show their protondb compatability, score and any other information related', (yargs) => {
    yargs.positional('game', {
      describe: 'Game\'s name.',
      type: 'string',
      default: null,
      defaultDescription: 'null. protondb-cli Use STDIN by default',
      normalize: true,
      coerce: isValidGameName
    }).option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging'
    }).option('hits', {
      alias: 'h',
      type: 'number',
      description: 'Limit the number of result on the search',
      default: config.DEFAULT_PROTONDB_CLI_HITS
    }).option('concurrency', {
      alias: 'c',
      type: 'number',
      description: 'Limit the concurrency for the search',
      default: config.DEFAULT_PROTONDB_CLI_CONCURRENCY
    }).option('disable_cache', {
      alias: 'dc',
      type: 'boolean',
      description: 'Force protondb-cli to not use the cache',
      default: false
    })
      .example([
        ['$0 gta --concurrency 5 --hits 15', 'Search the last 15 like gta using a conccurency of 5']
      ]).fail(function (msg, _err, yargs) {
      // if (err) throw err // preserve stack
      // console.error(err.stack)
        const errorStyle = chalk.bold.red
        console.error(errorStyle(msg))
        console.error(yargs.help())
        process.exit(1)
      })
  }).argv

start(protondbCLI)
