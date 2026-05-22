import { Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AI_PROMPTS } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export function AIAssistant() {
  const { chatMessages, sendChat, isTyping, aiEnabled } = useApp()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    sendChat(input)
    setInput('')
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <header className="mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={22} className="text-[var(--accent)]" />
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
        </div>
        <p className="mt-1 text-sm text-[#8b92a8]">
          Pre-wired responses for FAISS, useDebounce, RAG, and JWT topics
        </p>
      </header>

      <div className="glass flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[var(--accent)] text-white'
                    : 'border border-white/8 bg-white/[0.04] text-[#e8eaf0]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                <span className="typing-dot h-2 w-2 rounded-full bg-[#8b92a8]" />
                <span className="typing-dot h-2 w-2 rounded-full bg-[#8b92a8]" />
                <span className="typing-dot h-2 w-2 rounded-full bg-[#8b92a8]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="shrink-0 border-t border-white/8 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {AI_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendChat(prompt)}
                disabled={!aiEnabled}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#8b92a8] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                aiEnabled ? 'Ask about your projects...' : 'AI is disabled in Settings'
              }
              disabled={!aiEnabled}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-[#8b92a8] focus:border-[var(--accent)] disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!aiEnabled || !input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
              style={{
                background: 'linear-gradient(135deg, var(--accent), #3b82f6)',
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
