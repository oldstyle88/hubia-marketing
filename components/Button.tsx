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
    'inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-200 rounded-sm'

  const variants = {
    primary:
      'bg-gradient-accent text-white shadow-glow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background',
    secondary:
      'bg-ink text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ink/30 focus:ring-offset-2 focus:ring-offset-background',
    outline:
      'border border-border bg-surface text-primary hover:bg-champagne/70 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background',
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
