export const buildUrl = function _buildUrl (url, objectId) {
  if (!url) {
    throw new Error('url is required')
  }

  if (!objectId) {
    throw new Error('objectId is required')
  }

  if (url[url.length - 1] !== '/') {
    url += '/'
  }

  const urlObj = new URL(url)
  urlObj.searchParams.set('appids', objectId)
  return urlObj.href
}
