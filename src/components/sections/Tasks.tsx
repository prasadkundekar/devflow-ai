import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Plus } from 'lucide-react'
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { TaskFormModal } from '../tasks/TaskFormModal'
import { useApp } from '../../context/AppContext'
import type { Priority, Task, TaskColumn } from '../../types'

const COLUMNS: { id: TaskColumn; label: string }[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
]

const PRIORITY_COLORS: Record<Priority, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#6b7280',
}

function TaskCardContent({
  task,
  dragging,
  dragHandle,
  onEdit,
}: {
  task: Task
  dragging?: boolean
  dragHandle?: HTMLAttributes<HTMLDivElement>
  onEdit: () => void
}) {
  return (
    <>
      <div className="flex items-start gap-2">
        <div
          className="shrink-0 touch-none"
          {...dragHandle}
        >
          <GripVertical
            size={14}
            className={`mt-1 cursor-grab text-[#8b92a8] active:cursor-grabbing ${dragging ? 'text-[var(--accent)]' : ''}`}
          />
        </div>
        <span
          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
          style={{ background: PRIORITY_COLORS[task.priority] }}
          title={task.priority}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-snug">{task.title}</h3>
          <p className="mt-1 text-xs text-[#8b92a8] line-clamp-2">
            {task.description}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="shrink-0 rounded-md p-1 text-[#8b92a8] hover:bg-white/8 hover:text-white"
          aria-label="Edit task"
        >
          <Pencil size={14} />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/6 px-2 py-0.5 text-[10px] font-medium text-[#8b92a8]"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-[#8b92a8]">Due {task.dueDate}</p>
      {task.progress !== undefined && (
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[10px]">
            <span className="text-[#8b92a8]">Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}
    </>
  )
}

function DraggableTaskCard({
  task,
  onEdit,
}: {
  task: Task
  onEdit: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id, data: { task } })

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`glass p-4 ${isDragging ? 'opacity-40' : 'hover-lift'}`}
    >
      <TaskCardContent
        task={task}
        dragging={isDragging}
        dragHandle={{ ...listeners, ...attributes }}
        onEdit={onEdit}
      />
    </article>
  )
}

function ColumnDropZone({
  columnId,
  label,
  count,
  children,
}: {
  columnId: TaskColumn
  label: string
  count: number
  children: ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId })

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold">{label}</h2>
        <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs text-[#8b92a8]">
          {count}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex min-h-[220px] flex-col gap-3 rounded-2xl border border-dashed p-3 transition-colors ${
          isOver
            ? 'border-[var(--accent)] bg-[var(--accent)]/8'
            : 'border-white/8 bg-white/[0.02]'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export function Tasks() {
  const { tasks, moveTask, showToast, taskStats } = useApp()
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  const openCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEdit = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

  const onDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    if (task) setActiveTask(task)
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const taskId = active.id as string
    const targetColumn = over.id as TaskColumn
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.column === targetColumn) return

    moveTask(taskId, targetColumn)
    const colLabel = COLUMNS.find((c) => c.id === targetColumn)?.label
    showToast(`Moved to ${colLabel}`)
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <p className="mt-1 text-sm text-[#8b92a8]">
            Drag cards between columns — {taskStats.active} active,{' '}
            {taskStats.inProgress} in progress. Click{' '}
            <Pencil size={12} className="inline" /> to edit.
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
          New task
        </button>
      </header>

      <TaskFormModal
        open={modalOpen}
        onClose={closeModal}
        task={editingTask}
      />

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {COLUMNS.map((col) => {
            const columnTasks = tasks.filter((t) => t.column === col.id)
            return (
              <ColumnDropZone
                key={col.id}
                columnId={col.id}
                label={col.label}
                count={columnTasks.length}
              >
                {columnTasks.map((task) => (
                  <DraggableTaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => openEdit(task)}
                  />
                ))}
                {columnTasks.length === 0 && (
                  <p className="py-8 text-center text-xs text-[#8b92a8]">
                    Drop tasks here
                  </p>
                )}
              </ColumnDropZone>
            )
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <article className="glass rotate-1 scale-105 cursor-grabbing p-4 shadow-2xl ring-2 ring-[var(--accent)]">
              <TaskCardContent task={activeTask} dragging onEdit={() => {}} />
            </article>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
