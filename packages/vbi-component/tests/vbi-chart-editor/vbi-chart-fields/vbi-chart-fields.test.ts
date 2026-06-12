import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'
import {
  getChartEditorFieldIconName,
  VBIChartFields,
  type VBIChartField,
} from 'src/vbi-chart-editor/vbi-chart-fields'

type VBIChartFieldsInstance = InstanceType<typeof VBIChartFields>

const query = <T extends Element>(el: VBIChartFieldsInstance, selector: string): T | null =>
  el.shadowRoot?.querySelector<T>(selector) ?? null

const queryAll = <T extends Element>(el: VBIChartFieldsInstance, selector: string): T[] =>
  Array.from(el.shadowRoot?.querySelectorAll<T>(selector) ?? [])

// ── Test fixtures ────────────────────────────────────────────────────

const DIMENSION_DATE: VBIChartField = { name: 'order_date', kind: 'dimension', type: 'date' }
const DIMENSION_REGION: VBIChartField = { name: 'region', kind: 'dimension', type: 'string' }
const MEASURE_SALES: VBIChartField = { name: 'sales', kind: 'measure', type: 'number' }
const MEASURE_PROFIT: VBIChartField = { name: 'profit', kind: 'measure', type: 'number' }

const ALL_FIELDS: VBIChartField[] = [DIMENSION_DATE, DIMENSION_REGION, MEASURE_SALES, MEASURE_PROFIT]

// ── Helper ───────────────────────────────────────────────────────────

/** Simulate user typing into the search input. */
const typeSearch = async (el: VBIChartFieldsInstance, value: string): Promise<void> => {
  const input = query(el, 'wa-input')! as HTMLElement & { value: string }
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await el.updateComplete
}

// ── Tests ────────────────────────────────────────────────────────────

