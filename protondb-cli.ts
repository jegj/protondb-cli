#!/usr/bin/env node

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import type { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import getConfig from './lib/config/index.js'
import type { ProtondbCLIOptions } from './lib/process/index.js'
import start from './lib/process/index.js'
import { isValidGameName } from './lib/utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pkg = path.join(__dirname, 'package.json')
const info = JSON.parse(fs.readFileSync(pkg, 'utf8')) as { version: string }
const config = getConfig()

const DEFAULT_PROTONDB_CLI_CONCURRENCY = os.cpus().length

const argv = hideBin(process.argv)

const protondbCLI = yargs(argv)
  .scriptName('protondb-cli')
  .version(info.version)
  .usage(
    '$0 [game]',
    'Search for games based on a key word and show their protondb compatability, score and any other information related',
    (yargsInstance: Argv) => {
      return yargsInstance
        .positional('game', {
          describe: "Game's name.",
          type: 'string',
          default: null,
          normalize: true,
          coerce: isValidGameName
        })
        .option('verbose', {
          alias: 'v',
          type: 'boolean',
          description: 'Run with verbose logging'
        })
        .option('hits', {
          alias: 'h',
          type: 'number',
          description: 'Limit the number of result on the search',
          default: config.DEFAULT_PROTONDB_CLI_HITS
        })
        .option('concurrency', {
          alias: 'c',
          type: 'number',
          description: 'Limit the concurrency for the search',
          default: DEFAULT_PROTONDB_CLI_CONCURRENCY
        })
        .option('disable_cache', {
          alias: 'dc',
          type: 'boolean',
          description: 'Force protondb-cli not to use the cache',
          default: false
        })
        .option('clear_cache', {
          alias: 'cc',
          type: 'boolean',
          description: 'Clean up the local cache',
          default: false
        })
        .option('detail', {
          alias: 'd',
          type: 'boolean',
          description: 'Show the full sectioned card instead of the summary',
          default: false
        })
        .option('json', {
          type: 'boolean',
          description: 'Emit JSON output (no color, no picker)',
          default: false
        })
        .option('old-view', {
          type: 'boolean',
          description: 'Use the legacy blessed-based full-screen TUI (v1.15.0 style)',
          default: false
        })
        .example([
          [
            '$0 gta --concurrency 5 --hits 15',
            'Search the last 15 like gta using a conccurency of 5'
          ],
          [
            '$0 "Half-Life" --detail',
            'Show the full sectioned card after picking'
          ],
          ['$0 fifa --json | jq .[0].name', 'Emit JSON for scripting']
        ])
        .fail((msg: string, err: Error, yargsHelper: Argv) => {
          if (
            err instanceof Error &&
            (argv.includes('-v') || argv.includes('--verbose'))
          ) {
            console.error(err)
          }
          const errorStyle = chalk.bold.red
          console.error(errorStyle(msg))
          console.log(yargsHelper.help())
          process.exit(1)
        })
    }
  ).argv

start((await protondbCLI) as unknown as ProtondbCLIOptions)
