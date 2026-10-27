import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { LocaleProvider } from '../components/LocaleProvider.tsx'
import { HomePage } from '../pages/HomePage.tsx'
import { questions } from '../data/questions.ts'
import { BANK_VERSION } from '../lib/constants.ts'
import { formatChallengeDate, getLocalDateString } from '../lib/date.ts'
import { createGameState, reduceGame } from '../lib/game.ts'
import { isExtraUnlocked, saveDaily } from '../lib/storage.ts'
import { pin } from './pins.ts'

function renderHome() {
  return render(
    <LocaleProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </LocaleProvider>,
  )
}

describe('home page', () => {
  it('shows the daily challenge in English and can switch to Chinese', async () => {
    renderHome()
    expect(screen.getByRole('link', { name: 'World Detective' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'The world is full of secrets.' })).toBeInTheDocument()
    expect(screen.getByText('Five mysterious places. Four clues each. How early can you solve them?')).toBeInTheDocument()
    expect(screen.getByText('Read the clues, pin the globe, and score more by solving a place earlier.')).toBeInTheDocument()
    expect(screen.getByText('0/5')).toBeInTheDocument()
    expect(screen.getByText(formatChallengeDate(getLocalDateString(), 'en'))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Start investigation' })).toHaveAttribute('href', '/play')
    const map = screen.getByRole('img', { name: 'World chart' })
    expect(map.querySelectorAll('path').length).toBeGreaterThan(40)
    expect(map.querySelector('circle')).toBeNull()

    await userEvent.click(screen.getByRole('button', { name: '中文' }))
    expect(screen.getByRole('heading', { level: 1, name: '世界藏着五个秘密。' })).toBeInTheDocument()
    expect(screen.getByText('五个未知地点，每个地点四条线索。你能在揭晓答案前找到它们吗？')).toBeInTheDocument()
    expect(screen.getByText('读线索，在地球上标记地点。越早猜中，得分越高。')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '世界海图' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '开始调查' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '怎么玩' })).toBeInTheDocument()
  })

  it('shows saved daily progress', () => {
    const ids = ['japan', 'france', 'egypt', 'brazil', 'canada']
    let state = createGameState({
      mode: 'daily',
      date: getLocalDateString(),
      bankVersion: BANK_VERSION,
      questionIds: ids,
    })
    state = reduceGame(reduceGame(state, { type: 'set-guess', point: pin('japan') }, questions), { type: 'submit-pin' }, questions)
    state = reduceGame(state, { type: 'next' }, questions)
    state = reduceGame(reduceGame(state, { type: 'set-guess', point: pin('france') }, questions), { type: 'submit-pin' }, questions)
    state = reduceGame(state, { type: 'next' }, questions)
    saveDaily(state)

    renderHome()
    expect(screen.getByText('2/5')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Continue investigation' })).toHaveAttribute('href', '/play')
    expect(screen.queryByRole('link', { name: 'Play five more' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Share results to unlock five more' })).not.toBeInTheDocument()
  })

  it('unlocks five more places after the official result is shared', async () => {
    const ids = ['japan', 'france', 'egypt', 'brazil', 'canada']
    let state = createGameState({
      mode: 'daily',
      date: getLocalDateString(),
      bankVersion: BANK_VERSION,
      questionIds: ids,
    })
    for (const id of ids) {
      state = reduceGame(reduceGame(state, { type: 'set-guess', point: pin(id) }, questions), { type: 'submit-pin' }, questions)
      state = reduceGame(state, { type: 'next' }, questions)
    }
    saveDaily(state)
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    renderHome()
    expect(screen.queryByRole('link', { name: 'Play five more' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Share results to unlock five more' }))

    expect(writeText).toHaveBeenCalled()
    expect(isExtraUnlocked(getLocalDateString(), BANK_VERSION)).toBe(true)
    expect(screen.getByRole('link', { name: 'Play five more' })).toHaveAttribute('href', '/play?mode=practice&fresh=1')
  })
})
