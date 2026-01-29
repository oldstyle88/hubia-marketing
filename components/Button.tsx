import { Link } from '@/i18n/navigation'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-200 rounded-xl'

  const variants = {
    primary:
      'bg-gradient-to-r from-accent-blue to-accent-violet text-white border-0 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent-violet/50 focus:ring-offset-2 focus:ring-offset-background',
    secondary:
      'bg-surface border border-border-strong text-primary hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-background',
    outline:
      'border border-white/20 bg-transparent text-primary hover:bg-white/5 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-background',
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
