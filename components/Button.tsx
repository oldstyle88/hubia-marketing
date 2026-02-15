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
    'inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2'

  const variants = {
    primary:
      'bg-[var(--secondary)] text-[var(--primary)] shadow-md hover:brightness-95 focus:ring-[var(--secondary)]/60',
    secondary:
      'bg-white border border-[var(--line)] text-[var(--primary)] hover:border-[var(--secondary)]/50 focus:ring-[var(--secondary)]/50',
    outline:
      'border border-[var(--secondary)] text-[var(--secondary)] bg-transparent hover:bg-[var(--secondary)]/10 focus:ring-[var(--secondary)]/40',
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
