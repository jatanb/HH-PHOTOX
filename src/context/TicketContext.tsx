import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { TicketData } from '../types'
import {
  generateGateSeat,
  generatePassId,
  studioTimestamp,
} from '../utils/ids'

const STORAGE_KEY = 'hh-goa-builder-pass-v2'

function emptyTicket(): TicketData {
  return {
    fullName: '',
    roleLocation: '',
    twitter: '',
    photoUrl: null,
    gateSeat: generateGateSeat(),
    passId: generatePassId(),
    studioStamp: studioTimestamp(),
  }
}

function loadTicket(): TicketData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyTicket()
    const parsed = JSON.parse(raw) as Partial<TicketData>
    return {
      ...emptyTicket(),
      fullName: parsed.fullName ?? '',
      roleLocation: parsed.roleLocation ?? '',
      twitter: parsed.twitter ?? '',
      photoUrl: parsed.photoUrl ?? null,
      gateSeat: parsed.gateSeat ?? generateGateSeat(),
      passId: parsed.passId ?? generatePassId(),
      studioStamp: parsed.studioStamp ?? studioTimestamp(),
    }
  } catch {
    return emptyTicket()
  }
}

function saveTicket(data: TicketData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // quota / private mode — ignore
  }
}

type TicketContextValue = {
  data: TicketData
  setData: (patch: Partial<TicketData>) => void
  reset: () => void
  refreshCodes: () => void
  isComplete: boolean
  missingFields: string[]
}

const TicketContext = createContext<TicketContextValue | null>(null)

const REQUIRED: { key: keyof TicketData; label: string }[] = [
  { key: 'photoUrl', label: 'Builder photo' },
  { key: 'fullName', label: 'Full name' },
  { key: 'roleLocation', label: 'Stack / role' },
  { key: 'twitter', label: 'Twitter / X' },
]

export function TicketProvider({ children }: { children: ReactNode }) {
  const [data, setTicket] = useState<TicketData>(loadTicket)

  const setData = useCallback((patch: Partial<TicketData>) => {
    setTicket((prev) => {
      const next = { ...prev, ...patch }
      saveTicket(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    const fresh = emptyTicket()
    saveTicket(fresh)
    setTicket(fresh)
  }, [])

  const refreshCodes = useCallback(() => {
    setTicket((prev) => {
      const next = {
        ...prev,
        gateSeat: generateGateSeat(),
        passId: generatePassId(),
        studioStamp: studioTimestamp(),
      }
      saveTicket(next)
      return next
    })
  }, [])

  const missingFields = useMemo(() => {
    return REQUIRED.filter(({ key }) => {
      const value = data[key]
      if (key === 'photoUrl') return !value
      return typeof value !== 'string' || !value.trim()
    }).map((f) => f.label)
  }, [data])

  const value = useMemo(
    () => ({
      data,
      setData,
      reset,
      refreshCodes,
      isComplete: missingFields.length === 0,
      missingFields,
    }),
    [data, setData, reset, refreshCodes, missingFields],
  )

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  )
}

export function useTicket() {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTicket must be used within TicketProvider')
  return ctx
}
