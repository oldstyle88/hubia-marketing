'use client'

import { Link } from '@/i18n/navigation'
import { HubiaMark } from '@/components/brand/HubiaMark'
import { HubiaWordmark } from '@/components/brand/HubiaWordmark'

interface LogoProps {
  variant: 'header' | 'hero'
  href?: string
}

export function Logo({ variant, href = '/' }: LogoProps) {
  if (variant === 'header') {
    const content = (
      <>
        <img
          src="/brand/hubia-logo-extracted.png?v=2"
          alt="HUBIA"
          className="h-8 flex-shrink-0 md:h-10 w-auto object-contain"
          aria-hidden
        />
        <span className="sr-only">HUBIA</span>
      </>
    )
    const wrapperClass = 'inline-flex items-center gap-2'
    if (href) {
      return (
        <Link href={href} className={wrapperClass} aria-label="Hubia">
          {content}
        </Link>
      )
    }
    return <span className={wrapperClass}>{content}</span>
  }

  // Hero: H minimal grande + wordmark sotto, spacing luxury
  const content = (
    <>
      <HubiaMark
        size={96}
        variant="gradient"
        className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 flex-shrink-0"
        aria-hidden
      />
      <HubiaWordmark size="lg" />
    </>
  )

  const wrapperClass = 'inline-flex flex-col items-center justify-center gap-6'

  if (href) {
    return (
      <Link href={href} className={wrapperClass} aria-label="Hubia">
        {content}
      </Link>
    )
  }

  return <span className={wrapperClass}>{content}</span>
}
