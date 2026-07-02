import { Component, Host, State, h, Element } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'

@Component({
  tag: 'vbi-chart-type',
  styleUrl: 'vbi-chart-type.css',
  shadow: true,
})
export class VbiChartType {
  @Element() el!: HTMLElement

  @State() store?: ChartStore

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  render() {
    return (
      <Host>
        <vbi-dropdown>
          <vbi-button slot='trigger' size='sm'>
            {this.t('toolbarChartTypePanelTitle')}
          </vbi-button>
          <div
            slot='content'
            style={{
              padding: '8px',
              border: '1px solid var(--color-base-300, #ccc)',
              borderRadius: 'var(--radius-box, 4px)',
              background: 'var(--color-base-100, #fff)',
              color: 'var(--color-base-content, #000)',
            }}
          >
            Dropdown Content
          </div>
        </vbi-dropdown>
      </Host>
    )
  }
}
