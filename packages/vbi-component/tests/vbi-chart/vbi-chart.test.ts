import type { ISpec } from '@visactor/vchart'
import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { elementUpdated, fixture, fixtureCleanup, html } from '@open-wc/testing'
import { VBIChart } from '@visactor/vbi-component'

type VChartMockInstance = {
  options: { dom: HTMLElement }
  release: ReturnType<typeof rs.fn>
  renderSync: ReturnType<typeof rs.fn>
  spec: ISpec
}

type VChartMockState = {
  constructor: ReturnType<typeof rs.fn>
  instances: VChartMockInstance[]
}

rs.mock('@visactor/vchart', () => {
  const state: VChartMockState = {
    constructor: rs.fn((spec: ISpec, options: { dom: HTMLElement }) => {
      const instance: VChartMockInstance = {
        options,
        release: rs.fn(),
        renderSync: rs.fn(),
        spec,
      }
      state.instances.push(instance)
      return instance
    }),
    instances: [],
  }

  return {
    default: state.constructor,
    __vchartMockState: state,
  }
})

const getVChartMockState = async () => {
  const module = (await import('@visactor/vchart')) as unknown as { __vchartMockState: VChartMockState }
  return module.__vchartMockState
}

const createSpec = (type: string): ISpec =>
  ({
    data: [{ id: 'source', values: [{ category: 'A', value: 1 }] }],
    type,
    xField: 'category',
    yField: 'value',
  }) as unknown as ISpec

describe('vbi-chart', () => {
  beforeEach(async () => {
    const state = await getVChartMockState()
    state.instances.length = 0
    rs.clearAllMocks()
  })

  afterEach(() => {
    fixtureCleanup()
  })

  test('registers the custom element', () => {
    expect(customElements.get('vbi-chart')).toBe(VBIChart)
  })

  test('renders the empty state when spec is missing', async () => {
    const element = await fixture<VBIChart>(html`<vbi-chart .empty=${'Choose a chart'}></vbi-chart>`)

    const status = element.shadowRoot?.querySelector('[role="status"]')

    expect(status?.textContent).toBe('Choose a chart')
    expect(element.shadowRoot?.querySelector('.vbi-chart__container')).toBeNull()
  })

  test('renders VChart into the chart container when spec is provided', async () => {
    const spec = createSpec('bar')
    const element = await fixture<VBIChart>(html`<vbi-chart .spec=${spec}></vbi-chart>`)
    const state = await getVChartMockState()
    const container = element.shadowRoot?.querySelector('.vbi-chart__container')

    expect(container).toBeInstanceOf(HTMLElement)
    expect(state.constructor).toHaveBeenCalledWith(spec, { dom: container })
    expect(state.instances).toHaveLength(1)
    expect(state.instances[0].renderSync).toHaveBeenCalledTimes(1)
    expect(element.shadowRoot?.querySelector('[role="status"]')).toBeNull()
  })

  test('releases the previous VChart instance before rendering a new spec', async () => {
    const element = await fixture<VBIChart>(html`<vbi-chart .spec=${createSpec('bar')}></vbi-chart>`)
    const state = await getVChartMockState()
    const firstInstance = state.instances[0]

    element.spec = createSpec('line')
    await elementUpdated(element)

    expect(firstInstance.release).toHaveBeenCalledTimes(1)
    expect(state.instances).toHaveLength(2)
    expect(state.instances[1].renderSync).toHaveBeenCalledTimes(1)
  })

  test('releases the VChart instance when disconnected', async () => {
    await fixture<VBIChart>(html`<vbi-chart .spec=${createSpec('bar')}></vbi-chart>`)
    const state = await getVChartMockState()
    const instance = state.instances[0]

    fixtureCleanup()

    expect(instance.release).toHaveBeenCalledTimes(1)
  })
})
