/* eslint-disable no-useless-escape */
import { formatGame, format, formatGameName, formatGameTier, formatGameConfidence, formatMinimunRequirements, sortGames, wrapCollection } from '../../lib/presenter/formatter.js'
import { TAG_TIERS, GAME_NA, TAG_CONFIDENCE } from '../../lib/presenter/formats.js'
import { mergedGameDataComplete, mergedGameDataUncomplete, mergedGames } from '../mock/index.mock.js'
import { createMergedGame } from '../factories/index.js'
import { describe, test } from 'node:test'
import assert from 'node:assert'

describe('formatGame', async () => {
  test('formatGame must return an array always', () => {
    const result = formatGame(mergedGameDataComplete)
    assert(Array.isArray(result))
  })

  test('first item must be the game\'s name', () => {
    const result = formatGame(mergedGameDataComplete)
    assert.equal(result[0], formatGameName(mergedGameDataComplete.name))
  })

  test('2th item must be the game\'s tier if there are result from protondb API', () => {
    const result = formatGame(mergedGameDataComplete)
    assert.equal(result[1], formatGameTier(mergedGameDataComplete.tier))
  })

  test('3th item must be the game\'s confidence if there are result from protondb API', () => {
    const result = formatGame(mergedGameDataComplete)
    assert.equal(result[2], formatGameConfidence(mergedGameDataComplete.confidence))
  })

  test('2th item must be equal to "{gray-fg}N/A{/gray-fg}" if the has not result from protondb API', () => {
    const result = formatGame(mergedGameDataUncomplete)
    assert.equal(result[1], GAME_NA)
  })

  test('3th item must be equal to "{gray-fg}N/A{/gray-fg}" if the has not result from protondb API', () => {
    const result = formatGame(mergedGameDataUncomplete)
    assert.equal(result[2], GAME_NA)
  })
})

describe('format', async () => {
  test('format must return an array of arrays and each array child must have a length of 3', () => {
    const header = 1
    const result = format(mergedGames)
    assert(Array.isArray(result))
    assert.equal(result.length, mergedGames.length + header)
    result.forEach((gameFormated) => {
      assert(Array.isArray(gameFormated))
      assert.equal(gameFormated.length, 3)
    })
  })
})

describe('formatGameName', async () => {
  test('formatGameName must return a shortter version of the name when the length is bigger than limit(15) characters', () => {
    const name = 'Artificial Life 2061: Cybersys - (Fantasy Diva Of The Terrarian Vrchatworlds, Babel Tower Final Project: "Kodota Komori 1416") [Made by: Joseph Sanz]'
    const result = formatGameName(name)
    assert.equal(result, 'Artificial Life 2061: Cybersys - (F...')
  })

  test('formatGameName can accept different limit values based on the argument', () => {
    const name = 'Artificial Life 2061: Cybersys - (Fantasy Diva Of The Terrarian Vrchatworlds, Babel Tower Final Project: "Kodota Komori 1416") [Made by: Joseph Sanz]'
    const result = formatGameName(name, 10)
    assert.equal(result, 'Artificial...')
  })
})

describe('formatGameTier', async () => {
  test('formatGameTier must return the silver tier with the respective tag for font color', () => {
    const result = formatGameTier('silver')
    assert.equal(result, TAG_TIERS.silver.description)
  })

  test('formatGameTier must return the gold tier with the respective tag for font color', () => {
    const result = formatGameTier('gold')
    assert.equal(result, TAG_TIERS.gold.description)
  })

  test('formatGameTier must return the bronze tier with the respective tag for font color', () => {
    const result = formatGameTier('bronze')
    assert.equal(result, TAG_TIERS.bronze.description)
  })

  test('formatGameTier must return the platinum tier with the respective tag for font color', () => {
    const result = formatGameTier('platinum')
    assert.equal(result, TAG_TIERS.platinum.description)
  })

  test('formatGameTier must return the borked tier with the respective tag for font color', () => {
    const result = formatGameTier('borked')
    assert.equal(result, TAG_TIERS.borked.description)
  })

  test('formatGameTier must return the pending tier with the respective tag for font color', () => {
    const result = formatGameTier('pending')
    assert.equal(result, TAG_TIERS.pending.description)
  })

  test('formatGameTier must return the tier without the tag if the tier is unknow', () => {
    const result = formatGameTier('new_tier')
    assert.equal(result, 'new_tier')
  })
})

describe('formatGameConfidence', async () => {
  test('formatGameConfidence must return inadequate confidence with the respective tag for font color', () => {
    const result = formatGameConfidence('inadequate')
    assert.equal(result, TAG_CONFIDENCE.inadequate.description)
  })

  test('formatGameConfidence must return low confidence with the respective tag for font color', () => {
    const result = formatGameConfidence('low')
    assert.equal(result, TAG_CONFIDENCE.low.description)
  })

  test('formatGameConfidence must return moderate confidence with the respective tag for font color', () => {
    const result = formatGameConfidence('moderate')
    assert.equal(result, TAG_CONFIDENCE.moderate.description)
  })

  test('formatGameConfidence must return good confidence with the respective tag for font color', () => {
    const result = formatGameConfidence('good')
    assert.equal(result, TAG_CONFIDENCE.good.description)
  })

  test('formatGameConfidence must return strong confidence with the respective tag for font color', () => {
    const result = formatGameConfidence('strong')
    assert.equal(result, TAG_CONFIDENCE.strong.description)
  })

  test('formatGameTier must return the confidence without the tag if the confidence is unknow', () => {
    const result = formatGameTier('new_confidence')
    assert.equal(result, 'new_confidence')
  })
})

