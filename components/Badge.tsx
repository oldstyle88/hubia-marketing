import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-[var(--secondary)]/35 bg-[var(--secondary)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)] ${className}`}>
      {children}
    </span>
  )
}
