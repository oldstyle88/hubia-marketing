import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'dark'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const base = 'rounded-2xl p-8 transition-all duration-200 shadow-soft'
  if (variant === 'dark') {
    return (
      <div className={`${base} bg-surface-elevated border border-border-strong ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className={`${base} glass-card neon-border ${className}`}>
      {children}
    </div>
  )
}
