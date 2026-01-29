import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-sm bg-accent/15 text-accent uppercase tracking-[0.18em] ${className}`}
    >
      {children}
    </span>
  )
}
