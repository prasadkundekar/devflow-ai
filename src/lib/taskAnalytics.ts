import type { Task } from '../types'
import { isoDay, todayIso } from './taskDates'

const TAG_COLORS = [
  '#7c5cff',
  '#3b82f6',
  '#ec4899',
  '#10b981',
  '#f59e0b',
  '#06b6d4',
  '#ef4444',
]

export interface ChartPoint {
  label: string
  value: number
}

export interface CategoryRow {
  name: string
  count: number
  color: string
}

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function addDays(date: Date, n: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

export function getWeeklyActivity(tasks: Task[]): ChartPoint[] {
  const today = new Date()
  const days: ChartPoint[] = []

  for (let i = 6; i >= 0; i--) {
    const d = addDays(today, -i)
    const key = dayKey(d)
    const label = d.toLocaleDateString('en-US', { weekday: 'short' })
    const completions = tasks.filter(
      (t) => t.completedAt && isoDay(t.completedAt) === key,
    ).length
    const creations = tasks.filter(
      (t) => t.createdAt && isoDay(t.createdAt) === key,
    ).length
    days.push({ label, value: completions + creations })
  }
  return days
}

export function getCategoryBreakdown(tasks: Task[]): CategoryRow[] {
  const counts = new Map<string, number>()
  for (const task of tasks) {
    const tags = task.tags.length ? task.tags : ['untagged']
    for (const tag of tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count], i) => ({
      name,
      count,
      color: TAG_COLORS[i % TAG_COLORS.length],
    }))
}

export function getActivityHeatmap(tasks: Task[]): number[][] {
  const today = new Date()
  const start = addDays(today, -(26 * 7))
  const activity = new Map<string, number>()

  const bump = (iso?: string) => {
    if (!iso) return
    const key = isoDay(iso)
    activity.set(key, (activity.get(key) ?? 0) + 1)
  }

  for (const task of tasks) {
    if (task.createdAt) bump(task.createdAt)
    bump(task.completedAt)
    bump(task.updatedAt)
  }

  const weeks: number[][] = []
  let cursor = new Date(start)
  while (cursor <= today) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      const key = dayKey(cursor)
      week.push(activity.get(key) ?? 0)
      cursor = addDays(cursor, 1)
    }
    weeks.push(week)
  }

  const max = Math.max(1, ...weeks.flat())
  return weeks.map((week) =>
    week.map((count) => {
      if (count === 0) return 0
      if (count === 1) return 1
      if (count <= max * 0.33) return 2
      if (count <= max * 0.66) return 3
      return 4
    }),
  )
}

export function getAnalyticsSummary(tasks: Task[]) {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  const completed = tasks.filter((t) => t.column === 'done')
  const completedThisMonth = completed.filter((t) => {
    if (!t.completedAt) return false
    const d = new Date(t.completedAt)
    return d.getMonth() === month && d.getFullYear() === year
  }).length

  const weekStart = addDays(now, -6)
  const completedThisWeek = completed.filter((t) => {
    if (!t.completedAt) return false
    return new Date(t.completedAt) >= weekStart
  }).length

  const activeDays = new Set<string>()
  for (const task of tasks) {
    if (task.completedAt) activeDays.add(isoDay(task.completedAt))
  }
  let streak = 0
  let cursor = new Date(todayIso() + 'T12:00:00')
  while (activeDays.has(dayKey(cursor))) {
    streak++
    cursor = addDays(cursor, -1)
  }

  const total = tasks.length
  const rate = total > 0 ? Math.round((completed.length / total) * 100) : 0

  return {
    completedThisMonth,
    completedThisWeek,
    streak,
    completionRate: rate,
    inProgress: tasks.filter((t) => t.column === 'in-progress').length,
  }
}
