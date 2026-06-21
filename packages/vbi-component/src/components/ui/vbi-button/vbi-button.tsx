import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'vbi-button',
  styleUrl: 'vbi-button.css',
  shadow: true,
})
export class VbiButton {
  /**
   * Type of the button
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button'

  /**
   * Main color (primary, secondary, accent, etc.)
   */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'

  /**
   * Button variant (ghost, outline, dash, soft, link)
   */
  @Prop() variant?: 'ghost' | 'outline' | 'dash' | 'soft' | 'link'

  /**
   * Size (xs, sm, md, lg, xl)
   */
  @Prop() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Shape (square, circle, wide, block)
   */
  @Prop() shape?: 'square' | 'circle' | 'wide' | 'block'

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false

  /**
   * Active state (pressed/selected)
   */
  @Prop() active: boolean = false

  render() {
    return (
      <button
        type={this.type}
        disabled={this.disabled}
        class={{
          btn: true,
          [`btn-${this.color}`]: !!this.color,
          [`btn-${this.variant}`]: !!this.variant,
          [`btn-${this.size}`]: !!this.size,
          [`btn-${this.shape}`]: !!this.shape,
          'btn-active': this.active,
          'btn-disabled': this.disabled,
        }}
      >
        <slot></slot>
      </button>
    )
  }
}
