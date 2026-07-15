import Sortable from 'sortablejs'
import { type ChartBuilderStore } from 'src/store/chart/builder'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { type ChartWhereFilterStore } from 'src/store/chart/where-filter'
import { reorderYArrayByInsertIndex, type YArrayLike } from '../../utils/reorderUtils'
import { getDefaultDatePredicate } from './date-filter-utils'

export interface WhereSortableDeps {
  chartBuilder: ChartBuilderStore | undefined
  chartWhereFilter: ChartWhereFilterStore | undefined
}

export function initWhereSortable(container: HTMLElement, deps: WhereSortableDeps): Sortable {
  return new Sortable(container, {
    group: { name: 'fields', put: true, pull: false },
    animation: 150,
    draggable: '.where__drag',
    onAdd: (evt) => {
      const itemEl = evt.item
      const fieldData = itemEl.getAttribute('data-field')

      if (fieldData) {
        try {
          const field = JSON.parse(fieldData) as VBISchemaField
          itemEl.remove()

          const builder = deps.chartBuilder?.builder
          if (!builder) return

          const filters = deps.chartWhereFilter?.flattenFilters() || []
          const originalLength = filters.length
          const newIndex = evt.newIndex ?? originalLength

          const isDate = Boolean(field.isDate)
          deps.chartWhereFilter?.addFilter(
            field.name,
            isDate ? 'date' : '=',
            isDate ? getDefaultDatePredicate() : undefined,
          )

          if (newIndex < originalLength) {
            const whereRoot = builder.dsl.get('whereFilter') as { get: (key: string) => unknown } | undefined
            const conditions = whereRoot?.get('conditions') as YArrayLike | undefined
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
          console.error('Error parsing where field data:', e)
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

      const whereRoot = builder.dsl.get('whereFilter') as { get: (key: string) => unknown } | undefined
      const conditions = whereRoot?.get('conditions') as YArrayLike | undefined
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
