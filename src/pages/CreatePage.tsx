import { useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTicket } from '../context/TicketContext'

function makeStudioAvatar(seed: string): string {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, 512, 512)
  g.addColorStop(0, '#f5d547')
  g.addColorStop(1, '#ff2d8b')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 512, 512)
  ctx.fillStyle = '#0a3d32'
  ctx.beginPath()
  ctx.arc(256, 220, 110, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillRect(146, 320, 220, 160)
  ctx.fillStyle = '#f4ead8'
  ctx.font = 'bold 72px Bebas Neue, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(seed.slice(0, 2).toUpperCase() || 'HH', 256, 250)
  return canvas.toDataURL('image/png')
}

export function CreatePage() {
  const { data, setData, refreshCodes, isComplete, missingFields } = useTicket()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [photoError, setPhotoError] = useState<string | null>(null)

  const applyFile = useCallback(
    (file: File | undefined) => {
      setPhotoError(null)
      if (!file) return
      if (!file.type.startsWith('image/') && !/\.heic$/i.test(file.name)) {
        setPhotoError('Please upload an image file.')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        setPhotoError('Max file size is 10MB.')
        return
      }
      const url = URL.createObjectURL(file)
      if (data.photoUrl?.startsWith('blob:')) URL.revokeObjectURL(data.photoUrl)
      setData({ photoUrl: url })
    },
    [data.photoUrl, setData],
  )

  const runAutoBuilder = () => {
    const name = 'Madhavan Singh'
    setData({
      fullName: name,
      roleLocation: 'Full-Stack / Rust / AI • Goa',
      twitter: '@madhavanbuilds',
      photoUrl: makeStudioAvatar(name),
    })
    setPhotoError(null)
    setAttempted(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (!isComplete) return
    refreshCodes()
    navigate('/pass')
  }

  return (
    <div className="create-shell min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto mb-6 flex max-w-2xl items-center justify-between">
        <Link
          to="/"
          className="font-mono text-[11px] tracking-[0.16em] text-[#0a3d32]/70 uppercase transition hover:text-[#0a3d32]"
        >
          ← Home
        </Link>
        <span className="font-stamp text-sm text-[#0a3d32]">2:47 PM STUDIO</span>
      </div>

      <div className="mx-auto max-w-2xl animate-float-in rounded-[1.75rem] bg-white p-6 shadow-[0_24px_60px_rgba(10,61,50,0.12)] sm:p-10">
        <header className="text-center">
          <h1 className="font-display text-5xl tracking-wide text-[#0a3d32] sm:text-6xl">
            BUILDER PASS
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#0a3d32]/65">
            Personalize & generate your official builder pass for Hacker House
            Goa 2026.
          </p>
        </header>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            className="quick-chip"
            onClick={() => inputRef.current?.click()}
          >
            <span aria-hidden>📷</span> Upload Photo
          </button>
          <button type="button" className="quick-chip" onClick={runAutoBuilder}>
            <span aria-hidden>⚡</span> Auto Builder
          </button>
          <Link to="/pass" className="quick-chip">
            <span aria-hidden>🚀</span> Share Pass
          </Link>
        </div>

        <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
          <div>
            <label className="create-label">Builder photo *</label>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
              }}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                applyFile(e.dataTransfer.files?.[0])
              }}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-10 transition ${
                dragging
                  ? 'border-[#0a3d32] bg-[#f5d547]/20'
                  : 'border-[#0a3d32]/25 bg-[#f7f1e4] hover:border-[#0a3d32]/50'
              }`}
            >
              {data.photoUrl ? (
                <img
                  src={data.photoUrl}
                  alt="Builder preview"
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-[#f5d547]"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a3d32] text-[#f5d547]">
                  <UploadIcon />
                </div>
              )}
              <p className="text-sm font-medium text-[#0a3d32]">
                Drop your photo here or click to browse.
              </p>
              <p className="font-mono text-[10px] tracking-wide text-[#0a3d32]/45 uppercase">
                JPG, PNG, WEBP or HEIC • Max 10MB
              </p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*,.heic"
                className="hidden"
                onChange={(e) => applyFile(e.target.files?.[0])}
              />
            </div>
            {photoError ? (
              <p className="mt-2 text-sm text-[#db2777]">{photoError}</p>
            ) : null}
          </div>

          <Field
            id="fullName"
            label="Full name *"
            value={data.fullName}
            placeholder="e.g. Satoshi Nakamoto"
            onChange={(v) => setData({ fullName: v })}
          />

          <Field
            id="roleLocation"
            label="Stack / role *"
            value={data.roleLocation}
            placeholder="e.g. Full-Stack / Rust / AI • Goa"
            onChange={(v) => setData({ roleLocation: v })}
          />

          <Field
            id="twitter"
            label="Twitter / X *"
            value={data.twitter}
            placeholder="@yourhandle"
            onChange={(v) => setData({ twitter: v })}
          />

          {attempted && !isComplete ? (
            <div
              className="rounded-xl border border-[#db2777]/30 bg-[#db2777]/8 px-4 py-3 text-sm text-[#9d174d]"
              role="alert"
            >
              Missing: {missingFields.join(', ')}
            </div>
          ) : null}

          <button type="submit" className="generate-btn w-full">
            Generate Pass →
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  value,
  placeholder,
  onChange,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  placeholder: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label className="create-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="create-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  )
}

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 16V5M12 5L7 10M12 5L17 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16.5V18A2 2 0 006 20H18A2 2 0 0020 18V16.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
