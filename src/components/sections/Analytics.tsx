import { useMemo } from 'react'
import {
  CATEGORY_BREAKDOWN,
  CHART_DATA,
  generateHeatmap,
} from '../../data/mockData'

const HEATMAP_LEVELS = [
  'bg-white/[0.04]',
  'bg-[#1e3a5f]',
  'bg-[#2563eb]/60',
  'bg-[#3b82f6]',
  'bg-[var(--accent)]',
]

export function Analytics() {
  const heatmap = useMemo(() => generateHeatmap(), [])
  const maxChart = Math.max(...CHART_DATA.map((d) => d.value))

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-[#8b92a8]">
          Productivity insights across your workspace
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Tasks completed', value: '47', sub: 'This month' },
          { label: 'Avg. focus time', value: '4.2h', sub: 'Per day' },
          { label: 'Streak', value: '12 days', sub: 'Current' },
        ].map((s) => (
          <div key={s.label} className="glass hover-lift p-5">
            <p className="text-xs text-[#8b92a8]">{s.label}</p>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-[#8b92a8]">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="glass p-6">
        <h2 className="mb-6 text-sm font-semibold">Weekly Activity</h2>
        <div className="flex h-48 items-end justify-between gap-3">
          {CHART_DATA.map((d, i) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-[48px] rounded-t-lg transition-all duration-700"
                style={{
                  height: `${(d.value / maxChart) * 100}%`,
                  minHeight: 8,
                  background: `linear-gradient(180deg, var(--accent), #3b82f6)`,
                  animationDelay: `${i * 80}ms`,
                }}
              />
              <span className="text-xs text-[#8b92a8]">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass p-6">
          <h2 className="mb-4 text-sm font-semibold">Task Categories</h2>
          <div className="space-y-4">
            {CATEGORY_BREAKDOWN.map((cat) => {
              const total = CATEGORY_BREAKDOWN.reduce((a, c) => a + c.count, 0)
              const pct = (cat.count / total) * 100
              return (
                <div key={cat.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
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
        </div>

        <div className="glass overflow-hidden p-6">
          <h2 className="mb-4 text-sm font-semibold">Contribution Activity</h2>
          <div className="overflow-x-auto">
            <div className="inline-flex gap-[3px]">
              {heatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className={`h-3 w-3 rounded-sm ${HEATMAP_LEVELS[level]}`}
                      title={`${level} contributions`}
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
