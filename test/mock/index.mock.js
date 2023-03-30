export const fetchAlgoliaMockedData = {
  hits: [
    {
      lastUpdated: 1653580973,
      name: 'FIFA 22',
      oslist: [Array],
      userScore: 79.24,
      followers: 97900,
      technologies: [Array],
      releaseYear: 2021,
      tags: [Array],
      objectID: '1506830'
    },
    {
      lastUpdated: 1623346705,
      name: 'EA SPORTS™ FIFA 21',
      oslist: [Array],
      userScore: 75.22,
      followers: 59900,
      technologies: [Array],
      releaseYear: 2020,
      tags: [Array],
      objectID: '1313860'
    }
  ],
  exhaustiveFacetsCount: true,
  exhaustiveNbHits: true,
  exhaustiveTypo: true,
  exhaustive: { facetsCount: true, nbHits: true, typo: true },
  query: 'fifa',
  params: 'query=fifa&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&facets=%5B%22tags%22%5D&facetFilters=%5B%5B%22appType%3AGame%22%5D%5D&hitsPerPage=50&attributesToRetrieve=%5B%22lastUpdated%22%2C%22name%22%2C%22objectID%22%2C%22followers%22%2C%22oslist%22%2C%22releaseYear%22%2C%22tags%22%2C%22technologies%22%2C%22userScore%22%5D&page=0',
  processingTimeMS: 4,
  processingTimingsMS: {
    afterFetch: { total: 1 },
    fetch: { total: 3 },
    request: { roundTrip: 182 },
    total: 4
  },
  serverTimeMS: 5
}

export const fetchProtondbMockedData = {
  bestReportedTier: 'platinum',
  confidence: 'good',
  score: 0.57,
  tier: 'gold',
  total: 29,
  trendingTier: 'platinum'
}

export const mergedGameDataUncomplete = {
  lastUpdated: 1653580973,
  name: 'FIFA 22',
  oslist: ['Windows', 'Steam Deck Playable'],
  userScore: 79.24,
  followers: 97900,
  technologies: [],
  releaseYear: 2021,
  tags: [],
  objectID: '1506830',
  protondbNotFound: true
}

export const mergedGameDataComplete = {
  lastUpdated: 1668605739,
  name: 'Graze Counter GM',
  oslist: ['Windows', 'Steam Deck Playable'],
  userScore: 86,
  followers: 1100,
  technologies: ['Engine.GameMaker'],
  releaseYear: 2023,
  tags: [
    'Action', 'Indie',
    'Casual', 'Story Rich',
    'Arcade', 'Shooter',
    'Lore-Rich', '2D',
    'Sci-fi', 'Pixel Graphics',
    'Difficult', 'Anime',
    'Singleplayer', "Shoot 'Em Up",
    'Dark Fantasy', 'Cute',
    'Mechs', 'Bullet Hell',
    "1990's", 'Female Protagonist'
  ],
  objectID: '1486440',
  bestReportedTier: 'platinum',
  confidence: 'low',
  score: 0.51,
  tier: 'platinum',
  total: 4,
  trendingTier: 'platinum'
}

