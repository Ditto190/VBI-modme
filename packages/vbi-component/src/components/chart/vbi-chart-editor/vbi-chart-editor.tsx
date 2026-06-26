import { Component, Host, h, Element, State } from '@stencil/core'
import { connectVBIStore, type VBIStoreApi } from 'src/store/vbi-store'

@Component({
  tag: 'vbi-chart-editor',
  styleUrl: 'vbi-chart-editor.css',
  shadow: true,
})
export class VbiChartEditor {
  @Element() el!: HTMLElement

  @State() store?: VBIStoreApi

  componentWillLoad() {
    this.store = connectVBIStore(this.el)
    console.log(this.store)
  }

  render() {
    return (
      <Host>
        <div class='chart-editor'>
          <header class='chart-editor__toolbar'>
            <vbi-chart-toolbar></vbi-chart-toolbar>
          </header>

          <main class='chart-editor__main'>
            <aside class='chart-editor__fields'>Fields</aside>

            <section class='chart-editor__workspace'>
              <nav class='chart-editor__tabs'>Tabs</nav>
              <article class='chart-editor__chart-area'>Chart</article>
            </section>
          </main>
        </div>
      </Host>
    )
  }
}
