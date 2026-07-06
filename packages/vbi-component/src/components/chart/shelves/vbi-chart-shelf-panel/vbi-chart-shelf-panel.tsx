import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'vbi-chart-shelf-panel',
  styleUrl: 'vbi-chart-shelf-panel.css',
  shadow: true,
})
export class VbiChartShelfPanel {
  render() {
    return (
      <Host>
        <div>
          Dimensions: <vbi-chart-dimension-shelf />
        </div>
      </Host>
    )
  }
}
