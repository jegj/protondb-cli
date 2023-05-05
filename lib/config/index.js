import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

let config = null
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const defaultConfigPath = path.join(__dirname, '../../default.json')

export default function getConfig (path = defaultConfigPath) {
  if (!config) {
    config = JSON.parse(fs.readFileSync(path))
  }
  return config
}
