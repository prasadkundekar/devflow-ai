import type { Task } from '../types'
import { parseDueDateToIso } from './taskDates'

export function migrateTask(task: Task): Task {
  const now = new Date().toISOString()
  const migrated: Task = {
    ...task,
    createdAt: task.createdAt ?? now,
    dueDateIso: task.dueDateIso ?? parseDueDateToIso(task.dueDate),
  }
  if (migrated.column === 'done' && !migrated.completedAt) {
    migrated.completedAt = now
  }
  if (migrated.column !== 'done') {
    delete migrated.completedAt
  }
  return migrated
}

export function migrateTasks(tasks: Task[]): Task[] {
  return tasks.map(migrateTask)
}

export function stampColumnChange(task: Task, column: Task['column']): Task {
  const now = new Date().toISOString()
  const updated: Task = { ...task, column, updatedAt: now }
  if (column === 'in-progress' && updated.progress === undefined) {
    updated.progress = 10
  }
  if (column === 'done') {
    updated.completedAt = now
    delete updated.progress
  } else {
    delete updated.completedAt
    if (column === 'backlog') delete updated.progress
  }
  return updated
}

export function buildTaskFromInput(
  input: {
    title: string
    description: string
    column: Task['column']
    priority: Task['priority']
    tags: string[]
    dueDate: string
    dueDateIso: string
    progress?: number
  },
  existing?: Task,
): Task {
  const now = new Date().toISOString()
  const task: Task = {
    id: existing?.id ?? crypto.randomUUID(),
    title: input.title,
    description: input.description,
    column: input.column,
    priority: input.priority,
    tags: input.tags,
    dueDate: input.dueDate,
    dueDateIso: input.dueDateIso,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  }
  if (input.column === 'in-progress') {
    task.progress = input.progress ?? existing?.progress ?? 10
  }
  if (input.column === 'done') {
    task.completedAt = existing?.completedAt ?? now
  }
  return migrateTask(task)
}
