import type { VBIChartBuilder } from '@visactor/vbi'

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable || target.closest('[contenteditable="true"]')) {
    return true
  }

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export interface VBIUndoManagerResult {
  readonly canUndo: boolean
  readonly canRedo: boolean
  undo: () => boolean
  redo: () => boolean
  clear: (clearUndoStack?: boolean, clearRedoStack?: boolean) => void
  destroy: () => void
}

export const createVBIUndoManager = (builder: VBIChartBuilder | undefined): VBIUndoManagerResult => {
  if (!builder) {
    return {
      get canUndo() {
        return false
      },
      get canRedo() {
        return false
      },
      undo: () => false,
      redo: () => false,
      clear: () => {},
      destroy: () => {},
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isEditableTarget(event.target) || event.altKey) {
      return
    }

    const withCommand = event.ctrlKey || event.metaKey
    if (!withCommand) {
      return
    }

    const key = event.key.toLowerCase()
    const wantsUndo = key === 'z' && !event.shiftKey
    const wantsRedo = key === 'y' || (key === 'z' && event.shiftKey)

    if (wantsUndo && builder.undoManager.canUndo()) {
      event.preventDefault()
      builder.undoManager.undo()
    } else if (wantsRedo && builder.undoManager.canRedo()) {
      event.preventDefault()
      builder.undoManager.redo()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  const undo = () => {
    if (builder.undoManager.canUndo()) return builder.undoManager.undo()
    return false
  }

  const redo = () => {
    if (builder.undoManager.canRedo()) return builder.undoManager.redo()
    return false
  }

  const clear = (clearUndoStack = true, clearRedoStack = true) => {
    builder.undoManager.clear(clearUndoStack, clearRedoStack)
  }

  const destroy = () => {
    window.removeEventListener('keydown', handleKeyDown)
  }

  return {
    get canUndo() {
      return builder.undoManager.canUndo()
    },
    get canRedo() {
      return builder.undoManager.canRedo()
    },
    undo,
    redo,
    clear,
    destroy,
  }
}
