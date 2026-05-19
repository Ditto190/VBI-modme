import { createVBI, VBI } from '@visactor/vbi'
import { createVBIResourceRegistry, createResourceStore } from 'src/vbi/resources'

describe('resource stores', () => {
  test('createResourceStore caches resolved builders and swaps between DSL/builder sources', () => {
    const calls: Array<{ value: string; suffix?: string }> = []
    const createBuilder = (dsl: { value: string }, options?: { suffix: string }) => {
      calls.push({ value: dsl.value, suffix: options?.suffix })
      return {
        build: () => ({ value: `${dsl.value}${options?.suffix ?? ''}` }),
      }
    }
    const store = createResourceStore(createBuilder)

    expect(store.build('missing')).toBeUndefined()
    expect(store.resolveBuilder('missing')).toBeUndefined()
    store.registerDSL('a', { value: 'x' })
    expect(store.build('a')).toEqual({ value: 'x' })
    expect(store.has('a')).toBe(true)
    expect(store.entries()).toEqual([['a', { value: 'x' }]])

    const builder = store.resolveBuilder('a', { suffix: '!' })
    expect(builder?.build()).toEqual({ value: 'x!' })
    expect(store.resolveBuilder('a')).toBe(builder)
    expect(calls).toEqual([{ value: 'x', suffix: '!' }])
    expect(store.entries()).toEqual([['a', { value: 'x!' }]])

    store.registerBuilder('a', { build: () => ({ value: 'builder' }) })
    expect(store.build('a')).toEqual({ value: 'builder' })
    expect(store.delete('a')).toBe(true)
    expect(store.delete('a')).toBe(false)
    expect(store.has('a')).toBe(false)

    store.registerDSL('b', { value: 'y' })
    store.registerBuilder('c', { build: () => ({ value: 'z' }) })
    expect(store.entries()).toEqual([
      ['b', { value: 'y' }],
      ['c', { value: 'z' }],
    ])
    store.clear()
    expect(store.entries()).toEqual([])
  })

  test('resource registry resolves chart and insight builders from stored DSL', () => {
    const registry = createVBIResourceRegistry()
    const chartDSL = VBI.chart.createEmpty('demo', 'chart-1')
    const insightDSL = VBI.insight.createEmpty('insight-1')
    insightDSL.content = 'hello'

    registry.charts.registerDSL('chart-1', chartDSL)
    registry.insights.registerDSL('insight-1', insightDSL)

    expect(registry.charts.resolveBuilder('chart-1')?.build()).toMatchObject({ uuid: 'chart-1' })
    expect(registry.insights.resolveBuilder('insight-1')?.build()).toMatchObject({ uuid: 'insight-1' })
    expect(registry.charts.build('chart-1')).toMatchObject({ uuid: 'chart-1' })
    expect(registry.insights.build('insight-1')).toMatchObject({ content: 'hello' })
  })

  test('VBI.resources manages chart and insight DSL resources', () => {
    const LocalVBI = createVBI()
    const chart = LocalVBI.chart.createEmpty('demo', 'chart-1')
    const insight = LocalVBI.insight.createEmpty('insight-1')
    insight.content = 'registered insight'

    LocalVBI.resources.chart.register(chart)
    LocalVBI.resources.insight.register(insight)

    expect(LocalVBI.resources.chart.has('chart-1')).toBe(true)
    expect(LocalVBI.resources.insight.has('insight-1')).toBe(true)
    expect(LocalVBI.resources.chart.get('chart-1')).toEqual(chart)
    expect(LocalVBI.resources.insight.get('insight-1')).toEqual(insight)
    expect(LocalVBI.resources.chart.list()).toEqual([chart])
    expect(LocalVBI.resources.insight.list()).toEqual([insight])
    expect(LocalVBI.resources.snapshot()).toEqual({
      charts: { 'chart-1': chart },
      insights: { 'insight-1': insight },
    })

    expect(LocalVBI.resources.chart.unregister('chart-1')).toBe(true)
    expect(LocalVBI.resources.chart.unregister('chart-1')).toBe(false)
    expect(LocalVBI.resources.chart.has('chart-1')).toBe(false)

    LocalVBI.resources.clear()
    expect(LocalVBI.resources.snapshot()).toEqual({ charts: {}, insights: {} })
  })

  test('VBI.resources reads resources created by VBI builders', () => {
    const LocalVBI = createVBI()
    const chartBuilder = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demo', 'chart-builder-1'))
    const insightBuilder = LocalVBI.insight.create(LocalVBI.insight.createEmpty('insight-builder-1'))

    chartBuilder.measures.add('sales', (node) => node.setAlias('Sales'))
    insightBuilder.setContent('builder insight')

    expect(LocalVBI.resources.chart.get('chart-builder-1')).toMatchObject({
      uuid: 'chart-builder-1',
      measures: [{ field: 'sales', alias: 'Sales' }],
    })
    expect(LocalVBI.resources.insight.get('insight-builder-1')).toMatchObject({
      uuid: 'insight-builder-1',
      content: 'builder insight',
    })
    expect(LocalVBI.resources.chart.list()).toMatchObject([
      {
        uuid: 'chart-builder-1',
        measures: [{ field: 'sales', alias: 'Sales' }],
      },
    ])
    expect(LocalVBI.resources.insight.list()).toMatchObject([
      {
        uuid: 'insight-builder-1',
        content: 'builder insight',
      },
    ])
    expect(LocalVBI.resources.snapshot()).toMatchObject({
      charts: { 'chart-builder-1': { uuid: 'chart-builder-1' } },
      insights: { 'insight-builder-1': { uuid: 'insight-builder-1' } },
    })
  })
})
