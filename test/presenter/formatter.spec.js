/* eslint-disable no-useless-escape */
import { formatGame, format, formatGameName, formatGameTier, formatGameConfidence, formatRequirements, sortGames, wrapCollection } from '../../lib/presenter/formatter.js'
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

describe('formatRequirements', async () => {
  const dataType1 = {
    pc_requirements: {
      minimum: '<strong>Minimum:<\/strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br><\/li><li><strong>OS:<\/strong> 64-bit Windows 10<br><\/li><li><strong>Processor:<\/strong> Core i7-6700 or Ryzen 5 1600<br><\/li><li><strong>Memory:<\/strong> 12 GB RAM<br><\/li><li><strong>Graphics:<\/strong> GeForce GTX 1060 6GB or Radeon RX 580 8GB or Arc A380<br><\/li><li><strong>DirectX:<\/strong> Version 12<br><\/li><li><strong>Storage:<\/strong> 70 GB available space<br><\/li><li><strong>Additional Notes:<\/strong> SSD required. Attention: In this game you will encounter a variety of visual effects that may provide seizures or loss of consciousness in a minority of people. If you or someone you know experiences any of the above symptoms while playing, stop and seek medical attention immediately.<\/li><\/ul>',
      recommended: '<strong>Recommended:<\/strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br><\/li><li><strong>OS:<\/strong> 64-bit Windows 10<br><\/li><li><strong>Processor:<\/strong> Core i7-12700 or Ryzen 7 7800X3D<br><\/li><li><strong>Memory:<\/strong> 16 GB RAM<br><\/li><li><strong>Graphics:<\/strong> GeForce RTX 2060 SUPER or Radeon RX 5700 XT or Arc A770<br><\/li><li><strong>DirectX:<\/strong> Version 12<br><\/li><li><strong>Storage:<\/strong> 70 GB available space<br><\/li><li><strong>Additional Notes:<\/strong> SSD required.<\/li><\/ul>'
    }
  }

  const dataType2 = {
    pc_requirements: {
      minimum: '<strong>Minimum:<\/strong><br>\t\t\t\t\t\t\t\t<ul class=\"bb_ul\"><li><strong>OS *:<\/strong> Windows 7\/Vista\/XP PC (32 or 64 bit)<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Processor:<\/strong> Dual Core 2.0GHz or equivalent processor<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Memory:<\/strong> 2GB System RAM<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Hard Disk Space:<\/strong> 6GB free HDD Space<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Video Card:<\/strong> Direct X 9.0c compliant video card with 512 MB of RAM<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Sound:<\/strong> DirectX compatible sound card<br>\t\t\t\t\t\t\t\t<\/li><\/ul>',
      recommended: '<strong>Recommended:<\/strong><br>\t\t\t\t\t\t\t\t<ul class=\"bb_ul\"><li><strong>Processor:<\/strong> Quad-core Intel or AMD CPU<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Memory:<\/strong> 4GB System RAM<br>\t\t\t\t\t\t\t\t<\/li><li><strong>Video Card:<\/strong> DirectX 9.0c compatible NVIDIA or AMD ATI video card with 1GB of RAM (Nvidia GeForce GTX 260 or higher; ATI Radeon 4890 or higher)<br>\t\t\t\t\t\t\t\t<\/li><\/ul>'
    }
  }

  test('formatRequirements must return an object with the minimum & recommended requirements as a objects always for the first format', () => {
    const result = formatRequirements(dataType1)
    assert(Object.prototype.hasOwnProperty.call(result, 'minimum'), 'does not has minimun property')
    assert(Object.prototype.hasOwnProperty.call(result, 'recommended'), 'does not has recommended property')
  })

  test('formatRequirements must return an object with the minimum & recommended requirements as a objects always for the second format', () => {
    const result = formatRequirements(dataType2)
    assert(Object.prototype.hasOwnProperty.call(result, 'minimum'), 'does not has minimun property')
    assert(Object.prototype.hasOwnProperty.call(result, 'recommended'), 'does not has recommended property')
  })

  test('formatRequirements minimum object must have os, processor, memory, graphics, directx, storage  and additional_notes properties with their respective values for the first format', () => {
    const result = formatRequirements(dataType1)
    const minimum = result.minimum
    assert(Object.prototype.hasOwnProperty.call(minimum, 'os'), 'does not has os property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'processor'), 'does not has processor property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'memory'), 'does not has memory property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'graphics'), 'does not has graphics property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'directx'), 'does not has directx property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'storage'), 'does not has storage property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'additional_notes'), 'does not has additional_notes property')
    assert.equal(minimum.os, '64-bit Windows 10')
    assert.equal(minimum.processor, 'Core i7-6700 or Ryzen 5 1600')
    assert.equal(minimum.memory, '12 GB RAM')
    assert.equal(minimum.graphics, 'GeForce GTX 1060 6GB or Radeon RX 580 8GB or Arc A380')
    assert.equal(minimum.directx, 'Version 12')
    assert.equal(minimum.storage, '70 GB available space')
    assert.match(minimum.additional_notes, /SSD required/)
  })

  test('formatRequirements minimum object must have os, processor, memory, graphics, directx, storage  and additional_notes properties with their respective values for the second format', () => {
    const result = formatRequirements(dataType2)
    const minimum = result.minimum
    assert(Object.prototype.hasOwnProperty.call(minimum, 'os'), 'does not has os property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'processor'), 'does not has processor property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'memory'), 'does not has memory property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'graphics'), 'does not has graphics property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'directx'), 'does not has directx property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'storage'), 'does not has storage property')
    assert(Object.prototype.hasOwnProperty.call(minimum, 'additional_notes'), 'does not has additional_notes property')
    assert.equal(minimum.os, '64-bit Windows 10')
    assert.equal(minimum.processor, 'Core i7-6700 or Ryzen 5 1600')
    assert.equal(minimum.memory, '12 GB RAM')
    assert.equal(minimum.graphics, 'GeForce GTX 1060 6GB or Radeon RX 580 8GB or Arc A380')
    assert.equal(minimum.directx, 'Version 12')
    assert.equal(minimum.storage, '70 GB available space')
    assert.match(minimum.additional_notes, /SSD required/)
  })

  test('formatRequirements recommended object must have os, processor, memory, graphics, directx, storage  and additional_notes properties with their respective values for the first format', () => {
    const result = formatRequirements(dataType1)
    const recommended = result.recommended
    assert(Object.prototype.hasOwnProperty.call(recommended, 'os'), 'does not has os property')
    assert(Object.prototype.hasOwnProperty.call(recommended, 'processor'), 'does not has processor property')
    assert(Object.prototype.hasOwnProperty.call(recommended, 'memory'), 'does not has memory property')
    assert(Object.prototype.hasOwnProperty.call(recommended, 'graphics'), 'does not has graphics property')
    assert(Object.prototype.hasOwnProperty.call(recommended, 'directx'), 'does not has directx property')
    assert(Object.prototype.hasOwnProperty.call(recommended, 'additional_notes'), 'does not has additional_notes property')
    assert.equal(recommended.os, '64-bit Windows 10')
    assert.equal(recommended.processor, 'Core i7-12700 or Ryzen 7 7800X3D')
    assert.equal(recommended.memory, '16 GB RAM')
    assert.equal(recommended.graphics, 'GeForce RTX 2060 SUPER or Radeon RX 5700 XT or Arc A770')
    assert.equal(recommended.directx, 'Version 12')
    assert.equal(recommended.storage, '70 GB available space')
    assert.match(recommended.additional_notes, /SSD required/)
  })

  test('formatRequirements recommended object must have os, processor, memory, graphics, directx, storage  and additional_notes properties with their respective values for the second format', () => {
    const result = formatRequirements(dataType2)
    const recommended = result.recommended
    assert(Object.prototype.hasOwnProperty.call(recommended, 'processor'), 'does not has processor property')
    assert(Object.prototype.hasOwnProperty.call(recommended, 'memory'), 'does not has memory property')
    assert(Object.prototype.hasOwnProperty.call(recommended, 'video_card'), 'does not has video_card property')
    assert.equal(recommended.processor, 'Quad-core Intel or AMD CPU')
    assert.equal(recommended.memory, '4GB System RAM')
    assert.match(recommended.video_card, /DirectX 9.0c compatible NVIDIA/)
  })
})
