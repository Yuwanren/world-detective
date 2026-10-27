import { en, type MessageKey } from './en.ts'
import { zh } from './zh.ts'
import type { RankId } from '../lib/scoring.ts'
import type { Category, Locale } from '../types/index.ts'

const dictionaries = { en, zh } satisfies Record<Locale, Record<MessageKey, string>>

export function t(locale: Locale, key: MessageKey): string {
  return dictionaries[locale][key]
}

export function clueLabel(locale: Locale, index: number): string {
  return locale === 'zh' ? `线索 ${index}` : `Clue ${index}`
}

export function questionLabel(locale: Locale, current: number, total: number): string {
  return locale === 'zh' ? `第 ${current} / ${total} 题` : `Question ${current} of ${total}`
}

export function potentialLabel(locale: Locale, points: number): string {
  return locale === 'zh' ? `现在标记可得 ${points} 分` : `${points} points if you pin it now`
}

export function spentClueLabel(locale: Locale, points: number): string {
  return locale === 'zh' ? `这条线索已经用过。打开下一条后可得 ${points} 分` : `This clue is used. The next one is worth ${points}`
}

export function pointsLabel(locale: Locale, points: number): string {
  return locale === 'zh' ? `+${points} 分` : `+${points}`
}

export function scoreOutOf(locale: Locale, max: number): string {
  return locale === 'zh' ? `满分 ${max}` : `out of ${max}`
}

export function categoryLabel(locale: Locale, category: Category): string {
  if (category === 'country') return t(locale, 'categoryCountry')
  if (category === 'city') return t(locale, 'categoryCity')
  return t(locale, 'categoryLandmark')
}

const rankKeys = {
  master: 'rankMaster',
  sharp: 'rankSharp',
  explorer: 'rankExplorer',
  recruit: 'rankRecruit',
  open: 'rankOpen',
} as const satisfies Record<RankId, MessageKey>

export function rankTitle(locale: Locale, rank: RankId): string {
  return t(locale, rankKeys[rank])
}

export function caseLabel(locale: Locale, current: number, total: number): string {
  const index = String(current).padStart(2, '0')
  const count = String(total).padStart(2, '0')
  return locale === 'zh' ? `档案 ${index}/${count}` : `Case ${index}/${count}`
}
