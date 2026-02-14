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
      'bg-gradient-accent text-navy font-semibold shadow-card hover:scale-[1.02] hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-teal/60 focus:ring-offset-2 focus:ring-offset-navy transition-transform',
    secondary:
      'bg-surface border border-white/20 text-primary hover:border-teal/50 hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-teal/50 focus:ring-offset-2 focus:ring-offset-navy',
    outline:
      'border border-white/30 bg-transparent text-primary hover:bg-white/5 hover:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:ring-offset-2 focus:ring-offset-navy',
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
