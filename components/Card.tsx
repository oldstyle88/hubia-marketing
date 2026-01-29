import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'dark'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const base = 'rounded-xl p-8 transition-all duration-200'
  const hoverGlow = 'hover:shadow-glow-hover hover:border-accent-violet/20'
  if (variant === 'dark') {
    return (
      <div className={`${base} bg-white/5 border border-border-strong backdrop-blur-md ${hoverGlow} ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className={`${base} bg-surface/80 border border-border-strong backdrop-blur-sm ${hoverGlow} ${className}`}>
      {children}
    </div>
  )
}
