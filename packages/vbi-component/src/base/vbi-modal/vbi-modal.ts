import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, VdashElement } from 'src/shared/element'
import styles from './vbi-modal.style'

export type VBIModalSize = 'default' | 'small' | 'large'
export type VBIModalConfirmType = 'info' | 'success' | 'error' | 'warning' | 'confirm'

/**
 * Modal dialog component – Ant Design–style overlay dialog.
 *
 * @tag vbi-modal
 *
 * @prop {string} modalTitle - Text displayed in the modal header.
 * @prop {boolean} open - Whether the modal is visible.
 * @prop {VBIModalSize} size - Size preset of the modal.
 * @prop {boolean} closable - Whether the close button is shown.
 * @prop {boolean} mask - Whether the mask overlay is rendered.
 * @prop {boolean} maskClosable - Whether clicking the mask closes the modal.
 * @prop {boolean} keyboard - Whether pressing Escape closes the modal.
 * @prop {boolean} centered - Whether the modal is vertically centered (default: true).
 * @prop {boolean} fullscreen - Whether the modal fills the viewport.
 * @prop {boolean} destroyOnClose - Whether to tear down slot content when closed.
 * @prop {boolean} loading - Whether to show a loading state in the OK button area.
 * @prop {string} okText - Text for the OK button.
 * @prop {string} cancelText - Text for the Cancel button.
 * @prop {boolean} footer - Whether to show the default footer.
 * @prop {string} width - Custom width of the modal (CSS value).
 * @prop {number} zIndex - Custom z-index for the root layer.
 *
 * @cssprop [--vbi-modal-bg] - Background color of the modal.
 * @cssprop [--vbi-modal-color] - Text color of the modal.
 * @cssprop [--vbi-modal-radius] - Border radius of the modal.
 * @cssprop [--vbi-modal-shadow] - Box shadow of the modal.
 * @cssprop [--vbi-modal-width] - Width of the modal.
 * @cssprop [--vbi-modal-mask-bg] - Background color of the mask overlay.
 * @cssprop [--vbi-modal-root-z-index] - Z-index of the modal root layer.
 * @cssprop [--vbi-modal-title-color] - Color of the header title.
 * @cssprop [--vbi-modal-title-font-size] - Font size of the header title.
 * @cssprop [--vbi-modal-close-color] - Color of the close button.
 *
 * @slot - Default slot for body content.
 * @slot header - Custom header content (replaces default title).
 * @slot footer - Custom footer content (replaces default buttons).
 *
 * @fires vbi-modal-ok - Dispatched when the OK button is clicked.
 * @fires vbi-modal-cancel - Dispatched when the modal is closed (close button, mask, Escape, or Cancel button).
 * @fires vbi-modal-after-close - Dispatched after the closing animation completes.
 * @fires vbi-modal-after-open - Dispatched after the opening animation completes.
 */
