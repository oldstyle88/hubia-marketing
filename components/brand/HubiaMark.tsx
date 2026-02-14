'use client'

import { useId } from 'react'

export interface HubiaMarkProps {
  /** Altezza (e larghezza) in px. Crisp su retina grazie a viewBox. */
  size?: number
  /** solid = teal unico, gradient = navy → teal come riferimento brand. */
  variant?: 'solid' | 'gradient'
  className?: string
  /** Per accessibilità: lasciare vuoto se decorativo (aria-hidden sul wrapper). */
  'aria-hidden'?: boolean
}

const VIEWBOX_SIZE = 100

/**
 * H premium come riferimento immagine: due barre verticali + barra diagonale
 * (dall’interno alto-sinistra all’interno basso-destra). Navy → teal.
 */
export function HubiaMark({
  size = 40,
  variant = 'gradient',
  className = '',
  'aria-hidden': ariaHidden,
}: HubiaMarkProps) {
  const id = useId().replace(/:/g, '')
  const gradId = `hubia-mark-grad-${id}`
  const shadowId = `hubia-mark-shadow-${id}`

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="35%" stopColor="#0EA5E9" />
          <stop offset="70%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <filter id={shadowId} x="-20%" y="-10%" width="140%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter={`url(#${shadowId})`}>
        <path d="M 15 0 L 35 0 L 35 100 L 15 100 Z" fill={variant === 'gradient' ? `url(#${gradId})` : '#00D4FF'} />
        <path d="M 65 0 L 85 0 L 85 100 L 65 100 Z" fill={variant === 'gradient' ? `url(#${gradId})` : '#00D4FF'} />
        <path d="M 28 8 L 42 2 L 72 92 L 58 98 Z" fill={variant === 'gradient' ? `url(#${gradId})` : '#00D4FF'} />
      </g>
    </svg>
  )
}
