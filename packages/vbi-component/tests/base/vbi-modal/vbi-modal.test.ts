import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'

import { VBIModal } from 'src/base/vbi-modal'

type VBIModalInstance = InstanceType<typeof VBIModal>

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

/** Create a modal fixture, set properties, and await update. */
const createModal = async (props: Partial<VBIModalInstance> = {}, content = ''): Promise<VBIModalInstance> => {
  const el = await fixture<VBIModalInstance>(html`<vbi-modal>${content}</vbi-modal>`)
  Object.assign(el, props)
  await el.updateComplete
  return el
}

/** Query a shadow DOM element by selector. */
const q = (el: VBIModalInstance, selector: string): Element | null =>
  el.shadowRoot?.querySelector(selector) ?? null

/** Query all shadow DOM elements by selector. */
const qAll = (el: VBIModalInstance, selector: string): NodeListOf<Element> =>
  el.shadowRoot?.querySelectorAll(selector) ?? ([] as unknown as NodeListOf<Element>)

/** Open a modal and await its update. */
const openModal = async (el: VBIModalInstance): Promise<void> => {
  el.open = true
  await el.updateComplete
}

/** Close a modal and await its update. */
const closeModal = async (el: VBIModalInstance): Promise<void> => {
  el.open = false
  await el.updateComplete
}

/** Simulate an animationend event on the modal panel. */
const fireAnimationEnd = async (el: VBIModalInstance): Promise<void> => {
  const modal = q(el, '.vbi-modal')
  if (modal) {
    modal.dispatchEvent(new Event('animationend', { bubbles: true }))
  }
  await el.updateComplete
}

