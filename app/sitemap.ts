import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.hubiasystem.com'
const locales = ['it', 'en', 'de', 'es', 'fr']
const routes = ['', '/pricing', '/contact', '/privacy', '/terms']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    }))
  )
}
