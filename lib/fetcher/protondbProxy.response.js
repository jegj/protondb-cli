const REQUIRED_PROTONDB_PROXY_PROPS = [
  'genres',
  'recommendations'
]
/*
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
      review: '“A Masterpiece”<br>10\/10 – <a href="https:\/\/steamcommunity.com\/linkfilter\/?url=http:\/\/www.eurogamer.net\/articles\/2011-11-10-the-elder-scrolls-5-skyrim-review" target="_blank" rel=" noopener"  >Eurogamer<\/a><br>',
      "genres": [
        {
          "id": "3",
          "description": "RPG"
        }
      ],
      "recommendations": {
        "total": 180594
      },

....
}
*/
export function checkProtondbProxyResponse (protondbProxyResponse, appId, requiredProps = REQUIRED_PROTONDB_PROXY_PROPS) {
  if (!Object.prototype.hasOwnProperty.call(protondbProxyResponse, appId)) {
    throw new Error(`protondbproxy response doesnt have the appid "${appId}"`)
  }
  const game = protondbProxyResponse[appId]

  if (!Object.prototype.hasOwnProperty.call(game, 'success') && game.success) {
    throw new Error('protondbproxy game response doesnt have a valid success property')
  }

  if (!Object.prototype.hasOwnProperty.call(game, 'data')) {
    throw new Error('protondbproxy game response doesnt have a valid game property')
  }

  const gameData = game.data

  requiredProps.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(gameData, key)) {
      throw new Error(`protondbproxy response doesnt have the property "${key}"`)
    }
  })

  const genres = gameData.genres
  if (!Array.isArray(genres)) {
    throw new Error('genres is not an array')
  }
  const sampleGenre = genres[0]
  const sampleRecommendations = gameData.recommendations

  if (!Object.prototype.hasOwnProperty.call(sampleGenre, 'description')) {
    throw new Error('genre object does not have the description property')
  }

  if (!Object.prototype.hasOwnProperty.call(sampleRecommendations, 'total')) {
    throw new Error('recommendation object does not have the total property')
  }
}
