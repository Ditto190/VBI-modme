import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'

import { VBITooltip } from 'src/base/vbi-tooltip'

type VBITooltipInstance = InstanceType<typeof VBITooltip>

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

/** Return the popup element inside the shadow DOM. */
const popup = (el: VBITooltipInstance): HTMLDivElement => {
  const p = el.shadowRoot?.querySelector<HTMLDivElement>('.vbi-tooltip__popup')
  if (!p) throw new Error('.vbi-tooltip__popup not found')
  return p
}

/** Return the trigger wrapper inside the shadow DOM. */
const trigger = (el: VBITooltipInstance): HTMLDivElement => {
  const t = el.shadowRoot?.querySelector<HTMLDivElement>('.vbi-tooltip__trigger')
  if (!t) throw new Error('.vbi-tooltip__trigger not found')
  return t
}

/** Return the arrow element inside the shadow DOM. */
const arrow = (el: VBITooltipInstance): HTMLDivElement => {
  const a = el.shadowRoot?.querySelector<HTMLDivElement>('.vbi-tooltip__arrow')
  if (!a) throw new Error('.vbi-tooltip__arrow not found')
  return a
}

/** Create a fixture, set properties, and await update. */
const createTooltip = async (
  props: Partial<VBITooltipInstance> = {},
  slotContent = '<button>Hover me</button>',
): Promise<VBITooltipInstance> => {
  const el = await fixture<VBITooltipInstance>(html`<vbi-tooltip content="Tooltip text">${slotContent}</vbi-tooltip>`)
  Object.assign(el, props)
  await el.updateComplete
  return el
}

/** Flush a pending timer by advancing fake timers. */
const advanceTimers = (ms: number): void => {
  rs.advanceTimersByTime(ms)
}

