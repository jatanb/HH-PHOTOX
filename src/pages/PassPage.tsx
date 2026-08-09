import { useCallback, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BoardingPass } from '../components/BoardingPass'
import { useTicket } from '../context/TicketContext'
import {
  downloadTicketPng,
  openXProfile,
  sharePassOnX,
  twitterHandle,
} from '../utils/download'

export function PassPage() {
  const { data, isComplete, reset } = useTicket()
  const ticketRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState<'download' | 'share' | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const filename = `hh-goa-pass-${
    data.fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'builder'
  }.png`

  const onDownload = useCallback(async () => {
    if (!ticketRef.current) return
    setBusy('download')
    setError(null)
    setNote(null)
    try {
      await downloadTicketPng(ticketRef.current, filename)
      setNote('PNG saved — ready to flex.')
    } catch (err) {
      console.error(err)
      const detail = err instanceof Error ? err.message : 'Unknown error'
      setError(`Could not export PNG: ${detail}`)
    } finally {
      setBusy(null)
    }
  }, [filename])

  const onShareX = useCallback(async () => {
    if (!ticketRef.current) return
    setBusy('share')
    setError(null)
    setNote(null)
    try {
      const mode = await sharePassOnX({
        element: ticketRef.current,
        filename,
        fullName: data.fullName,
        passId: data.passId,
        roleLocation: data.roleLocation,
        twitter: data.twitter,
      })
      if (mode === 'intent') {
        setNote(
          'PNG downloaded · X compose opened. Attach the PNG from your downloads, then post.',
        )
      } else {
        setNote('Shared via system sheet. Attach the saved PNG on X if needed.')
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setNote('Share cancelled.')
      } else {
        console.error(err)
        const detail = err instanceof Error ? err.message : 'Unknown error'
        setError(`Share failed: ${detail}`)
      }
    } finally {
      setBusy(null)
    }
  }, [data.fullName, data.passId, data.roleLocation, data.twitter, filename])

  if (!isComplete) {
    return <Navigate to="/create" replace />
  }

  const handle = twitterHandle(data.twitter)

  return (
    <div className="pass-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3 animate-float-in">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#f5d547] uppercase">
              Pass locked in
            </p>
            <h1 className="font-display text-4xl tracking-wide text-[#f4ead8] sm:text-5xl">
              YOUR BOARDING PASS
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/create"
              className="rounded-full border border-[#f4ead8]/25 px-4 py-2 font-mono text-[10px] tracking-wider text-[#f4ead8] uppercase transition hover:border-[#f5d547] hover:text-[#f5d547]"
            >
              Edit details
            </Link>
            <Link
              to="/"
              onClick={() => reset()}
              className="rounded-full border border-[#f4ead8]/25 px-4 py-2 font-mono text-[10px] tracking-wider text-[#f4ead8] uppercase transition hover:border-[#ff2d8b] hover:text-[#ff2d8b]"
            >
              New pass
            </Link>
          </div>
        </header>

        <div className="overflow-x-auto animate-float-in [animation-delay:80ms]">
          <div className="mx-auto w-full min-w-[640px] max-w-4xl">
            <BoardingPass data={data} ticketRef={ticketRef} />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row animate-float-in [animation-delay:140ms]">
          <button
            type="button"
            onClick={onDownload}
            disabled={busy !== null}
            className="flex-1 rounded-2xl bg-[#f5d547] px-5 py-4 font-body text-sm font-bold tracking-[0.08em] text-[#062820] uppercase transition hover:brightness-105 disabled:opacity-60"
          >
            {busy === 'download' ? 'Rendering…' : 'Download PNG'}
          </button>
          <button
            type="button"
            onClick={onShareX}
            disabled={busy !== null}
            className="flex-1 rounded-2xl bg-[#ff2d8b] px-5 py-4 font-body text-sm font-bold tracking-[0.08em] text-white uppercase shadow-[0_0_24px_rgba(255,45,139,0.35)] transition hover:brightness-110 disabled:opacity-60"
          >
            {busy === 'share' ? 'Opening X…' : 'Share on X'}
          </button>
          {handle ? (
            <button
              type="button"
              onClick={() => openXProfile(data.twitter)}
              className="rounded-2xl border border-[#f4ead8]/30 px-5 py-4 font-mono text-[11px] tracking-wider text-[#f4ead8] uppercase transition hover:border-[#f5d547] hover:text-[#f5d547] sm:w-auto"
            >
              Open @{handle}
            </button>
          ) : null}
        </div>

        {note ? (
          <p className="text-center text-sm text-[#c8f542]" role="status">
            {note}
          </p>
        ) : null}
        {error ? (
          <p className="text-center text-sm text-[#ff2d8b]" role="alert">
            {error}
          </p>
        ) : null}

        <p className="text-center font-mono text-[10px] tracking-wide text-[#f4ead8]/35 uppercase">
          #FrameInGoa · Pass {data.passId} · Attach the downloaded PNG when you
          post on X 
          -- created by Bhundiya Jatan
        </p>
      </div>
    </div>
  )
}
