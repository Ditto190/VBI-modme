import { VBI } from '@visactor/vbi'
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

    const builder = store.resolveBuilder('a', { suffix: '!' })
    expect(builder?.build()).toEqual({ value: 'x!' })
    expect(store.resolveBuilder('a')).toBe(builder)
    expect(calls).toEqual([{ value: 'x', suffix: '!' }])

    store.registerBuilder('a', { build: () => ({ value: 'builder' }) })
    expect(store.build('a')).toEqual({ value: 'builder' })
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
})
