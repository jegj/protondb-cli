const REQUIRED_PROTONDB_PROPS = [
  'tier',
  'score',
  'total',
  'confidence',
  'trendingTier',
  'bestReportedTier'
]
/*
 {
  bestReportedTier: 'platinum',
  confidence: 'strong',
  score: 0.66,
  tier: 'gold',
  total: 73,
  trendingTier: 'gold'
}
*/
export function checkProtondbResponse (protondbResponse, requiredProps = REQUIRED_PROTONDB_PROPS) {
  requiredProps.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(protondbResponse, key)) {
      throw new Error(`protondb response doesnt have the property "${key}"`)
    }
  })
}
