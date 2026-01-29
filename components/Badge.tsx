import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-accent-violet/15 text-accent-violet-soft border border-champagne/40 ${className}`}
    >
      {children}
    </span>
  )
}