describe('vbi-tooltip', () => {
  afterEach(() => {
    fixtureCleanup()
    rs.restoreAllMocks()
  })

  // ── Registration & instantiation ──────────────────────────────

  it('should register as a custom element', () => {
    expect(customElements.get('vbi-tooltip')).toBeDefined()
  })

  it('should create an instance of VBITooltip', async () => {
    const el = await createTooltip()
    expect(el).toBeInstanceOf(VBITooltip)
  })

  // ── Default property values ───────────────────────────────────

  it('should have correct default property values', async () => {
    const el = await fixture<VBITooltipInstance>(html`<vbi-tooltip></vbi-tooltip>`)

    expect(el.content).toBe('')
    expect(el.placement).toBe('top')
    expect(el.trigger).toBe('hover')
    expect(el.arrow).toBe(true)
    expect(el.dark).toBe(false)
    expect(el.disabled).toBe(false)
    expect(el.showDelay).toBe(100)
    expect(el.hideDelay).toBe(100)
  })

  // ── Popup content ─────────────────────────────────────────────

  it('should render the content text inside the popup', async () => {
    const el = await createTooltip({ content: 'Hello World' })

    expect(popup(el).textContent).toContain('Hello World')
  })

  // ── CSS class mapping: placement ──────────────────────────────

  describe('placement classes', () => {
    it.each([
      { placement: 'top', className: 'vbi-tooltip__popup--top' },
      { placement: 'bottom', className: 'vbi-tooltip__popup--bottom' },
      { placement: 'left', className: 'vbi-tooltip__popup--left' },
      { placement: 'right', className: 'vbi-tooltip__popup--right' },
    ] as const)('should apply class "$className" when placement is "$placement"', async ({ placement, className }) => {
      const el = await createTooltip({ placement })

      expect(popup(el).classList.contains(className)).toBe(true)
    })
  })

  // ── CSS class mapping: dark modifier ──────────────────────────

  it('should apply dark class when dark is true', async () => {
    const el = await createTooltip({ dark: true })

    expect(popup(el).classList.contains('vbi-tooltip__popup--dark')).toBe(true)
  })

  it('should not apply dark class by default', async () => {
    const el = await createTooltip()

    expect(popup(el).classList.contains('vbi-tooltip__popup--dark')).toBe(false)
  })

  // ── Visibility: hidden by default ─────────────────────────────

  it('should be hidden by default', async () => {
    const el = await createTooltip()

    expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(false)
  })

  // ── Programmatic show / hide ──────────────────────────────────

  it('should show the popup when show() is called', async () => {
    const el = await createTooltip()

    el.show()
    await el.updateComplete

    expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(true)
    expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(false)
  })

  it('should hide the popup when hide() is called after showing', async () => {
    const el = await createTooltip()

    el.show()
    await el.updateComplete
    el.hide()
    await el.updateComplete

    expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(false)
  })

  // ── Hover trigger ─────────────────────────────────────────────

  describe('hover trigger', () => {
    it('should show the popup on mouseenter after delay', async () => {
      rs.useFakeTimers()
      const el = await createTooltip({ showDelay: 50 })

      trigger(el).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      advanceTimers(50)
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(true)
      rs.useRealTimers()
    })

    it('should hide the popup on mouseleave after delay', async () => {
      rs.useFakeTimers()
      const el = await createTooltip({ showDelay: 0, hideDelay: 50 })

      trigger(el).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await el.updateComplete

      trigger(el).dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      advanceTimers(50)
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
      rs.useRealTimers()
    })

    it('should show immediately when showDelay is 0', async () => {
      const el = await createTooltip({ showDelay: 0 })

      trigger(el).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(true)
    })

    it('should hide immediately when hideDelay is 0', async () => {
      const el = await createTooltip({ showDelay: 0, hideDelay: 0 })

      trigger(el).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await el.updateComplete
      trigger(el).dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })

    it('should not react to mouseenter when trigger is click', async () => {
      const el = await createTooltip({ trigger: 'click', showDelay: 0 })

      trigger(el).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })
  })

  // ── Click trigger ─────────────────────────────────────────────

  describe('click trigger', () => {
    it('should show the popup on click', async () => {
      const el = await createTooltip({ trigger: 'click' })

      trigger(el).dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(true)
    })

    it('should hide the popup on second click (toggle)', async () => {
      const el = await createTooltip({ trigger: 'click' })

      trigger(el).dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await el.updateComplete
      trigger(el).dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })

    it('should not react to click when trigger is hover', async () => {
      const el = await createTooltip({ trigger: 'hover' })

      trigger(el).dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })
  })

  // ── Focus trigger (hover mode) ────────────────────────────────

  describe('focus trigger (hover mode)', () => {
    it('should show the popup on focusin', async () => {
      const el = await createTooltip({ trigger: 'hover' })

      trigger(el).dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(true)
    })

    it('should hide the popup on focusout after delay', async () => {
      rs.useFakeTimers()
      const el = await createTooltip({ trigger: 'hover', hideDelay: 50 })

      trigger(el).dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
      await el.updateComplete

      trigger(el).dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
      advanceTimers(50)
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
      rs.useRealTimers()
    })

    it('should not react to focusin when trigger is click', async () => {
      const el = await createTooltip({ trigger: 'click' })

      trigger(el).dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })
  })

  // ── Disabled state ────────────────────────────────────────────

  describe('disabled state', () => {
    it('should not show when disabled via show()', async () => {
      const el = await createTooltip({ disabled: true })

      el.show()
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })

    it('should not show when disabled via hover', async () => {
      const el = await createTooltip({ disabled: true, showDelay: 0 })

      trigger(el).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })

    it('should not show when disabled via click trigger', async () => {
      const el = await createTooltip({ trigger: 'click', disabled: true })

      trigger(el).dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })
  })

  // ── Arrow visibility ──────────────────────────────────────────

  describe('arrow', () => {
    it('should show the arrow by default', async () => {
      const el = await createTooltip()

      expect(arrow(el).classList.contains('vbi-tooltip__arrow--hidden')).toBe(false)
    })

    it('should hide the arrow when arrow is false', async () => {
      const el = await createTooltip({ arrow: false })

      expect(arrow(el).classList.contains('vbi-tooltip__arrow--hidden')).toBe(true)
    })
  })

  // ── Keyboard: Escape ──────────────────────────────────────────

  describe('keyboard interaction', () => {
    it('should hide the popup when Escape is pressed', async () => {
      const el = await createTooltip()

      el.show()
      await el.updateComplete
      expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(true)

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--hidden')).toBe(true)
    })

    it('should not hide when a non-Escape key is pressed', async () => {
      const el = await createTooltip()

      el.show()
      await el.updateComplete

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      await el.updateComplete

      expect(popup(el).classList.contains('vbi-tooltip__popup--visible')).toBe(true)
    })
  })

  // ── ARIA attributes ───────────────────────────────────────────

  describe('accessibility', () => {
    it('should have role="tooltip" on the popup', async () => {
      const el = await createTooltip()

      expect(popup(el).getAttribute('role')).toBe('tooltip')
    })

    it('should set aria-hidden="true" when hidden', async () => {
      const el = await createTooltip()

      expect(popup(el).getAttribute('aria-hidden')).toBe('true')
    })

    it('should set aria-hidden="false" when visible', async () => {
      const el = await createTooltip()

      el.show()
      await el.updateComplete

      expect(popup(el).getAttribute('aria-hidden')).toBe('false')
    })
  })

  // ── Slot ──────────────────────────────────────────────────────

  it('should render a default slot for the trigger content', async () => {
    const el = await createTooltip()

    const slot = el.shadowRoot?.querySelector('.vbi-tooltip__trigger slot')
    expect(slot).toBeTruthy()
  })

  // ── Combined states ───────────────────────────────────────────

  it('should apply both dark and placement classes together', async () => {
    const el = await createTooltip({ dark: true, placement: 'bottom' })

    const p = popup(el)
    expect(p.classList.contains('vbi-tooltip__popup--dark')).toBe(true)
    expect(p.classList.contains('vbi-tooltip__popup--bottom')).toBe(true)
  })

  it('should apply visible and dark classes together when shown', async () => {
    const el = await createTooltip({ dark: true })

    el.show()
    await el.updateComplete

    const p = popup(el)
    expect(p.classList.contains('vbi-tooltip__popup--dark')).toBe(true)
    expect(p.classList.contains('vbi-tooltip__popup--visible')).toBe(true)
  })
})
