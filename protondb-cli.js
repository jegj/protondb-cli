#!/usr/bin/env node

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import start from './lib/process/index.js'
import { isValidUrl } from './lib/utils.js'
import chalk from 'chalk'
import config from './lib/config/index.js'

const protondbCLI = yargs(hideBin(process.argv))
  .scriptName('protondb-cli')
  .env('PROTONDB_CLI')
  .version()
  .usage('$0 [game]', 'Search for games based on a key word and show their protondb compatability, score and any other information related', (yargs) => {
    yargs.positional('game', {
      describe: 'Game\'s name.',
      type: 'string',
      default: null,
      defaultDescription: 'null. protondb-cli Use STDIN by default',
      normalize: true
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
    }).option('algolia_query_url', {
      alias: 'aqu',
      type: 'string',
      description: 'Algolia main URL for the search.',
      default: config.DEFAULT_ALGOLIA_QUERY_URL,
      coerce: isValidUrl
    }).option('algolia_api_key', {
      alias: 'aak',
      type: 'string',
      description: 'Algolia API key.',
      default: config.DEFAULT_X_ALGOLIA_API_KEY
    }).option('algolia_application_id', {
      alias: 'aai',
      type: 'string',
      description: 'Algolia application id.',
      default: config.DEFAULT_X_ALGOLIA_APPLICATION_ID
    }).option('protondb_url', {
      alias: 'pu',
      type: 'string',
      description: 'Protondb URL for search game information.',
      default: config.DEFAULT_PROTONDB_URL,
      coerce: isValidUrl
    }).example([
      ['$0 gta --concurrency 5 --hits 15', 'Search the last 15 like gta using an conccurency of 5']
    ]).fail(function (msg, err, yargs) {
      // if (err) throw err // preserve stack
      // console.error(err.stack)
      const errorStyle = chalk.bold.red
      console.error(errorStyle(msg))
      console.error(yargs.help())
      process.exit(1)
    })
  }).argv

start(protondbCLI)
