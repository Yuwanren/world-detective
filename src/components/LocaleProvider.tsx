import { useEffect, useState, type ReactNode } from 'react'
import { LocaleContext } from '../hooks/useLocale.ts'
import { loadLocale, saveLocale } from '../lib/storage.ts'
import type { Locale } from '../types/index.ts'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => loadLocale())

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = 'World Detective'
  }, [locale])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    saveLocale(next)
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}
