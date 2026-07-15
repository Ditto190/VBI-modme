import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartConfigStore } from 'src/store/chart/config'
import { createChartVSeedStore } from 'src/store/chart/vseed'
import { createTestBuilder } from '../test-helpers'

describe('createChartVSeedStore', () => {
  it('should initialize with initial state and methods', () => {
    const builder = createTestBuilder('vseed-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const chartConfig = createChartConfigStore(chartBuilder)
    const vseedStore = createChartVSeedStore(chartBuilder, chartConfig)

    expect(vseedStore.state).toBeDefined()
    expect(vseedStore.state.vseed).toBeNull()
    expect(typeof vseedStore.onChange).toBe('function')
    expect(typeof vseedStore.dispose).toBe('function')

    vseedStore.dispose()
    chartConfig.dispose()
    chartBuilder.dispose()
  })
})
