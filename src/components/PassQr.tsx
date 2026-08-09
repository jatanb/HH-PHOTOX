import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { buildPassQrPayload } from '../utils/site'

type Props = {
  passId: string
  fullName: string
  twitter: string
  size?: number
}

export function PassQr({ passId, fullName, twitter, size = 96 }: Props) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const payload = buildPassQrPayload({ passId, fullName, twitter })

    QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'H', // high — room for palm center badge
      margin: 1,
      width: size * 2,
      color: {
        dark: '#0a3d32',
        light: '#00000000', // transparent bg
      },
    })
      .then((url) => {
        if (!cancelled) setSrc(url)
      })
      .catch((err) => {
        console.error('QR generate failed', err)
      })

    return () => {
      cancelled = true
    }
  }, [passId, fullName, twitter, size])

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
      title="Scan to open this builder pass on the live site"
    >
      {src ? (
        <img
          src={src}
          alt="Pass QR code"
          width={size}
          height={size}
          className="h-full w-full"
          draggable={false}
        />
      ) : (
        <div
          className="h-full w-full animate-pulse rounded-sm"
          style={{ backgroundColor: 'rgba(10,61,50,0.12)' }}
        />
      )}

      {/* Palm badge punched into the QR center */}
      <div
        className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          width: size * 0.28,
          height: size * 0.28,
          background:
            'linear-gradient(145deg, #f5d547 0%, #ff2d8b 55%, #0a3d32 100%)',
          boxShadow: '0 0 0 2px #f4ead8',
        }}
        aria-hidden
      >
        <PalmMini />
      </div>
    </div>
  )
}

function PalmMini() {
  return (
    <svg width="14" height="16" viewBox="0 0 20 24" fill="none" aria-hidden>
      <path d="M10 24V11" stroke="#062820" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M10 12C5 9 3 5 4.5 2C7.5 5 9 8 10 12Z"
        fill="#ecfccb"
      />
      <path
        d="M10 12C8 7 9 3 12 1C11.5 5 11 9 10 12Z"
        fill="#bbf7d0"
      />
      <path
        d="M10 12C14 9 17 5 16 2C13 5 11.5 9 10 12Z"
        fill="#86efac"
      />
    </svg>
  )
}
