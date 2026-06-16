import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'
import { VBIChartToolbar } from 'src/vbi-chart-editor/vbi-chart-toolbar'

type VBIChartToolbarInstance = InstanceType<typeof VBIChartToolbar>

const query = <T extends Element>(el: VBIChartToolbarInstance, selector: string): T | null =>
  el.shadowRoot?.querySelector<T>(selector) ?? null

const queryAll = <T extends Element>(el: VBIChartToolbarInstance, selector: string): T[] =>
  Array.from(el.shadowRoot?.querySelectorAll<T>(selector) ?? [])

/** Dispatch a real click event — wa-button.click() delegates to an internal
 *  shadow button that jsdom never renders, so we fire the event directly. */
const clickElement = (el: Element): void => {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, cancelable: true }))
}

describe('vbi-chart-toolbar', () => {
  afterEach(() => {
    fixtureCleanup()
  })

  // ── Registration & basic rendering ──────────────────────────────────

  it('should register as a custom element and render shadow DOM', async () => {
    expect(customElements.get('vbi-chart-toolbar')).toBeDefined()

    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)
    expect(el).toBeInstanceOf(VBIChartToolbar)

    const toolbar = query(el, '.toolbar')
    expect(toolbar).toBeTruthy()
  })

  it('should render left and right sections', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const left = query(el, '.toolbar__left')
    const right = query(el, '.toolbar__right')

    expect(left).toBeTruthy()
    expect(right).toBeTruthy()
  })

  // ── Default property values ─────────────────────────────────────────

  it('should default limit to 1000', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    expect(el.limit).toBe(1000)
  })

  it('should default canUndo and canRedo to false', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    expect(el.canUndo).toBe(false)
    expect(el.canRedo).toBe(false)
  })

  // ── History buttons rendering ───────────────────────────────────────

  it('should render undo and redo buttons', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const undoButton = query(el, '#history-undo-button')
    const redoButton = query(el, '#history-redo-button')

    expect(undoButton).toBeTruthy()
    expect(redoButton).toBeTruthy()
  })

  it('should disable undo button when canUndo is false', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const undoButton = query(el, '#history-undo-button')
    expect(undoButton!.hasAttribute('disabled')).toBe(true)
  })

  it('should disable redo button when canRedo is false', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const redoButton = query(el, '#history-redo-button')
    expect(redoButton!.hasAttribute('disabled')).toBe(true)
  })

  it('should enable undo button when canUndo is true', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar can-undo></vbi-chart-toolbar>`)

    const undoButton = query(el, '#history-undo-button')
    expect(undoButton!.hasAttribute('disabled')).toBe(false)
  })

  it('should enable redo button when canRedo is true', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar can-redo></vbi-chart-toolbar>`)

    const redoButton = query(el, '#history-redo-button')
    expect(redoButton!.hasAttribute('disabled')).toBe(false)
  })

  // ── Undo/Redo events ───────────────────────────────────────────────

  it('should dispatch vbi-chart-undo when undo button is clicked', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar can-undo></vbi-chart-toolbar>`)

    let undoFired = false
    el.addEventListener('vbi-chart-undo', () => {
      undoFired = true
    })

    const undoButton = query(el, '#history-undo-button')!
    clickElement(undoButton)

    expect(undoFired).toBe(true)
  })

  it('should dispatch vbi-chart-redo when redo button is clicked', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar can-redo></vbi-chart-toolbar>`)

    let redoFired = false
    el.addEventListener('vbi-chart-redo', () => {
      redoFired = true
    })

    const redoButton = query(el, '#history-redo-button')!
    clickElement(redoButton)

    expect(redoFired).toBe(true)
  })

  // ── Limit input ─────────────────────────────────────────────────────

  it('should render the limit number input', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const input = query(el, 'wa-number-input')
    expect(input).toBeTruthy()
  })

  it('should accept a custom limit via attribute', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar limit="500"></vbi-chart-toolbar>`)

    expect(el.limit).toBe(500)
  })

  it('should dispatch vbi-chart-limit-change on limit change', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const received: number[] = []
    el.addEventListener('vbi-chart-limit-change', ((e: CustomEvent) => {
      received.push(e.detail.value)
    }) as EventListener)

    const input = query(el, 'wa-number-input')!
    ;(input as HTMLElement & { value: string }).value = '2000'
    input.dispatchEvent(new Event('change', { bubbles: true }))

    expect(received).toHaveLength(1)
    expect(received[0]).toBe(2000)
    expect(el.limit).toBe(2000)
  })

  it('should not dispatch vbi-chart-limit-change when value is unchanged', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar limit="1000"></vbi-chart-toolbar>`)

    let fired = false
    el.addEventListener('vbi-chart-limit-change', () => {
      fired = true
    })

    const input = query(el, 'wa-number-input')!
    ;(input as HTMLElement & { value: string }).value = '1000'
    input.dispatchEvent(new Event('change', { bubbles: true }))

    expect(fired).toBe(false)
  })

  // ── Tooltips ────────────────────────────────────────────────────────

  it('should render tooltips for history buttons and limit icon', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const tooltips = queryAll(el, 'wa-tooltip')
    // 2 for history buttons (undo + redo) + 1 for limit info icon
    expect(tooltips.length).toBeGreaterThanOrEqual(3)
  })

  it('should render limit info icon', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const infoIcon = query(el, '#limit-info-icon')
    expect(infoIcon).toBeTruthy()
  })

  // ── History button group ────────────────────────────────────────────

  it('should render undo and redo inside a button group', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const group = query(el, 'wa-button-group.history-group')
    expect(group).toBeTruthy()

    // wa-button elements are in the toolbar's shadow DOM as light children
    // of wa-button-group, so query from the toolbar shadow root directly.
    const buttons = queryAll(el, 'wa-button.history-button')
    expect(buttons).toHaveLength(2)
  })

  // ── Chart-type slot ─────────────────────────────────────────────────

  it('should provide a slot for chart-type', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const slot = query<HTMLSlotElement>(el, 'slot[name="chart-type"]')
    expect(slot).toBeTruthy()
  })

  // ── Event bubbling & composition ────────────────────────────────────

  it('should bubble vbi-chart-undo through composed shadow DOM boundary', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar can-undo></vbi-chart-toolbar>`)

    let bubbled = false
    document.addEventListener(
      'vbi-chart-undo',
      () => {
        bubbled = true
      },
      { once: true },
    )

    const undoButton = query(el, '#history-undo-button')!
    clickElement(undoButton)

    expect(bubbled).toBe(true)
  })

  it('should bubble vbi-chart-redo through composed shadow DOM boundary', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar can-redo></vbi-chart-toolbar>`)

    let bubbled = false
    document.addEventListener(
      'vbi-chart-redo',
      () => {
        bubbled = true
      },
      { once: true },
    )

    const redoButton = query(el, '#history-redo-button')!
    clickElement(redoButton)

    expect(bubbled).toBe(true)
  })

  it('should bubble vbi-chart-limit-change through composed shadow DOM boundary', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    let bubbled = false
    document.addEventListener(
      'vbi-chart-limit-change',
      () => {
        bubbled = true
      },
      { once: true },
    )

    const input = query(el, 'wa-number-input')!
    ;(input as HTMLElement & { value: string }).value = '5000'
    input.dispatchEvent(new Event('change', { bubbles: true }))

    expect(bubbled).toBe(true)
  })

  // ── Reactive updates ───────────────────────────────────────────────

  it('should reactively toggle undo button disabled state', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const undoButton = query(el, '#history-undo-button')!
    expect(undoButton.hasAttribute('disabled')).toBe(true)

    el.canUndo = true
    await el.updateComplete

    expect(undoButton.hasAttribute('disabled')).toBe(false)

    el.canUndo = false
    await el.updateComplete

    expect(undoButton.hasAttribute('disabled')).toBe(true)
  })

  it('should reactively toggle redo button disabled state', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const redoButton = query(el, '#history-redo-button')!
    expect(redoButton.hasAttribute('disabled')).toBe(true)

    el.canRedo = true
    await el.updateComplete

    expect(redoButton.hasAttribute('disabled')).toBe(false)

    el.canRedo = false
    await el.updateComplete

    expect(redoButton.hasAttribute('disabled')).toBe(true)
  })

  // ── Aria labels ─────────────────────────────────────────────────────

  it('should set aria-label on history buttons', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const undoButton = query(el, '#history-undo-button')!
    const redoButton = query(el, '#history-redo-button')!

    expect(undoButton.getAttribute('aria-label')).toBeTruthy()
    expect(redoButton.getAttribute('aria-label')).toBeTruthy()
  })

  it('should set title with keyboard shortcut on history buttons', async () => {
    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    const undoButton = query(el, '#history-undo-button')!
    const redoButton = query(el, '#history-redo-button')!

    const undoTitle = undoButton.getAttribute('title') ?? ''
    const redoTitle = redoButton.getAttribute('title') ?? ''

    expect(undoTitle).toContain('Ctrl')
    expect(redoTitle).toContain('Ctrl')
  })
})
