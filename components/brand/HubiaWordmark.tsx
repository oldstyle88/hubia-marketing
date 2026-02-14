'use client'

export interface HubiaWordmarkProps {
  /** Dimensione testo: 'sm' | 'md' | 'lg' (hero). */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'text-sm tracking-[0.2em] font-semibold',
  md: 'text-lg tracking-[0.18em] font-semibold',
  lg: 'text-3xl sm:text-4xl md:text-5xl tracking-[0.14em] font-semibold',
}

/**
 * Wordmark "HUBIA": tipografia enterprise, tracking aumentato, nessun effetto gaming.
 */
export function HubiaWordmark({ size = 'md', className = '' }: HubiaWordmarkProps) {
  return (
    <span className={`font-display text-primary ${sizeClasses[size]} ${className}`.trim()}>
      HUBIA
    </span>
  )
}
