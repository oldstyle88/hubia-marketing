import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const LOCALES = ['it', 'en', 'de', 'es', 'fr'] as const
const baseMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const segment = pathname.split('/').filter(Boolean)[0]
  const locale = segment && LOCALES.includes(segment as (typeof LOCALES)[number]) ? segment : 'it'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-next-intl-locale', locale)
  const response = await baseMiddleware(request)
  if (response.status === 307 || response.status === 308) return response
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
