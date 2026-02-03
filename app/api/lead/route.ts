import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function hashForLead(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex').slice(0, 64)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}


const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5
const COOLDOWN_MS = 30 * 1000 // 30s cooldown per IP after a successful submit
const ipCounts = new Map<string, { count: number; resetAt: number }>()
const ipLastSuccess = new Map<string, number>()

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipCounts.get(ip)
  if (!entry) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  if (now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

function inCooldown(ip: string): boolean {
  const last = ipLastSuccess.get(ip)
  if (!last) return false
  return Date.now() - last < COOLDOWN_MS
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME = 200
const MAX_MESSAGE = 2000
const MAX_PHONE = 50
const BUSINESS_VALUES = ['barber', 'pizzeria', 'gym', 'food', 'other']

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra un minuto.' },
      { status: 429 }
    )
  }

  if (inCooldown(ip)) {
    return NextResponse.json(
      { error: 'Attendi qualche secondo prima di inviare di nuovo.' },
      { status: 429 }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    return NextResponse.json(
      { error: 'Configurazione server mancante.' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const rawName = typeof body.name === 'string' ? body.name.trim() : ''
    const rawEmail = typeof body.email === 'string' ? body.email.trim() : ''
    const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : undefined
    const rawBusiness = typeof body.business === 'string' ? body.business.trim() : ''
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : ''
    const rawLocale = typeof body.locale === 'string' ? body.locale.trim() : undefined
    const rawSourcePage = typeof body.source_page === 'string' ? body.source_page.trim() : undefined
    const rawPagePath = typeof body.page_path === 'string' ? body.page_path.trim() : undefined
    const rawUtmSource = typeof body.utm_source === 'string' ? body.utm_source.trim().slice(0, 200) : undefined
    const rawUtmMedium = typeof body.utm_medium === 'string' ? body.utm_medium.trim().slice(0, 200) : undefined
    const rawUtmCampaign = typeof body.utm_campaign === 'string' ? body.utm_campaign.trim().slice(0, 200) : undefined
    const rawUserAgent = typeof body.user_agent === 'string' ? body.user_agent.trim().slice(0, 500) : undefined
    const honeypot = typeof body.website === 'string' ? body.website.trim() : ''

    if (honeypot) {
      return NextResponse.json({ success: true, message: 'OK' })
    }

    if (!rawName || !rawEmail || !rawBusiness || !rawMessage) {
      return NextResponse.json(
        { error: 'Nome, email, tipo attività e messaggio sono obbligatori.' },
        { status: 400 }
      )
    }

    if (rawName.length > MAX_NAME) {
      return NextResponse.json(
        { error: `Nome troppo lungo (max ${MAX_NAME} caratteri).` },
        { status: 400 }
      )
    }
    if (!EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { error: 'Indirizzo email non valido.' },
        { status: 400 }
      )
    }
    if (rawPhone && rawPhone.length > MAX_PHONE) {
      return NextResponse.json(
        { error: `Telefono troppo lungo (max ${MAX_PHONE} caratteri).` },
        { status: 400 }
      )
    }
    if (!BUSINESS_VALUES.includes(rawBusiness)) {
      return NextResponse.json(
        { error: 'Tipo di attività non valido.' },
        { status: 400 }
      )
    }
    if (rawMessage.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: `Messaggio troppo lungo (max ${MAX_MESSAGE} caratteri).` },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // Hash user-agent server-side only (no PII in DB or logs)
    const userAgentHash = rawUserAgent ? hashForLead(rawUserAgent) : null

    const { error } = await supabase.from('leads').insert({
      name: rawName,
      email: rawEmail,
      phone: rawPhone || null,
      message: rawMessage,
      locale: rawLocale || null,
      source_page: rawSourcePage || null,
      page_path: rawPagePath || rawSourcePage || null,
      utm_source: rawUtmSource || null,
      utm_medium: rawUtmMedium || null,
      utm_campaign: rawUtmCampaign || null,
      user_agent_hash: userAgentHash,
      business: rawBusiness,
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Errore nel salvataggio. Riprova più tardi.' },
        { status: 500 }
      )
    }

    // Notifica email opzionale a indirizzo dedicato (es. contatti@hubiasystem.com)
    const resendKey = process.env.RESEND_API_KEY
    const toEmail = process.env.LEAD_NOTIFICATION_EMAIL
    if (resendKey && toEmail) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'HUBIA Sito <onboarding@resend.dev>'
      const resend = new Resend(resendKey)
      const businessLabel: Record<string, string> = {
        barber: 'Barbiere / Parrucchiere',
        pizzeria: 'Pizzeria',
        gym: 'Palestra',
        food: 'Food / Street food',
        other: 'Altro',
      }
      const html = [
        '<h2>Nuova richiesta da Contattaci</h2>',
        `<p><strong>Nome:</strong> ${escapeHtml(rawName)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(rawEmail)}</p>`,
        rawPhone ? `<p><strong>Telefono:</strong> ${escapeHtml(rawPhone)}</p>` : '',
        `<p><strong>Tipo attività:</strong> ${escapeHtml(businessLabel[rawBusiness] ?? rawBusiness)}</p>`,
        `<p><strong>Messaggio:</strong></p><pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(rawMessage)}</pre>`,
        rawLocale ? `<p><strong>Lingua:</strong> ${escapeHtml(rawLocale)}</p>` : '',
        rawPagePath ? `<p><strong>Pagina:</strong> ${escapeHtml(rawPagePath)}</p>` : '',
        [rawUtmSource, rawUtmMedium, rawUtmCampaign].some(Boolean)
          ? `<p><strong>UTM:</strong> source=${escapeHtml(rawUtmSource || '')} | medium=${escapeHtml(rawUtmMedium || '')} | campaign=${escapeHtml(rawUtmCampaign || '')}</p>`
          : '',
      ].filter(Boolean).join('')
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [toEmail],
          subject: `[HUBIA] Nuova richiesta da ${rawName}`,
          html,
        })
      } catch (emailErr) {
        console.error('Lead notification email failed:', emailErr)
        // Non blocchiamo la risposta: il lead è già salvato in Supabase
      }
    }

    ipLastSuccess.set(ip, Date.now())

    return NextResponse.json({
      success: true,
      message: 'Richiesta inviata con successo.',
    })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json(
      { error: 'Errore nel salvataggio. Riprova più tardi.' },
      { status: 500 }
    )
  }
}
