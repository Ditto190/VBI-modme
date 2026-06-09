import type { ReactiveController, ReactiveControllerHost } from 'lit'
import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/dom'
import {
  getVBIChartEditorDragDropManager,
  isChartEditorFieldDragData,
  type VBIChartEditorFieldDragData,
  type VBIChartEditorDragDropManager,
} from './chart-editor-drag-types'

export interface ChartEditorDragCallbacks {
  /** Return a custom manager instance, or `undefined` to use the global default. */
  getManager?: () => VBIChartEditorDragDropManager | undefined
  /** Called once when the resolved manager instance changes (before new monitors bind). */
  onManagerChange?: (manager: VBIChartEditorDragDropManager) => void
  onDragStart?: (data: VBIChartEditorFieldDragData, event: DragStartEvent) => void
  onDragMove?: (data: VBIChartEditorFieldDragData, event: DragMoveEvent) => void
  onDragOver?: (data: VBIChartEditorFieldDragData, event: DragOverEvent) => void
  onDragEnd?: (data: VBIChartEditorFieldDragData, event: DragEndEvent) => void
}

/**
 * Reactive controller that manages a `DragDropManager` lifecycle and dispatches
 * validated field-drag callbacks to its host.
 *
 * - Resolves the manager lazily (prop → global singleton).
 * - Subscribes only to monitor events that have registered callbacks.
 * - Re-binds automatically when the resolved manager instance changes.
 * - Cleans up all listeners on `hostDisconnected`.
 */
export class ChartEditorDragController implements ReactiveController {
  private _boundManager: VBIChartEditorDragDropManager | undefined

  private _monitorCleanups: Array<() => void> = []

  constructor(
    host: ReactiveControllerHost,
    private _callbacks: ChartEditorDragCallbacks,
  ) {
    host.addController(this)
  }

  /**
   * The current `DragDropManager`. Resolves and binds on first access; re-binds
   * transparently when the resolved instance changes.
   */
  get manager(): VBIChartEditorDragDropManager {
    const next = this._callbacks.getManager?.() ?? getVBIChartEditorDragDropManager()

    if (next !== this._boundManager) {
      this._bind(next)
    }

    return next
  }

  hostDisconnected(): void {
    this._unbind()
    this._boundManager = undefined
  }

  // ── Internal ─────────────────────────────────────────────────────

  private _bind(manager: VBIChartEditorDragDropManager): void {
    this._unbind()
    this._boundManager = manager
    this._callbacks.onManagerChange?.(manager)

    const { onDragStart, onDragMove, onDragOver, onDragEnd } = this._callbacks
    const cleanups: Array<() => void> = []

    if (onDragStart) {
      cleanups.push(
        manager.monitor.addEventListener('dragstart', (event) => {
          const data = readChartEditorFieldDragData(event)
          if (data) onDragStart(data, event)
        }),
      )
    }

    if (onDragMove) {
      cleanups.push(
        manager.monitor.addEventListener('dragmove', (event) => {
          const data = readChartEditorFieldDragData(event)
          if (data) onDragMove(data, event)
        }),
      )
    }

    if (onDragOver) {
      cleanups.push(
        manager.monitor.addEventListener('dragover', (event) => {
          const data = readChartEditorFieldDragData(event)
          if (data) onDragOver(data, event)
        }),
      )
    }

    if (onDragEnd) {
      cleanups.push(
        manager.monitor.addEventListener('dragend', (event) => {
          const data = readChartEditorFieldDragData(event)
          if (data) onDragEnd(data, event)
        }),
      )
    }

    this._monitorCleanups = cleanups
  }

  private _unbind(): void {
    for (const cleanup of this._monitorCleanups) {
      cleanup()
    }

    this._monitorCleanups = []
  }
}

function readChartEditorFieldDragData(
  event: { operation: { source?: { data?: unknown } | null } },
): VBIChartEditorFieldDragData | undefined {
  const data = event.operation.source?.data
  return isChartEditorFieldDragData(data) ? data : undefined
}
