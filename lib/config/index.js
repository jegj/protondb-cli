import fs from 'fs'
const config = JSON.parse(fs.readFileSync('./default.json'))
export default config
