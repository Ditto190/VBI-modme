import { Component, Element, Host, State, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { type FilterRootType } from 'src/store/chart/filter-root-operator'
import { connectChartStore } from 'src/store/context'

@Component({
  tag: 'vbi-chart-shelf-panel',
  styleUrl: 'vbi-chart-shelf-panel.css',
  shadow: true,
})
export class VbiChartShelfPanel {
  @Element() el!: HTMLElement

  @State() store?: ChartStore

  connectedCallback() {
    this.store = connectChartStore(this.el)
  }

  private get t() {
    return this.store?.translation.state.t || ((key: string, _params?: Record<string, string>) => key)
  }

  private get chartFilterRootOperator() {
    return this.store?.chartFilterRootOperator
  }

  private getRootOperator(type: FilterRootType) {
    if (!this.chartFilterRootOperator) return 'and'
    return type === 'where'
      ? this.chartFilterRootOperator.state.whereOperator
      : this.chartFilterRootOperator.state.havingOperator
  }

  private toggleRootOperator(type: FilterRootType) {
    const currentOp = this.getRootOperator(type)
    const nextOp = currentOp === 'and' ? 'or' : 'and'
    this.chartFilterRootOperator?.setOperator(type, nextOp)
  }

  private renderRootOperatorButton(type: FilterRootType) {
    const currentOp = this.getRootOperator(type)
    const nextOp = currentOp === 'and' ? 'or' : 'and'
    const tooltipText = this.t('shelvesRootOperatorTooltip', {
      current: currentOp.toUpperCase(),
      next: nextOp.toUpperCase(),
    })

    return (
      <vbi-tooltip text={tooltipText}>
        <vbi-button
          size='xs'
          variant='outline'
          color={type === 'where' ? 'warning' : 'error'}
          onClick={() => this.toggleRootOperator(type)}
        >
          {currentOp.toUpperCase()}
        </vbi-button>
      </vbi-tooltip>
    )
  }

  render() {
    return (
      <Host>
        <div class='chart-shelf__item'>
          <label class='chart-shelf__label'>{this.t('panelsShelvesDimensions')}</label>
          <vbi-chart-dimension class='chart-shelf__input' />
        </div>
        <div class='chart-shelf__item'>
          <label class='chart-shelf__label'>{this.t('panelsShelvesMeasures')}</label>
          <vbi-chart-measure class='chart-shelf__input' />
        </div>
        <div class='chart-shelf__item'>
          <label class='chart-shelf__label'>
            <span>{this.t('panelsShelvesWhere')}</span>
            {this.renderRootOperatorButton('where')}
          </label>
          <vbi-chart-where class='chart-shelf__input' />
        </div>
        <div class='chart-shelf__item'>
          <label class='chart-shelf__label'>
            <span>{this.t('panelsShelvesHaving')}</span>
            {this.renderRootOperatorButton('having')}
          </label>
          <vbi-chart-having class='chart-shelf__input' />
        </div>
      </Host>
    )
  }
}
