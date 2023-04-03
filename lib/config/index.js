// import Configstore from 'configstore'
import fs from 'fs'

// const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const config = JSON.parse(fs.readFileSync('./default.json'))
// const config = new Configstore(packageJson.name, opts)
export default config
