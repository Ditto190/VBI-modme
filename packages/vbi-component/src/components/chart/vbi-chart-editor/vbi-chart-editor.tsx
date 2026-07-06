import { Component, Element, Host, State, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'

@Component({
  tag: 'vbi-chart-editor',
  styleUrl: 'vbi-chart-editor.css',
  shadow: true,
})
export class VbiChartEditor {
  @Element() el!: HTMLElement

  @State() store?: ChartStore

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  render() {
    return (
      <Host>
        <div class='chart-editor'>
          <header class='chart-editor__toolbar'>
            <vbi-chart-toolbar></vbi-chart-toolbar>
          </header>

          <main class='chart-editor__main'>
            <aside class='chart-editor__fields'>
              <vbi-chart-fields></vbi-chart-fields>
            </aside>

            <section class='chart-editor__workspace'>
              <div class='chart-editor__shelf-panel'>
                <vbi-chart-shelf-panel />
              </div>
              <div class='chart-editor__chart'>Chart</div>
            </section>
          </main>
        </div>
      </Host>
    )
  }
}
