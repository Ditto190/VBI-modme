import { useEffect } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'
import { useBuilderDocState } from './useBuilderDocState'

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable || target.closest('[contenteditable="true"]')) {
    return true
  }

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export const useVBIUndoManager = (builder: VBIChartBuilder | undefined) => {
  const state = useBuilderDocState({
    builder,
    fallback: { canUndo: false, canRedo: false },
    getSnapshot: (activeBuilder) => ({
      canUndo: activeBuilder.undoManager.canUndo(),
      canRedo: activeBuilder.undoManager.canRedo(),
    }),
  })

  useEffect(() => {
    if (!builder) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target) || event.altKey) {
        return
      }

      if (!(event.ctrlKey || event.metaKey)) {
        return
      }

      const key = event.key.toLowerCase()
      if (key === 'z' && !event.shiftKey && builder.undoManager.canUndo()) {
        event.preventDefault()
        builder.undoManager.undo()
      } else if ((key === 'y' || (key === 'z' && event.shiftKey)) && builder.undoManager.canRedo()) {
        event.preventDefault()
        builder.undoManager.redo()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [builder])

  return {
    canUndo: state.canUndo,
    canRedo: state.canRedo,
    undo: () => builder?.undoManager.undo(),
    redo: () => builder?.undoManager.redo(),
  }
}