describe('vbi-chart-fields', () => {
  afterEach(() => {
    fixtureCleanup()
  })

  // ── Registration & basic rendering ──────────────────────────────────

  it('should register as a custom element and render shadow DOM', async () => {
    expect(customElements.get('vbi-chart-fields')).toBeDefined()

    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields></vbi-chart-fields>`,
    )
    expect(el).toBeInstanceOf(VBIChartFields)
    expect(el.shadowRoot).toBeTruthy()
  })

  it('should render the header with "Field List" title', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields></vbi-chart-fields>`,
    )

    const title = query(el, '.fields-header__title')
    expect(title).toBeTruthy()
    expect(title!.textContent?.trim()).toBe('Field List')
  })

  it('should render the header divider', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields></vbi-chart-fields>`,
    )

    const divider = query(el, '.fields-header__divider')
    expect(divider).toBeTruthy()
  })

  it('should render the search input with a magnifying glass icon', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields></vbi-chart-fields>`,
    )

    const input = query(el, 'wa-input')
    expect(input).toBeTruthy()

    const icon = query(el, 'wa-input wa-icon[slot="start"]')
    expect(icon).toBeTruthy()
    expect(icon!.getAttribute('name')).toBe('magnifying-glass')
  })

  it('should render Dimensions and Measures section labels', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const labels = queryAll(el, '.fields-section__label')
    expect(labels).toHaveLength(2)
    expect(labels[0].textContent?.trim()).toBe('Dimensions')
    expect(labels[1].textContent?.trim()).toBe('Measures')
  })

  // ── Default property values ─────────────────────────────────────────

  it('should default fields to an empty array', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields></vbi-chart-fields>`,
    )

    expect(el.fields).toEqual([])
  })

  // ── Field categorisation ───────────────────────────────────────────

  it('should render dimension fields under the Dimensions section', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const sections = queryAll(el, '.fields-section')
    const dimensionItems = Array.from(sections[0].querySelectorAll('.field-item'))
    const names = dimensionItems.map((item) =>
      item.querySelector('.field-item__name')?.textContent?.trim(),
    )

    expect(dimensionItems).toHaveLength(2)
    expect(names).toContain('order_date')
    expect(names).toContain('region')
  })

  it('should render measure fields under the Measures section', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const sections = queryAll(el, '.fields-section')
    const measureItems = Array.from(sections[1].querySelectorAll('.field-item'))
    const names = measureItems.map((item) =>
      item.querySelector('.field-item__name')?.textContent?.trim(),
    )

    expect(measureItems).toHaveLength(2)
    expect(names).toContain('sales')
    expect(names).toContain('profit')
  })

  it('should render empty lists when no fields are provided', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields></vbi-chart-fields>`,
    )

    const items = queryAll(el, '.field-item')
    expect(items).toHaveLength(0)
  })

  // ── Field icon rendering ──────────────────────────────────────────

  it('should render the correct icon for each field type', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const items = queryAll(el, '.field-item')

    for (const item of items) {
      const icon = item.querySelector('.field-item__icon')
      const name = item.querySelector('.field-item__name')?.textContent?.trim()
      const field = ALL_FIELDS.find((f) => f.name === name)!
      expect(icon!.getAttribute('name')).toBe(getChartEditorFieldIconName(field))
    }
  })

  it('should apply dimension icon class to dimension fields', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const sections = queryAll(el, '.fields-section')
    const dimensionIcons = Array.from(sections[0].querySelectorAll('.field-item__icon'))

    for (const icon of dimensionIcons) {
      expect(icon.classList.contains('field-item__icon--dimension')).toBe(true)
    }
  })

  it('should apply measure icon class to measure fields', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const sections = queryAll(el, '.fields-section')
    const measureIcons = Array.from(sections[1].querySelectorAll('.field-item__icon'))

    for (const icon of measureIcons) {
      expect(icon.classList.contains('field-item__icon--measure')).toBe(true)
    }
  })

  // ── Search / filtering ────────────────────────────────────────────

  it('should filter fields when user types in the search input', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    await typeSearch(el, 'sal')

    const items = queryAll(el, '.field-item')
    expect(items).toHaveLength(1)
    expect(items[0].querySelector('.field-item__name')?.textContent?.trim()).toBe('sales')
  })

  it('should perform case-insensitive search', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    await typeSearch(el, 'ORDER')

    const items = queryAll(el, '.field-item')
    expect(items).toHaveLength(1)
    expect(items[0].querySelector('.field-item__name')?.textContent?.trim()).toBe('order_date')
  })

  it('should show all fields when search is cleared', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    await typeSearch(el, 'sal')
    expect(queryAll(el, '.field-item')).toHaveLength(1)

    await typeSearch(el, '')
    expect(queryAll(el, '.field-item')).toHaveLength(4)
  })

  it('should show zero fields when search has no match', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    await typeSearch(el, 'nonexistent')
    expect(queryAll(el, '.field-item')).toHaveLength(0)
  })

  it('should filter across both dimensions and measures', async () => {
    const fields: VBIChartField[] = [
      { name: 'category', kind: 'dimension', type: 'string' },
      { name: 'cat_count', kind: 'measure', type: 'number' },
      { name: 'price', kind: 'measure', type: 'number' },
    ]

    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${fields}></vbi-chart-fields>`,
    )

    await typeSearch(el, 'cat')

    const items = queryAll(el, '.field-item')
    expect(items).toHaveLength(2)

    const names = items.map((item) =>
      item.querySelector('.field-item__name')?.textContent?.trim(),
    )
    expect(names).toContain('category')
    expect(names).toContain('cat_count')
  })

  // ── Reactive updates ──────────────────────────────────────────────

  it('should update rendered fields when fields property changes', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    expect(queryAll(el, '.field-item')).toHaveLength(4)

    el.fields = [DIMENSION_DATE]
    await el.updateComplete

    const items = queryAll(el, '.field-item')
    expect(items).toHaveLength(1)
    expect(items[0].querySelector('.field-item__name')?.textContent?.trim()).toBe('order_date')
  })

  it('should clear search results when fields are replaced', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    await typeSearch(el, 'sal')
    expect(queryAll(el, '.field-item')).toHaveLength(1)

    el.fields = [DIMENSION_DATE, DIMENSION_REGION]
    await el.updateComplete

    // 'sal' no longer matches any field
    expect(queryAll(el, '.field-item')).toHaveLength(0)
  })

  // ── data-field-drag-id attributes ─────────────────────────────────

  it('should set data-field-drag-id on each field item', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const items = queryAll<HTMLElement>(el, '.field-item')

    for (const item of items) {
      const dragId = item.dataset.fieldDragId
      expect(dragId).toBeTruthy()
      expect(dragId).toMatch(/^vbi-chart-field:(dimension|measure):/)
    }
  })

  it('should generate unique drag IDs per field', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const items = queryAll<HTMLElement>(el, '.field-item')
    const ids = items.map((item) => item.dataset.fieldDragId)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(ids.length)
  })

  // ── Scrollable area ───────────────────────────────────────────────

  it('should render a scrollable container', async () => {
    const el = await fixture<VBIChartFieldsInstance>(
      html`<vbi-chart-fields .fields=${ALL_FIELDS}></vbi-chart-fields>`,
    )

    const scrollArea = query(el, '.fields-scroll')
    expect(scrollArea).toBeTruthy()
  })
})

// ── getChartEditorFieldIconName unit tests ───────────────────────────

describe('getChartEditorFieldIconName', () => {
  it('should return "font" for string type', () => {
    expect(getChartEditorFieldIconName({ name: 'x', kind: 'dimension', type: 'string' })).toBe('font')
  })

  it('should return "hashtag" for number type', () => {
    expect(getChartEditorFieldIconName({ name: 'x', kind: 'measure', type: 'number' })).toBe('hashtag')
  })

  it('should return "calendar-days" for date type', () => {
    expect(getChartEditorFieldIconName({ name: 'x', kind: 'dimension', type: 'date' })).toBe('calendar-days')
  })

  it('should return "clock" for datetime type', () => {
    expect(getChartEditorFieldIconName({ name: 'x', kind: 'dimension', type: 'datetime' })).toBe('clock')
  })

  it('should return "stopwatch" for timestamp type', () => {
    expect(getChartEditorFieldIconName({ name: 'x', kind: 'dimension', type: 'timestamp' })).toBe('stopwatch')
  })

  it('should return "hashtag" for index type', () => {
    expect(getChartEditorFieldIconName({ name: 'x', kind: 'dimension', type: 'index' })).toBe('hashtag')
  })

  it('should default to "font" when type is undefined', () => {
    expect(getChartEditorFieldIconName({ name: 'x', kind: 'dimension' })).toBe('font')
  })
})
