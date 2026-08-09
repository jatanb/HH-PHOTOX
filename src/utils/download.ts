import { domToBlob, domToPng } from 'modern-screenshot'

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',')
  const isBase64 = header.includes('base64')
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png'
  const binary = isBase64 ? atob(data) : decodeURIComponent(data)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: mime })
}

/** Pause animations so the capture frame is clean. */
function freezeForCapture(root: HTMLElement): () => void {
  const style = document.createElement('style')
  style.setAttribute('data-hh-capture', '1')
  style.textContent = `
    .hh-capture-freeze, .hh-capture-freeze * {
      animation: none !important;
      transition: none !important;
    }
  `
  document.head.appendChild(style)
  root.classList.add('hh-capture-freeze')
  return () => {
    root.classList.remove('hh-capture-freeze')
    style.remove()
  }
}

async function waitForImages(root: HTMLElement) {
  // QR renders async — wait briefly for it before snapshot
  for (let i = 0; i < 40; i += 1) {
    const qr = root.querySelector(
      'img[alt="Pass QR code"]',
    ) as HTMLImageElement | null
    if (qr?.complete && qr.naturalWidth > 0) break
    await new Promise((r) => setTimeout(r, 40))
  }

  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve()
            return
          }
          const done = () => resolve()
          img.addEventListener('load', done, { once: true })
          img.addEventListener('error', done, { once: true })
        }),
    ),
  )
  await new Promise<void>((r) =>
    requestAnimationFrame(() => requestAnimationFrame(() => r())),
  )
}

export async function captureTicketBlob(element: HTMLElement): Promise<Blob> {
  const unfreeze = freezeForCapture(element)
  try {
    await waitForImages(element)

    const width = element.offsetWidth || 800
    const height = element.offsetHeight || 400
    const scale = Math.min(3, Math.max(2, 1600 / width))

    const options = {
      width,
      height,
      scale,
      backgroundColor: '#062820',
      // Fetch webfonts so Bebas / Devanagari render in the PNG
      fetch: { requestInit: { mode: 'cors' as RequestMode } },
    }

    try {
      const blob = await domToBlob(element, options)
      if (blob && blob.size > 0) return blob
    } catch (err) {
      console.warn('domToBlob failed, falling back to domToPng', err)
    }

    const dataUrl = await domToPng(element, options)
    return dataUrlToBlob(dataUrl)
  } finally {
    unfreeze()
  }
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

export async function downloadTicketPng(
  element: HTMLElement,
  filename: string,
): Promise<Blob> {
  const blob = await captureTicketBlob(element)
  triggerDownload(blob, filename)
  return blob
}

export function twitterHandle(raw: string): string {
  return raw
    .trim()
    .replace(/^@/, '')
    .replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, '')
    .replace(/\/$/, '')
}

export function buildShareTweet(opts: {
  fullName: string
  passId: string
  roleLocation: string
  twitter: string
}): string {
  const handle = twitterHandle(opts.twitter)
  const mention = handle ? `@${handle}` : opts.fullName
  return [
    `Just boarded Hacker House Goa 2026 🌴`,
    `${mention} · ${opts.roleLocation}`,
    `Pass ID: ${opts.passId}`,
    `#FrameInGoa #HHGoa2026`,
    `hhgoa.com`,
  ].join('\n')
}

export function openTweetIntent(text: string, existing?: Window | null) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  if (existing && !existing.closed) {
    existing.location.href = url
    existing.focus()
    return existing
  }
  return window.open(url, '_blank', 'noopener,noreferrer')
}

export function openXProfile(twitter: string) {
  const handle = twitterHandle(twitter)
  if (!handle) return
  window.open(`https://x.com/${handle}`, '_blank', 'noopener,noreferrer')
}

/**
 * Share on X: open a blank tab on click (popup-safe), render PNG, download it,
 * then route that tab to the tweet composer with a prefilled caption.
 */
export async function sharePassOnX(opts: {
  element: HTMLElement
  filename: string
  fullName: string
  passId: string
  roleLocation: string
  twitter: string
}): Promise<'native' | 'intent'> {
  const text = buildShareTweet(opts)
  const pending = window.open('about:blank', '_blank')

  try {
    const blob = await captureTicketBlob(opts.element)
    const file = new File([blob], opts.filename, { type: 'image/png' })
    triggerDownload(blob, opts.filename)

    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      (!navigator.canShare || navigator.canShare({ files: [file], text }))
    ) {
      try {
        pending?.close()
        await navigator.share({
          title: 'Hacker House Goa Builder Pass',
          text,
          files: [file],
        })
        return 'native'
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          pending?.close()
          throw err
        }
      }
    }

    openTweetIntent(text, pending)
    return 'intent'
  } catch (err) {
    pending?.close()
    throw err
  }
}
