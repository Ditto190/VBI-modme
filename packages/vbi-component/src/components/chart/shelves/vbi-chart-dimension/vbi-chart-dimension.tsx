import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import Sortable from 'sortablejs'
import { type ChartStore } from 'src/store/chart'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { connectChartStore } from 'src/store/context'
import { getDefaultDimensionDateAggregate } from '../utils/dimensionDateAggregateUtils'
import { reorderYArrayByInsertIndex } from '../utils/reorderUtils'

@Component({
  tag: 'vbi-chart-dimension',
  styleUrl: 'vbi-chart-dimension.css',
  shadow: true,
})
export class VbiChartDimension {
  @Element() el!: HTMLElement

  @State() store?: ChartStore

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private get chartDimensions() {
    return this.store?.chartDimensions
  }

  private containerRef?: HTMLDivElement
  private sortable?: Sortable

  componentDidRender() {
    this.initSortable()
  }

  disconnectedCallback() {
    this.sortable?.destroy()
  }

  private initSortable() {
    if (this.containerRef && !this.sortable) {
      this.sortable = new Sortable(this.containerRef, {
        group: { name: 'fields', put: true, pull: false },
        animation: 150,
        draggable: '.dimension__item',
        onAdd: (evt) => {
          const itemEl = evt.item
          const fieldData = itemEl.getAttribute('data-field')

          if (fieldData) {
            try {
              const field = JSON.parse(fieldData) as VBISchemaField
              itemEl.remove()

              if (!this.store) return

              const builder = this.store.chartBuilder.builder
              if (!builder) return

              const dimensions = this.chartDimensions?.state.dimensions || []
              const originalLength = dimensions.length
              const newIndex = evt.newIndex ?? originalLength

              this.store.chartDimensions.addDimension(field.name, (node) => {
                if (field.isDate) {
                  node.setAggregate(getDefaultDimensionDateAggregate())
                }
              })

              if (newIndex < originalLength) {
                const yDimensions = builder.dsl.get('dimensions') as any
                if (!yDimensions) {
                  return
                }

                builder.doc.transact(() => {
                  reorderYArrayByInsertIndex({
                    yArray: yDimensions,
                    dragIndex: originalLength,
                    insertIndex: newIndex,
                  })
                })
              }
            } catch (e) {
              console.error('Error parsing field data:', e)
            }
          }
        },
      })
    }
  }

  render() {
    const dimensions = this.chartDimensions?.state.dimensions || []
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='dimension'>
          {dimensions.length === 0 ? (
            <div class='dimension__placeholder'>{this.t('shelvesPlaceholdersDimensions')}</div>
          ) : (
            dimensions.map((dim) => (
              <vbi-button size='sm' class='dimension__item'>
                <vbi-icon icon={DownOutlined} size='10' class='dimension__item-down' />
                {dim.alias || dim.field}
                <vbi-icon
                  icon={CloseOutlined}
                  size='10'
                  class='dimension__item-close'
                  onClick={() => this.chartDimensions?.removeDimension(dim.id)}
                />
              </vbi-button>
            ))
          )}
        </div>
      </Host>
    )
  }
}
