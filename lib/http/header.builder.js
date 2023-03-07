const HEADER_REQUEST_TEMPLATE = {
  accept: '*/*'
}

const buildHeaderRequest = function _buildHeaderRequest (header) {
  return { ...HEADER_REQUEST_TEMPLATE, ...header }
}

module.exports = {
  buildHeaderRequest
}
