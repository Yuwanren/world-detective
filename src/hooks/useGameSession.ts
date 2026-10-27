import { useEffect, useState } from 'react'
import { playableQuestionIds } from '../data/locations.ts'
import { questions } from '../data/questions.ts'
import { BANK_VERSION, DAILY_QUESTION_COUNT } from '../lib/constants.ts'
import { selectDailyQuestionIds, selectExtraQuestionIds } from '../lib/daily.ts'
import { getLocalDateString } from '../lib/date.ts'
import { reduceGame, resumeOrCreate } from '../lib/game.ts'
import { loadDaily, loadPractice, saveDaily, savePractice } from '../lib/storage.ts'
import type { GameAction, GameMode, GameState } from '../types/index.ts'

const knownIds = new Set(playableQuestionIds(questions.map((question) => question.id)))

function openSession(mode: GameMode, fresh: boolean): GameState {
  const date = getLocalDateString()
  const pool = [...knownIds]
  const dailyIds = selectDailyQuestionIds(date, pool, DAILY_QUESTION_COUNT, BANK_VERSION)
  const questionIds = mode === 'practice' ? selectExtraQuestionIds(date, pool, DAILY_QUESTION_COUNT, BANK_VERSION) : dailyIds
  const savedRaw = mode === 'practice' ? loadPractice() : loadDaily(date, BANK_VERSION)
  const repeatsOfficial = mode === 'practice' && savedRaw?.questionIds.some((id) => dailyIds.includes(id))
  const saved = repeatsOfficial ? null : savedRaw
  return resumeOrCreate({
    mode,
    date,
    bankVersion: BANK_VERSION,
    questionIds,
    saved,
    fresh,
    knownIds,
  })
}

export function useGameSession(mode: GameMode, fresh: boolean) {
  const [state, setState] = useState(() => openSession(mode, fresh))

  useEffect(() => {
    if (mode === 'practice') savePractice(state)
    else saveDaily(state)
  }, [mode, state])

  const dispatch = (action: GameAction) => {
    setState((current) => reduceGame(current, action, questions))
  }

  const reset = () => {
    setState(openSession(mode, true))
  }

  return { state, dispatch, reset }
}