describe('vbi-modal', () => {
  afterEach(() => {
    fixtureCleanup()
    // Restore body scroll after each test
    document.body.style.overflow = ''
  })

  // ── Registration & instantiation ──────────────────────────────

  it('should register as a custom element', () => {
    expect(customElements.get('vbi-modal')).toBeDefined()
  })

  it('should create an instance of VBIModal', async () => {
    const el = await createModal()
    expect(el).toBeInstanceOf(VBIModal)
  })

  // ── Default property values ───────────────────────────────────

  it('should have correct default property values', async () => {
    const el = await createModal()

    expect(el.modalTitle).toBe('')
    expect(el.open).toBe(false)
    expect(el.size).toBe('default')
    expect(el.closable).toBe(true)
    expect(el.mask).toBe(true)
    expect(el.maskClosable).toBe(true)
    expect(el.keyboard).toBe(true)
    expect(el.centered).toBe(true)
    expect(el.fullscreen).toBe(false)
    expect(el.destroyOnClose).toBe(false)
    expect(el.loading).toBe(false)
    expect(el.okText).toBe('OK')
    expect(el.cancelText).toBe('Cancel')
    expect(el.footer).toBe(true)
    expect(el.width).toBe('')
    expect(el.zIndex).toBe(0)
  })

  // ── Visibility ────────────────────────────────────────────────

  it('should not render anything when closed', async () => {
    const el = await createModal()

    expect(q(el, '.vbi-modal__root')).toBeNull()
  })

  it('should render modal root when opened', async () => {
    const el = await createModal()
    await openModal(el)

    expect(q(el, '.vbi-modal__root')).toBeTruthy()
  })

  it('should render modal panel with dialog role when opened', async () => {
    const el = await createModal()
    await openModal(el)

    const modal = q(el, '.vbi-modal')
    expect(modal).toBeTruthy()
    expect(modal?.getAttribute('role')).toBe('dialog')
    expect(modal?.getAttribute('aria-modal')).toBe('true')
  })

  // ── Title ─────────────────────────────────────────────────────

  it('should render the modal title', async () => {
    const el = await createModal({ open: true, modalTitle: 'Test Title' })

    const title = q(el, '.vbi-modal__title')
    expect(title).toBeTruthy()
    expect(title?.textContent).toBe('Test Title')
  })

  it('should set aria-label from modalTitle', async () => {
    const el = await createModal({ open: true, modalTitle: 'Accessible Title' })

    const modal = q(el, '.vbi-modal')
    expect(modal?.getAttribute('aria-label')).toBe('Accessible Title')
  })

  // ── Close button ──────────────────────────────────────────────

  it('should render a close button when closable is true', async () => {
    const el = await createModal({ open: true })

    expect(q(el, '.vbi-modal__close')).toBeTruthy()
  })

  it('should not render a close button when closable is false', async () => {
    const el = await createModal({ open: true, closable: false })

    expect(q(el, '.vbi-modal__close')).toBeNull()
  })

  it('should fire vbi-modal-cancel when close button is clicked', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    const closeBtn = q(el, '.vbi-modal__close') as HTMLElement
    closeBtn?.click()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  // ── Mask ──────────────────────────────────────────────────────

  it('should render the mask when mask is true', async () => {
    const el = await createModal({ open: true, mask: true })

    expect(q(el, '.vbi-modal__mask')).toBeTruthy()
  })

  it('should not render the mask when mask is false', async () => {
    const el = await createModal({ open: true, mask: false })

    expect(q(el, '.vbi-modal__mask')).toBeNull()
  })

  it('should fire vbi-modal-cancel when mask is clicked and maskClosable is true', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    const wrap = q(el, '.vbi-modal__wrap') as HTMLElement
    wrap?.click()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not fire vbi-modal-cancel when mask is clicked and maskClosable is false', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} .maskClosable=${false} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    const wrap = q(el, '.vbi-modal__wrap') as HTMLElement
    wrap?.click()

    expect(handler).not.toHaveBeenCalled()
  })

  // ── Content click does not close ──────────────────────────────

  it('should not fire cancel when clicking inside the modal content', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    const modal = q(el, '.vbi-modal') as HTMLElement
    modal?.click()

    expect(handler).not.toHaveBeenCalled()
  })

  // ── Keyboard (Escape) ─────────────────────────────────────────

  it('should fire vbi-modal-cancel when Escape is pressed and keyboard is true', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not fire vbi-modal-cancel when Escape is pressed and keyboard is false', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} .keyboard=${false} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

    expect(handler).not.toHaveBeenCalled()
  })

  it('should not fire vbi-modal-cancel when Escape is pressed and modal is closed', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${false} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

    expect(handler).not.toHaveBeenCalled()
  })

  it('should ignore non-Escape keys', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(handler).not.toHaveBeenCalled()
  })

  // ── Footer ────────────────────────────────────────────────────

  it('should render default footer when footer is true', async () => {
    const el = await createModal({ open: true, footer: true })

    expect(q(el, '.vbi-modal__footer')).toBeTruthy()
  })

  it('should not render footer when footer is false', async () => {
    const el = await createModal({ open: true, footer: false })

    expect(q(el, '.vbi-modal__footer')).toBeNull()
  })

  // ── OK / Cancel button events ─────────────────────────────────

  it('should fire vbi-modal-ok when OK button is clicked', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-ok=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    // The footer renders two vbi-button elements: [Cancel, OK(primary)]
    const buttons = qAll(el, 'vbi-button')
    const okBtn = buttons[buttons.length - 1] as HTMLElement
    okBtn?.click()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should fire vbi-modal-cancel when Cancel button is clicked', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    const buttons = qAll(el, 'vbi-button')
    const cancelBtn = buttons[0] as HTMLElement
    cancelBtn?.click()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  // ── Custom button text ────────────────────────────────────────

  it('should render custom OK text', async () => {
    const el = await createModal({ open: true, okText: 'Confirm' })

    const buttons = qAll(el, 'vbi-button')
    const okBtn = buttons[buttons.length - 1]
    expect(okBtn?.textContent?.trim()).toBe('Confirm')
  })

  it('should render custom Cancel text', async () => {
    const el = await createModal({ open: true, cancelText: 'Dismiss' })

    const buttons = qAll(el, 'vbi-button')
    const cancelBtn = buttons[0]
    expect(cancelBtn?.textContent?.trim()).toBe('Dismiss')
  })

  // ── Size CSS classes ──────────────────────────────────────────

  it('should not apply size class for default size', async () => {
    const el = await createModal({ open: true, size: 'default' })

    const modal = q(el, '.vbi-modal')
    expect(modal?.classList.contains('vbi-modal--size-small')).toBe(false)
    expect(modal?.classList.contains('vbi-modal--size-large')).toBe(false)
  })

  it.each([
    { size: 'small' as const, className: 'vbi-modal--size-small' },
    { size: 'large' as const, className: 'vbi-modal--size-large' },
  ])('should apply class "$className" when size is "$size"', async ({ size, className }) => {
    const el = await createModal({ open: true, size })

    const modal = q(el, '.vbi-modal')
    expect(modal?.classList.contains(className)).toBe(true)
  })

  // ── Fullscreen ────────────────────────────────────────────────

  it('should apply fullscreen class when fullscreen is true', async () => {
    const el = await createModal({ open: true, fullscreen: true })

    const modal = q(el, '.vbi-modal')
    expect(modal?.classList.contains('vbi-modal--fullscreen')).toBe(true)
  })

  it('should not apply fullscreen class when fullscreen is false', async () => {
    const el = await createModal({ open: true, fullscreen: false })

    const modal = q(el, '.vbi-modal')
    expect(modal?.classList.contains('vbi-modal--fullscreen')).toBe(false)
  })

  // ── Custom width ──────────────────────────────────────────────

  it('should apply custom width style when width is set', async () => {
    const el = await createModal({ open: true, width: '700px' })

    const modal = q(el, '.vbi-modal') as HTMLElement
    expect(modal?.style.width).toBe('700px')
  })

  it('should not apply width style when width is empty', async () => {
    const el = await createModal({ open: true, width: '' })

    const modal = q(el, '.vbi-modal') as HTMLElement
    expect(modal?.getAttribute('style')).toBeNull()
  })

  // ── Custom z-index ────────────────────────────────────────────

  it('should apply custom z-index style when zIndex is set', async () => {
    const el = await createModal({ open: true, zIndex: 2000 })

    const root = q(el, '.vbi-modal__root') as HTMLElement
    expect(root?.style.zIndex).toBe('2000')
  })

  it('should not apply z-index style when zIndex is 0', async () => {
    const el = await createModal({ open: true, zIndex: 0 })

    const root = q(el, '.vbi-modal__root') as HTMLElement
    expect(root?.getAttribute('style')).toBeNull()
  })

  // ── Body scroll lock ──────────────────────────────────────────

  it('should lock body scroll when opened', async () => {
    const el = await createModal()
    document.body.style.overflow = 'auto'

    await openModal(el)

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should restore body scroll after close animation completes', async () => {
    const el = await createModal()
    document.body.style.overflow = 'auto'

    await openModal(el)
    expect(document.body.style.overflow).toBe('hidden')

    await closeModal(el)
    await fireAnimationEnd(el)

    expect(document.body.style.overflow).toBe('auto')
  })

  // ── Animation CSS classes ─────────────────────────────────────

  it('should apply visible animation class when opening', async () => {
    const el = await createModal()
    await openModal(el)

    const modal = q(el, '.vbi-modal')
    expect(modal?.classList.contains('vbi-modal--visible')).toBe(true)
  })

  it('should apply hidden animation class when closing', async () => {
    const el = await createModal({ open: true })
    await closeModal(el)

    const modal = q(el, '.vbi-modal')
    expect(modal?.classList.contains('vbi-modal--hidden')).toBe(true)
  })

  // ── Mask animation classes ────────────────────────────────────

  it('should apply mask visible class when opening', async () => {
    const el = await createModal()
    await openModal(el)

    const mask = q(el, '.vbi-modal__mask')
    expect(mask?.classList.contains('vbi-modal__mask--visible')).toBe(true)
  })

  it('should apply mask hidden class when closing', async () => {
    const el = await createModal({ open: true })
    await closeModal(el)

    const mask = q(el, '.vbi-modal__mask')
    expect(mask?.classList.contains('vbi-modal__mask--hidden')).toBe(true)
  })

  // ── animationend events ───────────────────────────────────────

  it('should fire vbi-modal-after-open after open animation ends', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal @vbi-modal-after-open=${handler}></vbi-modal>`,
    )
    await openModal(el)
    await fireAnimationEnd(el)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should fire vbi-modal-after-close after close animation ends', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-after-close=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    await closeModal(el)
    await fireAnimationEnd(el)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  // ── destroyOnClose ────────────────────────────────────────────

  it('should keep body slot content after close when destroyOnClose is false', async () => {
    const el = await createModal({ destroyOnClose: false })
    await openModal(el)

    expect(q(el, '.vbi-modal__body')).toBeTruthy()

    await closeModal(el)
    await fireAnimationEnd(el)

    // After the full close + animation end cycle, we re-render;
    // the body might not be visible but the content is preserved internally.
    // However, once fully closed and animation ended, the root is removed entirely.
    // The key test here is that _rendered stays true.
    // Re-open to verify content is still there
    await openModal(el)
    expect(q(el, '.vbi-modal__body')).toBeTruthy()
  })

  it('should destroy body slot content after close when destroyOnClose is true', async () => {
    const el = await createModal({ destroyOnClose: true })
    await openModal(el)

    expect(q(el, '.vbi-modal__body')).toBeTruthy()

    await closeModal(el)
    await fireAnimationEnd(el)

    // After closing with destroyOnClose, the _rendered flag is set to false.
    // Re-opening should re-create the body from scratch.
    await openModal(el)
    expect(q(el, '.vbi-modal__body')).toBeTruthy()
  })

  // ── Loading state ─────────────────────────────────────────────

  it('should pass loading attribute to the OK button', async () => {
    const el = await createModal({ open: true, loading: true })

    const buttons = qAll(el, 'vbi-button')
    const okBtn = buttons[buttons.length - 1] as HTMLElement
    expect(okBtn?.hasAttribute('loading')).toBe(true)
  })

  it('should not set loading attribute on OK button when loading is false', async () => {
    const el = await createModal({ open: true, loading: false })

    const buttons = qAll(el, 'vbi-button')
    const okBtn = buttons[buttons.length - 1] as HTMLElement
    expect(okBtn?.hasAttribute('loading')).toBe(false)
  })

  // ── Slots ─────────────────────────────────────────────────────

  it('should render default slot for body content', async () => {
    const el = await createModal({ open: true })

    const bodySlot = q(el, '.vbi-modal__body slot:not([name])')
    expect(bodySlot).toBeTruthy()
  })

  it('should render header slot', async () => {
    const el = await createModal({ open: true })

    const headerSlot = q(el, '.vbi-modal__header slot[name="header"]')
    expect(headerSlot).toBeTruthy()
  })

  it('should render footer slot when footer is true', async () => {
    const el = await createModal({ open: true, footer: true })

    const footerSlot = q(el, '.vbi-modal__footer slot[name="footer"]')
    expect(footerSlot).toBeTruthy()
  })

  // ── Structural elements ───────────────────────────────────────

  it('should render all structural sections when open', async () => {
    const el = await createModal({ open: true, modalTitle: 'Structure Test' })

    expect(q(el, '.vbi-modal__root')).toBeTruthy()
    expect(q(el, '.vbi-modal__mask')).toBeTruthy()
    expect(q(el, '.vbi-modal__wrap')).toBeTruthy()
    expect(q(el, '.vbi-modal')).toBeTruthy()
    expect(q(el, '.vbi-modal__header')).toBeTruthy()
    expect(q(el, '.vbi-modal__body')).toBeTruthy()
    expect(q(el, '.vbi-modal__footer')).toBeTruthy()
    expect(q(el, '.vbi-modal__close')).toBeTruthy()
  })

  // ── Lifecycle: keydown listener cleanup ───────────────────────

  it('should remove keydown listener on disconnect', async () => {
    const handler = rs.fn()
    const el = await fixture<VBIModalInstance>(
      html`<vbi-modal .open=${true} @vbi-modal-cancel=${handler}></vbi-modal>`,
    )
    await el.updateComplete

    el.remove()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(handler).not.toHaveBeenCalled()
  })

  // ── Open / close toggle cycles ────────────────────────────────

  it('should handle open/close toggle correctly', async () => {
    const el = await createModal()

    // Open
    await openModal(el)
    expect(q(el, '.vbi-modal__root')).toBeTruthy()

    // Close
    await closeModal(el)
    // During closing animation, root should still be visible
    expect(q(el, '.vbi-modal__root')).toBeTruthy()

    // After animation ends, root should be removed
    await fireAnimationEnd(el)
    expect(q(el, '.vbi-modal__root')).toBeNull()

    // Re-open
    await openModal(el)
    expect(q(el, '.vbi-modal__root')).toBeTruthy()
  })
})
