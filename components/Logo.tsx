'use client'

import { Link } from '@/i18n/navigation'
import { useId } from 'react'

interface LogoProps {
  variant: 'header' | 'hero'
  href?: string
}

export function Logo({ variant, href = '/' }: LogoProps) {
  const isHero = variant === 'hero'
  const iconSize = isHero ? 150 : 44
  const id = useId().replace(/:/g, '')
  const gradientId = `hubia-grad-${id}`
  const glowId = `hubia-glow-${id}`

  const content = (
    <>
      <div className="relative flex items-center justify-center">
        <svg
          aria-hidden
          width={iconSize}
          height={iconSize}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-warp"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5CC8FF" />
              <stop offset="52%" stopColor="#8B5BFF" />
              <stop offset="100%" stopColor="#D26BFF" />
            </linearGradient>
            <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orbit rings */}
          <g className="logo-ring-group">
            <circle cx="60" cy="60" r="44" stroke={`url(#${gradientId})`} strokeWidth="2.2" className="logo-ring logo-ring-1" />
            <circle cx="60" cy="60" r="34" stroke={`url(#${gradientId})`} strokeWidth="1.6" className="logo-ring logo-ring-2" />
            <circle cx="60" cy="60" r="52" stroke={`url(#${gradientId})`} strokeWidth="1.2" className="logo-ring logo-ring-3" />
          </g>

          {/* Orbiting nodes */}
          <g className="logo-orbit-nodes">
            <circle cx="60" cy="8" r="5.2" fill={`url(#${gradientId})`} className="logo-node" />
            <circle cx="112" cy="60" r="5.2" fill={`url(#${gradientId})`} className="logo-node" />
            <circle cx="60" cy="112" r="5.2" fill={`url(#${gradientId})`} className="logo-node" />
            <circle cx="8" cy="60" r="5.2" fill={`url(#${gradientId})`} className="logo-node" />
          </g>

          {/* H mark */}
          <g filter={`url(#${glowId})`} className="logo-h">
            <path
              d="M 44 34 L 44 86 M 76 34 L 76 86 M 44 60 L 76 60"
              stroke={`url(#${gradientId})`}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <span
        className={`font-semibold tracking-logo bg-gradient-accent bg-clip-text text-transparent ${
          isHero ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-xl'
        }`}
      >
        HŪBIA
      </span>
    </>
  )

  const wrapperClass = isHero
    ? 'inline-flex flex-col items-center justify-center gap-4'
    : 'inline-flex items-center gap-3'

  if (href) {
    return (
      <Link href={href} className={wrapperClass} aria-label="HŪBIA home">
        {content}
      </Link>
    )
  }

  return <span className={wrapperClass}>{content}</span>
}
