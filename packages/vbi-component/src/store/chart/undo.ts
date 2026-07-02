import { createStore } from '@stencil/store'
import { type ChartBuilderStore } from './builder'

export interface ChartUndoState {
  canUndo: boolean
  canRedo: boolean
}

export interface ChartUndoStore {
  state: ChartUndoState
  onChange: <Key extends keyof ChartUndoState>(propName: Key, cb: (newValue: ChartUndoState[Key]) => void) => void
  dispose: () => void
  undo: () => boolean
  redo: () => boolean
  clear: (clearUndoStack?: boolean, clearRedoStack?: boolean) => void
}

export function createChartUndoStore(chartBuilder: ChartBuilderStore): ChartUndoStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartUndoState>({
    canUndo: false,
    canRedo: false,
  })

  const updateState = () => {
    const builder = chartBuilder.builder
    if (builder && builder.undoManager) {
      state.canUndo = builder.undoManager.canUndo()
      state.canRedo = builder.undoManager.canRedo()
    } else {
      state.canUndo = false
      state.canRedo = false
    }
  }

  updateState()

  const undo = () => {
    const builder = chartBuilder.builder
    if (builder?.undoManager?.canUndo()) {
      const res = builder.undoManager.undo()
      updateState()
      return res
    }
    return false
  }

  const redo = () => {
    const builder = chartBuilder.builder
    if (builder?.undoManager?.canRedo()) {
      const res = builder.undoManager.redo()
      updateState()
      return res
    }
    return false
  }

  const clear = (clearUndoStack = true, clearRedoStack = true) => {
    const builder = chartBuilder.builder
    if (builder && builder.undoManager) {
      builder.undoManager.clear(clearUndoStack, clearRedoStack)
      updateState()
    }
  }

  let currentBuilder = chartBuilder.builder

  const onDocUpdate = () => {
    updateState()
  }

  if (currentBuilder && currentBuilder.doc) {
    currentBuilder.doc.on('update', onDocUpdate)
  }

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.off('update', onDocUpdate)
      }
      currentBuilder = chartBuilder.builder
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.on('update', onDocUpdate)
      }
    }
    updateState()
  })

  const dispose = () => {
    if (currentBuilder && currentBuilder.doc) {
      currentBuilder.doc.off('update', onDocUpdate)
    }
    storeDispose()
  }

  return { state, onChange, dispose, undo, redo, clear }
}
