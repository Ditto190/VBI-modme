import { Component, Prop, h, Host } from '@stencil/core'

@Component({
  tag: 'vbi-loading',
  styleUrl: 'vbi-loading.css',
  shadow: true,
})
export class VbiLoading {
  /** Loading style (spinner, dots, ring, ball, bars, infinity) */
  @Prop() type: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity' = 'spinner'

  /** Size (xs, sm, md, lg, xl) */
  @Prop() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Primary color. If not provided, it inherits the parent element's text color (currentColor) */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'

  render() {
    return (
      <Host
        class={{
          [`loading-${this.type}`]: true,
          [`loading-${this.size}`]: !!this.size,
        }}
        style={{
          ...(this.color && { color: `var(--color-${this.color})` }),
        }}
      ></Host>
    )
  }
}
