import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'vbi-chart-editor',
  styleUrl: 'vbi-chart-editor.css',
  shadow: true,
})
export class VbiChartEditor {
  render() {
    return (
      <Host>
        <div class='chart-editor'>
          <header class='chart-editor__toolbar'>Toolbar</header>

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
