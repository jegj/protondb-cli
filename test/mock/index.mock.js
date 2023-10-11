/* eslint-disable no-useless-escape */
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
    },
    {
      lastUpdated: 1623346705,
      name: 'The Elder Scrolls V: Skyrim',
      oslist: [Array],
      userScore: 75.22,
      followers: 59900,
      technologies: [Array],
      releaseYear: 2020,
      tags: [Array],
      objectID: '72850'
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

export const protondbProxyMock =

{
  72850: {
    success: true,
    data: {
      type: 'game',
      name: 'The Elder Scrolls V: Skyrim',
      steam_appid: 72850,
      required_age: 0,
      is_free: false,
      dlc: [
        1240360
      ],
      detailed_description: "<h1>The Game of a Generation<\/h1><p>Voted 'The Best Game of the Generation' by amazon.co.uk users, and<\/p><br><h1>About the Game<\/h1><strong>EPIC FANTASY REBORN<\/strong><br>\t\t\t\t\t\t\tThe next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.<br><br>\t\t\t\t\t\t\t<strong>LIVE ANOTHER LIFE, IN ANOTHER WORLD<\/strong><br>\t\t\t\t\t\t\tPlay any type of character you can imagine, and do whatever you want; the legendary freedom of choice, storytelling, and adventure of The Elder Scrolls is realized like never before.<br><br>\t\t\t\t\t\t\t<strong>ALL NEW GRAPHICS AND GAMEPLAY ENGINE<\/strong><br>\t\t\t\t\t\t\tSkyrim’s new game engine brings to life a complete virtual world with rolling clouds, rugged mountains, bustling cities, lush fields, and ancient dungeons.<br><br>\t\t\t\t\t\t\t<strong>YOU ARE WHAT YOU PLAY<\/strong><br>\t\t\t\t\t\t\tChoose from hundreds of weapons, spells, and abilities.  The new character system allows you to play any way you want and define yourself through your actions.<br><br>\t\t\t\t\t\t\t<strong>DRAGON RETURN<\/strong><br>\t\t\t\t\t\t\tBattle ancient dragons like you’ve never seen. As Dragonborn, learn their secrets and harness their power for yourself.",
      about_the_game: '<strong>EPIC FANTASY REBORN<\/strong><br>\t\t\t\t\t\t\tThe next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.<br><br>\t\t\t\t\t\t\t<strong>LIVE ANOTHER LIFE, IN ANOTHER WORLD<\/strong><br>\t\t\t\t\t\t\tPlay any type of character you can imagine, and do whatever you want; the legendary freedom of choice, storytelling, and adventure of The Elder Scrolls is realized like never before.<br><br>\t\t\t\t\t\t\t<strong>ALL NEW GRAPHICS AND GAMEPLAY ENGINE<\/strong><br>\t\t\t\t\t\t\tSkyrim’s new game engine brings to life a complete virtual world with rolling clouds, rugged mountains, bustling cities, lush fields, and ancient dungeons.<br><br>\t\t\t\t\t\t\t<strong>YOU ARE WHAT YOU PLAY<\/strong><br>\t\t\t\t\t\t\tChoose from hundreds of weapons, spells, and abilities.  The new character system allows you to play any way you want and define yourself through your actions.<br><br>\t\t\t\t\t\t\t<strong>DRAGON RETURN<\/strong><br>\t\t\t\t\t\t\tBattle ancient dragons like you’ve never seen. As Dragonborn, learn their secrets and harness their power for yourself.',
      short_description: 'EPIC FANTASY REBORN The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.',
      supported_languages: 'English, French, German, Italian, Spanish - Spain, Japanese, Czech, Polish, Russian',
      reviews: '“A Masterpiece”<br>10\/10 – <a href="https:\/\/steamcommunity.com\/linkfilter\/?url=http:\/\/www.eurogamer.net\/articles\/2011-11-10-the-elder-scrolls-5-skyrim-review" target="_blank" rel=" noopener"  >Eurogamer<\/a><br>',
      header_image: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/header.jpg?t=1647357402',
      capsule_image: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/capsule_231x87.jpg?t=1647357402',
      capsule_imagev5: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/capsule_184x69.jpg?t=1647357402',
      website: 'http:\/\/elderscrolls.com\/',
      pc_requirements: {
        minimum: '<strong>Minimum:<\/strong><br>\t\t\t\t\t\t\t\t<ul class="bb_ul"><li><strong>OS:<\/strong> Windows 7\/Vista\/XP PC (32 or 64 bit)<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Processor:<\/strong> Dual Core 2.0GHz or equivalent processor<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Memory:<\/strong> 2GB System RAM<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Hard Disk Space:<\/strong> 6GB free HDD Space<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Video Card:<\/strong> Direct X 9.0c compliant video card with 512 MB of RAM<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Sound:<\/strong> DirectX compatible sound card<br>\t\t\t\t\t\t\t\t<\/li><\/ul>',
        recommended: '<strong>Recommended:<\/strong><br>\t\t\t\t\t\t\t\t<ul class="bb_ul"><li><strong>Processor:<\/strong> Quad-core Intel or AMD CPU<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Memory:<\/strong> 4GB System RAM<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Video Card:<\/strong> DirectX 9.0c compatible NVIDIA or AMD ATI video card with 1GB of RAM (Nvidia GeForce GTX 260 or higher; ATI Radeon 4890 or higher)<br>\t\t\t\t\t\t\t\t<\/li><\/ul>'
      },
      mac_requirements: [

      ],
      linux_requirements: [

      ],
      legal_notice: '© 2011 Bethesda Softworks LLC, a ZeniMax Media company. The Elder Scrolls, Skyrim, Bethesda, Bethesda Game Studios, Bethesda Softworks,<br \/>\r\nZeniMax and related logos are registered trademarks or trademarks of ZeniMax Media Inc. in the U.S. and\/or other countries. All other trademarks and<br \/>\r\ntrade names are the properties of their respective owners. All Rights Reserved.',
      developers: [
        'Bethesda Game Studios'
      ],
      publishers: [
        'Bethesda Softworks'
      ],
      price_overview: {
        currency: 'BRL',
        initial: 3999,
        final: 3999,
        discount_percent: 0,
        initial_formatted: '',
        final_formatted: 'R$ 39,99'
      },
      packages: [
        12248
      ],
      package_groups: [
        {
          name: 'default',
          title: 'Buy The Elder Scrolls V: Skyrim',
          description: '',
          selection_text: 'Select a purchase option',
          save_text: '',
          display_type: 0,
          is_recurring_subscription: 'false',
          subs: [
            {
              packageid: 12248,
              percent_savings_text: ' ',
              percent_savings: 0,
              option_text: 'The Elder Scrolls V: Skyrim - R$ 39,99',
              option_description: '',
              can_get_free_license: '0',
              is_free_license: false,
              price_in_cents_with_discount: 3999
            }
          ]
        }
      ],
      platforms: {
        windows: true,
        mac: false,
        linux: false
      },
      metacritic: {
        score: 94,
        url: 'https:\/\/www.metacritic.com\/game\/pc\/the-elder-scrolls-v-skyrim?ftag=MCD-06-10aaa1f'
      },
      categories: [
        {
          id: 2,
          description: 'Single-player'
        },
        {
          id: 22,
          description: 'Steam Achievements'
        },
        {
          id: 29,
          description: 'Steam Trading Cards'
        },
        {
          id: 30,
          description: 'Steam Workshop'
        },
        {
          id: 18,
          description: 'Partial Controller Support'
        },
        {
          id: 23,
          description: 'Steam Cloud'
        }
      ],
      genres: [
        {
          id: '3',
          description: 'RPG'
        }
      ],
      screenshots: [
        {
          id: 0,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_4e95fbcf72ce2a9f86075738fa9930ef2bed1ac7.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_4e95fbcf72ce2a9f86075738fa9930ef2bed1ac7.1920x1080.jpg?t=1647357402'
        },
        {
          id: 1,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_b16a3740e032afe1c4b0477174eae7af8444b85d.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_b16a3740e032afe1c4b0477174eae7af8444b85d.1920x1080.jpg?t=1647357402'
        },
        {
          id: 2,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_b3c5c70421af0c6a48dab2fbac88814a8827c057.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_b3c5c70421af0c6a48dab2fbac88814a8827c057.1920x1080.jpg?t=1647357402'
        },
        {
          id: 3,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_b29aa0a2503547a15e9e210551b9c3eed42cba78.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_b29aa0a2503547a15e9e210551b9c3eed42cba78.1920x1080.jpg?t=1647357402'
        },
        {
          id: 4,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_8aad65240099ed6f44953d051d1fca5d4f16e174.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_8aad65240099ed6f44953d051d1fca5d4f16e174.1920x1080.jpg?t=1647357402'
        },
        {
          id: 5,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_c1dce7ea799bebeecc085bbe4879b27e6e05a33c.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_c1dce7ea799bebeecc085bbe4879b27e6e05a33c.1920x1080.jpg?t=1647357402'
        },
        {
          id: 6,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_5ad7ed4bb147a59ced32257a80008285f0722822.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_5ad7ed4bb147a59ced32257a80008285f0722822.1920x1080.jpg?t=1647357402'
        },
        {
          id: 7,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_59ceb8acb69485f50f236d6a10a5e5c47856681b.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_59ceb8acb69485f50f236d6a10a5e5c47856681b.1920x1080.jpg?t=1647357402'
        },
        {
          id: 8,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_8015ccd40a8cdf6ad62913e61493e4f094b4f0e3.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_8015ccd40a8cdf6ad62913e61493e4f094b4f0e3.1920x1080.jpg?t=1647357402'
        },
        {
          id: 9,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_674d80f91cb32c6e0fdd2dd826596823b4d65bfe.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_674d80f91cb32c6e0fdd2dd826596823b4d65bfe.1920x1080.jpg?t=1647357402'
        },
        {
          id: 10,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_038abb71457edf636529dd7b5f898a7311dea359.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_038abb71457edf636529dd7b5f898a7311dea359.1920x1080.jpg?t=1647357402'
        },
        {
          id: 11,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_e05468513634d03e4cc99d5b13436fe4ee653d6f.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_e05468513634d03e4cc99d5b13436fe4ee653d6f.1920x1080.jpg?t=1647357402'
        },
        {
          id: 12,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_07bc094ab6223d680c809735bbbadfc7ff733905.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_07bc094ab6223d680c809735bbbadfc7ff733905.1920x1080.jpg?t=1647357402'
        },
        {
          id: 13,
          path_thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_5dfdc21d3fa4ffff7081f0933748b95f23c9b181.600x338.jpg?t=1647357402',
          path_full: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/ss_5dfdc21d3fa4ffff7081f0933748b95f23c9b181.1920x1080.jpg?t=1647357402'
        }
      ],
      movies: [
        {
          id: 81281,
          name: 'The Elder Scrolls V: Skyrim - Full Trailer',
          thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81281\/movie.293x165.jpg?t=1466707024',
          webm: {
            480: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81281\/movie480.webm?t=1466707024',
            max: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81281\/movie_max.webm?t=1466707024'
          },
          mp4: {
            480: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81281\/movie480.mp4?t=1466707024',
            max: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81281\/movie_max.mp4?t=1466707024'
          },
          highlight: true
        },
        {
          id: 81280,
          name: 'The Elder Scrolls V: Skyrim - Live Action Trailer',
          thumbnail: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81280\/movie.293x165.jpg?t=1466707149',
          webm: {
            480: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81280\/movie480.webm?t=1466707149',
            max: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81280\/movie_max.webm?t=1466707149'
          },
          mp4: {
            480: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81280\/movie480.mp4?t=1466707149',
            max: 'http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/81280\/movie_max.mp4?t=1466707149'
          },
          highlight: false
        }
      ],
      recommendations: {
        total: 180594
      },
      achievements: {
        total: 75,
        highlighted: [
          {
            name: 'Unbound',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/07a5ef16690568be4686a8c0d3ba5b031acde580.jpg'
          },
          {
            name: 'Bleak Falls Barrow',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/c3a604f698d247b53d20f212e9f31a9ec707a180.jpg'
          },
          {
            name: 'The Way of the Voice',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/108a9f066026e56f3610e36a5fff22da801fe6c7.jpg'
          },
          {
            name: 'Diplomatic Immunity',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/99c7be8e786fa63db1911528319e398e037273d3.jpg'
          },
          {
            name: "Alduin's Wall",
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/4232fc8bed168a922b60d31ea79761c8de43531e.jpg'
          },
          {
            name: 'Elder Knowledge',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/3278ddbe854b98dc8207d149a2d7f86f648945fc.jpg'
          },
          {
            name: 'The Fallen',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/2b82245e53893a810c1a1ac30ee9fd975b16516e.jpg'
          },
          {
            name: 'Dragonslayer',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/7668bd7787758bde9211ed8d8c347f50da7f230d.jpg'
          },
          {
            name: 'Take Up Arms',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/4bef1c9fa55d787d4e84c89058b715882d7d579b.jpg'
          },
          {
            name: 'Blood Oath',
            path: 'https:\/\/cdn.akamai.steamstatic.com\/steamcommunity\/public\/images\/apps\/72850\/2ebbe241120ea5a148b31c82a9bf02065397cda9.jpg'
          }
        ]
      },
      release_date: {
        coming_soon: false,
        date: '10 Nov, 2011'
      },
      support_info: {
        url: 'http:\/\/support.bethsoft.com\/',
        email: ''
      },
      background: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/page_bg_generated_v6b.jpg?t=1647357402',
      background_raw: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/72850\/page_bg_generated.jpg?t=1647357402',
      content_descriptors: {
        ids: [
          5
        ],
        notes: null
      }
    }
  }
}
