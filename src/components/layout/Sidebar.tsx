import {
  BarChart3,
  Code2,
  Kanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  StickyNote,
  Zap,
} from 'lucide-react'
import { NAV_SECTIONS } from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import type { SectionId } from '../../types'

const ICONS = {
  LayoutDashboard,
  Kanban,
  StickyNote,
  Code2,
  BarChart3,
  Sparkles,
  Settings,
} as const

function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '??'
  )
}

export function Sidebar() {
  const { section, setSection, profileName } = useApp()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/8 bg-[#0a0c12] px-3 py-5">
      <div className="mb-8 flex items-center gap-2.5 px-2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #3b82f6)',
          }}
        >
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-tight">DevFlow AI</p>
          <p className="text-[10px] text-[#8b92a8]">Developer workspace</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV_SECTIONS.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS]
          const active = section === item.id
          const isAi = item.id === 'ai'

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id as SectionId)}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                active
                  ? 'bg-white/8 text-white'
                  : 'text-[#8b92a8] hover:bg-white/4 hover:text-[#e8eaf0]'
              }`}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
              <Icon size={18} className={active ? 'text-[var(--accent)]' : ''} />
              <span className="font-medium">{item.label}</span>
              {isAi && (
                <span className="pulse-dot ml-auto h-2 w-2 rounded-full bg-emerald-400" />
              )}
            </button>
          )
        })}
      </nav>

      <div className="glass mt-4 flex items-center gap-3 p-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #3b82f6)',
          }}
        >
          {getInitials(profileName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{profileName}</p>
          <p className="truncate text-xs text-[#8b92a8]">Full-stack dev</p>
        </div>
      </div>
    </aside>
  )
}
