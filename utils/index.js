import fetch from 'node-fetch'

const getGames = async () => {
  const response = await fetch('https://94he6yatei-dsn.algolia.net/1/indexes/steamdb/query', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded',
      'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'sec-gpc': '1',
      'x-algolia-api-key': '9ba0e69fb2974316cdaec8f5f257088f',
      'x-algolia-application-id': '94HE6YATEI',
      Referer: 'https://www.protondb.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    body: '{"query":"fifa","attributesToHighlight":[],"attributesToSnippet":[],"facets":["tags"],"facetFilters":[["appType:Game"]],"hitsPerPage":50,"attributesToRetrieve":["lastUpdated","name","objectID","followers","oslist","releaseYear","tags","technologies","userScore"],"page":0}',
    method: 'POST'
  })
  const body = await response.json()
  console.log('#hits===>', body.hits.length)
  // console.log('===>', body.hits)
}

getGames()
