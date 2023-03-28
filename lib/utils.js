export function isValidUrl (url) {
  const furl = new URL(url)
  if (furl.protocol !== 'http:' && furl.protocol !== 'https:') {
    throw new Error('Invalid url protocol')
  }
}
