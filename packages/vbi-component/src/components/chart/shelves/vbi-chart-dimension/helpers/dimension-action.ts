import { type Translate } from 'src/i18n'
import { type ChartStore } from 'src/store/chart'
import { type ChartDimensionsStore, type VBIDimension as VBIDimensionStore } from 'src/store/chart/dimensions'
import { formatDimensionDateAggregate, normalizeDimensionDateAggregate } from '../../utils/dimensionDateAggregateUtils'
import { formatSortDisplaySuffix } from '../../utils/sortUtils'

type FieldTypeMap = Record<string, string>

export function getDimensionDisplayLabel(
  dimension: VBIDimensionStore,
  fieldTypeMap: FieldTypeMap,
  t: Translate,
): string {
  const baseLabel = dimension.alias || dimension.field
  const aggregate = formatDimensionDateAggregate(
    normalizeDimensionDateAggregate(dimension.aggregate, fieldTypeMap[dimension.field]),
    t,
  )

  if (!aggregate) {
    return `${baseLabel}${formatSortDisplaySuffix(dimension.sort)}`
  }

  return `${aggregate}(${baseLabel})${formatSortDisplaySuffix(dimension.sort)}`
}

export function renameDimension(chartDimensions: ChartDimensionsStore | undefined, id: string, alias: string): void {
  chartDimensions?.updateDimension(id, (node) => {
    node.setAlias(alias)
  })
}

export function changeAggregate(
  store: ChartStore | undefined,
  chartDimensions: ChartDimensionsStore | undefined,
  dimensions: VBIDimensionStore[],
  id: string,
  aggregate: NonNullable<VBIDimensionStore['aggregate']> | undefined,
): void {
  if (!aggregate) {
    const dimensionNode = chartDimensions?.findDimension(id) as { clearAggregate?: () => unknown } | undefined

    if (typeof dimensionNode?.clearAggregate === 'function') {
      store?.chartBuilder.builder?.doc.transact(() => {
        dimensionNode.clearAggregate?.()
      })
      return
    }

    const targetIndex = dimensions.findIndex((dimension) => dimension.id === id)
    const yDimensions = store?.chartBuilder.builder?.dsl.get('dimensions') as any
    const yDimension = yDimensions?.get(targetIndex)
    if (!yDimension) {
      return
    }

    store?.chartBuilder.builder?.doc.transact(() => {
      yDimension.delete('aggregate')
    })
    return
  }

  chartDimensions?.updateDimension(id, (node) => {
    node.setAggregate(aggregate)
  })
}

export function changeEncoding(
  chartDimensions: ChartDimensionsStore | undefined,
  id: string,
  encoding: NonNullable<VBIDimensionStore['encoding']>,
): void {
  chartDimensions?.updateDimension(id, (node) => {
    node.setEncoding(encoding)
  })
}

export function changeSort(
  chartDimensions: ChartDimensionsStore | undefined,
  id: string,
  sort: VBIDimensionStore['sort'] | undefined,
): void {
  chartDimensions?.updateDimension(id, (node) => {
    if (sort) {
      node.setSort(sort)
      return
    }
    node.clearSort()
  })
}
