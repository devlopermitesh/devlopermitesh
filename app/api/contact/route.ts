import { getPayloadClient } from '@/collections/lib/payload'

export const runtime = 'nodejs'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5

type RateBucket = {
  count: number
  resetAt: number
}

declare global {
  var __contactRateLimit: Map<string, RateBucket> | undefined
}

const rateLimitStore: Map<string, RateBucket> =
  globalThis.__contactRateLimit ?? (globalThis.__contactRateLimit = new Map())

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

function isValidEmail(value: string): boolean {
  // intentionally simple (avoid catastrophic backtracking)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function safeString(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input.trim()
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const now = Date.now()

  const bucket = rateLimitStore.get(ip)
  if (bucket && bucket.resetAt > now && bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Response.json({ message: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  } else {
    bucket.count += 1
  }

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return Response.json({ message: 'Expected application/json' }, { status: 415 })
  }

  const body: unknown = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return Response.json({ message: 'Invalid payload' }, { status: 400 })
  }

  const data = body as Record<string, unknown>

  // honeypot (optional, should be empty)
  const company = safeString(data.company)
  if (company) {
    return Response.json({ ok: true })
  }

  const name = safeString(data.name)
  const email = safeString(data.email)
  const website = safeString(data.website)
  const comment = safeString(data.comment)

  if (name.length < 2 || name.length > 80) {
    return Response.json({ message: 'Name must be between 2 and 80 characters.' }, { status: 400 })
  }

  if (!isValidEmail(email) || email.length > 160) {
    return Response.json({ message: 'Email is invalid.' }, { status: 400 })
  }

  if (website.length > 200) {
    return Response.json({ message: 'Website is too long.' }, { status: 400 })
  }

  if (comment.length < 1 || comment.length > 500) {
    return Response.json(
      { message: 'Message must be between 1 and 500 characters.' },
      { status: 400 }
    )
  }

  const payload = await getPayloadClient()

  await payload.create({
    collection: 'comment',
    data: {
      username: name,
      email,
      userwebsite: website || undefined,
      comment,
    },
    overrideAccess: true,
  })

  return Response.json({ ok: true })
}
