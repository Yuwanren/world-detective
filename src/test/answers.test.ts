import { describe, expect, it } from 'vitest'
import { getQuestion, questions } from '../data/questions.ts'
import { matchesAnswer, normalizeAnswer } from '../lib/answers.ts'

describe('answer matching', () => {
  it('normalizes case, surrounding spaces, and common punctuation', () => {
    expect(normalizeAnswer('  JAPAN! ')).toBe('japan')
    expect(normalizeAnswer('Japan.')).toBe('japan')
    expect(normalizeAnswer('New York,')).toBe('new york')
    expect(normalizeAnswer('new    york')).toBe('new york')
    expect(normalizeAnswer('  日本！ ')).toBe('日本')
    expect(normalizeAnswer('\u3000日本\u3000')).toBe('日本')
    expect(normalizeAnswer('The Eiffel Tower')).toBe('eiffel tower')
    expect(normalizeAnswer('Reykjavík')).toBe('reykjavik')
  })

  it('accepts aliases in either language', () => {
    const japan = getQuestion('japan')
    const eiffel = getQuestion('eiffel-tower')
    const paris = getQuestion('paris')
    const france = getQuestion('france')
    const newYork = getQuestion('new-york')
    if (!japan || !eiffel || !paris || !france || !newYork) throw new Error('Missing fixture questions')

    expect(matchesAnswer(japan, '  JAPAN! ')).toBe(true)
    expect(matchesAnswer(japan, '日本')).toBe(true)
    expect(matchesAnswer(japan, 'Nippon')).toBe(true)
    expect(matchesAnswer(japan, 'Tokyo')).toBe(false)
    expect(matchesAnswer(france, '法国')).toBe(true)
    expect(matchesAnswer(france, 'paris')).toBe(false)
    expect(matchesAnswer(eiffel, '  the   eiffel tower!! ')).toBe(true)
    expect(matchesAnswer(eiffel, '巴黎铁塔')).toBe(true)
    expect(matchesAnswer(eiffel, 'Paris')).toBe(false)
    expect(matchesAnswer(paris, 'Paris')).toBe(true)
    expect(matchesAnswer(newYork, 'nyc')).toBe(true)
    expect(matchesAnswer(newYork, '纽约市')).toBe(true)
  })

  it('keeps aliases unique across the bank', () => {
    const owners = new Map<string, string>()
    for (const question of questions) {
      for (const alias of [...question.answers.en, ...question.answers.zh]) {
        const normalized = normalizeAnswer(alias)
        const owner = owners.get(normalized)
        expect(owner ?? question.id).toBe(question.id)
        owners.set(normalized, question.id)
      }
    }
  })
})
