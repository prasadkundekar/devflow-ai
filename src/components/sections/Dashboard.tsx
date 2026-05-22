import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Code2,
  FileText,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { useMemo } from 'react'
import {
  ACTIVITIES,
  AI_SUGGESTION,
  PROJECTS,
  STAT_CARDS,
} from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const ACTIVITY_ICONS: Record<string, typeof CheckCircle2> = {
  check: CheckCircle2,
  note: FileText,
  code: Code2,
  sparkles: Sparkles,
  kanban: CheckCircle2,
}

export function Dashboard() {
  const {
    setSection,
    sendChat,
    profileName,
    taskStats,
    notes,
    suggestionsEnabled,
  } = useApp()

  const stats = useMemo(
    () => [
      { ...STAT_CARDS[0], value: String(taskStats.active) },
      { ...STAT_CARDS[1], value: String(taskStats.completed) },
      { ...STAT_CARDS[2], value: String(notes.length) },
      STAT_CARDS[3],
    ],
    [taskStats, notes.length],
  )

  const firstName = profileName.split(' ')[0] || profileName

  return (
    <div className="space-y-6">
      <div className="gradient-border glass hover-lift relative overflow-hidden p-8">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--accent), transparent)',
          }}
        />
        <p className="text-sm font-medium text-[var(--accent)]">Welcome back</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Good evening, {firstName}
        </h1>
        <p className="mt-2 max-w-xl text-[#8b92a8]">
          You have {taskStats.inProgress} task
          {taskStats.inProgress === 1 ? '' : 's'} in progress and{' '}
          {taskStats.active} active overall across your EV system and RAG
          pipeline.
          {suggestionsEnabled
            ? ' Your AI assistant has a suggestion below.'
            : ''}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass hover-lift p-5">
            <p className="text-xs font-medium text-[#8b92a8]">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {stat.trend >= 0 ? (
                <TrendingUp size={14} className="text-emerald-400" />
              ) : (
                <TrendingDown size={14} className="text-rose-400" />
              )}
              <span
                className={
                  stat.trend >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }
              >
                {stat.trend >= 0 ? '+' : ''}
                {stat.trend}%
              </span>
              <span className="text-[#8b92a8]">{stat.trendLabel}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass lg:col-span-2">
          <h2 className="border-b border-white/8 px-5 py-4 text-sm font-semibold">
            Recent Activity
          </h2>
          <ul className="divide-y divide-white/6">
            {ACTIVITIES.map((a) => {
              const Icon = ACTIVITY_ICONS[a.icon] ?? CheckCircle2
              return (
                <li
                  key={a.id}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/6">
                    <Icon size={16} className="text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="text-[#8b92a8]">{a.action}</span>{' '}
                      <span className="font-medium">{a.target}</span>
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-[#8b92a8]">
                    {a.time}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        {suggestionsEnabled ? (
          <div className="gradient-border glass hover-lift p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/20">
                <Bot size={20} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
                  AI Suggestion
                </p>
                <h3 className="mt-1 font-semibold">{AI_SUGGESTION.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8b92a8]">
                  {AI_SUGGESTION.body}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSection('ai')
                    sendChat('How do I tune FAISS IVF-PQ?')
                  }}
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  {AI_SUGGESTION.cta}
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass flex items-center justify-center p-5 text-sm text-[#8b92a8]">
            AI suggestions disabled in Settings
          </div>
        )}
      </div>

      <div className="glass p-6">
        <h2 className="mb-4 text-sm font-semibold">Project Progress</h2>
        <div className="space-y-5">
          {PROJECTS.map((p) => (
            <div key={p.id}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-[#8b92a8]">{p.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${p.progress}%`,
                    background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
