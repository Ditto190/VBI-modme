import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartMeasuresStore } from 'src/store/chart/measures'
import { createTestBuilder } from '../test-helpers'

describe('createChartMeasuresStore', () => {
  it('should manage adding, updating, finding, and removing measures', () => {
    const builder = createTestBuilder('measure-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const measuresStore = createChartMeasuresStore(chartBuilder)

    expect(measuresStore.state.measures).toEqual([])

    measuresStore.addMeasure('sales', (node) => {
      node.setAggregate({ func: 'sum' })
      node.setAlias('Total Sales')
    })

    expect(measuresStore.state.measures.length).toBe(1)
    const firstMeasure = measuresStore.state.measures[0]
    expect(firstMeasure).toBeDefined()
    expect(firstMeasure?.field).toBe('sales')
    expect(firstMeasure?.aggregate).toEqual({ func: 'sum' })
    expect(firstMeasure?.alias).toBe('Total Sales')

    const measureId = firstMeasure?.id ?? ''
    const foundNode = measuresStore.findMeasure(measureId)
    expect(foundNode).toBeDefined()

    measuresStore.updateMeasure(measureId, (node) => {
      node.setFormat({ type: 'number', prefix: '$' })
    })

    expect(measuresStore.state.measures[0]?.format).toEqual({ type: 'number', prefix: '$' })

    measuresStore.removeMeasure(measureId)
    expect(measuresStore.state.measures.length).toBe(0)

    measuresStore.dispose()
    chartBuilder.dispose()
  })
})
