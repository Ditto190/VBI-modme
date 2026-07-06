import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'vbi-chart-dimension-shelf',
  styleUrl: 'vbi-chart-dimension-shelf.css',
  shadow: true,
})
export class VbiChartDimensionShelf {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
