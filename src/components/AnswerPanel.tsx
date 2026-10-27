import { useState, type FormEvent } from 'react'
import { answerPrompts } from '../data/prompts.ts'
import { Button } from './Button.tsx'
import { normalizeAnswer } from '../lib/answers.ts'
import { orderedOptions } from '../lib/promptOrder.ts'
import { t } from '../i18n/index.ts'
import type { Locale, Question } from '../types/index.ts'

export function AnswerPanel({
  question,
  locale,
  disabled,
  onSubmit,
}: {
  question: Question
  locale: Locale
  disabled: boolean
  onSubmit: (answer: string) => void
}) {
  const prompt = answerPrompts[question.id]
  if (prompt?.kind === 'choices') {
    const options = orderedOptions(question.id, prompt.options[locale])
    return (
      <div>
        <p className="text-sm font-medium text-ink" id={`${question.id}-choices`}>
          {t(locale, 'choicesLabel')}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-labelledby={`${question.id}-choices`}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => onSubmit(option)}
              className="h-12 rounded-md border border-line bg-[#0e1724] px-3 text-left text-sm text-ink transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <TypedAnswer
      key={`${question.id}:${locale}`}
      locale={locale}
      disabled={disabled}
      suggestions={prompt?.kind === 'suggestions' ? prompt.options[locale] : null}
      onSubmit={onSubmit}
    />
  )
}

function TypedAnswer({
  locale,
  disabled,
  suggestions,
  onSubmit,
}: {
  locale: Locale
  disabled: boolean
  suggestions: readonly string[] | null
  onSubmit: (answer: string) => void
}) {
  const [value, setValue] = useState('')
  const query = normalizeAnswer(value)
  const matches = suggestions && query ? suggestions.filter((option) => normalizeAnswer(option).includes(query)).slice(0, 6) : []

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = value
    setValue('')
    onSubmit(next)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label className="text-sm font-medium text-ink" htmlFor="answer">
        {t(locale, 'answerLabel')}
      </label>
      {suggestions ? <p className="text-sm leading-6 text-muted">{t(locale, 'suggestHint')}</p> : null}
      <input
        id="answer"
        value={value}
        disabled={disabled}
        maxLength={80}
        autoComplete="off"
        autoCapitalize="words"
        enterKeyHint="done"
        placeholder={t(locale, 'answerPlaceholder')}
        onChange={(event) => setValue(event.target.value)}
        className="h-12 w-full rounded-md border border-line bg-[#0e1724] px-4 text-base text-ink placeholder:text-muted disabled:opacity-40"
      />
      {suggestions && query && matches.length > 0 ? (
        <ul className="overflow-hidden rounded-md border border-line" aria-label={t(locale, 'suggestHint')}>
          {matches.map((option) => (
            <li key={option}>
              <button
                type="button"
                disabled={disabled}
                className="w-full px-4 py-3 text-left text-sm text-ink hover:bg-[#182536] disabled:opacity-40"
                onClick={() => onSubmit(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {suggestions && query && matches.length === 0 ? <p className="text-sm text-muted">{t(locale, 'noMatches')}</p> : null}
      <Button type="submit" disabled={disabled || value.trim().length === 0}>
        {t(locale, 'submit')}
      </Button>
    </form>
  )
}
