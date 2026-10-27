import { STORAGE_KEY } from './constants.ts'
import { isGameState } from './game.ts'
import { totalScore } from './scoring.ts'
import type { GameState, Locale } from '../types/index.ts'

export interface KeyValueStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

interface SaveFile {
  locale: Locale
  daily: Record<string, GameState>
  practice: GameState | null
  bestScore: number | null
  extraUnlocked: Record<string, true>
}

function emptyFile(): SaveFile {
  return { locale: 'en', daily: {}, practice: null, bestScore: null, extraUnlocked: {} }
}

function browserStore(): KeyValueStore {
  return localStorage
}

function slotKey(date: string, bankVersion: string): string {
  return `${date}:${bankVersion}`
}

function sanitize(value: unknown): SaveFile {
  const empty = emptyFile()
  if (!value || typeof value !== 'object') return empty
  const raw = value as Partial<SaveFile>
  const locale = raw.locale === 'zh' ? 'zh' : 'en'
  const daily: Record<string, GameState> = {}
  if (raw.daily && typeof raw.daily === 'object') {
    for (const [key, entry] of Object.entries(raw.daily)) {
      if (isGameState(entry) && entry.mode === 'daily') daily[key] = entry
    }
  }
  const practice = isGameState(raw.practice) && raw.practice.mode === 'practice' ? raw.practice : null
  const bestScore = typeof raw.bestScore === 'number' && Number.isFinite(raw.bestScore) ? raw.bestScore : null
  const extraUnlocked: Record<string, true> = {}
  if (raw.extraUnlocked && typeof raw.extraUnlocked === 'object') {
    for (const [key, value] of Object.entries(raw.extraUnlocked)) {
      if (value === true) extraUnlocked[key] = true
    }
  }
  return { locale, daily, practice, bestScore, extraUnlocked }
}

function readFile(store: KeyValueStore): SaveFile {
  try {
    const raw = store.getItem(STORAGE_KEY)
    if (!raw) return emptyFile()
    return sanitize(JSON.parse(raw) as unknown)
  } catch {
    return emptyFile()
  }
}

function writeFile(store: KeyValueStore, file: SaveFile): void {
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(file))
  } catch {
    // Private mode and full storage should not crash the round.
  }
}

export function loadLocale(store: KeyValueStore = browserStore()): Locale {
  return readFile(store).locale
}

export function saveLocale(locale: Locale, store: KeyValueStore = browserStore()): void {
  const file = readFile(store)
  writeFile(store, { ...file, locale })
}

export function loadDaily(
  date: string,
  bankVersion: string,
  store: KeyValueStore = browserStore(),
): GameState | null {
  return readFile(store).daily[slotKey(date, bankVersion)] ?? null
}

export function saveDaily(state: GameState, store: KeyValueStore = browserStore()): void {
  const file = readFile(store)
  const finished = state.status === 'complete' ? totalScore(state.results) : null
  const bestScore = finished === null ? file.bestScore : Math.max(file.bestScore ?? finished, finished)
  writeFile(store, {
    ...file,
    bestScore,
    daily: {
      ...file.daily,
      [slotKey(state.date, state.bankVersion)]: state,
    },
  })
}

export function loadBestScore(store: KeyValueStore = browserStore()): number | null {
  const file = readFile(store)
  let best = file.bestScore
  for (const game of Object.values(file.daily)) {
    if (game.status !== 'complete') continue
    const score = totalScore(game.results)
    best = best === null ? score : Math.max(best, score)
  }
  return best
}

export function loadPractice(store: KeyValueStore = browserStore()): GameState | null {
  return readFile(store).practice
}

export function savePractice(state: GameState, store: KeyValueStore = browserStore()): void {
  const file = readFile(store)
  writeFile(store, { ...file, practice: state })
}

export function isExtraUnlocked(date: string, bankVersion: string, store: KeyValueStore = browserStore()): boolean {
  return readFile(store).extraUnlocked[slotKey(date, bankVersion)] === true
}

export function unlockExtra(date: string, bankVersion: string, store: KeyValueStore = browserStore()): void {
  const file = readFile(store)
  const key = slotKey(date, bankVersion)
  if (file.extraUnlocked[key]) return
  writeFile(store, { ...file, extraUnlocked: { ...file.extraUnlocked, [key]: true } })
}
