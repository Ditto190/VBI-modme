import { describe, expect, it, vi } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createTestBuilder } from '../test-helpers'

describe('createChartBuilderStore', () => {
  it('should initialize with correct initial state and builder', () => {
    const builder = createTestBuilder('builder-conn')
    const store = createChartBuilderStore(builder)

    expect(store.builder).toBe(builder)
    expect(store.state.loading).toBe(false)
    expect(store.state.vseed).toBeNull()
    expect(store.state.dsl.connectorId).toBe('builder-conn')

    store.dispose()
  })

  it('should update builder and dsl on initialize', () => {
    const builder1 = createTestBuilder('builder-conn-1')
    const store = createChartBuilderStore(builder1)

    const builder2 = createTestBuilder('builder-conn-2')
    store.initialize(builder2)

    expect(store.builder).toBe(builder2)
    expect(store.state.dsl.connectorId).toBe('builder-conn-2')

    store.dispose()
  })

  it('should switch source and update builder', () => {
    const builder = createTestBuilder('old-source')
    const store = createChartBuilderStore(builder)

    store.switchSource(
      'new-source',
      [{ id: 1, val: 10 }],
      [
        { name: 'id', type: 'number' },
        { name: 'val', type: 'number' },
      ],
    )

    expect(store.builder.dsl.toJSON().connectorId).toBe('new-source')
    expect(store.state.dsl.connectorId).toBe('new-source')

    store.dispose()
  })

  it('should execute logState without throwing', () => {
    const builder = createTestBuilder('builder-conn')
    const store = createChartBuilderStore(builder)

    const consoleGroupSpy = vi.spyOn(console, 'group').mockImplementation(() => {})
    const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    const consoleGroupEndSpy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {})

    expect(() => store.logState()).not.toThrow()

    consoleGroupSpy.mockRestore()
    consoleInfoSpy.mockRestore()
    consoleGroupEndSpy.mockRestore()
    store.dispose()
  })
})
