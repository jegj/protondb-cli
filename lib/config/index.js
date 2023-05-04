import fs from 'fs'
let config = null
export default function getConfig (path = './default.json') {
  if (!config) {
    config = JSON.parse(fs.readFileSync(path))
  }
  return config
}
