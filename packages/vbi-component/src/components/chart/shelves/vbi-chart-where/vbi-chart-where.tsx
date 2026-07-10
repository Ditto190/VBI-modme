import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'vbi-chart-where',
  styleUrl: 'vbi-chart-where.css',
  shadow: true,
})
export class VbiChartWhere {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
