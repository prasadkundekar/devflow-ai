import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AI_RESPONSES,
  INITIAL_CHAT,
  NOTES as DEFAULT_NOTES,
  TASKS as DEFAULT_TASKS,
} from '../data/mockData'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { clearDevFlowStorage, STORAGE_KEYS } from '../lib/storage'
import type {
  ChatMessage,
  CreateTaskInput,
  Note,
  SectionId,
  Task,
  TaskColumn,
} from '../types'
import { ACCENT_COLORS } from '../types'

interface Toast {
  id: string
  message: string
}

interface PersistedSettings {
  accent: string
  aiEnabled: boolean
  suggestionsEnabled: boolean
  autoComplete: boolean
  profileName: string
  profileEmail: string
}

const DEFAULT_SETTINGS: PersistedSettings = {
  accent: ACCENT_COLORS[0].value,
  aiEnabled: true,
  suggestionsEnabled: true,
  autoComplete: false,
  profileName: 'Prasad',
  profileEmail: 'prasad@devflow.ai',
}

interface AppContextValue {
  section: SectionId
  setSection: (id: SectionId) => void
  accent: string
  setAccent: (color: string) => void
  profileName: string
  setProfileName: (name: string) => void
  profileEmail: string
  setProfileEmail: (email: string) => void
  toasts: Toast[]
  showToast: (message: string) => void
  dismissToast: (id: string) => void
  aiEnabled: boolean
  setAiEnabled: (v: boolean) => void
  suggestionsEnabled: boolean
  setSuggestionsEnabled: (v: boolean) => void
  autoComplete: boolean
  setAutoComplete: (v: boolean) => void
  chatMessages: ChatMessage[]
  sendChat: (text: string) => void
  isTyping: boolean
  snippetFilter: string
  setSnippetFilter: (tag: string) => void
  tasks: Task[]
  addTask: (input: CreateTaskInput) => void
  moveTask: (taskId: string, column: TaskColumn) => void
  taskStats: { active: number; completed: number; inProgress: number }
  notes: Note[]
  saveNote: (note: Note) => void
  deleteNote: (id: string) => void
  resetWorkspace: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

function formatRelativeTime() {
  return 'Just now'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [section, setSection] = useState<SectionId>('dashboard')
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    STORAGE_KEYS.tasks,
    DEFAULT_TASKS,
  )
  const [notes, setNotes] = useLocalStorage<Note[]>(
    STORAGE_KEYS.notes,
    DEFAULT_NOTES,
  )
  const [settings, setSettings] = useLocalStorage<PersistedSettings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS,
  )
  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessage[]>(
    STORAGE_KEYS.chat,
    INITIAL_CHAT,
  )
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [snippetFilter, setSnippetFilter] = useState('all')

  const {
    accent,
    aiEnabled,
    suggestionsEnabled,
    autoComplete,
    profileName,
    profileEmail,
  } = settings

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  const patchSettings = useCallback(
    (patch: Partial<PersistedSettings>) => {
      setSettings((prev) => ({ ...prev, ...patch }))
    },
    [setSettings],
  )

  const setAccent = useCallback(
    (color: string) => patchSettings({ accent: color }),
    [patchSettings],
  )
  const setAiEnabled = useCallback(
    (v: boolean) => patchSettings({ aiEnabled: v }),
    [patchSettings],
  )
  const setSuggestionsEnabled = useCallback(
    (v: boolean) => patchSettings({ suggestionsEnabled: v }),
    [patchSettings],
  )
  const setAutoComplete = useCallback(
    (v: boolean) => patchSettings({ autoComplete: v }),
    [patchSettings],
  )
  const setProfileName = useCallback(
    (name: string) => patchSettings({ profileName: name }),
    [patchSettings],
  )
  const setProfileEmail = useCallback(
    (email: string) => patchSettings({ profileEmail: email }),
    [patchSettings],
  )

  const showToast = useCallback((message: string) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2800)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addTask = useCallback(
    (input: CreateTaskInput) => {
      const task: Task = {
        id: crypto.randomUUID(),
        title: input.title.trim(),
        description: input.description.trim(),
        column: input.column,
        priority: input.priority,
        tags: input.tags,
        dueDate: input.dueDate,
      }
      if (input.column === 'in-progress') {
        task.progress = 10
      }
      setTasks((prev) => [task, ...prev])
    },
    [setTasks],
  )

  const moveTask = useCallback(
    (taskId: string, column: TaskColumn) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== taskId) return t
          const updated: Task = { ...t, column }
          if (column === 'in-progress' && updated.progress === undefined) {
            updated.progress = 10
          }
          if (column === 'done') {
            delete updated.progress
          }
          if (column === 'backlog') {
            delete updated.progress
          }
          return updated
        }),
      )
    },
    [setTasks],
  )

  const taskStats = useMemo(
    () => ({
      active: tasks.filter((t) => t.column !== 'done').length,
      completed: tasks.filter((t) => t.column === 'done').length,
      inProgress: tasks.filter((t) => t.column === 'in-progress').length,
    }),
    [tasks],
  )

  const saveNote = useCallback(
    (note: Note) => {
      setNotes((prev) => {
        const idx = prev.findIndex((n) => n.id === note.id)
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = { ...note, updatedAt: formatRelativeTime() }
          return next
        }
        return [{ ...note, updatedAt: formatRelativeTime() }, ...prev]
      })
    },
    [setNotes],
  )

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id))
    },
    [setNotes],
  )

  const resetWorkspace = useCallback(() => {
    clearDevFlowStorage()
    setTasks(DEFAULT_TASKS)
    setNotes(DEFAULT_NOTES)
    setSettings(DEFAULT_SETTINGS)
    setChatMessages(INITIAL_CHAT)
    showToast('Workspace reset to defaults')
  }, [setTasks, setNotes, setSettings, setChatMessages, showToast])

  const sendChat = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || !aiEnabled) return

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
      }
      setChatMessages((prev) => [...prev, userMsg])
      setIsTyping(true)

      const response =
        AI_RESPONSES[trimmed] ??
        `I understand you're asking about "${trimmed}". Based on your current projects (EV thermal system, RAG pipeline, Flask JWT), I'd recommend breaking this into smaller tasks on your Kanban board. Want me to elaborate on a specific area?`

      await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800))

      setChatMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: response },
      ])
      setIsTyping(false)
    },
    [aiEnabled, setChatMessages],
  )

  const value = useMemo(
    () => ({
      section,
      setSection,
      accent,
      setAccent,
      profileName,
      setProfileName,
      profileEmail,
      setProfileEmail,
      toasts,
      showToast,
      dismissToast,
      aiEnabled,
      setAiEnabled,
      suggestionsEnabled,
      setSuggestionsEnabled,
      autoComplete,
      setAutoComplete,
      chatMessages,
      sendChat,
      isTyping,
      snippetFilter,
      setSnippetFilter,
      tasks,
      addTask,
      moveTask,
      taskStats,
      notes,
      saveNote,
      deleteNote,
      resetWorkspace,
    }),
    [
      section,
      accent,
      setAccent,
      profileName,
      setProfileName,
      profileEmail,
      setProfileEmail,
      toasts,
      showToast,
      dismissToast,
      aiEnabled,
      suggestionsEnabled,
      autoComplete,
      chatMessages,
      sendChat,
      isTyping,
      snippetFilter,
      tasks,
      addTask,
      moveTask,
      taskStats,
      notes,
      saveNote,
      deleteNote,
      resetWorkspace,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
