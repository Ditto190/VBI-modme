import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'vbi-chart-toolbar',
  styleUrl: 'vbi-chart-toolbar.css',
  shadow: true,
})
export class VbiChartToolbar {
  render() {
    return (
      <Host>
        <div class='toolbar'>
          <div class='toolbar-group'>
            <div>ChartTypeSelector</div>
            <div>Upload</div>
            <div>Undo|redo</div>
          </div>
          <div class='toolbar-group'>
            <input type='text' />
          </div>
        </div>
      </Host>
    )
  }
}
