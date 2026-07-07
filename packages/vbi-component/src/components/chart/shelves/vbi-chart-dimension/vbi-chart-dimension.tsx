import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import Sortable from 'sortablejs'
import { type ChartStore } from 'src/store/chart'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { connectChartStore } from 'src/store/context'
import {
  formatDimensionDateAggregate,
  getDefaultDimensionDateAggregate,
  normalizeDimensionDateAggregate,
} from '../utils/dimensionDateAggregateUtils'
import { reorderYArrayByInsertIndex } from '../utils/reorderUtils'
import { formatSortDisplaySuffix } from '../utils/sortUtils'

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

  private get chartSchemaFields() {
    return this.store?.chartSchemaFields
  }

  private get dimensions() {
    return this.chartDimensions?.state.dimensions || []
  }

  private get fieldTypeMap() {
    return this.chartSchemaFields?.state.fieldTypeMap || {}
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

  private getDimensionDisplayLabel = (dimension: (typeof this.dimensions)[number]) => {
    const baseLabel = dimension.alias || dimension.field
    const aggregate = formatDimensionDateAggregate(
      normalizeDimensionDateAggregate(dimension.aggregate, this.fieldTypeMap[dimension.field]),
      this.t,
    )

    if (!aggregate) {
      return `${baseLabel}${formatSortDisplaySuffix(dimension.sort)}`
    }

    return `${aggregate}(${baseLabel})${formatSortDisplaySuffix(dimension.sort)}`
  }

  render() {
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='dimension'>
          {this.dimensions.length === 0 ? (
            <div class='dimension__placeholder'>{this.t('shelvesPlaceholdersDimensions')}</div>
          ) : (
            this.dimensions.map((dim) => (
              <vbi-button size='sm' class='dimension__item'>
                <vbi-icon icon={DownOutlined} size='10' class='dimension__item-down' />
                {this.getDimensionDisplayLabel(dim)}
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
