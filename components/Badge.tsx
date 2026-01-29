import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-accent-blue uppercase tracking-[0.2em] border border-white/15 ${className}`}
    >
      {children}
    </span>
  )
}
