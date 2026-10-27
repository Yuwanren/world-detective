import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Mark } from './Mark.tsx'
import { LanguageSwitch } from './LanguageSwitch.tsx'
import { t } from '../i18n/index.ts'
import { useLocale } from '../hooks/useLocale.ts'

export function AppShell({ children, size = 'narrow' }: { children: ReactNode; size?: 'narrow' | 'wide' }) {
  const { locale } = useLocale()
  const width = size === 'wide' ? 'max-w-5xl' : 'max-w-lg'

  return (
    <div className="min-h-dvh">
      <div className={`mx-auto flex min-h-dvh w-full flex-col px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-5 sm:pt-6 sm:pb-[max(2.5rem,env(safe-area-inset-bottom))] ${width}`}>
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 text-ink">
            <Mark />
            <span className="truncate font-serif text-lg tracking-tight">{t(locale, 'brand')}</span>
          </Link>
          <LanguageSwitch />
        </header>
        <main className="flex flex-1 flex-col pt-4 lg:pt-8">{children}</main>
      </div>
    </div>
  )
}
