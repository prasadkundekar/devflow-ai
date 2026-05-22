export const STORAGE_KEYS = {
  tasks: 'devflow-tasks',
  notes: 'devflow-notes',
  settings: 'devflow-settings',
  chat: 'devflow-chat',
} as const

export function clearDevFlowStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
}
