import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext'
import type { Snippet } from '../../types'
import { Modal } from '../ui/Modal'

const LANGUAGES = [
  'Python',
  'TypeScript',
  'JavaScript',
  'React',
  'Flask',
  'SQL',
  'Shell',
  'Other',
]

const emptySnippet = (): Snippet => ({
  id: crypto.randomUUID(),
  title: '',
  language: 'TypeScript',
  tags: [],
  code: '',
})

interface SnippetFormModalProps {
  open: boolean
  onClose: () => void
  snippet?: Snippet | null
}

export function SnippetFormModal({
  open,
  onClose,
  snippet,
}: SnippetFormModalProps) {
  const { snippets, saveSnippet, deleteSnippet, showToast } = useApp()
  const isEdit = !!snippet
  const [draft, setDraft] = useState<Snippet>(emptySnippet())
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    if (open) {
      if (snippet) {
        setDraft({ ...snippet })
        setTagsInput(snippet.tags.join(', '))
      } else {
        setDraft(emptySnippet())
        setTagsInput('')
      }
    }
  }, [open, snippet])

  const handleClose = () => {
    setDraft(emptySnippet())
    setTagsInput('')
    onClose()
  }

  const handleSave = () => {
    if (!draft.title.trim()) {
      showToast('Add a snippet title')
      return
    }
    if (!draft.code.trim()) {
      showToast('Add code to the snippet')
      return
    }
    saveSnippet({
      ...draft,
      title: draft.title.trim(),
      code: draft.code,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
    showToast(isEdit ? 'Snippet updated' : 'Snippet created')
    handleClose()
  }

  const handleDelete = () => {
    if (!snippet) return
    if (!window.confirm(`Delete "${snippet.title}"?`)) return
    deleteSnippet(snippet.id)
    showToast('Snippet deleted')
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isEdit ? 'Edit snippet' : 'New snippet'}
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
            {isEdit ? 'Save changes' : 'Create snippet'}
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
            placeholder="e.g. useDebounce hook"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#8b92a8]">Language</label>
            <select
              value={draft.language}
              onChange={(e) =>
                setDraft({ ...draft, language: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-[#12151f] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-[#8b92a8]">Tags</label>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              placeholder="react, hooks"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-[#8b92a8]">Code *</label>
          <textarea
            value={draft.code}
            onChange={(e) => setDraft({ ...draft, code: e.target.value })}
            rows={12}
            spellCheck={false}
            className="mt-1 w-full resize-y rounded-lg border border-white/10 bg-[#0c0e14] px-3 py-2 font-mono text-[13px] leading-relaxed outline-none focus:border-[var(--accent)]"
            placeholder="Paste your code here..."
          />
        </div>
        {!isEdit && (
          <p className="text-xs text-[#8b92a8]">
            {snippets.length} snippet{snippets.length === 1 ? '' : 's'} saved
            locally
          </p>
        )}
      </div>
    </Modal>
  )
}
