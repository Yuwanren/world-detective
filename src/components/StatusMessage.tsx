import type { ReactNode } from 'react'

export function StatusMessage({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-card px-6 py-12 text-center">
      <h1 className="font-serif text-3xl text-ink">{title}</h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">{body}</p>
      {action ? <div className="mx-auto mt-6 max-w-xs">{action}</div> : null}
    </section>
  )
}
