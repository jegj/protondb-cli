import tap from 'tap'
import { formatGame, format, formatGameName, formatTierGame, GAME_NA, SILVER_TIER, GOLD_TIER, BRONZE_TIER, PLATINUM_TIER, PENDING_TIER } from '../../lib/presenter/formatter.js'
import { mergedGameDataComplete, mergedGameDataUncomplete, mergedGames } from '../mock/index.mock.js'

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
    tt.equal(result[1], formatTierGame(mergedGameDataComplete.tier))
  })

  t.test('3th item must be the game\'s confidence if there are result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataComplete)
    tt.equal(result[2], mergedGameDataComplete.confidence)
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

tap.test('formatTierGame', async (t) => {
  t.plan(6)

  t.test('formatTierGame must return the silver tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatTierGame('silver')
    tt.equal(result, SILVER_TIER)
  })

  t.test('formatTierGame must return the gold tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatTierGame('gold')
    tt.equal(result, GOLD_TIER)
  })

  t.test('formatTierGame must return the bronze tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatTierGame('bronze')
    tt.equal(result, BRONZE_TIER)
  })

  t.test('formatTierGame must return the platinum tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatTierGame('platinum')
    tt.equal(result, PLATINUM_TIER)
  })

  t.test('formatTierGame must return the pending tier with the respective tag for font color', (tt) => {
    tt.plan(1)
    const result = formatTierGame('pending')
    tt.equal(result, PENDING_TIER)
  })

  t.test('formatTierGame must return the tier without the tag if the tier is unknow', (tt) => {
    tt.plan(1)
    const result = formatTierGame('new_tier')
    tt.equal(result, 'new_tier')
  })
})
