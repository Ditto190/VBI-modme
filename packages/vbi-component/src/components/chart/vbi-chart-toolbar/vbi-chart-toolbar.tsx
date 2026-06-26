import { Component, Element, Host, State, h } from '@stencil/core'
import { connectVBIStore, type VBIStoreApi } from 'src/store/vbi-store'
import { createVBIBuilder } from 'src/utils/chart/builder'
import { createVBIUndoManager } from 'src/utils/chart/undo-manager'

@Component({
  tag: 'vbi-chart-toolbar',
  styleUrl: 'vbi-chart-toolbar.css',
  shadow: true,
})
export class VbiChartToolbar {
  @Element() el!: HTMLElement

  @State() store?: VBIStoreApi

  componentWillLoad() {
    this.store = connectVBIStore(this.el)
    const builder = this.store?.state.builder

    const { canUndo, canRedo, undo, redo } = createVBIUndoManager(builder)
    const { theme } = createVBIBuilder(builder)

    console.log(canRedo, canUndo, undo, redo)
    console.log('theme', theme)
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
