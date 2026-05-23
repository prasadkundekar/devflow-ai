import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { defaultDueIso, formatDueDate } from '../../lib/taskDates'
import type { Priority, Task, TaskColumn } from '../../types'
import { Modal } from '../ui/Modal'

const COLUMNS: { id: TaskColumn; label: string }[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
]

const PRIORITIES: { id: Priority; label: string }[] = [
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
]

interface Draft {
  title: string
  description: string
  column: TaskColumn
  priority: Priority
  tags: string
  dueIso: string
  progress: string
}

const emptyDraft = (): Draft => ({
  title: '',
  description: '',
  column: 'backlog',
  priority: 'medium',
  tags: '',
  dueIso: defaultDueIso(),
  progress: '10',
})

function draftFromTask(task: Task): Draft {
  return {
    title: task.title,
    description: task.description,
    column: task.column,
    priority: task.priority,
    tags: task.tags.join(', '),
    dueIso: task.dueDateIso ?? defaultDueIso(),
    progress: String(task.progress ?? 10),
  }
}

interface TaskFormModalProps {
  open: boolean
  onClose: () => void
  task?: Task | null
}

export function TaskFormModal({ open, onClose, task }: TaskFormModalProps) {
  const { addTask, updateTask, deleteTask, showToast } = useApp()
  const isEdit = !!task
  const [draft, setDraft] = useState<Draft>(emptyDraft)

  useEffect(() => {
    if (open) {
      setDraft(task ? draftFromTask(task) : emptyDraft())
    }
  }, [open, task])

  const handleClose = () => {
    setDraft(emptyDraft())
    onClose()
  }

  const buildInput = () => ({
    title: draft.title.trim(),
    description: draft.description.trim() || 'No description',
    column: draft.column,
    priority: draft.priority,
    tags: draft.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    dueDate: formatDueDate(draft.dueIso),
    dueDateIso: draft.dueIso,
    progress:
      draft.column === 'in-progress'
        ? Math.min(100, Math.max(0, Number(draft.progress) || 0))
        : undefined,
  })

  const handleSave = () => {
    if (!draft.title.trim()) {
      showToast('Add a task title')
      return
    }
    const input = buildInput()
    if (isEdit && task) {
      updateTask({ ...input, id: task.id })
      showToast('Task updated')
    } else {
      addTask(input)
      showToast(
        `Task added to ${COLUMNS.find((c) => c.id === draft.column)?.label}`,
      )
    }
    handleClose()
  }

  const handleDelete = () => {
    if (!task) return
    if (!window.confirm(`Delete "${task.title}"?`)) return
    deleteTask(task.id)
    showToast('Task deleted')
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isEdit ? 'Edit task' : 'New task'}
      footer={
        <>
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="mr-auto rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm text-[#8b92a8] hover:bg-white/6"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{
              background: 'linear-gradient(135deg, var(--accent), #3b82f6)',
            }}
          >
            {isEdit ? 'Save changes' : 'Create task'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs text-[#8b92a8]">Title *</label>
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            placeholder="e.g. FAISS index rebuild"
            autoFocus
          />
        </div>
        <div>
          <label className="text-xs text-[#8b92a8]">Description</label>
          <textarea
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
            rows={3}
            className="mt-1 w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            placeholder="What needs to be done?"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#8b92a8]">Column</label>
            <select
              value={draft.column}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  column: e.target.value as TaskColumn,
                })
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-[#12151f] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            >
              {COLUMNS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-[#8b92a8]">Priority</label>
            <select
              value={draft.priority}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  priority: e.target.value as Priority,
                })
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-[#12151f] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#8b92a8]">Due date</label>
            <input
              type="date"
              value={draft.dueIso}
              onChange={(e) =>
                setDraft({ ...draft, dueIso: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label className="text-xs text-[#8b92a8]">Tags</label>
            <input
              value={draft.tags}
              onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              placeholder="rag, python"
            />
          </div>
        </div>
        {draft.column === 'in-progress' && (
          <div>
            <label className="text-xs text-[#8b92a8]">Progress (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={draft.progress}
              onChange={(e) =>
                setDraft({ ...draft, progress: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
