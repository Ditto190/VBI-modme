import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartDimensionsStore } from 'src/store/chart/dimensions'
import { createTestBuilder } from '../test-helpers'

describe('createChartDimensionsStore', () => {
  it('should manage adding, updating, finding, and removing dimensions', () => {
    const builder = createTestBuilder('dim-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const dimensionsStore = createChartDimensionsStore(chartBuilder)

    expect(dimensionsStore.state.dimensions).toEqual([])

    dimensionsStore.addDimension('category', (node) => {
      node.setAlias('Category Alias')
    })

    expect(dimensionsStore.state.dimensions.length).toBe(1)
    const firstDim = dimensionsStore.state.dimensions[0]
    expect(firstDim).toBeDefined()
    expect(firstDim?.field).toBe('category')
    expect(firstDim?.alias).toBe('Category Alias')

    const dimId = firstDim?.id ?? ''
    const foundNode = dimensionsStore.findDimension(dimId)
    expect(foundNode).toBeDefined()

    dimensionsStore.updateDimension(dimId, (node) => {
      node.setSort({ order: 'asc' })
    })

    expect(dimensionsStore.state.dimensions[0]?.sort?.order).toBe('asc')

    dimensionsStore.removeDimension(dimId)
    expect(dimensionsStore.state.dimensions.length).toBe(0)

    dimensionsStore.dispose()
    chartBuilder.dispose()
  })
})