describe('sortGames', async () => {
  test('sorting just one game', () => {
    const games = [createMergedGame({ tier: 'silver', confidence: 'strong' })]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, games)
  })

  test('N/A games have the lowest priority for the sorting', () => {
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const games = [naGame, silverGame]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, [silverGame, naGame])
  })

  test('pending games have the first low priority for the sorting', () => {
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const games = [pendingGame, naGame, silverGame]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, [silverGame, pendingGame, naGame])
  })

  test('borked games have the 2th low priority for the sorting', () => {
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const borkedGame = createMergedGame({ tier: 'borked', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const games = [pendingGame, borkedGame, naGame, silverGame]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, [silverGame, borkedGame, pendingGame, naGame])
  })

  test('bronze games have the 2th lower priority for the sorting', () => {
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const games = [pendingGame, silverGame, naGame, bronzeGame]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, [silverGame, bronzeGame, pendingGame, naGame])
  })

  test('silver games have the 3th lower priority for the sorting', () => {
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const games = [naGame, bronzeGame, pendingGame, silverGame]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, [silverGame, bronzeGame, pendingGame, naGame])
  })

  test('gold games have the 4th lower priority for the sorting', () => {
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const goldGame = createMergedGame({ tier: 'gold', confidence: 'strong' })
    const games = [bronzeGame, naGame, pendingGame, goldGame, silverGame]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, [goldGame, silverGame, bronzeGame, pendingGame, naGame])
  })

  test('platinum games have the 5th lower priority for the sorting', () => {
    const naGame = createMergedGame({ tier: GAME_NA, confidence: 'strong' })
    const pendingGame = createMergedGame({ tier: 'pending', confidence: 'strong' })
    const silverGame = createMergedGame({ tier: 'silver', confidence: 'strong' })
    const bronzeGame = createMergedGame({ tier: 'bronze', confidence: 'strong' })
    const goldGame = createMergedGame({ tier: 'gold', confidence: 'strong' })
    const platinumGame = createMergedGame({ tier: 'platinum', confidence: 'strong' })
    const games = [naGame, bronzeGame, pendingGame, platinumGame, goldGame, silverGame]
    const sortedGames = sortGames(games)
    assert.deepEqual(sortedGames, [platinumGame, goldGame, silverGame, bronzeGame, pendingGame, naGame])
  })

  test('sorting several repeated tiers', () => {
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
    assert.deepEqual(sortedGames, [game3, game6, game1, game2, game4, game5, game11, game7, game8, game9, game10])
  })
})

describe('wrapCollection', async () => {
  test('wrapCollection must throw an error if the collection is not an Array', () => {
    try {
      const collection = 'no a collection'
      wrapCollection(collection, 10)
      assert.fail('error is expected')
    } catch (error) {
      assert(error instanceof Error)
      assert.match(error.message, /collection must be an array/)
    }
  })

  test('wrapCollection must return an array with a single element if the item concatenated length together is lower than the width', () => {
    const collection = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']
    const wrappedCollection = wrapCollection(collection, 30)
    assert(Array.isArray(wrappedCollection))
    assert.equal(wrappedCollection.length, 1, 'wrappedCollection has more than one item')
  })

  test('wrapCollection must return an array with more than one element if the collection concatenated length is higher than the fixed width', () => {
    const collection = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7']
    const wrappedCollection = wrapCollection(collection, 30)
    assert.equal(wrappedCollection.length, 2, 'wrappedCollection does not have the correct length')
  })
})

describe('formatMinimunRequirements', { only: true }, async () => {
  const data = {
    pc_requirements: {
      minimum: '<strong>Minimum:<\/strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br><\/li><li><strong>OS:<\/strong> 64-bit Windows 10<br><\/li><li><strong>Processor:<\/strong> Core i7-6700 or Ryzen 5 1600<br><\/li><li><strong>Memory:<\/strong> 12 GB RAM<br><\/li><li><strong>Graphics:<\/strong> GeForce GTX 1060 6GB or Radeon RX 580 8GB or Arc A380<br><\/li><li><strong>DirectX:<\/strong> Version 12<br><\/li><li><strong>Storage:<\/strong> 70 GB available space<br><\/li><li><strong>Additional Notes:<\/strong> SSD required. Attention: In this game you will encounter a variety of visual effects that may provide seizures or loss of consciousness in a minority of people. If you or someone you know experiences any of the above symptoms while playing, stop and seek medical attention immediately.<\/li><\/ul>',
      recommended: '<strong>Recommended:<\/strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br><\/li><li><strong>OS:<\/strong> 64-bit Windows 10<br><\/li><li><strong>Processor:<\/strong> Core i7-12700 or Ryzen 7 7800X3D<br><\/li><li><strong>Memory:<\/strong> 16 GB RAM<br><\/li><li><strong>Graphics:<\/strong> GeForce RTX 2060 SUPER or Radeon RX 5700 XT or Arc A770<br><\/li><li><strong>DirectX:<\/strong> Version 12<br><\/li><li><strong>Storage:<\/strong> 70 GB available space<br><\/li><li><strong>Additional Notes:<\/strong> SSD required.<\/li><\/ul>'
    }
  }
  test('formatMinimunRequirements must return an object with the processor property', { only: true }, () => {
    const result = formatMinimunRequirements(data)
    assert(Object.prototype.hasOwnProperty.call(result, 'processor'), 'does not has processor property')
    // assert.equal(result.processor, 'Core i7-6700 or Ryzen 5 1600')
  })
})
