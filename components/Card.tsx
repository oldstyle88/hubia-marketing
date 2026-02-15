import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'dark'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const base = 'rounded-2xl p-8 transition-all duration-200'

  if (variant === 'dark') {
    return <div className={`${base} border border-[var(--line)] bg-[var(--bg-alt)] shadow-[0_16px_40px_rgba(16,24,40,0.08)] ${className}`}>{children}</div>
  }

  return <div className={`${base} border border-[var(--line)] bg-white/85 shadow-[0_20px_50px_rgba(16,24,40,0.10)] ${className}`}>{children}</div>
}
