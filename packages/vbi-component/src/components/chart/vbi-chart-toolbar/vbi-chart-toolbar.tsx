import { Component, Element, Host, State, h } from '@stencil/core'
import { connectChartStore } from 'src/store/context'
import { type ChartStore } from 'src/store/chart'
import { createVBIUndoManager } from 'src/utils/chart/undo-manager'

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
    const builder = this.store?.chartBuilder.builder

    const { canUndo, canRedo, undo, redo } = createVBIUndoManager(builder)
    console.log(canRedo, canUndo, undo, redo)
    if (this.store) {
      console.log(this.store.chartConfig.state.theme)
    }
    console.log('theme', builder?.theme.getTheme())
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
            <input type='text' />
          </div>
        </div>
      </Host>
    )
  }
}
