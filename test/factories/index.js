// {
//   lastUpdated: 1666823474,
//   name: 'Game bronze',
//   oslist: ['Windows', 'macOS', 'Linux', 'Steam Deck Playable'],
//   userScore: 96.34,
//   followers: 197000,
//   technologies: [
//     'Engine.GoldSource',
//     'SDK.CEF',
//     'SDK.Miles_Sound_System',
//     'SDK.SDL'
//   ],
//   releaseYear: 2000,
//   tags: [
//     'Strategy', 'Action',
//     'Survival', 'FPS',
//     'Classic', 'Tactical',
//     'Shooter', 'PvP',
//     'First-Person', 'Multiplayer',
//     'Competitive', 'Old School',
//     'Military', 'Assassin',
//     'eSports', 'Score Attack',
//     'Team-Based', "1990's",
//     '1980s', 'Nostalgia'
//   ],
//   objectID: '10',
//   bestReportedTier: 'platinum', [required?]
//   confidence: 'good',
//   score: 0.45,
//   tier: 'bronze',
//   total: 27, [required?]
//   trendingTier: 'gold' [required?]
// },

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

const dtag = [
  'Strategy', 'Action',
  'Survival', 'FPS',
  'Classic', 'Tactical',
  'Shooter', 'PvP',
  'First-Person', 'Multiplayer',
  'Competitive', 'Old School',
  'Military', 'Assassin',
  'eSports', 'Score Attack',
  'Team-Based', "1990's",
  '1980s', 'Nostalgia'
]

export function createMergedGame (opts) {
  if (!opts.confidence) throw new Error('mock game object needs confidence')
  if (!opts.tier) throw new Error('mock game object needs tier')
  return {
    lastUpdated: opts.lastUpdated ?? +new Date(),
    name: opts.name ?? `game ${+new Date()}`,
    oslist: opts.oslist ?? ['Windows', 'macOS', 'Linux', 'Steam Deck Playable'],
    userScore: opts.userScore ?? random(5.5, 98.5),
    followers: opts.followers ?? random(20, 9000),
    technologies: opts.technologies ?? [
      'Engine.GoldSource',
      'SDK.CEF',
      'SDK.Miles_Sound_System',
      'SDK.SDL'
    ],
    releaseYear: opts.releaseYear ?? random(1999, 2023),
    tags: opts.tags ?? dtag,
    objectID: `${random(1000, 5000)}`,
    confidence: opts.confidence,
    tier: opts.tier,
    score: opts.score ?? random(0.1, 10)
  }
}
