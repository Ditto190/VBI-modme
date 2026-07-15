import { describe, expect, it } from '@stencil/vitest'
import { createChartStore } from 'src/store/chart/store'
import { createTestBuilder } from '../test-helpers'

describe('createChartStore', () => {
  it('should initialize with all sub-stores properly connected', () => {
    const builder = createTestBuilder('demo-connector')
    const store = createChartStore(builder)

    expect(store.chartBuilder).toBeDefined()
    expect(store.chartConfig).toBeDefined()
    expect(store.chartUndo).toBeDefined()
    expect(store.chartType).toBeDefined()
    expect(store.chartDimensions).toBeDefined()
    expect(store.chartMeasures).toBeDefined()
    expect(store.chartSchemaFields).toBeDefined()
    expect(store.chartVSeed).toBeDefined()
    expect(store.chartWhereFilter).toBeDefined()
    expect(store.chartHavingFilter).toBeDefined()
    expect(store.chartFilterRootOperator).toBeDefined()
    expect(store.translation).toBeDefined()

    expect(store.chartBuilder.builder).toBe(builder)
    expect(store.chartConfig.state.connectorId).toBe('demo-connector')

    const dispose = store.initialize()
    expect(typeof dispose).toBe('function')
    dispose()
  })

  it('should allow switching builder instance via initialize', () => {
    const builder1 = createTestBuilder('conn-1')
    const store = createChartStore(builder1)

    expect(store.chartBuilder.builder).toBe(builder1)
    expect(store.chartConfig.state.connectorId).toBe('conn-1')

    const builder2 = createTestBuilder('conn-2')
    const dispose = store.initialize(builder2)

    expect(store.chartBuilder.builder).toBe(builder2)
    expect(store.chartConfig.state.connectorId).toBe('conn-2')

    dispose()
  })
})
