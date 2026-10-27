import type { ButtonHTMLAttributes } from 'react'

export const primaryActionClass =
  'inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-5 text-base font-semibold text-[#1c1408] transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40'

export const secondaryActionClass =
  'inline-flex h-12 w-full items-center justify-center rounded-md border border-line bg-card px-5 text-base font-medium text-ink transition-colors hover:border-accent/70 disabled:cursor-not-allowed disabled:opacity-40'

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  const variantClass = variant === 'primary' ? primaryActionClass : secondaryActionClass
  return <button type={type} className={`${variantClass} ${className}`} {...props} />
}
