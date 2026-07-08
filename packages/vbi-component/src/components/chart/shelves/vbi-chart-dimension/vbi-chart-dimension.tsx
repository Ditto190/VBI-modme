import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import { type VBIDimension } from '@visactor/vbi'
import Sortable from 'sortablejs'
import { type ChartStore } from 'src/store/chart'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { connectChartStore } from 'src/store/context'
import { type CascadingMenuItem } from '../../../ui/vbi-cascading-menu/vbi-cascading-menu'
import {
  formatDimensionDateAggregate,
  getDefaultDimensionDateAggregate,
  getDimensionDateAggregateItems,
  isDateDimensionField,
  normalizeDimensionDateAggregate,
} from '../utils/dimensionDateAggregateUtils'
import { buildShelfMenuLabel } from '../utils/menuItemUtils'
import { reorderYArrayByInsertIndex } from '../utils/reorderUtils'
import { formatSortDisplaySuffix, formatSortMenuSummary } from '../utils/sortUtils'

const DIMENSION_ENCODING_LABEL_KEY_MAP: Record<NonNullable<VBIDimension['encoding']>, string> = {
  xAxis: 'shelvesDimensionEncodingXAxis',
  yAxis: 'shelvesDimensionEncodingYAxis',
  angle: 'shelvesDimensionEncodingAngle',
  color: 'shelvesDimensionEncodingColor',
  detail: 'shelvesDimensionEncodingDetail',
  source: 'shelvesDimensionEncodingSource',
  target: 'shelvesDimensionEncodingTarget',
  tooltip: 'shelvesDimensionEncodingTooltip',
  label: 'shelvesDimensionEncodingLabel',
  row: 'shelvesDimensionEncodingRow',
  column: 'shelvesDimensionEncodingColumn',
  player: 'shelvesDimensionEncodingPlayer',
  hierarchy: 'shelvesDimensionEncodingHierarchy',
}

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

  componentDidRender() {
    this.initSortable()
  }

  disconnectedCallback() {
    this.sortable?.destroy()
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

  private initSortable() {
    if (this.containerRef && !this.sortable) {
      this.sortable = new Sortable(this.containerRef, {
        group: { name: 'fields', put: true, pull: false },
        animation: 150,
        draggable: '.dimension__drag',
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
        onEnd: (evt) => {
          const { oldIndex, newIndex, item, to } = evt
          if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) return

          // Revert SortableJS DOM mutation so Stencil's Virtual DOM can handle the re-render correctly
          const children = Array.from(to.children)
          const sibling = oldIndex < newIndex ? children[oldIndex] : children[oldIndex + 1]
          to.insertBefore(item, sibling || null)

          if (!this.store) return
          const builder = this.store.chartBuilder.builder
          if (!builder) return

          const yDimensions = builder.dsl.get('dimensions') as any
          if (!yDimensions) {
            return
          }

          builder.doc.transact(() => {
            reorderYArrayByInsertIndex({
              yArray: yDimensions,
              dragIndex: oldIndex,
              insertIndex: newIndex,
            })
          })
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

  private changeAggregate(id: string, aggregate: NonNullable<VBIDimension['aggregate']> | undefined) {
    if (!aggregate) {
      const dimensionNode = this.chartDimensions?.findDimension(id) as { clearAggregate?: () => unknown } | undefined

      if (typeof dimensionNode?.clearAggregate === 'function') {
        this.store?.chartBuilder.builder?.doc.transact(() => {
          dimensionNode.clearAggregate?.()
        })
        return
      }

      const targetIndex = this.dimensions.findIndex((dimension) => dimension.id === id)
      const yDimensions = this.store?.chartBuilder.builder?.dsl.get('dimensions') as any
      const yDimension = yDimensions?.get(targetIndex)
      if (!yDimension) {
        return
      }

      this.store?.chartBuilder.builder?.doc.transact(() => {
        yDimension.delete('aggregate')
      })
      return
    }

    this.chartDimensions?.updateDimension(id, (node) => {
      node.setAggregate(aggregate)
    })
  }

  private changeEncoding(id: string, encoding: NonNullable<VBIDimension['encoding']>) {
    this.chartDimensions?.updateDimension(id, (node) => {
      node.setEncoding(encoding)
    })
  }

  private changeSort(id: string, sort: VBIDimension['sort'] | undefined) {
    this.chartDimensions?.updateDimension(id, (node) => {
      if (sort) {
        node.setSort(sort)
        return
      }
      node.clearSort()
    })
  }

  private handleMenuClick = (dimension: (typeof this.dimensions)[number], key: string) => {
    if (key.startsWith('aggregate:')) {
      const aggregateKey = key.replace('aggregate:', '')

      if (aggregateKey === 'none') {
        this.changeAggregate(dimension.id, undefined)
        return
      }

      const nextAggregate = getDimensionDateAggregateItems(this.t).find((item) => item.key === aggregateKey)?.aggregate

      if (nextAggregate) {
        this.changeAggregate(dimension.id, nextAggregate)
      }
      return
    }

    if (key.startsWith('sort:')) {
      const nextSort = key.replace('sort:', '') as 'asc' | 'desc' | 'clear'

      if (nextSort === 'clear') {
        this.changeSort(dimension.id, undefined)
        return
      }

      if (nextSort === 'asc' || nextSort === 'desc') {
        this.changeSort(dimension.id, { order: nextSort })
      }
      return
    }

    if (key.startsWith('encoding:')) {
      const nextEncoding = key.replace('encoding:', '') as NonNullable<VBIDimension['encoding']>
      this.changeEncoding(dimension.id, nextEncoding)
      return
    }

    if (key === 'rename') {
      console.warn('Rename not implemented yet in Stencil component')
      return
    }

    if (key === 'delete') {
      this.chartDimensions?.removeDimension(dimension.id)
    }
  }

  private buildMenuItems = (dimension: (typeof this.dimensions)[number]): CascadingMenuItem[] => {
    const items: CascadingMenuItem[] = []

    if (!this.store || !this.store.chartBuilder.builder) return []
    const builder = this.store.chartBuilder.builder

    const supportedEncodings = builder.chartType.getSupportedDimensionEncodings()
    const dimensionIndex = this.dimensions.findIndex((item) => item.id === dimension.id)
    const recommendedEncoding =
      dimensionIndex >= 0
        ? builder.chartType.getRecommendedDimensionEncodings(this.dimensions.length)[dimensionIndex]
        : undefined

    if (isDateDimensionField(this.fieldTypeMap[dimension.field])) {
      items.push({
        id: 'aggregate',
        label: this.t('shelvesMenuDateAggregate'),
        children: [
          ...getDimensionDateAggregateItems(this.t).map((item) => ({
            id: `aggregate:${item.key}`,
            label: item.shortLabel,
            value: `aggregate:${item.key}`,
          })),
          {
            id: 'aggregate:none',
            label: this.t('shelvesMenuRawValue'),
            value: 'aggregate:none',
          },
        ],
      })
    }

    items.push({
      id: 'encoding',
      label: this.t('shelvesMenuEncoding'),
      children: supportedEncodings.map((encoding) => {
        const recommendedSuffix = recommendedEncoding === encoding ? this.t('commonStatusRecommended') : ''

        return {
          id: `encoding:${encoding}`,
          label: buildShelfMenuLabel(this.t(DIMENSION_ENCODING_LABEL_KEY_MAP[encoding]), recommendedSuffix),
          value: `encoding:${encoding}`,
        }
      }),
    })

    items.push({
      id: 'sort',
      label: buildShelfMenuLabel(this.t('shelvesMenuSort'), formatSortMenuSummary(dimension.sort, this.t)),
      children: [
        {
          id: 'sort:asc',
          label: this.t('shelvesSortAsc'),
          value: 'sort:asc',
        },
        {
          id: 'sort:desc',
          label: this.t('shelvesSortDesc'),
          value: 'sort:desc',
        },
        {
          id: 'sort:clear',
          label: this.t('shelvesSortClear'),
          value: 'sort:clear',
        },
      ],
    })

    items.push(
      {
        id: 'rename',
        label: this.t('shelvesMenuRename'),
        value: 'rename',
      },
      {
        id: 'delete_divider',
        slot: 'delete_divider',
        disabled: true,
      },
      {
        id: 'delete',
        label: this.t('shelvesMenuDelete'),
        value: 'delete',
        slot: 'delete_label',
      },
    )

    return items
  }

  render() {
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='dimension'>
          {this.dimensions.length === 0 ? (
            <div class='dimension__placeholder'>{this.t('shelvesPlaceholdersDimensions')}</div>
          ) : (
            this.dimensions.map((dim) => (
              <vbi-dropdown key={dim.id} trigger='click' placement='bottom' class='dimension__drag'>
                <vbi-button slot='trigger' size='sm' class='dimension__item'>
                  <vbi-icon icon={DownOutlined} size='10' class='dimension__item-down' />
                  {this.getDimensionDisplayLabel(dim)}
                  <vbi-icon
                    icon={CloseOutlined}
                    size='10'
                    class='dimension__item-close'
                    onClick={(e) => {
                      e.stopPropagation()
                      this.chartDimensions?.removeDimension(dim.id)
                    }}
                  />
                </vbi-button>
                <vbi-cascading-menu
                  slot='content'
                  items={this.buildMenuItems(dim)}
                  onVbiCascadingMenuSelect={(e: CustomEvent<CascadingMenuItem>) => {
                    this.handleMenuClick(dim, e.detail.value || String(e.detail.id))
                  }}
                >
                  <div slot='delete_divider' class='dimension__delete-divider'></div>
                  <span slot='delete_label' class='dimension__delete-label'>
                    {this.t('shelvesMenuDelete')}
                  </span>
                </vbi-cascading-menu>
              </vbi-dropdown>
            ))
          )}
        </div>
      </Host>
    )
  }
}
