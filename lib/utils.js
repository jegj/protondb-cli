export function isValidUrl (url) {
  const furl = new URL(url)
  if (furl.protocol !== 'http:' && furl.protocol !== 'https:') {
    throw new Error('Invalid url protocol')
  }
}

export function isValidGameName (gameName) {
  if (!(typeof gameName === 'string' || gameName instanceof String) || !gameName) { throw new Error('Invalid game name') }
  return gameName
}
