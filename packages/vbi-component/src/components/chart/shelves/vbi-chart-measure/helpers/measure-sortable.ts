import Sortable from 'sortablejs'
import { type ChartBuilderStore } from 'src/store/chart/builder'
import { type ChartMeasuresStore } from 'src/store/chart/measures'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { getDefaultAggregateByFieldRole, getMeasureFieldRoleBySchemaType } from '../../utils/measureAggregateUtils'
import { reorderYArrayByInsertIndex } from '../../utils/reorderUtils'

export interface MeasureSortableDeps {
  chartBuilder: ChartBuilderStore | undefined
  chartMeasures: ChartMeasuresStore | undefined
}

export function initMeasureSortable(container: HTMLElement, deps: MeasureSortableDeps): Sortable {
  return new Sortable(container, {
    group: { name: 'fields', put: true, pull: false },
    animation: 150,
    draggable: '.measure__drag',
    onAdd: (evt) => {
      const itemEl = evt.item
      const fieldData = itemEl.getAttribute('data-field')

      if (fieldData) {
        try {
          const field = JSON.parse(fieldData) as VBISchemaField
          itemEl.remove()

          const builder = deps.chartBuilder?.builder
          if (!builder) return

          const measures = deps.chartMeasures?.state.measures || []
          const originalLength = measures.length
          const newIndex = evt.newIndex ?? originalLength

          const fieldRole = getMeasureFieldRoleBySchemaType(field.type)
          const aggregate = getDefaultAggregateByFieldRole(fieldRole)

          deps.chartMeasures?.addMeasure(field.name, (node) => {
            node.setAggregate(aggregate)
          })

          if (newIndex < originalLength) {
            const yMeasures = builder.dsl.get('measures') as any
            if (!yMeasures) {
              return
            }

            builder.doc.transact(() => {
              reorderYArrayByInsertIndex({
                yArray: yMeasures,
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

      const builder = deps.chartBuilder?.builder
      if (!builder) return

      const yMeasures = builder.dsl.get('measures') as any
      if (!yMeasures) {
        return
      }

      builder.doc.transact(() => {
        reorderYArrayByInsertIndex({
          yArray: yMeasures,
          dragIndex: oldIndex,
          insertIndex: oldIndex < newIndex ? newIndex + 1 : newIndex,
        })
      })
    },
  })
}
