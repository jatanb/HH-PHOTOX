const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function randomChunk(length: number): string {
  let out = ''
  for (let i = 0; i < length; i += 1) {
    out += ALPHA[Math.floor(Math.random() * ALPHA.length)]
  }
  return out
}

export function generateGateSeat(): string {
  const gate = Math.floor(Math.random() * 300) + 100
  const seat = randomChunk(4)
  return `GOA-${gate} • ${seat}`
}

export function generatePassId(): string {
  return `HH26-${randomChunk(6)}`
}

export function studioTimestamp(date = new Date()): string {
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours}:${minutes}${ampm} STUDIO`
}
