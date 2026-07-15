import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartFilterRootOperatorStore } from 'src/store/chart/filter-root-operator'
import { createTestBuilder } from '../test-helpers'

describe('createChartFilterRootOperatorStore', () => {
  it('should get and set filter root operators for where and having', () => {
    const builder = createTestBuilder('op-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const opStore = createChartFilterRootOperatorStore(chartBuilder)

    expect(opStore.getOperator('where')).toBe('and')
    expect(opStore.getOperator('having')).toBe('and')
    expect(opStore.state.whereOperator).toBe('and')
    expect(opStore.state.havingOperator).toBe('and')

    opStore.setOperator('where', 'or')
    expect(opStore.getOperator('where')).toBe('or')
    expect(opStore.state.whereOperator).toBe('or')

    opStore.setOperator('having', 'or')
    expect(opStore.getOperator('having')).toBe('or')
    expect(opStore.state.havingOperator).toBe('or')

    opStore.dispose()
    chartBuilder.dispose()
  })
})
