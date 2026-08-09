import type { TicketData } from '../types'
import { deriveBuilderClass } from '../utils/site'
import { PassQr } from './PassQr'

type Props = {
  data: TicketData
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="font-mono text-[8px] font-semibold tracking-[0.16em] uppercase sm:text-[9px]"
      style={{ color: '#0a3d32' }}
    >
      ✦ {children} ✦
    </p>
  )
}

export function TicketDetailsRail({ data }: Props) {
  const builderClass = deriveBuilderClass(
    `${data.passId}-${data.fullName}-${data.roleLocation}`,
  )

  return (
    <div className="relative mt-2 border-t pt-2" style={{ borderColor: 'rgba(255,45,139,0.25)' }}>
      <div className="grid grid-cols-3 gap-0">
        {/* BUILDER CLASS + QR */}
        <div
          className="flex flex-col items-center px-1.5 text-center sm:px-2"
          style={{ borderRight: '1.5px dashed rgba(255,45,139,0.45)' }}
        >
          <SectionLabel>BUILDER CLASS</SectionLabel>
          <p
            className="mt-1 font-display text-[clamp(0.85rem,1.8vw,1.25rem)] leading-none tracking-wide"
            style={{ color: '#ff2d8b' }}
          >
            {builderClass}
          </p>
          <div className="mt-2 mb-1">
            <PassQr
              passId={data.passId}
              fullName={data.fullName}
              twitter={data.twitter}
              size={72}
            />
          </div>
          <p
            className="font-mono text-[7px] tracking-[0.12em] uppercase"
            style={{ color: '#7a8478' }}
          >
            SCAN · LIVE PASS
          </p>
        </div>

        {/* BEACH BAG */}
        <div
          className="relative flex flex-col items-center px-1.5 text-center sm:px-2"
          style={{ borderRight: '1.5px dashed rgba(255,45,139,0.45)' }}
        >
          <SectionLabel>BEACH BAG</SectionLabel>
          <ul className="mt-1.5 w-full space-y-1 text-left">
            <BagItem icon={<CoconutIcon />} label="COCONUT" />
            <BagItem icon={<CodeIcon />} label="VS CODE" />
            <BagItem icon={<HeadphonesIcon />} label="LO-FI BEATS" />
          </ul>
          <div className="mt-auto w-full pt-1">
            <SunsetMini />
          </div>
        </div>

        {/* CURRENTLY SHIPPING */}
        <div className="flex flex-col items-center px-1.5 text-center sm:px-2">
          <SectionLabel>CURRENTLY SHIPPING</SectionLabel>
          <p
            className="mt-1 font-display text-[clamp(0.8rem,1.6vw,1.15rem)] leading-[0.95] tracking-wide"
            style={{ color: '#ff2d8b' }}
          >
            BUILDING THE FUTURE
          </p>
          <div className="my-1.5 w-[70%]" aria-hidden>
            <WavesMini />
          </div>
          <p
            className="font-mono text-[7px] tracking-[0.14em] uppercase"
            style={{ color: '#7a8478' }}
          >
            BUILDER ID
          </p>
          <p
            className="font-mono text-[10px] font-bold tracking-wide sm:text-[11px]"
            style={{ color: '#0a3d32' }}
          >
            #{data.passId}
          </p>
          <div
            className="barcode-bars mt-1.5 h-6 w-full max-w-[120px]"
            aria-hidden
          />
        </div>
      </div>

      {/* Pink #FRAMEINGOA ribbon */}
      <div className="relative z-10 mt-2 flex justify-center">
        <div
          className="relative px-5 py-1 font-display text-[clamp(0.7rem,1.4vw,0.95rem)] tracking-[0.14em] text-white"
          style={{
            backgroundColor: '#ff2d8b',
            clipPath:
              'polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)',
          }}
        >
          ✦ #FRAMEINGOA ✦
        </div>
      </div>
    </div>
  )
}

function BagItem({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <li className="flex items-center gap-1.5">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span
        className="font-mono text-[8px] font-semibold tracking-[0.08em] uppercase sm:text-[9px]"
        style={{ color: '#0a3d32' }}
      >
        {label}
      </span>
    </li>
  )
}

function CoconutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="14" rx="6" ry="7" fill="#0a3d32" />
      <path d="M12 7V3M12 3H9M12 3H14" stroke="#0a3d32" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="5" r="2" fill="#f5d547" />
      <path d="M9 12h6" stroke="#f4ead8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="13" rx="2" fill="#0a3d32" />
      <path d="M8 11l-2 2 2 2M16 11l2 2-2 2M13 10l-2 6" stroke="#f5d547" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeadphonesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 14v-2a8 8 0 0116 0v2"
        stroke="#0a3d32"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="2" y="13" width="4" height="7" rx="1.5" fill="#0a3d32" />
      <rect x="18" y="13" width="4" height="7" rx="1.5" fill="#0a3d32" />
    </svg>
  )
}

function SunsetMini() {
  return (
    <svg viewBox="0 0 120 36" className="mx-auto h-7 w-full max-w-[130px]" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff2d8b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5d547" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="120" height="36" fill="url(#sky)" rx="2" />
      <circle cx="78" cy="14" r="8" fill="#f5d547" />
      <path d="M0 26 Q20 18 40 26 T80 24 T120 28 V36 H0Z" fill="#0a3d32" />
      <path d="M98 26 C98 18 104 12 104 12 C104 12 110 18 110 26" fill="#0a3d32" />
      <path d="M104 12 C100 16 99 20 98 24" stroke="#14532d" strokeWidth="0.8" />
    </svg>
  )
}

function WavesMini() {
  return (
    <svg viewBox="0 0 80 16" className="mx-auto h-3 w-full" aria-hidden>
      <path
        d="M0 4 Q10 0 20 4 T40 4 T60 4 T80 4"
        fill="none"
        stroke="#0a3d32"
        strokeWidth="1.2"
      />
      <path
        d="M0 9 Q10 5 20 9 T40 9 T60 9 T80 9"
        fill="none"
        stroke="#ff2d8b"
        strokeWidth="1.2"
      />
      <path
        d="M0 14 Q10 10 20 14 T40 14 T60 14 T80 14"
        fill="none"
        stroke="#0a3d32"
        strokeWidth="1.2"
      />
    </svg>
  )
}
