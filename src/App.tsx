import { AppProvider, useApp } from './context/AppContext'
import { Sidebar } from './components/layout/Sidebar'
import { ToastContainer } from './components/ui/Toast'
import { Dashboard } from './components/sections/Dashboard'
import { Tasks } from './components/sections/Tasks'
import { Notes } from './components/sections/Notes'
import { Snippets } from './components/sections/Snippets'
import { Analytics } from './components/sections/Analytics'
import { AIAssistant } from './components/sections/AIAssistant'
import { Settings } from './components/sections/Settings'
import type { ReactNode } from 'react'
import type { SectionId } from './types'

const SECTION_TITLES: Record<SectionId, string> = {
  dashboard: 'Dashboard',
  tasks: 'Tasks',
  notes: 'Notes',
  snippets: 'Snippets',
  analytics: 'Analytics',
  ai: 'AI Assistant',
  settings: 'Settings',
}

function MainContent() {
  const { section } = useApp()

  const views: Record<SectionId, ReactNode> = {
    dashboard: <Dashboard />,
    tasks: <Tasks />,
    notes: <Notes />,
    snippets: <Snippets />,
    analytics: <Analytics />,
    ai: <AIAssistant />,
    settings: <Settings />,
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 lg:p-8">
      {section !== 'dashboard' && section !== 'ai' && (
        <div className="sr-only">{SECTION_TITLES[section]}</div>
      )}
      {views[section]}
    </main>
  )
}

function AppShell() {
  return (
    <div className="flex h-full min-h-screen bg-[#0c0e14]">
      <Sidebar />
      <MainContent />
      <ToastContainer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
