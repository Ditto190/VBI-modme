import Sortable from 'sortablejs'
import { type ChartBuilderStore } from 'src/store/chart/builder'
import { type ChartHavingFilterStore } from 'src/store/chart/having-filter'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { reorderYArrayByInsertIndex, type YArrayLike } from '../../utils/reorderUtils'
import {
  getDefaultHavingAggregateByFieldRole,
  getDefaultHavingOperator,
  isHavingNumericAggregate,
  toHavingDslOperator,
} from './having-utils'

export interface HavingSortableDeps {
  chartBuilder: ChartBuilderStore | undefined
  chartHavingFilter: ChartHavingFilterStore | undefined
}

export function initHavingSortable(container: HTMLElement, deps: HavingSortableDeps): Sortable {
  return new Sortable(container, {
    group: { name: 'fields', put: true, pull: false },
    animation: 150,
    draggable: '.having__drag',
    onAdd: (evt) => {
      const itemEl = evt.item
      const fieldData = itemEl.getAttribute('data-field')

      if (fieldData) {
        try {
          const field = JSON.parse(fieldData) as VBISchemaField
          itemEl.remove()

          const builder = deps.chartBuilder?.builder
          if (!builder) return

          const filters = deps.chartHavingFilter?.flattenFilters() || []
          const originalLength = filters.length
          const newIndex = evt.newIndex ?? originalLength

          const role = field.role || 'measure'
          const defaultAggregate = getDefaultHavingAggregateByFieldRole(role)
          const defaultOperator = getDefaultHavingOperator(isHavingNumericAggregate(role, defaultAggregate))

          deps.chartHavingFilter?.addFilter(
            field.name,
            defaultAggregate,
            toHavingDslOperator(defaultOperator),
            undefined,
          )

          if (newIndex < originalLength) {
            const havingRoot = builder.dsl.get('havingFilter') as { get: (key: string) => unknown } | undefined
            const conditions = havingRoot?.get('conditions') as YArrayLike | undefined
            if (!conditions) {
              return
            }

            builder.doc.transact(() => {
              reorderYArrayByInsertIndex({
                yArray: conditions,
                dragIndex: originalLength,
                insertIndex: newIndex,
              })
            })
          }
        } catch (e) {
          console.error('Error parsing having field data:', e)
        }
      }
    },
    onEnd: (evt) => {
      const { oldIndex, newIndex, item, to } = evt
      if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) return

      const children = Array.from(to.children)
      const sibling = oldIndex < newIndex ? children[oldIndex] : children[oldIndex + 1]
      to.insertBefore(item, sibling || null)

      const builder = deps.chartBuilder?.builder
      if (!builder) return

      const havingRoot = builder.dsl.get('havingFilter') as { get: (key: string) => unknown } | undefined
      const conditions = havingRoot?.get('conditions') as YArrayLike | undefined
      if (!conditions) {
        return
      }

      builder.doc.transact(() => {
        reorderYArrayByInsertIndex({
          yArray: conditions,
          dragIndex: oldIndex,
          insertIndex: oldIndex < newIndex ? newIndex + 1 : newIndex,
        })
      })
    },
  })
}
