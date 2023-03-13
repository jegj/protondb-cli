const fetch = require('node-fetch')

async function angoliaRequest () {
  return await fetch('test')
}

module.exports = {
  angoliaRequest
}
