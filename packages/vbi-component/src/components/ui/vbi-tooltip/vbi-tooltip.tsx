import { Component, Prop, h, Host } from '@stencil/core'

@Component({
  tag: 'vbi-tooltip',
  styleUrl: 'vbi-tooltip.css',
  shadow: true,
})
export class VbiTooltip {
  /** The text to display inside the tooltip */
  @Prop() text: string = ''
  /** The position of the tooltip relative to its target */
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' = 'top'
  /** The semantic color theme of the tooltip */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** Whether the tooltip is currently open/visible */
  @Prop() open: boolean = false

  render() {
    return (
      <Host
        data-tip={this.text}
        class={{
          [`tooltip-${this.position}`]: true,
          [`tooltip-${this.color}`]: !!this.color,
          'tooltip-open': this.open,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