@customElement('vbi-modal')
export class VBIModal extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ type: String, attribute: 'modal-title' }) accessor modalTitle = ''
  @property({ type: Boolean, reflect: true }) accessor open = false
  @property({ type: String }) accessor size: VBIModalSize = 'default'
  @property({ type: Boolean }) accessor closable = true
  @property({ type: Boolean }) accessor mask = true
  @property({ type: Boolean, attribute: 'mask-closable' }) accessor maskClosable = true
  @property({ type: Boolean }) accessor keyboard = true
  @property({ type: Boolean }) accessor centered = true
  @property({ type: Boolean }) accessor fullscreen = false
  @property({ type: Boolean, attribute: 'destroy-on-close' }) accessor destroyOnClose = false
  @property({ type: Boolean }) accessor loading = false
  @property({ type: String, attribute: 'ok-text' }) accessor okText = 'OK'
  @property({ type: String, attribute: 'cancel-text' }) accessor cancelText = 'Cancel'
  @property({ type: Boolean }) accessor footer = true
  @property({ type: String }) accessor width = ''
  @property({ type: Number, attribute: 'z-index' }) accessor zIndex = 0

  /** Internal flag that tracks whether we have ever rendered open content. */
  @state() private accessor _rendered = false

  /** Internal flag tracking the animation direction for enter/leave. */
  @state() private accessor _animating: 'in' | 'out' | null = null

  /** When true the root wrapper remains in the DOM for the leave animation. */
  @state() private accessor _visibleForAnimation = false

  private _previousOverflow = ''

  // ── Lifecycle ──────────────────────────────────────

  override connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('keydown', this._handleKeydown)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    document.removeEventListener('keydown', this._handleKeydown)
    this._restoreBodyScroll()
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this._openModal()
      } else if (changed.get('open') === true) {
        // was open → now closed
        this._closeModal()
      }
    }
  }

  // ── Open / Close orchestration ─────────────────────

  private _openModal(): void {
    this._rendered = true
    this._visibleForAnimation = true
    this._animating = 'in'
    this._lockBodyScroll()
  }

  private _closeModal(): void {
    this._animating = 'out'
    // Visibility kept true until animationend
  }

  // ── Event handlers ─────────────────────────────────

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.keyboard && this.open) {
      this._emitCancel()
    }
  }

  private _handleMaskClick = (): void => {
    if (this.maskClosable) {
      this._emitCancel()
    }
  }

  private _handleCloseClick = (): void => {
    this._emitCancel()
  }

  private _handleOk = (): void => {
    this.dispatchEvent(new CustomEvent('vbi-modal-ok', { bubbles: true, composed: true }))
  }

  private _handleCancel = (): void => {
    this._emitCancel()
  }

  private _handleAnimationEnd = (): void => {
    if (this._animating === 'in') {
      this._animating = null
      this.dispatchEvent(new CustomEvent('vbi-modal-after-open', { bubbles: true, composed: true }))
    } else if (this._animating === 'out') {
      this._animating = null
      this._visibleForAnimation = false
      this._restoreBodyScroll()
      if (this.destroyOnClose) {
        this._rendered = false
      }
      this.dispatchEvent(new CustomEvent('vbi-modal-after-close', { bubbles: true, composed: true }))
    }
  }

  /** Prevent clicks inside the modal panel from closing through the mask. */
  private _handleContentClick = (event: MouseEvent): void => {
    event.stopPropagation()
  }

  // ── Scroll-lock helpers ────────────────────────────

  private _lockBodyScroll(): void {
    this._previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  private _restoreBodyScroll(): void {
    document.body.style.overflow = this._previousOverflow
  }

  // ── Fire cancel event ──────────────────────────────

  private _emitCancel(): void {
    this.dispatchEvent(new CustomEvent('vbi-modal-cancel', { bubbles: true, composed: true }))
  }

  // ── Render helpers ─────────────────────────────────

  private _renderCloseButton() {
    if (!this.closable) return nothing
    return html`
      <button
        class="vbi-modal__close"
        aria-label="Close"
        @click=${this._handleCloseClick}
      >
        <svg class="vbi-modal__close-icon" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    `
  }

  private _renderHeader() {
    return html`
      <div class="vbi-modal__header">
        <slot name="header">
          <div class="vbi-modal__title">${this.modalTitle}</div>
        </slot>
      </div>
    `
  }

  private _renderBody() {
    if (this.destroyOnClose && !this._rendered) return nothing
    return html`
      <div class="vbi-modal__body">
        <slot></slot>
      </div>
    `
  }

  private _renderSpinner() {
    return html`<span class="vbi-spinner" aria-hidden="true"></span>`
  }

  private _renderFooter() {
    if (!this.footer) return nothing
    return html`
      <div class="vbi-modal__footer">
        <slot name="footer">
          <vbi-button @click=${this._handleCancel}>${this.cancelText}</vbi-button>
          <vbi-button type="primary" ?loading=${this.loading} @click=${this._handleOk}>${this.okText}</vbi-button>
        </slot>
      </div>
    `
  }

  // ── Render ─────────────────────────────────────────

  override render() {
    if (!this._visibleForAnimation && !this.open) return nothing

    const isVisible = this.open && this._animating !== 'out'

    const rootClasses = classMap({
      'vbi-modal__root': true,
      'vbi-modal__root--hidden': !this._visibleForAnimation,
    })

    const maskClasses = classMap({
      'vbi-modal__mask': true,
      'vbi-modal__mask--visible': this._animating === 'in' || (isVisible && this._animating === null),
      'vbi-modal__mask--hidden': this._animating === 'out',
    })

    const modalClasses = classMap({
      'vbi-modal': true,
      [`vbi-modal--size-${this.size}`]: this.size !== 'default',
      'vbi-modal--fullscreen': this.fullscreen,
      'vbi-modal--visible': this._animating === 'in',
      'vbi-modal--hidden': this._animating === 'out',
    })

    const rootStyles = this.zIndex ? `z-index: ${this.zIndex}` : ''
    const modalStyles = this.width ? `width: ${this.width}` : ''

    return html`
      <div class=${rootClasses} style=${rootStyles || nothing}>
        ${this.mask ? html`<div class=${maskClasses}></div>` : nothing}
        <div
          class="vbi-modal__wrap"
          @click=${this._handleMaskClick}
        >
          <div
            class=${modalClasses}
            style=${modalStyles || nothing}
            role="dialog"
            aria-modal="true"
            aria-label=${this.modalTitle || nothing}
            @click=${this._handleContentClick}
            @animationend=${this._handleAnimationEnd}
          >
            ${this._renderCloseButton()}
            ${this._renderHeader()}
            ${this._renderBody()}
            ${this._renderFooter()}
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-modal': VBIModal
  }
}
