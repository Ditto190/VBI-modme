import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartTypeStore } from 'src/store/chart/type'
import { createTestBuilder } from '../test-helpers'

describe('createChartTypeStore', () => {
  it('should initialize with current builder chartType', () => {
    const builder = createTestBuilder('type-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const typeStore = createChartTypeStore(chartBuilder)

    expect(typeStore.state.chartType).toBe('table')

    typeStore.dispose()
    chartBuilder.dispose()
  })

  it('should change chartType via changeChartType', () => {
    const builder = createTestBuilder('type-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const typeStore = createChartTypeStore(chartBuilder)

    typeStore.changeChartType('bar')
    expect(builder.chartType.getChartType()).toBe('bar')
    expect(typeStore.state.chartType).toBe('bar')

    typeStore.dispose()
    chartBuilder.dispose()
  })

  it('should return available chart types', () => {
    const builder = createTestBuilder('type-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const typeStore = createChartTypeStore(chartBuilder)

    const available = typeStore.getAvailableChartTypes()
    expect(Array.isArray(available)).toBe(true)
    expect(available).toContain('table')
    expect(available).toContain('bar')

    typeStore.dispose()
    chartBuilder.dispose()
  })
})
