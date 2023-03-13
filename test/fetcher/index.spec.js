const tap = require('tap')

const fetch = async (url) => {
  throw new Error('unknown url: ' + url)
}

tap.test('algolia.fetcher(unhappy path)', (t) => {
  t.plan(1)

  t.test('fetcher must throw an error if there is a problem requesting to algolia API', async tt => {
    tt.plan(1)
    const fetcher = tt.mock('../../lib/fetcher/index.js', {
      'node-fetch': fetch
    })
    try {
      await fetcher.angoliaRequest()
      tt.fail('error is expected')
    } catch (error) {
      tt.type(error, Error)
    }
  })
})
