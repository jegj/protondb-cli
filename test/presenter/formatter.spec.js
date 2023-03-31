import tap from 'tap'
import { formatGame, format, formatGameName } from '../../lib/presenter/formatter.js'
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
    tt.equal(result[0], mergedGameDataComplete.name)
  })

  t.test('2th item must be the game\'s tier if there are result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataComplete)
    tt.equal(result[1], mergedGameDataComplete.tier)
  })

  t.test('3th item must be the game\'s confidence if there are result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataComplete)
    tt.equal(result[2], mergedGameDataComplete.confidence)
  })

  t.test('2th item must be equal to "pending" if the has not result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataUncomplete)
    tt.equal(result[1], 'pending')
  })

  t.test('3th item must be equal to "pending" if the has not result from protondb API', (tt) => {
    tt.plan(1)
    const result = formatGame(mergedGameDataUncomplete)
    tt.equal(result[2], 'pending')
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
    tt.equal(result, 'Artificial Life...')
  })

  t.test('formatGameName can accept different limit values based on the argument', (tt) => {
    tt.plan(1)
    const name = 'Artificial Life 2061: Cybersys - (Fantasy Diva Of The Terrarian Vrchatworlds, Babel Tower Final Project: "Kodota Komori 1416") [Made by: Joseph Sanz]'
    const result = formatGameName(name, 10)
    tt.equal(result, 'Artificial...')
  })
})
