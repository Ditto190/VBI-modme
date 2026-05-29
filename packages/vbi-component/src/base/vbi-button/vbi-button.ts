import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, VdashElement } from 'src/shared/element'
import styles from './vbi-button.style'

export type VBIButtonType = 'default' | 'primary' | 'dashed' | 'text'
export type VBIButtonSize = 'small' | 'middle' | 'large'
export type VBIButtonShape = 'default' | 'round' | 'circle'
export type VBIButtonHtmlType = 'button' | 'submit' | 'reset'
export type VBIButtonIconPosition = 'start' | 'end'

/**
 * Button components.
 *
 * @tag vbi-button
 *
 * @prop {VBIButtonType} type - Visual style variant of the button.
 * @prop {VBIButtonSize} size - Size of the button.
 * @prop {VBIButtonShape} shape - Border shape of the button.
 * @prop {VBIButtonHtmlType} htmlType - Native button type when rendered as `<button>`.
 * @prop {VBIButtonIconPosition} iconPosition - Position of icon slots (`start` or `end`).
 * @prop {boolean} block - Expand button to full width.
 * @prop {boolean} danger - Apply danger color scheme.
 * @prop {boolean} dark - Render dark style.
 * @prop {boolean} disabled - Disable interaction.
 * @prop {boolean} loading - Show loading spinner and block interaction.
 *
 * @cssprop [--vbi-button-color] - Text color of the button.
 * @cssprop [--vbi-button-bg] - Background color of the button.
 * @cssprop [--vbi-button-border] - Border color of the button.
 * @cssprop [--vbi-button-radius] - Border radius of the button.
 * @cssprop [--vbi-button-shadow] - Box shadow of the button.
 * @cssprop [--vbi-button-hover-color] - Text color in hover state.
 * @cssprop [--vbi-button-hover-border] - Border color in hover state.
 * @cssprop [--vbi-button-active-color] - Text color in active state.
 * @cssprop [--vbi-button-active-border] - Border color in active state.
 *
 * @slot - Default slot for button label text.
 * @slot icon - Icon content, positioned via `iconPosition`. Replaced by spinner when `loading`.
 */
@customElement('vbi-button')
export class VBIButton extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ type: String }) accessor type: VBIButtonType = 'default'
  @property({ type: String }) accessor size: VBIButtonSize = 'middle'
  @property({ type: String }) accessor shape: VBIButtonShape = 'default'
  @property({ type: String, attribute: 'html-type' }) accessor htmlType: VBIButtonHtmlType = 'button'
  @property({ type: String, attribute: 'icon-position' }) accessor iconPosition: VBIButtonIconPosition = 'start'
  @property({ type: Boolean }) accessor block = false
  @property({ type: Boolean }) accessor danger = false
  @property({ type: Boolean }) accessor dark = false
  @property({ type: Boolean }) accessor disabled = false
  @property({ type: Boolean }) accessor loading = false

  private handleClick = (event: MouseEvent): void => {
    if (!this.disabled && !this.loading) {
      return
    }
    event.preventDefault()
    event.stopImmediatePropagation()
  }

  private renderSpinner() {
    return html`<span class="vbi-spinner" aria-hidden="true"></span>`
  }

  private renderIcon() {
    if (this.loading) {
      return this.renderSpinner()
    }
    return html`<slot name="icon"></slot>`
  }

  override render() {
    const classes = classMap({
      'vbi-button': true,
      [`vbi-button--${this.type}`]: true,
      [`vbi-button--size-${this.size}`]: true,
      [`vbi-button--shape-${this.shape}`]: true,
      'vbi-button--block': this.block,
      'vbi-button--danger': this.danger,
      'vbi-button--dark': this.dark,
      'vbi-button--loading': this.loading,
    })

    const hasLabel = this.textContent?.trim().length
    const iconSlot = this.renderIcon()
    const labelSlot = hasLabel ? html`<span class="vbi-label"><slot></slot></span>` : nothing
    const isEnd = this.iconPosition === 'end'

    return html`
      <button
        class=${classes}
        type=${this.htmlType}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
      >
        <span class="vbi-content"> ${isEnd ? labelSlot : iconSlot} ${isEnd ? iconSlot : labelSlot} </span>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-button': VBIButton
  }
}
