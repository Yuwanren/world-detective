import { useEffect, useState } from 'react'
import { playableQuestionIds } from '../data/locations.ts'
import { questions } from '../data/questions.ts'
import { BANK_VERSION, DAILY_QUESTION_COUNT } from '../lib/constants.ts'
import { selectDailyQuestionIds } from '../lib/daily.ts'
import { getUtcDateString } from '../lib/date.ts'
import { reduceGame, resumeOrCreate } from '../lib/game.ts'
import { loadDaily, loadPractice, saveDaily, savePractice } from '../lib/storage.ts'
import type { GameAction, GameMode, GameState } from '../types/index.ts'

const knownIds = new Set(playableQuestionIds(questions.map((question) => question.id)))

function openSession(mode: GameMode, fresh: boolean): GameState {
  const date = getUtcDateString()
  const questionIds = selectDailyQuestionIds(date, [...knownIds], DAILY_QUESTION_COUNT, BANK_VERSION)
  const saved = mode === 'practice' ? loadPractice() : loadDaily(date, BANK_VERSION)
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
