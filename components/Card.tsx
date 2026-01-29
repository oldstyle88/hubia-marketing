import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'dark'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  if (variant === 'dark') {
    return (
      <div className={`bg-white/5 border border-border-strong rounded-xl p-8 backdrop-blur-sm ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className={`bg-surface border border-border-strong rounded-xl p-8 ${className}`}>
      {children}
    </div>
  )
}
