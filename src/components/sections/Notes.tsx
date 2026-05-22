import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Modal } from '../ui/Modal'
import type { Note } from '../../types'
import { ACCENT_COLORS } from '../../types'

const EMPTY_NOTE = (): Note => ({
  id: crypto.randomUUID(),
  title: '',
  content: '',
  tags: [],
  accent: ACCENT_COLORS[0].value,
  updatedAt: 'Just now',
})

export function Notes() {
  const { notes, saveNote, deleteNote, showToast, accent } = useApp()
  const [editorOpen, setEditorOpen] = useState(false)
  const [draft, setDraft] = useState<Note | null>(null)

  const openNew = () => {
    setDraft(EMPTY_NOTE())
    setEditorOpen(true)
  }

  const openEdit = (note: Note) => {
    setDraft({ ...note })
    setEditorOpen(true)
  }

  const closeEditor = () => {
    setEditorOpen(false)
    setDraft(null)
  }

  const handleSave = () => {
    if (!draft?.title.trim()) {
      showToast('Add a title before saving')
      return
    }
    const tags = draft.tags.length
      ? draft.tags
      : draft.content
          .split(/\s+/)
          .filter((w) => w.startsWith('#'))
          .map((w) => w.slice(1))
          .slice(0, 3)
    saveNote({
      ...draft,
      title: draft.title.trim(),
      content: draft.content.trim(),
      tags: tags.length ? tags : ['general'],
      accent: draft.accent || accent,
    })
    showToast(draft.id && notes.some((n) => n.id === draft.id) ? 'Note updated' : 'Note created')
    closeEditor()
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Notes Workspace</h1>
        <p className="mt-1 text-sm text-[#8b92a8]">
          {notes.length} notes — click to edit, changes persist on refresh
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {notes.map((note) => (
          <article
            key={note.id}
            role="button"
            tabIndex={0}
            onClick={() => openEdit(note)}
            onKeyDown={(e) => e.key === 'Enter' && openEdit(note)}
            className="glass hover-lift overflow-hidden cursor-pointer text-left"
          >
            <div className="h-1" style={{ background: note.accent }} />
            <div className="p-5">
              <h3 className="font-semibold">{note.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8b92a8] line-clamp-3">
                {note.content || 'Empty note'}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: `${note.accent}22`,
                      color: note.accent,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#8b92a8]">{note.updatedAt}</p>
            </div>
          </article>
        ))}
        <button
          type="button"
          onClick={openNew}
          className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-transparent text-[#8b92a8] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <Plus size={28} strokeWidth={1.5} />
          <span className="text-sm font-medium">New note</span>
        </button>
      </div>

      <Modal
        open={editorOpen && !!draft}
        onClose={closeEditor}
        title={draft && notes.some((n) => n.id === draft.id) ? 'Edit note' : 'New note'}
        footer={
          <>
            {draft && notes.some((n) => n.id === draft.id) && (
              <button
                type="button"
                onClick={() => {
                  deleteNote(draft.id)
                  showToast('Note deleted')
                  closeEditor()
                }}
                className="mr-auto flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={closeEditor}
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
              Save
            </button>
          </>
        }
      >
        {draft && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#8b92a8]">Title</label>
              <input
                value={draft.title}
                onChange={(e) =>
                  setDraft({ ...draft, title: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                placeholder="Note title"
              />
            </div>
            <div>
              <label className="text-xs text-[#8b92a8]">Content</label>
              <textarea
                value={draft.content}
                onChange={(e) =>
                  setDraft({ ...draft, content: e.target.value })
                }
                rows={6}
                className="mt-1 w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                placeholder="Write your note..."
              />
            </div>
            <div>
              <label className="text-xs text-[#8b92a8]">
                Tags (comma-separated)
              </label>
              <input
                value={draft.tags.join(', ')}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    tags: e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                placeholder="ev, thermal, rag"
              />
            </div>
            <div>
              <label className="text-xs text-[#8b92a8]">Accent</label>
              <div className="mt-2 flex gap-2">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setDraft({ ...draft, accent: c.value })}
                    className={`h-8 w-8 rounded-lg ${
                      draft.accent === c.value
                        ? 'ring-2 ring-white ring-offset-1 ring-offset-[#12151f]'
                        : ''
                    }`}
                    style={{ background: c.value }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
