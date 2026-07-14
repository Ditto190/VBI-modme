import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartDimensionsStore } from 'src/store/chart/dimensions'
import { createChartUndoStore } from 'src/store/chart/undo'
import { createTestBuilder } from '../test-helpers'

describe('createChartUndoStore', () => {
  it('should manage undo, redo, and clearing history', () => {
    const builder = createTestBuilder('undo-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const dimensionsStore = createChartDimensionsStore(chartBuilder)
    const undoStore = createChartUndoStore(chartBuilder)

    expect(undoStore.state.canUndo).toBe(false)
    expect(undoStore.state.canRedo).toBe(false)

    dimensionsStore.addDimension('category')
    expect(undoStore.state.canUndo).toBe(true)

    const undoSuccess = undoStore.undo()
    expect(undoSuccess).toBe(true)
    expect(dimensionsStore.state.dimensions.length).toBe(0)
    expect(undoStore.state.canRedo).toBe(true)

    const redoSuccess = undoStore.redo()
    expect(redoSuccess).toBe(true)
    expect(dimensionsStore.state.dimensions.length).toBe(1)

    undoStore.clear()
    expect(undoStore.state.canUndo).toBe(false)
    expect(undoStore.state.canRedo).toBe(false)

    undoStore.dispose()
    dimensionsStore.dispose()
    chartBuilder.dispose()
  })
})
