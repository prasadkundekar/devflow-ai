import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function ToastContainer() {
  const { toasts, dismissToast } = useApp()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-enter flex items-center gap-3 rounded-xl border border-white/10 bg-[#1a1f2e] px-4 py-3 shadow-2xl"
        >
          <span className="text-sm text-[#e8eaf0]">{t.message}</span>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="text-[#8b92a8] hover:text-white"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
