export function Mark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="4" fill="#10192a" stroke="#e0c17a" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="7" fill="none" stroke="#e0c17a" strokeWidth="1.2" />
      <path d="M16 8.4 17.7 16 16 14.8 14.3 16Z" fill="#e0c17a" />
      <circle cx="16" cy="16" r="1.2" fill="#8eb4d4" />
    </svg>
  )
}
