import { describe, expect, it } from 'vitest'
import { getQuestion, questions } from '../data/questions.ts'

describe('question bank', () => {
  it('has at least 20 checked puzzles across countries, cities, and landmarks', () => {
    expect(questions.length).toBeGreaterThanOrEqual(20)
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length)
    expect(new Set(questions.map((question) => question.category))).toEqual(new Set(['country', 'city', 'landmark']))

    for (const question of questions) {
      expect(question.clues).toHaveLength(4)
      expect(question.answers.en.length).toBeGreaterThan(0)
      expect(question.answers.zh.length).toBeGreaterThan(0)
      for (const clue of question.clues) {
        expect(clue.en.trim().length).toBeGreaterThan(20)
        expect(clue.zh.trim().length).toBeGreaterThan(8)
      }
      expect(question.explanation.en.trim().length).toBeGreaterThan(20)
      expect(question.explanation.zh.trim().length).toBeGreaterThan(8)
    }
  })

  it('keeps the answer wording out of clues that previously spelled it', () => {
    const london = getQuestion('london')
    const brazil = getQuestion('brazil')
    const eiffel = getQuestion('eiffel-tower')
    expect(london && brazil && eiffel).toBeTruthy()
    if (!london || !brazil || !eiffel) return
    for (const clue of london.clues) {
      expect(clue.en.toLowerCase()).not.toContain('london')
      expect(clue.zh).not.toContain('伦敦')
    }
    for (const clue of brazil.clues) expect(clue.zh).not.toContain('巴西')
    for (const clue of eiffel.clues) {
      expect(clue.en.toLowerCase()).not.toContain('eiffel')
      expect(clue.zh).not.toContain('埃菲尔')
    }
  })
})
