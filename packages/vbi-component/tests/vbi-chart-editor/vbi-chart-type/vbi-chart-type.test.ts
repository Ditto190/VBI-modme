import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'
import { VBIChartType } from 'src/vbi-chart-editor/vbi-chart-type'
import type { VBIChartTypeGroup, VBIChartTypeItem } from 'src/vbi-chart-editor/vbi-chart-type/config'

type VBIChartTypeInstance = InstanceType<typeof VBIChartType>

const query = <T extends Element>(el: VBIChartTypeInstance, selector: string): T | null =>
  el.shadowRoot?.querySelector<T>(selector) ?? null

const queryAll = <T extends Element>(el: VBIChartTypeInstance, selector: string): T[] =>
  Array.from(el.shadowRoot?.querySelectorAll<T>(selector) ?? [])

/** Dispatch a real click event — wa-button.click() delegates to an internal
 *  shadow button that jsdom never renders, so we fire the event directly. */
const clickElement = (el: Element): void => {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, cancelable: true }))
}

const MOCK_ITEM_BAR: VBIChartTypeItem = {
  type: 'bar',
  label: 'Bar',
  description: 'Bar chart',
  icon: 'chart-bar',
}

const MOCK_ITEM_LINE: VBIChartTypeItem = {
  type: 'line',
  label: 'Line',
  description: 'Line chart',
  icon: 'chart-line',
}

const MOCK_ITEM_PIE: VBIChartTypeItem = {
  type: 'pie',
  label: 'Pie',
  description: 'Pie chart',
  icon: 'chart-pie',
}

const MOCK_GROUPS: VBIChartTypeGroup[] = [
  {
    key: 'comparison',
    label: 'Comparison',
    description: 'Comparison charts',
    items: [MOCK_ITEM_BAR, MOCK_ITEM_LINE],
  },
  {
    key: 'proportion',
    label: 'Proportion',
    description: 'Proportion charts',
    items: [MOCK_ITEM_PIE],
  },
]

