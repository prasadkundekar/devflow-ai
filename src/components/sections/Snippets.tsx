import { Check, Copy, Pencil, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SnippetFormModal } from '../snippets/SnippetFormModal'
import { useApp } from '../../context/AppContext'
import { highlightCode } from '../../lib/highlightCode'
import type { Snippet } from '../../types'

export function Snippets() {
  const { snippets, snippetFilter, setSnippetFilter, showToast } = useApp()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)

  const allTags = useMemo(
    () => ['all', ...new Set(snippets.flatMap((s) => s.tags))],
    [snippets],
  )

  const filtered =
    snippetFilter === 'all'
      ? snippets
      : snippets.filter((s) => s.tags.includes(snippetFilter))

  const openCreate = () => {
    setEditingSnippet(null)
    setModalOpen(true)
  }

  const openEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet)
    setModalOpen(true)
  }

  const copyCode = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    showToast('Copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Code Snippets</h1>
          <p className="mt-1 text-sm text-[#8b92a8]">
            {snippets.length} snippets saved — create, edit, or copy anytime
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #3b82f6)',
          }}
        >
          <Plus size={18} />
          New snippet
        </button>
      </header>

      <SnippetFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingSnippet(null)
        }}
        snippet={editingSnippet}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSnippetFilter(tag)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              snippetFilter === tag
                ? 'bg-[var(--accent)] text-white'
                : 'bg-white/6 text-[#8b92a8] hover:bg-white/10 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass py-16 text-center text-sm text-[#8b92a8]">
          No snippets match this filter.{' '}
          <button
            type="button"
            onClick={openCreate}
            className="text-[var(--accent)] hover:underline"
          >
            Add one
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((snippet) => (
            <div key={snippet.id} className="glass hover-lift overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold">{snippet.title}</h3>
                  <span className="rounded-md bg-[#bd93f9]/20 px-2 py-0.5 font-mono text-[10px] text-[#bd93f9]">
                    {snippet.language}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(snippet)}
                    className="flex items-center gap-1.5 rounded-lg bg-white/6 px-3 py-1.5 text-xs text-[#8b92a8] transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => copyCode(snippet.id, snippet.code)}
                    className="flex items-center gap-1.5 rounded-lg bg-white/6 px-3 py-1.5 text-xs text-[#8b92a8] transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copiedId === snippet.id ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              <pre className="syntax overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#f8f8f2]">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(snippet.code, snippet.id),
                  }}
                />
              </pre>
              <div className="flex gap-2 border-t border-white/6 px-4 py-2">
                {snippet.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-[#8b92a8]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
