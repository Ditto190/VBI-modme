import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import type Sortable from 'sortablejs'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import { getHavingDisplayText, initHavingSortable, toHavingDslOperator } from './helpers'

@Component({
  tag: 'vbi-chart-having',
  styleUrl: 'vbi-chart-having.css',
  shadow: true,
})
export class VbiChartHaving {
  @Element() el!: HTMLElement

  @State() store?: ChartStore

  private containerRef?: HTMLDivElement
  private sortable?: Sortable

  private get t() {
    return this.store?.translation.state.t || ((key: string) => key)
  }

  private get chartBuilder() {
    return this.store?.chartBuilder
  }

  private get chartHavingFilter() {
    return this.store?.chartHavingFilter
  }

  private get chartSchemaFields() {
    return this.store?.chartSchemaFields
  }

  private get filters() {
    return this.chartHavingFilter?.state.filters ? this.chartHavingFilter.flattenFilters() : []
  }

  private get fieldTypeMap() {
    return this.chartSchemaFields?.state.fieldTypeMap || {}
  }

  private get fieldRoleMap() {
    return this.chartSchemaFields?.state.fieldRoleMap || {}
  }

  connectedCallback() {
    this.store = connectChartStore(this.el)
  }

  disconnectedCallback() {
    this.sortable?.destroy()
  }

  componentDidRender() {
    if (this.containerRef && !this.sortable) {
      this.sortable = initHavingSortable(this.containerRef, {
        chartBuilder: this.chartBuilder,
        chartHavingFilter: this.chartHavingFilter,
      })
    }
  }

  render() {
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='having'>
          {this.filters.length === 0 ? (
            <span class='having__placeholder'>{this.t('shelvesPlaceholdersFilters')}</span>
          ) : (
            this.filters.map((item) => {
              const role =
                (this.fieldRoleMap && (this.fieldRoleMap[item.field] as any)) ||
                (this.fieldTypeMap[item.field] === 'number' ? 'measure' : 'dimension')
              const displayText = getHavingDisplayText(item, (k, params) => this.t(k, params), role)

              return (
                <vbi-dropdown key={item.id} trigger='click' placement='bottom' class='having__drag' data-id={item.id}>
                  <vbi-button slot='trigger' size='sm' class='having__item'>
                    <vbi-icon icon={DownOutlined} size='10' class='having__item-down' />
                    <span class='having__item-text'>{displayText}</span>
                    <vbi-icon
                      icon={CloseOutlined}
                      size='10'
                      class='having__item-close'
                      onClick={(e) => {
                        e.stopPropagation()
                        if (item.id) {
                          this.chartHavingFilter?.removeFilter(item.id)
                        }
                      }}
                    />
                  </vbi-button>

                  <div slot='content'>
                    <vbi-chart-having-filter
                      item={item}
                      fieldTypeMap={this.fieldTypeMap}
                      fieldRoleMap={this.fieldRoleMap}
                      onVbiChartHavingFilterSave={(e: CustomEvent<any>) => {
                        const updatedItem = e.detail?.item
                        if (item.id && updatedItem) {
                          this.chartHavingFilter?.updateFilter(item.id, {
                            aggregate: updatedItem.aggregate,
                            operator: updatedItem.operator ? toHavingDslOperator(updatedItem.operator) : undefined,
                            value: updatedItem.value,
                          })
                        }
                        const dropdown = (e.target as HTMLElement)?.closest('vbi-dropdown')
                        if (dropdown) {
                          ;(dropdown as any).open = false
                        }
                      }}
                      onVbiChartHavingFilterCancel={(e: CustomEvent<any>) => {
                        const dropdown = (e.target as HTMLElement)?.closest('vbi-dropdown')
                        if (dropdown) {
                          ;(dropdown as any).open = false
                        }
                      }}
                    />
                  </div>
                </vbi-dropdown>
              )
            })
          )}
        </div>
      </Host>
    )
  }
}
