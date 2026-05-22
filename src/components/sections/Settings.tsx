import { AlertTriangle } from 'lucide-react'
import { ACCENT_COLORS } from '../../types'
import { useApp } from '../../context/AppContext'
import { Toggle } from '../ui/Toggle'

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

export function Settings() {
  const {
    accent,
    setAccent,
    profileName,
    setProfileName,
    profileEmail,
    setProfileEmail,
    aiEnabled,
    setAiEnabled,
    suggestionsEnabled,
    setSuggestionsEnabled,
    autoComplete,
    setAutoComplete,
    resetWorkspace,
  } = useApp()

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-[#8b92a8]">
          Customize your DevFlow workspace
        </p>
      </header>

      <section className="glass p-6">
        <h2 className="mb-4 text-sm font-semibold">Profile</h2>
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, var(--accent), #3b82f6)',
            }}
          >
            {getInitials(profileName)}
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <label className="text-xs text-[#8b92a8]">Display name</label>
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label className="text-xs text-[#8b92a8]">Email</label>
              <input
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="glass p-6">
        <h2 className="mb-4 text-sm font-semibold">Accent Color</h2>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setAccent(c.value)}
              title={c.label}
              className={`h-10 w-10 rounded-xl transition-transform hover:scale-110 ${
                accent === c.value
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#12151f]'
                  : ''
              }`}
              style={{ background: c.value }}
            />
          ))}
        </div>
      </section>

      <section className="glass space-y-2 p-6">
        <h2 className="mb-4 text-sm font-semibold">AI Features</h2>
        <Toggle
          checked={aiEnabled}
          onChange={setAiEnabled}
          label="Enable AI Assistant"
          description="Chat panel and smart suggestions"
        />
        <Toggle
          checked={suggestionsEnabled}
          onChange={setSuggestionsEnabled}
          label="Dashboard suggestions"
          description="Personalized tips on the home screen"
        />
        <Toggle
          checked={autoComplete}
          onChange={setAutoComplete}
          label="Code autocomplete"
          description="Inline completions in snippets (beta)"
        />
      </section>

      <section className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertTriangle size={18} />
          <h2 className="text-sm font-semibold">Danger Zone</h2>
        </div>
        <p className="mt-2 text-sm text-[#8b92a8]">
          Permanently delete all tasks, notes, and snippets. This cannot be
          undone.
        </p>
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                'Reset all tasks, notes, settings, and chat to defaults?',
              )
            ) {
              resetWorkspace()
            }
          }}
          className="mt-4 rounded-lg border border-rose-500/50 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
        >
          Delete all workspace data
        </button>
      </section>
    </div>
  )
}
