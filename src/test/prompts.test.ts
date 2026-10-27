import { describe, expect, it } from 'vitest'
import { answerPrompts } from '../data/prompts.ts'
import { questions } from '../data/questions.ts'
import { matchesAnswer, normalizeAnswer } from '../lib/answers.ts'
import { orderedOptions } from '../lib/promptOrder.ts'

describe('answer prompts', () => {
  it('keeps choice order stable without dropping or duplicating options', () => {
    const options = ['Japan', 'South Korea', 'Thailand', 'Vietnam']
    const first = orderedOptions('japan', options)
    expect(orderedOptions('japan', options)).toEqual(first)
    expect([...first].sort()).toEqual([...options].sort())
  })

  it('gives every puzzle an explicit prompt whose correct name comes from the bank', () => {
    for (const question of questions) {
      const prompt = answerPrompts[question.id]
      expect(prompt, question.id).toBeDefined()
      if (!prompt) continue
      for (const locale of ['en', 'zh'] as const) {
        const options = prompt.options[locale]
        expect(options.length).toBe(prompt.options.en.length)
        const normalized = options.map((option) => normalizeAnswer(option))
        expect(new Set(normalized).size).toBe(normalized.length)
        const hits = options.filter((option) => matchesAnswer(question, option))
        if (prompt.kind === 'choices') {
          expect(options).toHaveLength(4)
          expect(hits).toHaveLength(1)
        } else {
          expect(options.length).toBeGreaterThan(1)
          expect(hits.length).toBeGreaterThan(0)
          expect(hits.length).toBeLessThan(options.length)
        }
      }
    }
  })
})
