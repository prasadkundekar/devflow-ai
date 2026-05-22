import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import type { CreateTaskInput, Priority, TaskColumn } from '../../types'
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

function defaultDueIso() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().slice(0, 10)
}

function formatDueDate(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const EMPTY_DRAFT = () => ({
  title: '',
  description: '',
  column: 'backlog' as TaskColumn,
  priority: 'medium' as Priority,
  tags: '',
  dueIso: defaultDueIso(),
})

interface TaskFormModalProps {
  open: boolean
  onClose: () => void
}

export function TaskFormModal({ open, onClose }: TaskFormModalProps) {
  const { addTask, showToast } = useApp()
  const [draft, setDraft] = useState(EMPTY_DRAFT)

  const handleClose = () => {
    setDraft(EMPTY_DRAFT())
    onClose()
  }

  const handleSave = () => {
    if (!draft.title.trim()) {
      showToast('Add a task title')
      return
    }

    const input: CreateTaskInput = {
      title: draft.title.trim(),
      description: draft.description.trim() || 'No description',
      column: draft.column,
      priority: draft.priority,
      tags: draft.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      dueDate: formatDueDate(draft.dueIso),
    }

    addTask(input)
    showToast(`Task added to ${COLUMNS.find((c) => c.id === draft.column)?.label}`)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="New task"
      footer={
        <>
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
            Create task
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
      </div>
    </Modal>
  )
}
