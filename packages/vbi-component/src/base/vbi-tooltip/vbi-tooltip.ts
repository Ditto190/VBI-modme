import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, VdashElement } from 'src/shared/element'
import styles from './vbi-tooltip.style'

export type VBITooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type VBITooltipTrigger = 'hover' | 'click'

/**
 * Tooltip component – shows a floating label on hover or click.
 *
 * @tag vbi-tooltip
 *
 * @prop {string} content - Text content displayed inside the tooltip popup.
 * @prop {VBITooltipPlacement} placement - Which side of the trigger the popup appears on.
 * @prop {VBITooltipTrigger} trigger - Interaction mode that opens the tooltip.
 * @prop {boolean} arrow - Whether to show a directional arrow.
 * @prop {boolean} dark - Invert colors (light popup on dark backgrounds).
 * @prop {boolean} disabled - Prevent the tooltip from appearing.
 * @prop {number} showDelay - Delay in ms before showing (hover trigger only).
 * @prop {number} hideDelay - Delay in ms before hiding (hover trigger only).
 *
 * @cssprop [--vbi-tooltip-bg] - Background color of the popup.
 * @cssprop [--vbi-tooltip-color] - Text color of the popup.
 * @cssprop [--vbi-tooltip-radius] - Border radius of the popup.
 * @cssprop [--vbi-tooltip-shadow] - Box shadow of the popup.
 * @cssprop [--vbi-tooltip-max-width] - Maximum width of the popup.
 * @cssprop [--vbi-tooltip-padding] - Padding inside the popup.
 * @cssprop [--vbi-tooltip-z-index] - Stacking context of the popup.
 * @cssprop [--vbi-tooltip-arrow-size] - Size of the directional arrow.
 *
 * @slot - Default slot for the trigger element.
 */
@customElement('vbi-tooltip')
export class VBITooltip extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ type: String }) accessor content = ''
  @property({ type: String }) accessor placement: VBITooltipPlacement = 'top'
  @property({ type: String }) accessor trigger: VBITooltipTrigger = 'hover'
  @property({ type: Boolean }) accessor arrow = true
  @property({ type: Boolean }) accessor dark = false
  @property({ type: Boolean }) accessor disabled = false
  @property({ type: Number, attribute: 'show-delay' }) accessor showDelay = 100
  @property({ type: Number, attribute: 'hide-delay' }) accessor hideDelay = 100

  @state() private accessor _visible = false

  private _showTimer: ReturnType<typeof setTimeout> | undefined
  private _hideTimer: ReturnType<typeof setTimeout> | undefined

  // ── Lifecycle ───────────────────────────────────────

  override connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this._handleKeydown)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._clearTimers()
    this.removeEventListener('keydown', this._handleKeydown)
  }

  // ── Visibility control ──────────────────────────────

  show(): void {
    if (this.disabled) return
    this._clearTimers()
    this._visible = true
  }

  hide(): void {
    this._clearTimers()
    this._visible = false
  }

  // ── Event handlers ──────────────────────────────────

  private _scheduleShow = (): void => {
    if (this.disabled) return
    this._clearTimers()
    if (this.showDelay > 0) {
      this._showTimer = setTimeout(() => this.show(), this.showDelay)
    } else {
      this.show()
    }
  }

  private _scheduleHide = (): void => {
    this._clearTimers()
    if (this.hideDelay > 0) {
      this._hideTimer = setTimeout(() => this.hide(), this.hideDelay)
    } else {
      this.hide()
    }
  }

  private _handleClick = (): void => {
    if (this.trigger !== 'click') return
    if (this._visible) {
      this.hide()
    } else {
      this.show()
    }
  }

  private _handleMouseEnter = (): void => {
    if (this.trigger !== 'hover') return
    this._scheduleShow()
  }

  private _handleMouseLeave = (): void => {
    if (this.trigger !== 'hover') return
    this._scheduleHide()
  }

  private _handleFocusIn = (): void => {
    if (this.trigger !== 'hover') return
    this.show()
  }

  private _handleFocusOut = (): void => {
    if (this.trigger !== 'hover') return
    this._scheduleHide()
  }

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this._visible) {
      this.hide()
    }
  }

  // ── Internals ───────────────────────────────────────

  private _clearTimers(): void {
    if (this._showTimer !== undefined) {
      clearTimeout(this._showTimer)
      this._showTimer = undefined
    }
    if (this._hideTimer !== undefined) {
      clearTimeout(this._hideTimer)
      this._hideTimer = undefined
    }
  }

  // ── Render ──────────────────────────────────────────

  override render() {
    const popupClasses = classMap({
      'vbi-tooltip__popup': true,
      [`vbi-tooltip__popup--${this.placement}`]: true,
      'vbi-tooltip__popup--visible': this._visible,
      'vbi-tooltip__popup--hidden': !this._visible,
      'vbi-tooltip__popup--dark': this.dark,
    })

    const arrowClasses = classMap({
      'vbi-tooltip__arrow': true,
      'vbi-tooltip__arrow--hidden': !this.arrow,
    })

    return html`
      <div
        class="vbi-tooltip__trigger"
        @click=${this._handleClick}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @focusin=${this._handleFocusIn}
        @focusout=${this._handleFocusOut}
      >
        <slot></slot>
      </div>
      <div class=${popupClasses} role="tooltip" aria-hidden=${!this._visible ? 'true' : 'false'}>
        <div class=${arrowClasses}></div>
        ${this.content}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-tooltip': VBITooltip
  }
}
