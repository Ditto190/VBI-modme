import type { VBIChartBuilder } from '@visactor/vbi'
import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html, svg } from 'lit'
import { setVBIComponentLocale } from 'src/localization'
import { VBI_CHART_TYPE_METAS, VBIChartType } from 'src/vbi-chart-editor/vbi-chart-type'

type VBIChartTypeInstance = InstanceType<typeof VBIChartType>

const trigger = (el: VBIChartTypeInstance): HTMLButtonElement => {
  const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.trigger')
  if (!button) throw new Error('.trigger not found')
  return button
}

const findCardByLabel = (el: VBIChartTypeInstance, label: string): HTMLButtonElement => {
  const card = Array.from(el.shadowRoot?.querySelectorAll<HTMLButtonElement>('.card') ?? []).find(
    (item) => item.querySelector('.card__label')?.textContent === label,
  )
  if (!card) throw new Error(`card "${label}" not found`)
  return card
}

const chartTypeMetas = (types: string[]) => VBI_CHART_TYPE_METAS.filter((meta) => types.includes(meta.type))

const createBuilder = () => {
  let chartType = 'line'
  const observers = new Set<() => void>()

  return {
    builder: {
      chartType: {
        getChartType: () => chartType,
        getAvailableChartTypes: () => ['table', 'bar', 'line'],
        changeChartType: (nextChartType: string) => {
          chartType = nextChartType
          observers.forEach((observer) => observer())
        },
        observe: (callback: () => void) => {
          observers.add(callback)
          return () => observers.delete(callback)
        },
      },
    } as unknown as VBIChartBuilder,
    getChartType: () => chartType,
    getObserverCount: () => observers.size,
    setChartType: (nextChartType: string) => {
      chartType = nextChartType
      observers.forEach((observer) => observer())
    },
  }
}

describe('vbi-chart-type', () => {
  afterEach(async () => {
    await setVBIComponentLocale('en-US')
    fixtureCleanup()
  })

  it('should register as a custom element', async () => {
    expect(customElements.get('vbi-chart-type')).toBeDefined()

    const el = await fixture<VBIChartTypeInstance>(html`<vbi-chart-type></vbi-chart-type>`)
    expect(el).toBeInstanceOf(VBIChartType)
  })

  it('should render chart type metadata grouped by family', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .chartTypeMetas=${chartTypeMetas(['table', 'bar', 'line'])}></vbi-chart-type>`,
    )

    trigger(el).click()
    await el.updateComplete

    const headings = Array.from(el.shadowRoot?.querySelectorAll('.group__heading') ?? []).map((item) =>
      item.textContent?.trim(),
    )
    expect(headings).toEqual(['Tables', 'Comparison', 'Trends'])
    expect(el.shadowRoot?.querySelectorAll('.card').length).toBe(3)
  })

  it('should render custom chart type groups and metadata', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type
        chart-type="customBar"
        .chartTypeGroups=${[
          {
            key: 'custom',
            labelKey: 'customGroupLabel',
            descriptionKey: 'customGroupDescription',
          },
        ]}
        .chartTypeMetas=${[
          {
            type: 'customBar',
            group: 'custom',
            labelKey: 'customBarLabel',
            descriptionKey: 'customBarDescription',
            icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16"/></svg>`,
          },
        ]}
        .text=${{
          customGroupLabel: 'Custom',
          customGroupDescription: 'Custom chart group',
          customBarLabel: 'Custom bar',
          customBarDescription: 'Custom bar chart',
        }}
      ></vbi-chart-type>`,
    )

    trigger(el).click()
    await el.updateComplete

    expect(trigger(el).textContent?.trim()).toContain('Custom bar')
    expect(el.shadowRoot?.querySelector('.group__heading')?.textContent?.trim()).toBe('Custom')
    expect(findCardByLabel(el, 'Custom bar')).toBeTruthy()
  })

  it('should update standalone chart type and dispatch change event on selection', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .chartTypeMetas=${chartTypeMetas(['table', 'bar'])}></vbi-chart-type>`,
    )
    let selectedChartType = ''

    el.addEventListener('vbi-chart-type-change', ((event: CustomEvent<{ chartType: string }>) => {
      selectedChartType = event.detail.chartType
    }) as EventListener)

    trigger(el).click()
    await el.updateComplete
    findCardByLabel(el, 'Bar').click()
    await el.updateComplete

    expect(el.chartType).toBe('bar')
    expect(selectedChartType).toBe('bar')
    expect(el.shadowRoot?.querySelector('.panel')).toBeNull()
    expect(trigger(el).textContent?.trim()).toContain('Bar')
  })

  it('should allow hiding trigger text from markup', async () => {
    const el = await fixture<VBIChartTypeInstance>(html`<vbi-chart-type hide-text></vbi-chart-type>`)

    expect(el.hideText).toBe(true)
    expect(el.shadowRoot?.querySelector('.trigger__content')).toBeNull()
  })

  it('should read and mutate chart type through builder when provided', async () => {
    const fake = createBuilder()
    const el = await fixture<VBIChartTypeInstance>(html`<vbi-chart-type .builder=${fake.builder}></vbi-chart-type>`)
    await el.updateComplete
    await el.updateComplete

    expect(trigger(el).textContent?.trim()).toContain('Line')

    trigger(el).click()
    await el.updateComplete
    findCardByLabel(el, 'Bar').click()
    await el.updateComplete

    expect(fake.getChartType()).toBe('bar')
    expect(trigger(el).textContent?.trim()).toContain('Bar')

    fake.setChartType('table')
    await el.updateComplete
    expect(trigger(el).textContent?.trim()).toContain('Table')
    expect(fake.getObserverCount()).toBe(1)
  })

  it('should apply text overrides with the same keys as the React selector config', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type
        .chartTypeMetas=${chartTypeMetas(['bar'])}
        .text=${{
          toolbarChartTypePanelTitle: 'Chon loai bieu do',
          toolbarChartTypeItemsBarLabel: 'Bieu do thanh',
        }}
      ></vbi-chart-type>`,
    )

    trigger(el).click()
    await el.updateComplete

    expect(el.shadowRoot?.querySelector('.panel__title')?.textContent).toBe('Chon loai bieu do')
    expect(findCardByLabel(el, 'Bieu do thanh')).toBeTruthy()
  })

  it('should render built-in localized chart type text', async () => {
    await setVBIComponentLocale('vi-VN')
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .chartTypeMetas=${chartTypeMetas(['table', 'bar', 'line'])}></vbi-chart-type>`,
    )

    trigger(el).click()
    await el.updateComplete

    const headings = Array.from(el.shadowRoot?.querySelectorAll('.group__heading') ?? []).map((item) =>
      item.textContent?.trim(),
    )
    expect(headings).toEqual(['Bảng', 'So sánh', 'Xu hướng'])
    expect(findCardByLabel(el, 'Biểu đồ thanh')).toBeTruthy()
  })
})
