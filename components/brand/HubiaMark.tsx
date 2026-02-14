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
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--hubia-blue-1, #7BA8F0)" />
          <stop offset="50%" stopColor="var(--hubia-blue-mid, #4A7FD9)" />
          <stop offset="100%" stopColor="var(--hubia-blue-2, #2563EB)" />
        </linearGradient>
      </defs>
      {/* Left vertical bar (trapezoid, inner edge tapered) */}
      <path
        d="M 18 0 L 36 0 L 32 50 L 36 100 L 18 100 Z"
        fill={variant === 'gradient' ? `url(#${gradId})` : 'var(--hubia-blue-1, #7BA8F0)'}
      />
      {/* Right vertical bar */}
      <path
        d="M 64 0 L 82 0 L 82 100 L 64 100 L 68 50 Z"
        fill={variant === 'gradient' ? `url(#${gradId})` : 'var(--hubia-blue-1, #7BA8F0)'}
      />
      {/* Horizontal crossbar */}
      <path
        d="M 32 44 L 68 44 L 68 56 L 32 56 Z"
        fill={variant === 'gradient' ? `url(#${gradId})` : 'var(--hubia-blue-1, #7BA8F0)'}
      />
    </svg>
  )
}
