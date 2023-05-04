import tap from 'tap'
import { formatGame, format, formatGameName, formatGameTier, formatGameConfidence, sortGames } from '../../lib/presenter/formatter.js'
import { TAG_TIERS, GAME_NA, TAG_CONFIDENCE } from '../../lib/presenter/formats.js'
import { mergedGameDataComplete, mergedGameDataUncomplete, mergedGames } from '../mock/index.mock.js'
import { createMergedGame } from '../factories/index.js'

tap.test('formatGame', async (t) => {
  t.plan(6)

  t.test('formatGame must return an array always', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataComplete)
    tt.ok(Array.isArray(result))
  })

  t.test('first item must be the game\'s name', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataComplete)
    tt.equal(result[0], formatGameName(mergedGameDataComplete.name))
  })

  t.test('2th item must be the game\'s tier if there are result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataComplete)
    tt.equal(result[1], formatGameTier(mergedGameDataComplete.tier))
  })

  t.test('3th item must be the game\'s confidence if there are result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataComplete)
    tt.equal(result[2], formatGameConfidence(mergedGameDataComplete.confidence))
  })

  t.test('2th item must be equal to "{gray-fg}N/A{/gray-fg}" if the has not result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataUncomplete)
    tt.equal(result[1], GAME_NA)
  })

  t.test('3th item must be equal to "{gray-fg}N/A{/gray-fg}" if the has not result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataUncomplete)
    tt.equal(result[2], GAME_NA)
  })
})

tap.test('format', async (t) => {
  t.plan(1)

  t.test('format must return an array of arrays and each array child must have a length of 3', (tt) => {
    const header = 1
    const asserts = 2 + (mergedGames.length + header) * 2
    tt.plan(asserts)
    const result = format(mergedGames)
    tt.ok(Array.isArray(result))
    tt.equal(result.length, mergedGames.length + header)
    result.forEach((gameFormated) => {
      tt.ok(Array.isArray(gameFormated))
      tt.equal(gameFormated.length, 3)
    })
  })
})

tap.test('formatGameName', async (t) => {
  t.plan(2)

  t.test('formatGameName must return a shortter version of the name when the length is bigger than limit(15) characters', (tt) => {
    tt.plan(1)
    const name = 'Artificial Life 2061: Cybersys - (Fantasy Diva Of The Terrarian Vrchatworlds, Babel Tower Final Project: "Kodota Komori 1416") [Made by: Joseph Sanz]'
    const result = formatGameName(name)
    tt.equal(result, 'Artificial Life 2061: Cybersys - (F...')
  })

  t.test('formatGameName can accept different limit values based on the argument', (tt) => {
    tt.plan(1)
    const name = 'Artificial Life 2061: Cybersys - (Fantasy Diva Of The Terrarian Vrchatworlds, Babel Tower Final Project: "Kodota Komori 1416") [Made by: Joseph Sanz]'
    const result = formatGameName(name, 10)
    tt.equal(result, 'Artificial...')
  })
})

tap.test('formatGameTier', async (t) => {
  t.plan(7)

  t.test('formatGameTier must return the silver tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameTier('silver')
    tt.equal(result, TAG_TIERS.silver.description)
  })

  t.test('formatGameTier must return the gold tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameTier('gold')
    tt.equal(result, TAG_TIERS.gold.description)
  })

  t.test('formatGameTier must return the bronze tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameTier('bronze')
    tt.equal(result, TAG_TIERS.bronze.description)
  })

  t.test('formatGameTier must return the platinum tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameTier('platinum')
    tt.equal(result, TAG_TIERS.platinum.description)
  })

  t.test('formatGameTier must return the borked tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameTier('borked')
    tt.equal(result, TAG_TIERS.borked.description)
  })

  t.test('formatGameTier must return the pending tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameTier('pending')
    tt.equal(result, TAG_TIERS.pending.description)
  })

  t.test('formatGameTier must return the tier without the tag if the tier is unknow', (tt) => {
    tt.plan(1)
    const result = formatGameTier('new_tier')
    tt.equal(result, 'new_tier')
  })
})

