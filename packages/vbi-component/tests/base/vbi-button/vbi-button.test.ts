import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'

import { VBIButton } from 'src/base/vbi-button'

type VBIButtonInstance = InstanceType<typeof VBIButton>

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

/** Return the inner `<button>` inside the shadow DOM. */
const innerButton = (el: VBIButtonInstance): HTMLButtonElement => {
  const btn = el.shadowRoot?.querySelector('button')
  if (!btn) throw new Error('inner <button> not found')
  return btn
}

/** Create a fixture, set properties, and await update. */
const createButton = async (props: Partial<VBIButtonInstance> = {}, content = ''): Promise<VBIButtonInstance> => {
  const el = await fixture<VBIButtonInstance>(html`<vbi-button>${content}</vbi-button>`)
  Object.assign(el, props)
  await el.updateComplete
  return el
}

describe('vbi-button', () => {
  afterEach(() => {
    fixtureCleanup()
  })

  // ── Registration & instantiation ──────────────────────────────

  it('should register as a custom element', () => {
    expect(customElements.get('vbi-button')).toBeDefined()
  })

  it('should create an instance of VBIButton', async () => {
    const el = await createButton({}, 'Click')
    expect(el).toBeInstanceOf(VBIButton)
  })

  // ── Default property values ───────────────────────────────────

  it('should have correct default property values', async () => {
    const el = await createButton()

    expect(el.type).toBe('default')
    expect(el.size).toBe('middle')
    expect(el.shape).toBe('default')
    expect(el.htmlType).toBe('button')
    expect(el.iconPosition).toBe('start')
    expect(el.block).toBe(false)
    expect(el.danger).toBe(false)
    expect(el.dark).toBe(false)
    expect(el.disabled).toBe(false)
    expect(el.loading).toBe(false)
  })

  // ── Properties reflected to CSS classes ───────────────────────

  describe('CSS class mapping', () => {
    it.each([
      { prop: 'type', value: 'primary', className: 'vbi-button--primary' },
      { prop: 'type', value: 'dashed', className: 'vbi-button--dashed' },
      { prop: 'type', value: 'text', className: 'vbi-button--text' },
      { prop: 'size', value: 'small', className: 'vbi-button--size-small' },
      { prop: 'size', value: 'large', className: 'vbi-button--size-large' },
      { prop: 'shape', value: 'round', className: 'vbi-button--shape-round' },
      { prop: 'shape', value: 'circle', className: 'vbi-button--shape-circle' },
    ] as const)('should apply class "$className" when $prop is "$value"', async ({ prop, value, className }) => {
      const el = await createButton({ [prop]: value })

      expect(innerButton(el).classList.contains(className)).toBe(true)
    })

    it.each([
      { prop: 'block', className: 'vbi-button--block' },
      { prop: 'danger', className: 'vbi-button--danger' },
      { prop: 'dark', className: 'vbi-button--dark' },
      { prop: 'loading', className: 'vbi-button--loading' },
    ] as const)('should apply class "$className" when $prop is true', async ({ prop, className }) => {
      const el = await createButton({ [prop]: true })

      expect(innerButton(el).classList.contains(className)).toBe(true)
    })
  })

  // ── HTML type attribute ───────────────────────────────────────

  it('should set native button type to "submit"', async () => {
    const el = await createButton({ htmlType: 'submit' })

    expect(innerButton(el).type).toBe('submit')
  })

  it('should set native button type to "reset"', async () => {
    const el = await createButton({ htmlType: 'reset' })

    expect(innerButton(el).type).toBe('reset')
  })

  // ── Disabled state ────────────────────────────────────────────

  it('should set the native disabled attribute when disabled', async () => {
    const el = await createButton({ disabled: true })

    expect(innerButton(el).disabled).toBe(true)
  })

  it('should set the native disabled attribute when loading', async () => {
    const el = await createButton({ loading: true })

    expect(innerButton(el).disabled).toBe(true)
  })

  // ── Click handling ────────────────────────────────────────────

  it('should allow click events when interactive', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIButtonInstance>(html`<vbi-button @click=${handler}>Go</vbi-button>`)

    el.click()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should block click propagation when disabled', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIButtonInstance>(html`<vbi-button @click=${handler}>Go</vbi-button>`)
    el.disabled = true
    await el.updateComplete

    // Dispatch click on the inner button — handleClick should stop propagation
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, composed: true })
    innerButton(el).dispatchEvent(event)

    expect(handler).not.toHaveBeenCalled()
  })

  it('should block click propagation when loading', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIButtonInstance>(html`<vbi-button @click=${handler}>Go</vbi-button>`)
    el.loading = true
    await el.updateComplete

    const event = new MouseEvent('click', { bubbles: true, cancelable: true, composed: true })
    innerButton(el).dispatchEvent(event)

    expect(handler).not.toHaveBeenCalled()
  })

  // ── Loading spinner ───────────────────────────────────────────

  it('should render a spinner when loading', async () => {
    const el = await createButton({ loading: true }, 'Wait')

    const spinner = el.shadowRoot?.querySelector('.vbi-spinner')
    expect(spinner).toBeTruthy()
  })

  it('should not render a spinner when not loading', async () => {
    const el = await createButton({}, 'Go')

    const spinner = el.shadowRoot?.querySelector('.vbi-spinner')
    expect(spinner).toBeNull()
  })

  it('should render an icon slot when not loading', async () => {
    const el = await createButton({}, 'Go')

    const iconSlot = el.shadowRoot?.querySelector('slot[name="icon"]')
    expect(iconSlot).toBeTruthy()
  })

  it('should replace the icon slot with spinner when loading', async () => {
    const el = await createButton({ loading: true }, 'Wait')

    const iconSlot = el.shadowRoot?.querySelector('slot[name="icon"]')
    expect(iconSlot).toBeNull()

    const spinner = el.shadowRoot?.querySelector('.vbi-spinner')
    expect(spinner).toBeTruthy()
  })

  // ── Icon position ─────────────────────────────────────────────

  it('should place icon before label by default (iconPosition="start")', async () => {
    const el = await createButton({}, 'Label')

    const content = el.shadowRoot?.querySelector('.vbi-content')
    const children = Array.from(content?.childNodes ?? []).filter(
      (n) => n.nodeType === Node.ELEMENT_NODE,
    ) as HTMLElement[]

    // First element should be the icon slot, second should be the label span
    expect(children[0]?.tagName?.toLowerCase()).toBe('slot')
    expect(children[1]?.tagName?.toLowerCase()).toBe('span')
  })

  it('should place icon after label when iconPosition="end"', async () => {
    const el = await createButton({ iconPosition: 'end' }, 'Label')

    const content = el.shadowRoot?.querySelector('.vbi-content')
    const children = Array.from(content?.childNodes ?? []).filter(
      (n) => n.nodeType === Node.ELEMENT_NODE,
    ) as HTMLElement[]

    // First element should be the label span, second should be the icon slot
    expect(children[0]?.tagName?.toLowerCase()).toBe('span')
    expect(children[1]?.tagName?.toLowerCase()).toBe('slot')
  })

  // ── Block layout ──────────────────────────────────────────────

  it('should apply block class for full-width layout', async () => {
    const el = await createButton({ block: true }, 'Full')

    expect(innerButton(el).classList.contains('vbi-button--block')).toBe(true)
  })

  // ── Label rendering ───────────────────────────────────────────

  it('should render label slot when textContent is present', async () => {
    const el = await createButton({}, 'Submit')

    const label = el.shadowRoot?.querySelector('.vbi-label')
    expect(label).toBeTruthy()
  })

  it('should not render label slot when textContent is empty', async () => {
    const el = await createButton()

    const label = el.shadowRoot?.querySelector('.vbi-label')
    expect(label).toBeNull()
  })

  // ── Combined states ───────────────────────────────────────────

  it('should apply both primary and danger classes together', async () => {
    const el = await createButton({ type: 'primary', danger: true }, 'Delete')

    const btn = innerButton(el)
    expect(btn.classList.contains('vbi-button--primary')).toBe(true)
    expect(btn.classList.contains('vbi-button--danger')).toBe(true)
  })

  it('should apply both text and dark classes together', async () => {
    const el = await createButton({ type: 'text', dark: true }, 'Menu')

    const btn = innerButton(el)
    expect(btn.classList.contains('vbi-button--text')).toBe(true)
    expect(btn.classList.contains('vbi-button--dark')).toBe(true)
  })
})
