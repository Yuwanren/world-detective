export type Locale = 'en' | 'zh'

export type Category = 'country' | 'city' | 'landmark'

export type GameMode = 'daily' | 'practice'

export type RoundStatus = 'guessing' | 'feedback' | 'complete'

export interface LocalizedText {
  en: string
  zh: string
}

export interface Question {
  id: string
  category: Category
  answers: Record<Locale, readonly string[]>
  clues: readonly LocalizedText[]
  explanation: LocalizedText
}

export interface QuestionResult {
  questionId: string
  score: number
  cluesUsed: number
  solved: boolean
  distanceKm?: number | null
  borderHit?: boolean | null
}

export interface GameState {
  mode: GameMode
  date: string
  bankVersion: string
  questionIds: readonly string[]
  currentIndex: number
  cluesRevealed: number
  status: RoundStatus
  attemptUsed: boolean
  lastAnswerCorrect: boolean | null
  guess?: { latitude: number; longitude: number } | null
  results: readonly QuestionResult[]
}

export type GameAction =
  | { type: 'set-guess'; point: { latitude: number; longitude: number } }
  | { type: 'clear-guess' }
  | { type: 'submit-pin' }
  | { type: 'reveal-clue' }
  | { type: 'give-up' }
  | { type: 'next' }

export interface DailyProgress {
  solved: number
  total: number
  phase: 'new' | 'active' | 'complete'
}
