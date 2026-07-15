import { CloudUploadOutlined, InfoCircleOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import { VBI_DEFAULT_LIMIT } from 'src/constants/builder'
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
  @State() openImportModal: boolean = false

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  private get chartConfig() {
    return this.store?.chartConfig
  }

  private get chartUndo() {
    return this.store?.chartUndo
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private handleLimitChange = (e: CustomEvent<string>) => {
    this.chartConfig?.setLimit(+e.detail)
  }

  render() {
    return (
      <Host>
        <div class='toolbar'>
          <div class='toolbar-group'>
            <vbi-chart-type />

            <vbi-tooltip text={this.t('toolbarImportCSV')}>
              <vbi-button size='sm' onClick={() => (this.openImportModal = true)}>
                <vbi-icon icon={CloudUploadOutlined} size={16} />
              </vbi-button>
            </vbi-tooltip>

            <vbi-join>
              <vbi-tooltip text={this.t('toolbarHistoryUndo')}>
                <vbi-button size='sm' disabled={!this.chartUndo?.state.canUndo} onClick={() => this.chartUndo?.undo()}>
                  <vbi-icon icon={UndoOutlined} size={16} />
                </vbi-button>
              </vbi-tooltip>
              <vbi-tooltip text={this.t('toolbarHistoryRedo')}>
                <vbi-button size='sm' disabled={!this.chartUndo?.state.canRedo} onClick={() => this.chartUndo?.redo()}>
                  <vbi-icon icon={RedoOutlined} size={16} />
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
              placeholder={this.t('toolbarLimitPlaceholder', {
                defaultLimit: VBI_DEFAULT_LIMIT,
              })}
              value={this.chartConfig?.state.limit}
              onVbiInputChange={this.handleLimitChange}
            />
            <vbi-tooltip
              text={this.t('toolbarLimitTooltip', {
                defaultLimit: VBI_DEFAULT_LIMIT,
              })}
              position='left'
            >
              <vbi-icon icon={InfoCircleOutlined} size={16} style={{ color: 'var(--color-base-content)' }} />
            </vbi-tooltip>
          </div>
        </div>

        <vbi-modal
          open={this.openImportModal}
          onVbiModalToggle={(e: CustomEvent<boolean>) => {
            this.openImportModal = e.detail
          }}
        >
          <vbi-chart-upload onVbiChartUploadSuccess={() => (this.openImportModal = false)} />
        </vbi-modal>
      </Host>
    )
  }
}
