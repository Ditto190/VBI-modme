import { rs } from '@rstest/core'
import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'
import type { VBIChartField } from 'src/vbi-chart-editor/vbi-chart-fields'
import type { VBIChartFilterItem } from 'src/vbi-chart-editor/vbi-chart-filter'
import { createVBI } from '@visactor/vbi'

rs.mock('src/vbi-vseed-render/renderer', () => ({
  renderVSeed: rs.fn(),
}))

const { VBIChartEditor } = await import('src/vbi-chart-editor/vbi-chart-editor')

type VBIChartEditorInstance = InstanceType<typeof VBIChartEditor>

const query = <T extends Element>(el: VBIChartEditorInstance, selector: string): T | null =>
  el.shadowRoot?.querySelector<T>(selector) ?? null

const queryAll = <T extends Element>(el: VBIChartEditorInstance, selector: string): NodeListOf<T> =>
  el.shadowRoot?.querySelectorAll<T>(selector) ?? (null as any)

/** Helper to create a VBI chart builder with sensible defaults. */
function createTestBuilder(overrides: Record<string, any> = {}) {
  const VBI = createVBI()
  return VBI.chart.create({
    connectorId: 'demoSupermarket',
    chartType: overrides.chartType ?? 'bar',
    dimensions: overrides.dimensions ?? [],
    measures: overrides.measures ?? [],
    whereFilter: overrides.whereFilter ?? { id: 'root', op: 'and', conditions: [] },
    havingFilter: overrides.havingFilter ?? { id: 'root', op: 'and', conditions: [] },
    theme: overrides.theme ?? 'light',
    locale: overrides.locale ?? 'zh-CN',
    version: 1,
  })
}

