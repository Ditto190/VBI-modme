import Sortable from 'sortablejs'
import { type ChartBuilderStore } from 'src/store/chart/builder'
import { type ChartDimensionsStore } from 'src/store/chart/dimensions'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { getDefaultDimensionDateAggregate } from '../../utils/dimensionDateAggregateUtils'
import { reorderYArrayByInsertIndex } from '../../utils/reorderUtils'

export interface DimensionSortableDeps {
  chartBuilder: ChartBuilderStore | undefined
  chartDimensions: ChartDimensionsStore | undefined
}

export function initDimensionSortable(container: HTMLElement, deps: DimensionSortableDeps): Sortable {
  return new Sortable(container, {
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

          const builder = deps.chartBuilder?.builder
          if (!builder) return

          const dimensions = deps.chartDimensions?.state.dimensions || []
          const originalLength = dimensions.length
          const newIndex = evt.newIndex ?? originalLength

          deps.chartDimensions?.addDimension(field.name, (node) => {
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

      const builder = deps.chartBuilder?.builder
      if (!builder) return

      const yDimensions = builder.dsl.get('dimensions') as any
      if (!yDimensions) {
        return
      }

      builder.doc.transact(() => {
        reorderYArrayByInsertIndex({
          yArray: yDimensions,
          dragIndex: oldIndex,
          insertIndex: oldIndex < newIndex ? newIndex + 1 : newIndex,
        })
      })
    },
  })
}