describe('vbi-chart-type', () => {
  afterEach(() => {
    fixtureCleanup()
  })

  it('should register as a custom element', async () => {
    expect(customElements.get('vbi-chart-type')).toBeDefined()

    const el = await fixture<VBIChartTypeInstance>(html`<vbi-chart-type></vbi-chart-type>`)
    expect(el).toBeInstanceOf(VBIChartType)
  })

  it('should render the trigger button with default title when no value is set', async () => {
    const el = await fixture<VBIChartTypeInstance>(html`<vbi-chart-type></vbi-chart-type>`)

    const trigger = query(el, '#chart-type-trigger')
    expect(trigger).toBeTruthy()
    expect(trigger!.textContent?.trim()).toBe(el.title)
  })

  it('should render trigger button with value label and icon when value is set', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS} .value=${MOCK_ITEM_BAR}></vbi-chart-type>`,
    )

    const trigger = query(el, '#chart-type-trigger')
    expect(trigger!.textContent?.trim()).toBe(MOCK_ITEM_BAR.label)

    const icon = query(el, '#chart-type-trigger wa-icon[slot="start"]')
    expect(icon).toBeTruthy()
    expect(icon!.getAttribute('name')).toBe(MOCK_ITEM_BAR.icon)
  })

  it('should render the popover panel with header and group sections', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS}></vbi-chart-type>`,
    )

    const header = query(el, '.chart-type-header')
    expect(header).toBeTruthy()
    expect(header!.textContent?.trim()).toBe(el.title)

    const groups = queryAll(el, '.chart-type-group')
    expect(groups).toHaveLength(2)

    const headings = queryAll(el, '.chart-type-heading')
    expect(headings[0].textContent?.trim()).toBe('Comparison')
    expect(headings[1].textContent?.trim()).toBe('Proportion')
  })

  it('should render a button for each chart type item in the grid', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS}></vbi-chart-type>`,
    )

    const buttons = queryAll(el, '.chart-type-grid wa-button')
    expect(buttons).toHaveLength(3)

    const labels = buttons.map((btn) => btn.textContent?.trim())
    expect(labels).toContain('Bar')
    expect(labels).toContain('Line')
    expect(labels).toContain('Pie')
  })

  it('should dispatch vbi-chart-type-change when an item is clicked', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS}></vbi-chart-type>`,
    )

    const received: VBIChartTypeItem[] = []
    el.addEventListener('vbi-chart-type-change', ((e: CustomEvent) => {
      received.push(e.detail.value)
    }) as EventListener)

    const buttons = queryAll(el, '.chart-type-grid wa-button')
    clickElement(buttons[0])
    await el.updateComplete

    expect(received).toHaveLength(1)
    expect(received[0]).toBe(MOCK_ITEM_BAR)
    expect(el.value).toBe(MOCK_ITEM_BAR)
  })

  it('should mark the selected item with filled-outlined appearance and brand variant', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS} .value=${MOCK_ITEM_LINE}></vbi-chart-type>`,
    )

    const buttons = queryAll(el, '.chart-type-grid wa-button')
    const lineButton = buttons.find((btn) => btn.textContent?.trim() === 'Line')!
    const barButton = buttons.find((btn) => btn.textContent?.trim() === 'Bar')!

    expect(lineButton.getAttribute('appearance')).toBe('filled-outlined')
    expect(lineButton.getAttribute('variant')).toBe('brand')
    expect(lineButton.getAttribute('aria-pressed')).toBe('true')

    expect(barButton.getAttribute('appearance')).toBe('outlined')
    expect(barButton.getAttribute('variant')).toBe('neutral')
    expect(barButton.getAttribute('aria-pressed')).toBe('false')
  })

  it('should update selected state when a different item is clicked', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS} .value=${MOCK_ITEM_BAR}></vbi-chart-type>`,
    )

    const buttons = queryAll(el, '.chart-type-grid wa-button')
    const lineButton = buttons.find((btn) => btn.textContent?.trim() === 'Line')!
    clickElement(lineButton)
    await el.updateComplete

    expect(el.value).toBe(MOCK_ITEM_LINE)

    const updatedButtons = queryAll(el, '.chart-type-grid wa-button')
    const updatedLine = updatedButtons.find((btn) => btn.textContent?.trim() === 'Line')!
    const updatedBar = updatedButtons.find((btn) => btn.textContent?.trim() === 'Bar')!

    expect(updatedLine.getAttribute('aria-pressed')).toBe('true')
    expect(updatedBar.getAttribute('aria-pressed')).toBe('false')
  })

  it('should show empty message when data has no groups', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${[]}></vbi-chart-type>`,
    )

    const empty = query(el, '.chart-type-empty')
    expect(empty).toBeTruthy()

    const groups = queryAll(el, '.chart-type-group')
    expect(groups).toHaveLength(0)
  })

  it('should accept a custom title', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type title="Pick chart"></vbi-chart-type>`,
    )

    const trigger = query(el, '#chart-type-trigger')
    expect(trigger!.textContent?.trim()).toBe('Pick chart')

    const header = query(el, '.chart-type-header')
    expect(header!.textContent?.trim()).toBe('Pick chart')
  })

  it('should apply truncate-label class to trigger and item buttons', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS}></vbi-chart-type>`,
    )

    const trigger = query(el, '#chart-type-trigger')
    expect(trigger!.classList.contains('truncate-label')).toBe(true)

    const itemButtons = queryAll(el, '.chart-type-grid wa-button')
    for (const btn of itemButtons) {
      expect(btn.classList.contains('truncate-label')).toBe(true)
    }
  })

  it('should bubble the event through composed shadow DOM boundary', async () => {
    const el = await fixture<VBIChartTypeInstance>(
      html`<vbi-chart-type .data=${MOCK_GROUPS}></vbi-chart-type>`,
    )

    let bubbled = false
    document.addEventListener(
      'vbi-chart-type-change',
      () => {
        bubbled = true
      },
      { once: true },
    )

    const buttons = queryAll(el, '.chart-type-grid wa-button')
    clickElement(buttons[0])

    expect(bubbled).toBe(true)
  })
})
