import { type VBIMeasureFormat } from '@visactor/vbi'
import { type Translate } from 'src/i18n'
import { type ChartMeasuresStore, type VBIMeasure as VBIMeasureStore } from 'src/store/chart/measures'
import { formatMeasureAggregate, type MeasureAggregate } from '../../utils/measureAggregateUtils'
import { formatSortDisplaySuffix } from '../../utils/sortUtils'

export function getMeasureDisplayLabel(measure: VBIMeasureStore, t: Translate): string {
  const baseLabel = measure.alias || measure.field
  const aggregate = formatMeasureAggregate(measure.aggregate as MeasureAggregate | undefined, t)

  if (!aggregate) {
    return `${baseLabel}${formatSortDisplaySuffix(measure.sort)}`
  }

  return `${aggregate}(${baseLabel})${formatSortDisplaySuffix(measure.sort)}`
}

export function renameMeasure(chartMeasures: ChartMeasuresStore | undefined, id: string, alias: string): void {
  chartMeasures?.updateMeasure(id, (node) => {
    node.setAlias(alias)
  })
}

export function changeAggregate(
  chartMeasures: ChartMeasuresStore | undefined,
  id: string,
  aggregate: MeasureAggregate,
): void {
  chartMeasures?.updateMeasure(id, (node) => {
    node.setAggregate(aggregate)
  })
}

export function changeFormat(
  chartMeasures: ChartMeasuresStore | undefined,
  id: string,
  format: VBIMeasureFormat | undefined,
): void {
  chartMeasures?.updateMeasure(id, (node) => {
    if (format === undefined) {
      node.clearFormat()
    } else {
      node.setFormat(format)
    }
  })
}

export function changeEncoding(
  chartMeasures: ChartMeasuresStore | undefined,
  id: string,
  encoding: NonNullable<VBIMeasureStore['encoding']>,
): void {
  chartMeasures?.updateMeasure(id, (node) => {
    node.setEncoding(encoding)
  })
}

export function changeSort(
  chartMeasures: ChartMeasuresStore | undefined,
  id: string,
  sort: VBIMeasureStore['sort'] | undefined,
): void {
  chartMeasures?.updateMeasure(id, (node) => {
    if (sort) {
      node.setSort(sort)
      return
    }
    node.clearSort()
  })
}
