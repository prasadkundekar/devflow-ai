export type SectionId =
  | 'dashboard'
  | 'tasks'
  | 'notes'
  | 'snippets'
  | 'analytics'
  | 'ai'
  | 'settings'

export type TaskColumn = 'backlog' | 'in-progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  column: TaskColumn
  priority: Priority
  tags: string[]
  dueDate: string
  dueDateIso?: string
  progress?: number
  createdAt?: string
  updatedAt?: string
  completedAt?: string
}

export interface CreateTaskInput {
  title: string
  description: string
  column: TaskColumn
  priority: Priority
  tags: string[]
  dueDate: string
  dueDateIso: string
  progress?: number
}

export interface UpdateTaskInput extends CreateTaskInput {
  id: string
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  accent: string
  updatedAt: string
}

export interface Snippet {
  id: string
  title: string
  language: string
  tags: string[]
  code: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface ActivityItem {
  id: string
  action: string
  target: string
  time: string
  icon: string
}

export interface ProjectProgress {
  id: string
  name: string
  progress: number
  color: string
}

export interface StatCard {
  label: string
  value: string
  trend: number
  trendLabel: string
}

export const ACCENT_COLORS = [
  { id: 'purple', value: '#7c5cff', label: 'Purple' },
  { id: 'blue', value: '#3b82f6', label: 'Blue' },
  { id: 'cyan', value: '#06b6d4', label: 'Cyan' },
  { id: 'pink', value: '#ec4899', label: 'Pink' },
  { id: 'green', value: '#10b981', label: 'Green' },
] as const
