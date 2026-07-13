import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import type Sortable from 'sortablejs'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import { getWhereDisplayText, initWhereSortable } from './helpers'

@Component({
  tag: 'vbi-chart-where',
  styleUrl: 'vbi-chart-where.css',
  shadow: true,
})
export class VbiChartWhere {
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

  private get chartWhereFilter() {
    return this.store?.chartWhereFilter
  }

  private get chartSchemaFields() {
    return this.store?.chartSchemaFields
  }

  private get filters() {
    return this.chartWhereFilter?.state.filters ? this.chartWhereFilter.flattenFilters() : []
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
      this.sortable = initWhereSortable(this.containerRef, {
        chartBuilder: this.chartBuilder,
        chartWhereFilter: this.chartWhereFilter,
      })
    }
  }

  render() {
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='where vbi-scroll-bar'>
          {this.filters.length === 0 ? (
            <span class='where__placeholder'>{this.t('shelvesPlaceholdersFilters')}</span>
          ) : (
            this.filters.map((item) => {
              const displayText = getWhereDisplayText(item, (k, params) => this.t(k, params))

              return (
                <vbi-dropdown key={item.id} trigger='click' placement='bottom' class='where__drag' data-id={item.id}>
                  <vbi-button slot='trigger' size='sm' class='where__item'>
                    <vbi-icon icon={DownOutlined} size={10} class='where__item-down' />
                    <span class='where__item-text'>{displayText}</span>
                    <vbi-icon
                      icon={CloseOutlined}
                      size={10}
                      class='where__item-close'
                      onClick={(e) => {
                        e.stopPropagation()
                        if (item.id) {
                          this.chartWhereFilter?.removeFilter(item.id)
                        }
                      }}
                    />
                  </vbi-button>

                  <div slot='content'>
                    <vbi-chart-where-filter
                      item={item}
                      fieldTypeMap={this.fieldTypeMap}
                      fieldRoleMap={this.fieldRoleMap}
                      onVbiChartWhereFilterSave={(e: CustomEvent<any>) => {
                        const updatedItem = e.detail?.item
                        if (item.id && updatedItem) {
                          this.chartWhereFilter?.updateFilter(item.id, {
                            operator: updatedItem.operator,
                            value: updatedItem.value,
                          })
                        }
                        const dropdown = (e.target as HTMLElement)?.closest('vbi-dropdown')
                        if (dropdown) {
                          ;(dropdown as any).open = false
                        }
                      }}
                      onVbiChartWhereFilterCancel={(e: CustomEvent<any>) => {
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
