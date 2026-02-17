import type { Metadata } from 'next'
import { Sora, Manrope } from 'next/font/google'
import './globals.css'

const displayFont = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.hubiasystem.com'
const faviconVersion = 'v=10'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'HŪBIA — Operating System for Local Excellence',
  description:
    'HŪBIA trasforma operazioni, agenda, staff e customer experience in un sistema unico, premium e scalabile per attività locali.',
  keywords: [
    'PWA',
    'prenotazioni',
    'barbiere',
    'parrucchiere',
    'beauty center',
    'studio medico',
    'pet grooming',
    'booking',
    'local business',
    'gestione staff',
  ],
  authors: [{ name: 'HŪBIA' }],
  icons: {
    icon: [
      { url: `/favicon.ico?${faviconVersion}`, sizes: 'any' },
      { url: `/brand/icon-192.png?${faviconVersion}`, sizes: '192x192', type: 'image/png' },
      { url: `/brand/icon-512.png?${faviconVersion}`, sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: `/brand/apple-touch-icon.png?${faviconVersion}`, sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'HŪBIA — Operating System for Local Excellence',
    description:
      'Una piattaforma premium per gestire prenotazioni, staff, clienti e performance con standard enterprise.',
    type: 'website',
    locale: 'it_IT',
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HŪBIA — Sistema operativo per attività locali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HŪBIA — Operating System for Local Excellence',
    description: 'Sistema premium per attività locali ad alta crescita.',
    images: ['/brand/og-image.png'],
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
        <link rel="icon" href={`/favicon.ico?${faviconVersion}`} sizes="any" />
        <link rel="apple-touch-icon" href={`/brand/apple-touch-icon.png?${faviconVersion}`} />
      </head>
      <body className="font-sans bg-[var(--bg)]">
        <div className="relative z-10 min-h-screen bg-[var(--bg)]">{children}</div>
      </body>
    </html>
  )
}
