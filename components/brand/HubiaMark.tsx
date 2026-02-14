'use client'

import { useId } from 'react'

export interface HubiaMarkProps {
  /** Altezza (e larghezza) in px. Crisp su retina grazie a viewBox. */
  size?: number
  /** solid = colore unico (--hubia-blue-1), gradient = gradiente blu premium. */
  variant?: 'solid' | 'gradient'
  className?: string
  /** Per accessibilità: lasciare vuoto se decorativo (aria-hidden sul wrapper). */
  'aria-hidden'?: boolean
}

const VIEWBOX_SIZE = 100

/**
 * H minimal premium: due pannelli verticali (leggermente trapezoidali) + barra orizzontale.
 * Solo vettoriale SVG inline, nessuna immagine. Colori via CSS variables.
 */
export function HubiaMark({
  size = 40,
  variant = 'gradient',
  className = '',
  'aria-hidden': ariaHidden,
}: HubiaMarkProps) {
  const id = useId().replace(/:/g, '')
  const gradId = `hubia-mark-grad-${id}`

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
        {/* Verticale: ceruleo in alto, indaco in basso (come riferimento) */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--hubia-blue-1, #8BB8F5)" />
          <stop offset="50%" stopColor="var(--hubia-blue-mid, #4A7FD9)" />
          <stop offset="100%" stopColor="var(--hubia-blue-2, #1E4A9E)" />
        </linearGradient>
      </defs>
      {/* Left panel: bordo interno diagonale verso il basso (più largo in alto) */}
      <path
        d="M 18 0 L 36 0 L 30 100 L 18 100 Z"
        fill={variant === 'gradient' ? `url(#${gradId})` : 'var(--hubia-blue-1, #8BB8F5)'}
      />
      {/* Right panel: bordo interno diagonale verso il basso (simmetrico) */}
      <path
        d="M 64 0 L 82 0 L 82 100 L 70 100 L 64 0 Z"
        fill={variant === 'gradient' ? `url(#${gradId})` : 'var(--hubia-blue-1, #8BB8F5)'}
      />
      {/* Barra orizzontale centrale */}
      <path
        d="M 33 42 L 67 42 L 67 58 L 33 58 Z"
        fill={variant === 'gradient' ? `url(#${gradId})` : 'var(--hubia-blue-1, #8BB8F5)'}
      />
    </svg>
  )
}
