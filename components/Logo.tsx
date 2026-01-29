'use client'

import { useId } from 'react'
import { Link } from '@/i18n/navigation'

interface LogoProps {
  variant: 'header' | 'hero'
  href?: string
}

export function Logo({ variant, href = '/' }: LogoProps) {
  const id = useId().replace(/:/g, '')
  const gradientId = `hubia-g-${id}`
  const glowId = `hubia-glow-${id}`
  const isHero = variant === 'hero'

  const content = (
    <>
      <svg
        aria-hidden
        className="flex-shrink-0"
        width={isHero ? 56 : 28}
        height={isHero ? 56 : 28}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Stylized H: two vertical bars + horizontal bar */}
        <path
          d="M14 8v40M42 8v40M14 32h28"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          className="logo-mark-stroke"
        />
      </svg>
      <span
        className={`font-semibold tracking-tight tabular-nums logo-wordmark ${
          isHero ? 'text-4xl sm:text-5xl' : 'text-xl'
        }`}
      >
        HŪBIA
      </span>
    </>
  )

  const wrapperClass = isHero
    ? 'inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 logo-hero'
    : 'inline-flex items-center gap-2 logo-header'

  if (href) {
    return (
      <Link href={href} className={wrapperClass} aria-label="HŪBIA home">
        {content}
      </Link>
    )
  }

  return <span className={wrapperClass}>{content}</span>
}
