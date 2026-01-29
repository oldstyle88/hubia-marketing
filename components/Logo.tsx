'use client'

import { Link } from '@/i18n/navigation'

interface LogoProps {
  variant: 'header' | 'hero'
  href?: string
}

export function Logo({ variant, href = '/' }: LogoProps) {
  const isHero = variant === 'hero'
  const iconSize = isHero ? 64 : 32

  const content = (
    <>
      <svg
        aria-hidden
        className="flex-shrink-0 text-accent"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="21" cy="21" r="19" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
        <path
          d="M10 28 C15 18, 17 14, 21 14 C25 14, 27 18, 32 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="logo-line"
        />
        <path
          d="M10 14 C15 24, 17 28, 21 28 C25 28, 27 24, 32 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="logo-line"
        />
        <circle cx="21" cy="21" r="4.2" fill="currentColor" className="logo-node" />
      </svg>
      <span
        className={`font-semibold tracking-logo text-primary ${
          isHero ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-xl'
        }`}
      >
        HŪBIA
      </span>
    </>
  )

  const wrapperClass = isHero
    ? 'inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'
    : 'inline-flex items-center gap-2'

  if (href) {
    return (
      <Link href={href} className={wrapperClass} aria-label="HŪBIA home">
        {content}
      </Link>
    )
  }

  return <span className={wrapperClass}>{content}</span>
}
