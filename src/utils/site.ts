/** Public site URL encoded into the boarding-pass QR (set on Vercel as VITE_SITE_URL). */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined
  if (fromEnv?.trim()) return fromEnv.trim().replace(/\/$/, '')
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin
  }
  return 'https://hhgoa.com'
}

/** Rich deep-link payload — not a bare homepage URL. */
export function buildPassQrPayload(opts: {
  passId: string
  fullName: string
  twitter: string
}): string {
  const base = getSiteUrl()
  const url = new URL(base)
  url.searchParams.set('pass', opts.passId)
  url.searchParams.set('builder', opts.fullName.trim() || 'builder')
  if (opts.twitter.trim()) {
    url.searchParams.set(
      'x',
      opts.twitter.replace(/^@/, '').trim(),
    )
  }
  url.searchParams.set('event', 'HH-GOA-2026')
  url.hash = 'FrameInGoa'
  return url.toString()
}

const CLASS_POOL = [
  'TERMINAL WIZARD',
  'BINARY BEACHCOMBER',
  'ASYNC CUSTODIAN',
  'FULL STACK SURFER',
  'PIXEL PIRATE',
  'COCONUT COMPILER',
  'SHIP CAPTAIN',
  'LO-FI HACKER',
] as const

export function deriveBuilderClass(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return CLASS_POOL[hash % CLASS_POOL.length]
}
