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
      'bg-gradient-accent text-white shadow-glow hover:brightness-110 hover:shadow-glow-strong focus:outline-none focus:ring-2 focus:ring-accent-violet/60 focus:ring-offset-2 focus:ring-offset-background',
    secondary:
      'bg-surface-elevated border border-border-strong text-primary hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-background',
    outline:
      'border border-white/20 bg-transparent text-primary hover:bg-white/5 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/40 focus:ring-offset-2 focus:ring-offset-background',
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
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
