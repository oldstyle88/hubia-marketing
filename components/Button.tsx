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
  const baseClasses = 'inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-medium transition-all duration-200'

  const variants = {
    primary: 'hubia-btn-primary',
    secondary: 'hubia-btn-secondary text-slate-100',
    outline:
      'rounded-xl border border-cyan-200/35 bg-white/5 text-slate-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/40',
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
