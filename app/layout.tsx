import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hubia.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'HŪBIA — The premium PWA platform for local businesses',
  description:
    'Booking, ordering, staff & analytics — deployed per shop, zero template branding leaks. PWA-only, installable on iOS and Android.',
  keywords: [
    'PWA',
    'prenotazioni',
    'barber',
    'hair salon',
    'beauty',
    'booking',
    'local business',
    'staff dashboard',
  ],
  authors: [{ name: 'HŪBIA' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'HŪBIA — The premium PWA platform for local businesses',
    description:
      'Booking, ordering, staff & analytics. PWA-only, deploy per shop.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'HŪBIA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HŪBIA — The premium PWA platform for local businesses',
    description: 'Booking, ordering, staff & analytics. PWA-only.',
    images: ['/brand/hubia-logo.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
      </head>
      <body className="font-sans bg-background">
        <div className="relative z-10 min-h-screen bg-background">{children}</div>
      </body>
    </html>
  )
}
