import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { SNIPPETS, SNIPPET_HIGHLIGHTS } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const ALL_TAGS = ['all', ...new Set(SNIPPETS.flatMap((s) => s.tags))]

export function Snippets() {
  const { snippetFilter, setSnippetFilter, showToast } = useApp()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered =
    snippetFilter === 'all'
      ? SNIPPETS
      : SNIPPETS.filter((s) => s.tags.includes(snippetFilter))

  const copyCode = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    showToast('Copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Code Snippets</h1>
        <p className="mt-1 text-sm text-[#8b92a8]">
          Syntax-highlighted blocks from your projects
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => (
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
            <pre className="syntax overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#f8f8f2]">
              <code
                dangerouslySetInnerHTML={{
                  __html: SNIPPET_HIGHLIGHTS[snippet.id] ?? snippet.code,
                }}
              />
            </pre>
            <div className="flex gap-2 border-t border-white/6 px-4 py-2">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-[#8b92a8]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
