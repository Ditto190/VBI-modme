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
        <div class='chart-shelf__item'>
          <label class='chart-shelf__label'>Dimensions</label>
          <vbi-chart-dimension class='chart-shelf__input' />
        </div>
      </Host>
    )
  }
}
