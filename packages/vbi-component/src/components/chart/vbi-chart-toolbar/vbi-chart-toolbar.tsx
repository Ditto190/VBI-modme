import { CloudUploadOutlined, InfoCircleOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'

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
            <vbi-button size='sm'>ChartTypeSelector</vbi-button>

            <vbi-tooltip text='Upload'>
              <vbi-button size='sm'>
                <vbi-icon icon={CloudUploadOutlined} size='16px' />
              </vbi-button>
            </vbi-tooltip>

            <vbi-join>
              <vbi-tooltip text='Undo'>
                <vbi-button size='sm'>
                  <vbi-icon icon={UndoOutlined} size='16px' />
                </vbi-button>
              </vbi-tooltip>
              <vbi-tooltip text='Upload'>
                <vbi-button size='sm'>
                  <vbi-icon icon={RedoOutlined} size='16px' />
                </vbi-button>
              </vbi-tooltip>
            </vbi-join>
          </div>
          <div class='toolbar-group'>
            <vbi-input
              size='sm'
              type='number'
              min={1}
              step={50}
              value={this.chartConfig?.state.limit}
              onVbiChange={this.handleLimitChange}
            />
            <vbi-tooltip text='Limit'>
              <vbi-icon icon={InfoCircleOutlined} size='16px' />
            </vbi-tooltip>
          </div>
        </div>
      </Host>
    )
  }
}