export const mergedGames = [
  {
    lastUpdated: 1666823474,
    name: 'Counter-Strike',
    oslist: ['Windows', 'macOS', 'Linux', 'Steam Deck Playable'],
    userScore: 96.34,
    followers: 197000,
    technologies: [
      'Engine.GoldSource',
      'SDK.CEF',
      'SDK.Miles_Sound_System',
      'SDK.SDL'
    ],
    releaseYear: 2000,
    tags: [
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
    ],
    objectID: '10',
    bestReportedTier: 'platinum',
    confidence: 'good',
    score: 0.45,
    tier: 'gold',
    total: 27,
    trendingTier: 'gold'
  },
  {
    lastUpdated: 1666823711,
    name: 'Counter-Strike: Source',
    oslist: ['Windows', 'macOS', 'Linux', 'Steam Deck Playable'],
    userScore: 94.99,
    followers: 438600,
    technologies: [
      'Engine.Source',
      'SDK.Bink_Video',
      'SDK.Miles_Sound_System',
      'SDK.OpenVR',
      'SDK.SDL'
    ],
    releaseYear: 2004,
    tags: [
      'Strategy', 'Action',
      'Simulation', 'Survival',
      'FPS', 'Moddable',
      'War', 'Tactical',
      'Shooter', 'PvP',
      'Sandbox', 'First-Person',
      'Multiplayer', 'Competitive',
      'Difficult', 'Atmospheric',
      'Military', 'Singleplayer',
      'eSports', 'Team-Based'
    ],
    objectID: '240',
    bestReportedTier: 'platinum',
    confidence: 'good',
    score: 0.57,
    tier: 'gold',
    total: 29,
    trendingTier: 'platinum'
  },
  {
    lastUpdated: 1567584599,
    name: 'Counter-Strike: Condition Zero',
    oslist: ['Windows', 'macOS', 'Linux', 'Steam Deck Playable'],
    userScore: 89.27,
    followers: 45500,
    technologies: [
      'Engine.GoldSource',
      'SDK.CEF',
      'SDK.Miles_Sound_System',
      'SDK.SDL'
    ],
    releaseYear: 2004,
    tags: [
      'Strategy', 'Action',
      'Adventure', 'Simulation',
      'Survival', 'FPS',
      'Classic', 'Open World',
      'Tactical', 'Shooter',
      'First-Person', 'Online Co-Op',
      'Multiplayer', 'Competitive',
      'Old School', 'Atmospheric',
      'Military', 'Singleplayer',
      'Dark', 'Team-Based'
    ],
    objectID: '80',
    bestReportedTier: 'platinum',
    confidence: 'moderate',
    score: 0.53,
    tier: 'platinum',
    total: 11,
    trendingTier: 'platinum'
  },
  {
    lastUpdated: 1612588023,
    name: 'Counter-Strike: Global Offensive',
    oslist: ['Windows', 'macOS', 'Linux', 'Steam Deck Playable'],
    userScore: 88.23,
    followers: 3489400,
    technologies: [
      'Engine.Source',
      'Engine.Source2',
      'SDK.AMD_GPU_Services',
      'SDK.Miles_Sound_System',
      'SDK.NVIDIA_Nsight_Aftermath',
      'SDK.Qt',
      'SDK.SDL',
      'SDK.Steam_Audio',
      'SDK.Steam_Networking'
    ],
    releaseYear: 2012,
    tags: [
      'Strategy', 'Action',
      'FPS', 'Moddable',
      'War', 'Co-op',
      'Tactical', 'Fast-Paced',
      'Shooter', 'PvP',
      'First-Person', 'Online Co-Op',
      'Multiplayer', 'Competitive',
      'Difficult', 'Military',
      'Realistic', 'Trading',
      'eSports', 'Team-Based'
    ],
    objectID: '730',
    bestReportedTier: 'platinum',
    confidence: 'strong',
    score: 0.6,
    tier: 'gold',
    total: 568,
    trendingTier: 'gold'
  },
  {
    lastUpdated: 1640831140,
    name: 'Over the Counter',
    oslist: ['Windows', 'macOS', 'Linux'],
    userScore: 84.98,
    followers: 300,
    technologies: ['Engine.Godot'],
    releaseYear: 2022,
    tags: [
      'Strategy',
      'Simulation',
      '2D',
      'Pixel Graphics',
      'Singleplayer',
      'Capitalism',
      'Isometric',
      'Resource Management',
      'Profile Features Limited',
      'Medical Sim'
    ],
    objectID: '1626460',
    protondbNotFound: true
  },
  {
    lastUpdated: 1666984670,
    name: 'CounterAttack',
    oslist: ['Windows', 'macOS', 'Linux'],
    userScore: 83.13,
    followers: 2400,
    technologies: ['Engine.Unity', 'SDK.Photon'],
    releaseYear: 2019,
    tags: [
      'Action', 'Adventure',
      'Indie', 'Co-op',
      'Space', 'Arcade',
      'Shooter', 'Side Scroller',
      'Local Co-Op', 'Online Co-Op',
      'Multiplayer', 'Sci-fi',
      'Retro', 'Difficult',
      'Singleplayer', "Shoot 'Em Up",
      'Co-op Campaign', '4 Player Local',
      'Bullet Hell', 'Local Multiplayer'
    ],
    objectID: '451600',
    protondbNotFound: true
  }
]
