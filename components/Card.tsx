import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'dark'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const base = 'rounded-2xl border p-8 shadow-[0_18px_44px_rgba(2,10,26,0.45)] backdrop-blur-sm transition-all duration-200'

  if (variant === 'dark') {
    return <div className={`${base} border-white/20 bg-white/10 ${className}`}>{children}</div>
  }

  return <div className={`${base} border-white/12 bg-white/5 ${className}`}>{children}</div>
}
