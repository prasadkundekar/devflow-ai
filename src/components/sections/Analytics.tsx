import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import {
  getActivityHeatmap,
  getAnalyticsSummary,
  getCategoryBreakdown,
  getWeeklyActivity,
} from '../../lib/taskAnalytics'

const HEATMAP_LEVELS = [
  'bg-white/[0.04]',
  'bg-[#1e3a5f]',
  'bg-[#2563eb]/60',
  'bg-[#3b82f6]',
  'bg-[var(--accent)]',
]

export function Analytics() {
  const { tasks } = useApp()

  const summary = useMemo(() => getAnalyticsSummary(tasks), [tasks])
  const chartData = useMemo(() => getWeeklyActivity(tasks), [tasks])
  const categories = useMemo(() => getCategoryBreakdown(tasks), [tasks])
  const heatmap = useMemo(() => getActivityHeatmap(tasks), [tasks])

  const maxChart = Math.max(1, ...chartData.map((d) => d.value))
  const categoryTotal = categories.reduce((a, c) => a + c.count, 0)

  const statCards = [
    {
      label: 'Completed this month',
      value: String(summary.completedThisMonth),
      sub: 'Tasks marked done',
    },
    {
      label: 'Completed this week',
      value: String(summary.completedThisWeek),
      sub: 'Last 7 days',
    },
    {
      label: 'Completion streak',
      value: `${summary.streak} day${summary.streak === 1 ? '' : 's'}`,
      sub: `${summary.completionRate}% overall rate`,
    },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-[#8b92a8]">
          Live insights from your {tasks.length} Kanban tasks
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((s) => (
          <div key={s.label} className="glass hover-lift p-5">
            <p className="text-xs text-[#8b92a8]">{s.label}</p>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-[#8b92a8]">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="glass p-6">
        <h2 className="mb-1 text-sm font-semibold">Weekly Activity</h2>
        <p className="mb-6 text-xs text-[#8b92a8]">
          Tasks created + completed per day
        </p>
        {chartData.every((d) => d.value === 0) ? (
          <p className="py-12 text-center text-sm text-[#8b92a8]">
            Complete or create tasks to see activity here.
          </p>
        ) : (
          <div className="flex h-48 items-end justify-between gap-3">
            {chartData.map((d) => (
              <div
                key={d.label}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-[10px] font-medium text-[#8b92a8]">
                  {d.value}
                </span>
                <div
                  className="w-full max-w-[48px] rounded-t-lg transition-all duration-700"
                  style={{
                    height: `${(d.value / maxChart) * 100}%`,
                    minHeight: d.value > 0 ? 8 : 4,
                    background:
                      'linear-gradient(180deg, var(--accent), #3b82f6)',
                  }}
                />
                <span className="text-xs text-[#8b92a8]">{d.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass p-6">
          <h2 className="mb-4 text-sm font-semibold">Tasks by Tag</h2>
          {categories.length === 0 ? (
            <p className="text-sm text-[#8b92a8]">No tagged tasks yet.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((cat) => {
                const pct =
                  categoryTotal > 0 ? (cat.count / categoryTotal) * 100 : 0
                return (
                  <div key={cat.name}>
                    <div className="mb-1.5 flex justify-between text-sm capitalize">
                      <span>{cat.name}</span>
                      <span className="text-[#8b92a8]">{cat.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="glass overflow-hidden p-6">
          <h2 className="mb-1 text-sm font-semibold">Task Activity</h2>
          <p className="mb-4 text-xs text-[#8b92a8]">
            Creates, updates & completions (last ~6 months)
          </p>
          <div className="overflow-x-auto">
            <div className="inline-flex gap-[3px]">
              {heatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className={`h-3 w-3 rounded-sm ${HEATMAP_LEVELS[level]}`}
                      title={`Activity level ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-1 text-[10px] text-[#8b92a8]">
            <span>Less</span>
            {HEATMAP_LEVELS.map((cls, i) => (
              <div key={i} className={`h-3 w-3 rounded-sm ${cls}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
