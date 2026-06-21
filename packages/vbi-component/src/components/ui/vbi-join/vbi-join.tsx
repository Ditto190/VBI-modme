import { Component, Prop, h, Host } from '@stencil/core'

@Component({
  tag: 'vbi-join',
  styleUrl: 'vbi-join.css',
  shadow: false,
})
export class VbiJoin {
  /**
   * Vertical orientation
   * @default false
   */
  @Prop() vertical: boolean = false

  render() {
    return (
      <Host
        class={{
          'vbi-join': true,
          'vbi-join-vertical': this.vertical,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
