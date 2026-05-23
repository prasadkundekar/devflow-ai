export function formatDueDate(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function defaultDueIso() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().slice(0, 10)
}

export function parseDueDateToIso(dueDate: string): string {
  const withYear = `${dueDate} ${new Date().getFullYear()}`
  const parsed = Date.parse(withYear)
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString().slice(0, 10)
  }
  return defaultDueIso()
}

export function isoDay(iso: string) {
  return iso.slice(0, 10)
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10)
}
