import type { TicketData } from '../types'
import { TicketDetailsRail } from './TicketDetailsRail'

type Props = {
  data: TicketData
  ticketRef: React.RefObject<HTMLDivElement | null>
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div
        className="font-mono text-[8px] font-medium tracking-[0.14em] uppercase sm:text-[9px]"
        style={{ color: '#8a9084' }}
      >
        {label}
      </div>
      <div
        className="mt-0.5 truncate font-body text-[12px] font-semibold sm:text-[13px]"
        style={{ color: '#1a2e28' }}
      >
        {value || '—'}
      </div>
    </div>
  )
}

export function BoardingPass({ data, ticketRef }: Props) {
  const displayName = (data.fullName || 'YOUR NAME').toUpperCase()

  return (
    <div
      ref={ticketRef}
      className="relative w-full overflow-hidden rounded-md"
      style={{
        aspectRatio: '2 / 1',
        boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
        backgroundColor: '#062820',
      }}
    >
      {/* Scalloped top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2.5"
        style={{
          background:
            'radial-gradient(circle at 9px -2px, transparent 7px, #062820 7.5px)',
          backgroundSize: '18px 12px',
          backgroundRepeat: 'repeat-x',
        }}
        aria-hidden
      />

      <div className="flex h-full w-full pt-2.5 pb-8 sm:pb-9">
        {/* LEFT STUB */}
        <aside className="stub-pattern relative flex w-[28%] shrink-0 flex-col items-center px-2.5 pb-0 pt-3 text-center sm:w-[30%] sm:px-4 sm:pt-4">
          <div
            className="absolute top-2.5 right-1.5 rotate-6 rounded-[2px] px-1.5 py-0.5 font-mono text-[7px] font-semibold tracking-wide uppercase sm:top-3 sm:right-2.5 sm:text-[8px]"
            style={{ backgroundColor: '#ff2d8b', color: '#062820' }}
          >
            GOA 2026 VIP
          </div>

          <div
            className="photo-ring photo-ring-live relative mt-1 aspect-square w-[62%] max-w-[150px] overflow-hidden rounded-full sm:mt-2 sm:w-[58%]"
            style={{ backgroundColor: '#062820' }}
          >
            {data.photoUrl ? (
              <img
                src={data.photoUrl}
                alt=""
                className="h-full w-full object-cover object-center"
                draggable={false}
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-1 px-2"
                style={{
                  background:
                    'linear-gradient(135deg, #0f5242 0%, #062820 100%)',
                }}
              >
                <span
                  className="font-display text-3xl"
                  style={{ color: '#f5d547' }}
                >
                  HH
                </span>
                <span
                  className="font-mono text-[8px] tracking-wider"
                  style={{ color: 'rgba(244,234,216,0.8)' }}
                >
                  ADD PHOTO
                </span>
              </div>
            )}
          </div>

          <h2
            className="mt-2 w-full px-1 font-display text-[clamp(0.95rem,2.2vw,1.6rem)] leading-[0.95] tracking-wide sm:mt-3"
            style={{ color: '#ffffff' }}
          >
            {displayName}
          </h2>
          <p
            className="mt-1 px-1 font-mono text-[clamp(0.5rem,1vw,0.68rem)] font-semibold tracking-[0.05em] uppercase"
            style={{ color: '#ff2d8b' }}
          >
            {data.roleLocation || 'BUILDER'}
          </p>

          <div
            className="mt-auto flex w-full items-center justify-center py-1.5 sm:py-2"
            style={{ backgroundColor: '#f5d547' }}
          >
            <span
              className="font-body text-[clamp(0.5rem,1vw,0.7rem)] font-bold tracking-[0.12em] uppercase"
              style={{ color: '#0a3d32' }}
            >
              BOARDING PASS • 2026
            </span>
          </div>
        </aside>

        {/* Perforation */}
        <div
          className="relative w-[12px] shrink-0 sm:w-[14px]"
          style={{ backgroundColor: '#efe3cd' }}
          aria-hidden
        >
          <div className="ticket-perforation absolute inset-y-0 left-1/2 w-[14px] -translate-x-1/2" />
          <div
            className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 border-l border-dashed"
            style={{ borderColor: 'rgba(10,61,50,0.35)' }}
          />
        </div>

        {/* RIGHT BODY */}
        <section
          className="relative flex min-w-0 flex-1 flex-col overflow-hidden"
          style={{ backgroundColor: '#f4ead8', color: '#1a2e28' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: 0.35,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(10,61,50,0.015) 2px, rgba(10,61,50,0.015) 3px)',
            }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-1 flex-col px-3 pt-2.5 pb-1.5 sm:px-5 sm:pt-3 sm:pb-2">
            <header className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
              <h1
                className="font-display text-[clamp(1.35rem,3.2vw,2.25rem)] leading-none tracking-wide"
                style={{ color: '#0a3d32' }}
              >
                HACKER HOUSE
              </h1>
              <span
                className="font-deva text-[clamp(1rem,2.4vw,1.7rem)] leading-none font-bold"
                style={{ color: '#ff2d8b' }}
              >
                गोवा
              </span>
            </header>

            <div
              className="mt-1 h-px w-full"
              style={{ backgroundColor: 'rgba(10,61,50,0.25)' }}
            />

            <p
              className="mt-1 font-mono text-[clamp(0.48rem,0.9vw,0.62rem)] font-medium tracking-[0.1em] uppercase"
              style={{ color: '#0a3d32' }}
            >
              FLIGHT HH2026 • DESTINATION: GOA • OCT 28-31
            </p>

            <div className="mt-2 grid grid-cols-2 content-start gap-x-4 gap-y-2 sm:mt-2.5 sm:gap-y-2.5">
              <Field label="PASSENGER" value={data.fullName || '—'} />
              <Field label="GATE / SEAT" value={data.gateSeat} />
              <Field label="STACK / ROLE" value={data.roleLocation} />
              <Field label="TWITTER / X" value={data.twitter} />
            </div>

            {/* Tropical detail rail: QR · Beach bag · Shipping */}
            <div className="mt-auto">
              <TicketDetailsRail data={data} />
            </div>
          </div>

          {/* Wave bottom edge (cream side only) */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3"
            style={{
              background:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 120 12\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0 8 Q10 2 20 8 T40 8 T60 8 T80 8 T100 8 T120 8 V12 H0Z\' fill=\'%23062820\'/%3E%3C/svg%3E")',
              backgroundSize: '80px 100%',
              backgroundRepeat: 'repeat-x',
            }}
            aria-hidden
          />
        </section>
      </div>

      <footer
        className="absolute inset-x-0 bottom-0 z-30 flex h-7 items-center justify-center sm:h-8"
        style={{ backgroundColor: '#062820' }}
      >
        <p
          className="font-mono text-[clamp(0.5rem,0.95vw,0.68rem)] font-medium tracking-[0.14em] uppercase"
          style={{ color: '#f5d547' }}
        >
          #FrameInGoa • 2:47 PM STUDIO
        </p>
      </footer>
    </div>
  )
}
