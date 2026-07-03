import { Component, Host, State, h, Element } from '@stencil/core'
import { type MenuItem } from 'src/components'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import { CHART_TYPE, findChartTypeByValue } from './config/chart-type'

@Component({
  tag: 'vbi-chart-type',
  styleUrl: 'vbi-chart-type.css',
  shadow: true,
})
export class VbiChartType {
  @Element() el!: HTMLElement

  @State() store?: ChartStore
  @State() isDropdownOpen: boolean = false

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private get currentChartType() {
    return this.store?.chartType.state.chartType
  }

  private translateItems = (items: MenuItem[]): MenuItem[] => {
    return items.map((item) => ({
      ...item,
      label: item.label ? this.t(item.label) : undefined,
      description: item.description ? this.t(item.description) : undefined,
      isActive: !!item.value && item.value === this.currentChartType,
      children: item.children ? this.translateItems(item.children) : undefined,
    }))
  }

  private handleMenuSelect = (e: CustomEvent<MenuItem>) => {
    if (e.detail.value) {
      this.store?.chartType.changeChartType(e.detail.value)
      this.isDropdownOpen = false
    }
  }

  private handleDropdownToggle = (e: CustomEvent<boolean>) => {
    this.isDropdownOpen = e.detail
  }

  private get activeChartTypeLabel() {
    const foundItem = findChartTypeByValue(this.currentChartType)
    return this.t(foundItem?.label || 'toolbarChartTypePanelTitle')
  }

  render() {
    return (
      <Host>
        <vbi-dropdown open={this.isDropdownOpen} onVbiDropdownToggle={this.handleDropdownToggle}>
          <vbi-button slot='trigger' size='sm' shape='wide' style={{ minWidth: '140px' }}>
            {this.activeChartTypeLabel}
          </vbi-button>
          <div slot='content' class='dropdown-content'>
            <vbi-menu items={this.translateItems(CHART_TYPE)} onVbiMenuSelect={this.handleMenuSelect}></vbi-menu>
          </div>
        </vbi-dropdown>
      </Host>
    )
  }
}
