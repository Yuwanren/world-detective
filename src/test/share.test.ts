import { describe, expect, it } from 'vitest'
import { buildChallengeLink, buildShareText } from '../lib/share.ts'

describe('share text', () => {
  it('builds a score summary and a challenge link without the answers', () => {
    const link = buildChallengeLink('https://play.example/')
    const text = buildShareText({
      locale: 'en',
      dateLabel: 'Thursday, October 22, 2026',
      total: 350,
      maxScore: 500,
      scores: [100, 75, 50, 25, 100],
      link,
      practice: false,
    })

    expect(link).toBe('https://play.example/')
    expect(text).toContain('Score 350/500')
    expect(text).toContain('100 · 75 · 50 · 25 · 100')
    expect(text).toContain(link)
    expect(text).not.toContain('Japan')

    const practice = buildShareText({
      locale: 'zh',
      dateLabel: '2026年10月22日',
      total: 100,
      maxScore: 500,
      scores: [100],
      link,
      practice: true,
    })
    expect(practice).toContain('加赛')
    expect(practice).toContain('得分 100/500')
    expect(practice).not.toContain('五个地点已经打完')

    const unfinished = buildShareText({
      locale: 'en',
      dateLabel: 'Thursday, October 22, 2026',
      total: 100,
      maxScore: 500,
      scores: [100, 0],
      link,
      practice: false,
    })
    expect(unfinished).toContain('not a finished five-question score')
    expect(unfinished).not.toContain('Five places, finished')
  })
})