describe('vbi-chart-editor', () => {
  afterEach(() => {
    fixtureCleanup()
  })

  it('should register as a custom element and render shadow DOM', async () => {
    expect(customElements.get('vbi-chart-editor')).toBeDefined()

    const el = await fixture<VBIChartEditorInstance>(html`<vbi-chart-editor></vbi-chart-editor>`)
    expect(el).toBeInstanceOf(VBIChartEditor)
    expect(el.shadowRoot).toBeTruthy()
  })

  it('should render the correct layout structure with 4 shelves', async () => {
    const el = await fixture<VBIChartEditorInstance>(html`<vbi-chart-editor></vbi-chart-editor>`)

    // Check wrapper layout divs
    expect(query(el, '.editor-toolbar')).toBeTruthy()
    expect(query(el, '.editor-body')).toBeTruthy()
    expect(query(el, '.editor-sidebar')).toBeTruthy()
    expect(query(el, '.editor-main')).toBeTruthy()
    expect(query(el, '.editor-shelves')).toBeTruthy()
    expect(query(el, '.editor-render')).toBeTruthy()

    // Check subcomponents
    expect(query(el, 'vbi-chart-toolbar')).toBeTruthy()
    expect(query(el, 'vbi-chart-fields')).toBeTruthy()
    expect(query(el, 'vbi-chart-dimensions')).toBeTruthy()
    expect(query(el, 'vbi-chart-measures')).toBeTruthy()
    expect(queryAll(el, 'vbi-chart-filter').length).toBe(2)
    expect(query(el, 'vbi-vseed-render')).toBeTruthy()
  })

  it('should pass down properties derived from chartBuilder to sub-components', async () => {
    const builder = createTestBuilder({
      dimensions: [{ id: 'region', alias: 'Region', field: 'region', encoding: 'x' }],
      measures: [{ id: 'sales', alias: 'Sales', field: 'sales', aggregate: { func: 'sum' } }],
    })
    builder.limit.setLimit(500)

    const fields: VBIChartField[] = [
      { name: 'region', kind: 'dimension', type: 'string' },
      { name: 'sales', kind: 'measure', type: 'number' },
    ]

    const el = await fixture<VBIChartEditorInstance>(html`
      <vbi-chart-editor .chartBuilder=${builder} .fields=${fields}></vbi-chart-editor>
    `)

    const toolbar = query(el, 'vbi-chart-toolbar') as any
    const fieldsComp = query(el, 'vbi-chart-fields') as any
    const dimComp = query(el, 'vbi-chart-dimensions') as any
    const meaComp = query(el, 'vbi-chart-measures') as any
    const filterComps = Array.from(queryAll(el, 'vbi-chart-filter')) as any[]

    expect(toolbar.limit).toBe(500)
    // Setting limit via builder creates an undo stack entry
    expect(toolbar.canUndo).toBe(true)
    expect(toolbar.canRedo).toBe(false)

    expect(fieldsComp.fields).toEqual(fields)
    expect(dimComp.dimensions.length).toBe(1)
    expect(meaComp.measures.length).toBe(1)
    expect(filterComps[0].rootOperator).toBe('and')
    expect(filterComps[1].rootOperator).toBe('and')
  })

  it('should update limit via chartBuilder when toolbar limit changes', async () => {
    const builder = createTestBuilder()

    const el = await fixture<VBIChartEditorInstance>(
      html`<vbi-chart-editor .chartBuilder=${builder}></vbi-chart-editor>`,
    )

    const toolbar = query(el, 'vbi-chart-toolbar')!
    toolbar.dispatchEvent(
      new CustomEvent('vbi-chart-limit-change', {
        detail: { value: 250 },
        bubbles: true,
        composed: true,
      }),
    )

    // Builder should have the new limit
    expect(builder.limit.getLimit()).toBe(250)

    // After YJS doc update triggers re-render
    await el.updateComplete
    const toolbarAfter = query(el, 'vbi-chart-toolbar') as any
    expect(toolbarAfter.limit).toBe(250)
  })

  it('should re-render when builder state changes externally', async () => {
    const builder = createTestBuilder()

    const el = await fixture<VBIChartEditorInstance>(
      html`<vbi-chart-editor .chartBuilder=${builder}></vbi-chart-editor>`,
    )

    const dimComp = () => query(el, 'vbi-chart-dimensions') as any

    expect(dimComp().dimensions.length).toBe(0)

    // Mutate builder externally
    builder.dimensions.add('region', (node) => {
      node.setAlias('Region')
    })

    await el.updateComplete
    expect(dimComp().dimensions.length).toBe(1)
  })

  it('should re-dispatch dimension events for consumer handling', async () => {
    const builder = createTestBuilder()

    const el = await fixture<VBIChartEditorInstance>(
      html`<vbi-chart-editor .chartBuilder=${builder}></vbi-chart-editor>`,
    )

    const dimComp = query(el, 'vbi-chart-dimensions')!
    const updatedDims = [{ id: 'region', field: 'region' }]

    let receivedDetail: any
    el.addEventListener('vbi-chart-dimension-add', ((e: CustomEvent) => {
      receivedDetail = e.detail
    }) as EventListener)

    dimComp.dispatchEvent(
      new CustomEvent('vbi-chart-dimension-add', {
        detail: { dimensions: updatedDims },
        bubbles: true,
        composed: true,
      }),
    )

    expect(receivedDetail).toEqual({ dimensions: updatedDims })
  })

  it('should re-dispatch filter events for consumer handling', async () => {
    const builder = createTestBuilder()

    const el = await fixture<VBIChartEditorInstance>(
      html`<vbi-chart-editor .chartBuilder=${builder}></vbi-chart-editor>`,
    )

    const filterComp = queryAll(el, 'vbi-chart-filter')[0]
    const addedFilters: VBIChartFilterItem[] = [{ id: 'f2', field: 'sales', operator: '=', value: '' }]

    let receivedDetail: any
    el.addEventListener('vbi-filter-change', ((e: CustomEvent) => {
      receivedDetail = e.detail
    }) as EventListener)

    filterComp.dispatchEvent(
      new CustomEvent('vbi-filter-change', {
        detail: {
          action: 'add',
          changedItem: addedFilters[0],
          filters: addedFilters,
        },
        bubbles: true,
        composed: true,
      }),
    )

    expect(receivedDetail.filters).toEqual(addedFilters)
  })
})
