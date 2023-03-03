const BODY_TEMPLATE = {
  body: {},
  method: 'POST'
}

const buildBody = function _buildBody (query) {
  const body = { query }
  return { ...BODY_TEMPLATE, ...body }
}

module.exports = {
  buildBody
}
