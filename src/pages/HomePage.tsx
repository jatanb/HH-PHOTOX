import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="home-shell relative flex min-h-screen flex-col overflow-hidden">
      <div className="home-halftone pointer-events-none absolute inset-0" aria-hidden />
      <div className="home-palm pointer-events-none absolute -left-8 top-24 opacity-30 sm:opacity-40" aria-hidden>
        <PalmSvg />
      </div>
      <div className="home-palm pointer-events-none absolute -right-10 bottom-32 scale-x-[-1] opacity-25 sm:opacity-35" aria-hidden>
        <PalmSvg />
      </div>

      <nav className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-10">
        <Link
          to="/"
          className="font-stamp text-lg tracking-wide text-[#facc15] drop-shadow-[2px_2px_0_#064e3b] sm:text-xl"
        >
          2:47 PM STUDIO
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <a
            href="#hype"
            className="font-mono text-[11px] tracking-[0.18em] text-white uppercase transition hover:text-[#facc15]"
          >
            CHECK HYPE
          </a>
          <Link to="/create" className="create-tape-btn">
            CREATE
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 text-center">
        <p className="mb-4 font-mono text-[10px] tracking-[0.35em] text-[#d9f99d] uppercase animate-float-in">
          Official builder pass drop
        </p>

        <div className="hero-title-wrap relative animate-float-in [animation-delay:80ms]">
          <h1 className="hero-title select-none">
            <span className="block">HACKER</span>
            <span className="block">HOUSE</span>
          </h1>
          <span className="hero-goa" aria-label="Goa">
            गोवा
          </span>
        </div>

        <div
          id="hype"
          className="mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full border border-[#14532d]/40 bg-[#064e3b]/70 px-5 py-2.5 font-mono text-[10px] tracking-[0.12em] text-[#facc15] uppercase backdrop-blur-sm animate-float-in sm:text-[11px] [animation-delay:160ms]"
        >
          <span>GOA, INDIA • 28 - 31 OCT 2026</span>
          <span className="hidden text-[#86efac]/50 sm:inline">|</span>
          <span>2:47 PM STUDIO</span>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 animate-float-in [animation-delay:220ms]">
          <Link to="/create" className="create-tape-btn create-tape-btn-lg">
            CREATE YOUR PASS
          </Link>
          <p className="max-w-sm text-sm text-[#ecfccb]/80">
            Upload a photo, drop your builder details, and ship a boarding
            pass worth flexing on X.
          </p>
        </div>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-3 gap-3 px-2 animate-float-in sm:gap-6 [animation-delay:280ms]">
          {[
            { k: '01', t: 'PHOTO', d: 'Drop your face' },
            { k: '02', t: 'DETAILS', d: 'Stack + socials' },
            { k: '03', t: 'SHIP', d: 'Download & share' },
          ].map((step) => (
            <div
              key={step.k}
              className="rounded-2xl border border-[#14532d]/30 bg-[#064e3b]/35 px-3 py-4 backdrop-blur-sm"
            >
              <p className="font-mono text-[10px] text-[#facc15]">{step.k}</p>
              <p className="mt-1 font-display text-xl tracking-wide text-white sm:text-2xl">
                {step.t}
              </p>
              <p className="mt-1 text-xs text-[#bbf7d0]/70">{step.d}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 px-4 pb-6 text-center">
        <p className="text-[11px] tracking-wide text-[#d9f99d]/80">
          #FrameInGoa • HH GOA 2026 • October 28-31, 2026 • Goa, India
        </p>
        <p className="mt-1 text-[11px] text-[#bbf7d0]/55">
          Built for HH Goa 2026 builders & attendees.
        </p>
      </footer>
    </div>
  )
}

function PalmSvg() {
  return (
    <svg width="180" height="280" viewBox="0 0 120 200" fill="none" aria-hidden>
      <path
        d="M58 200 V90"
        stroke="#14532d"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M58 95 C20 70 8 40 18 18 C42 48 52 70 58 95Z"
        fill="#166534"
      />
      <path
        d="M58 95 C40 55 48 22 72 8 C68 48 64 72 58 95Z"
        fill="#15803d"
      />
      <path
        d="M58 95 C90 68 108 38 102 14 C78 42 66 70 58 95Z"
        fill="#166534"
      />
      <path
        d="M58 95 C78 60 95 48 112 42 C88 58 72 78 58 95Z"
        fill="#15803d"
      />
      <path
        d="M58 95 C35 72 18 62 4 58 C28 68 44 82 58 95Z"
        fill="#14532d"
      />
    </svg>
  )
}
