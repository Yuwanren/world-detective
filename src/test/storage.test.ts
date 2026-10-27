import { describe, expect, it } from 'vitest'
import { questions } from '../data/questions.ts'
import { BANK_VERSION, STORAGE_KEY } from '../lib/constants.ts'
import { createGameState, reduceGame } from '../lib/game.ts'
import { totalScore } from '../lib/scoring.ts'
import { loadBestScore, loadDaily, loadLocale, loadPractice, saveDaily, saveLocale, savePractice } from '../lib/storage.ts'
import { createMemoryStore } from './memoryStore.ts'
import { pin } from './pins.ts'

const ids = ['japan', 'france', 'egypt', 'brazil', 'canada']

describe('saved progress', () => {
  it('restores a round after reload and does not score the same answer twice', () => {
    const store = createMemoryStore()
    let state = createGameState({
      mode: 'daily',
      date: '2026-10-22',
      bankVersion: BANK_VERSION,
      questionIds: ids,
    })
    state = reduceGame(reduceGame(state, { type: 'set-guess', point: pin('japan') }, questions), { type: 'submit-pin' }, questions)
    saveDaily(state, store)

    const restored = loadDaily('2026-10-22', BANK_VERSION, store)
    expect(restored).toEqual(state)
    expect(restored?.guess).toEqual(pin('japan'))
    const again = reduceGame(restored ?? state, { type: 'submit-pin' }, questions)
    expect(again.results).toHaveLength(1)
    expect(totalScore(again.results)).toBe(100)
  })

  it('keeps a different day and a practice round from replacing the daily score', () => {
    const store = createMemoryStore()
    const daily = reduceGame(
      reduceGame(
        createGameState({
          mode: 'daily',
          date: '2026-10-22',
          bankVersion: BANK_VERSION,
          questionIds: ids,
        }),
        { type: 'set-guess', point: pin('japan') },
        questions,
      ),
      { type: 'submit-pin' },
      questions,
    )
    saveDaily(daily, store)
    savePractice(
      createGameState({
        mode: 'practice',
        date: '2026-10-22',
        bankVersion: BANK_VERSION,
        questionIds: ids,
      }),
      store,
    )

    expect(loadDaily('2026-10-23', BANK_VERSION, store)).toBeNull()
    expect(loadDaily('2026-10-22', '1', store)).toBeNull()
    expect(loadDaily('2026-10-22', BANK_VERSION, store)).toEqual(daily)

    const practice = loadPractice(store)
    if (!practice) throw new Error('Practice round was not saved')
    savePractice(
      reduceGame(reduceGame(practice, { type: 'set-guess', point: pin('japan') }, questions), { type: 'submit-pin' }, questions),
      store,
    )
    expect(loadDaily('2026-10-22', BANK_VERSION, store)).toEqual(daily)
    expect(loadPractice(store)?.results[0]?.questionId).toBe('japan')
  })

  it('ignores corrupt storage and keeps the chosen language', () => {
    const store = createMemoryStore()
    store.setItem(STORAGE_KEY, '{')
    expect(loadDaily('2026-10-22', BANK_VERSION, store)).toBeNull()
    expect(loadLocale(store)).toBe('en')
    saveLocale('zh', store)
    expect(loadLocale(store)).toBe('zh')
  })

  it('keeps the best daily score and ignores practice', () => {
    const store = createMemoryStore()
    let perfect = createGameState({
      mode: 'daily',
      date: '2026-10-22',
      bankVersion: BANK_VERSION,
      questionIds: ids,
    })
    for (const id of ids) {
      perfect = reduceGame(reduceGame(perfect, { type: 'set-guess', point: pin(id) }, questions), { type: 'submit-pin' }, questions)
      perfect = reduceGame(perfect, { type: 'next' }, questions)
    }
    saveDaily(perfect, store)
    expect(loadBestScore(store)).toBe(500)

    const weaker = {
      ...perfect,
      date: '2026-10-21',
      results: perfect.results.map((result) => ({ ...result, score: 25 })),
    }
    saveDaily(weaker, store)
    expect(totalScore(weaker.results)).toBe(125)
    expect(loadBestScore(store)).toBe(500)

    savePractice({ ...weaker, mode: 'practice', date: '2026-10-22' }, store)
    expect(loadBestScore(store)).toBe(500)
    expect(loadDaily('2026-10-22', BANK_VERSION, store)?.results[0]?.score).toBe(100)
  })

  it('keeps a completed round saved before pin guesses existed', () => {
    const store = createMemoryStore()
    store.setItem(
      STORAGE_KEY,
      JSON.stringify({
        locale: 'en',
        bestScore: 350,
        practice: null,
        daily: {
          '2026-10-22:1': {
            mode: 'daily',
            date: '2026-10-22',
            bankVersion: '1',
            questionIds: ids,
            currentIndex: 4,
            cluesRevealed: 1,
            status: 'complete',
            attemptUsed: true,
            lastAnswerCorrect: true,
            results: ids.map((questionId) => ({ questionId, score: 70, cluesUsed: 1, solved: true })),
          },
        },
      }),
    )
    expect(loadBestScore(store)).toBe(350)
    expect(loadDaily('2026-10-22', '1', store)?.status).toBe('complete')
    expect(loadDaily('2026-10-22', BANK_VERSION, store)).toBeNull()
  })
})
