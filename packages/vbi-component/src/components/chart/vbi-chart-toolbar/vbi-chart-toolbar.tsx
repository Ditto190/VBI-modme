import { Component, Element, Host, State, h } from '@stencil/core'
import { connectChartStore } from 'src/store/context'
import { type ChartStore } from 'src/store/chart'

@Component({
  tag: 'vbi-chart-toolbar',
  styleUrl: 'vbi-chart-toolbar.css',
  shadow: true,
})
export class VbiChartToolbar {
  @Element() el!: HTMLElement

  @State() store?: ChartStore

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  private get chartConfig() {
    return this.store?.chartConfig
  }

  private handleLimitChange = (e: CustomEvent<string>) => {
    this.chartConfig?.setLimit(+e.detail)
  }

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
            <vbi-input
              size='sm'
              type='number'
              min={1}
              step={50}
              value={this.chartConfig?.state.limit}
              onVbiChange={this.handleLimitChange}
            ></vbi-input>
          </div>
        </div>
      </Host>
    )
  }
}