tap.test('formatGameConfidence', async (t) => {
  t.plan(6)

  t.test('formatGameConfidence must return inadequate confidence with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameConfidence('inadequate')
    tt.equal(result, TAG_CONFIDENCE.inadequate.description)
  })

  t.test('formatGameConfidence must return low confidence with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameConfidence('low')
    tt.equal(result, TAG_CONFIDENCE.low.description)
  })

  t.test('formatGameConfidence must return moderate confidence with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameConfidence('moderate')
    tt.equal(result, TAG_CONFIDENCE.moderate.description)
  })

  t.test('formatGameConfidence must return good confidence with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameConfidence('good')
    tt.equal(result, TAG_CONFIDENCE.good.description)
  })

  t.test('formatGameConfidence must return strong confidence with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatGameConfidence('strong')
    tt.equal(result, TAG_CONFIDENCE.strong.description)
  })

  t.test('formatGameTier must return the confidence without the tag if the confidence is unknow', (tt) => {
    tt.plan(1)
    const result = formatGameTier('new_confidence')
    tt.equal(result, 'new_confidence')
  })
})

tap.test('sortGames', async (t) => {
  t.plan(9)

  t.test('sorting just one game', (tt) => {
    tt.plan(1)
    const games = [createMergedGame({ tier: 'silver', confidence: 'strong' })]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, games)
  })

  t.test('N/A games have the lowest priority for the sorting', (tt) => {
    tt.plan(1)
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const games = [naGame, silverGame]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [silverGame, naGame])
  })

  t.test('pending games have the first low priority for the sorting', (tt) => {
    tt.plan(1)
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const games = [pendingGame, naGame, silverGame]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [silverGame, pendingGame, naGame])
  })

  t.test('borked games have the 2th low priority for the sorting', (tt) => {
    tt.plan(1)
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const borkedGame = createMergedGame({ tier: 'borked', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const games = [pendingGame, borkedGame, naGame, silverGame]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [silverGame, borkedGame, pendingGame, naGame])
  })

  t.test('bronze games have the 2th lower priority for the sorting', (tt) => {
    tt.plan(1)
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const games = [pendingGame, silverGame, naGame, bronzeGame]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [silverGame, bronzeGame, pendingGame, naGame])
  })

  t.test('silver games have the 3th lower priority for the sorting', (tt) => {
    tt.plan(1)
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const games = [naGame, bronzeGame, pendingGame, silverGame]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [silverGame, bronzeGame, pendingGame, naGame])
  })

  t.test('gold games have the 4th lower priority for the sorting', (tt) => {
    tt.plan(1)
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const goldGame = createMergedGame({ tier: 'gold', confidence: 'strong' })
    const games = [bronzeGame, naGame, pendingGame, goldGame, silverGame]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [goldGame, silverGame, bronzeGame, pendingGame, naGame])
  })

  t.test('platinum games have the 5th lower priority for the sorting', (tt) => {
    tt.plan(1)
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const goldGame = createMergedGame({ tier: 'gold', confidence: 'strong' })
    const platinumGame = createMergedGame({ tier: 'platinum', confidence: 'strong' })
    const games = [naGame, bronzeGame, pendingGame, platinumGame, goldGame, silverGame]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [platinumGame, goldGame, silverGame, bronzeGame, pendingGame, naGame])
  })

  t.test('sorting several repeated tiers', (tt) => {
    tt.plan(1)
    const game1 = createMergedGame({ name: 'Counter-Strike', tier: 'gold', confidence: 'strong' })
    const game2 = createMergedGame({ name: 'Counter-Strike: Source', tier: 'gold', confidence: 'strong' })
    const game3 = createMergedGame({ name: 'Counter-Strike: Condition Zero', tier: 'platinum', confidence: 'strong' })
    const game4 = createMergedGame({ name: 'Counter-Strike: Global Offensive', tier: 'gold', confidence: 'strong' })
    const game5 = createMergedGame({ name: 'Graze Counter', tier: 'gold', confidence: 'strong' })
    const game6 = createMergedGame({ name: 'Graze Counter GM', tier: 'platinum', confidence: 'strong' })
    const game7 = createMergedGame({ name: 'Over the Counter', tier: 'GAME_NA', confidence: 'strong' })
    const game8 = createMergedGame({ name: 'CounterAttack', tier: 'GAME_NA', confidence: 'strong' })
    const game9 = createMergedGame({ name: 'Counterpack', tier: 'GAME_NA', confidence: 'strong' })
    const game10 = createMergedGame({ name: 'Counterrealstic Syndrome', tier: 'GAME_NA', confidence: 'strong' })
    const game11 = createMergedGame({ name: 'Counterrealstic Borked', tier: 'borked', confidence: 'strong' })
    const games = [game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11]
    const sortedGames = sortGames(games)
    tt.same(sortedGames, [game3, game6, game1, game2, game4, game5, game11, game7, game8, game9, game10])
  })
})
