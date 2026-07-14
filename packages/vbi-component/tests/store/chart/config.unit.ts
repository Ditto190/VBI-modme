import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartConfigStore } from 'src/store/chart/config'
import { createTestBuilder } from '../test-helpers'

describe('createChartConfigStore', () => {
  it('should initialize config state with builder values', () => {
    const builder = createTestBuilder('config-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const configStore = createChartConfigStore(chartBuilder)

    expect(configStore.state.connectorId).toBe('config-conn')
    expect(configStore.state.theme).toBeDefined()
    expect(configStore.state.locale).toBeDefined()
    expect(configStore.state.limit).toBeGreaterThan(0)

    configStore.dispose()
    chartBuilder.dispose()
  })

  it('should update theme via setTheme', () => {
    const builder = createTestBuilder('config-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const configStore = createChartConfigStore(chartBuilder)

    configStore.setTheme('dark')
    expect(builder.theme.getTheme()).toBe('dark')

    configStore.dispose()
    chartBuilder.dispose()
  })

  it('should update locale via setLocale', () => {
    const builder = createTestBuilder('config-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const configStore = createChartConfigStore(chartBuilder)

    configStore.setLocale('en-US')
    expect(builder.locale.getLocale()).toBe('en-US')

    configStore.dispose()
    chartBuilder.dispose()
  })

  it('should normalize and update limit via setLimit', () => {
    const builder = createTestBuilder('config-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const configStore = createChartConfigStore(chartBuilder)

    configStore.setLimit(50.6)
    expect(builder.limit.getLimit()).toBe(51)

    configStore.dispose()
    chartBuilder.dispose()
  })
})
