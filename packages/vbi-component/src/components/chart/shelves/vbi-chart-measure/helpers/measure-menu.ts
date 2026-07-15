import { type VBIChartBuilder, type VBIMeasureFormat } from '@visactor/vbi'
import { type CascadingMenuItem } from 'src/components/ui/vbi-cascading-menu/vbi-cascading-menu'
import { type Translate } from 'src/i18n'
import { type VBIMeasure as VBIMeasureStore } from 'src/store/chart/measures'
import {
  getAggregateItemsByFieldRole,
  getMeasureFieldRoleBySchemaType,
  isAggregateSupportedByFieldRole,
  type MeasureAggregate,
} from '../../utils/measureAggregateUtils'
import { buildShelfMenuLabel } from '../../utils/menuItemUtils'
import { formatSortMenuSummary } from '../../utils/sortUtils'

const QUANTILE_PERCENT_OPTIONS = [1, 5, 25, 50, 75, 90, 95, 99] as const

export const MEASURE_ENCODING_LABEL_KEY_MAP: Record<NonNullable<VBIMeasureStore['encoding']>, string> = {
  primaryYAxis: 'shelvesMeasureEncodingPrimaryYAxis',
  secondaryYAxis: 'shelvesMeasureEncodingSecondaryYAxis',
  xAxis: 'shelvesMeasureEncodingXAxis',
  yAxis: 'shelvesMeasureEncodingYAxis',
  angle: 'shelvesMeasureEncodingAngle',
  radius: 'shelvesMeasureEncodingRadius',
  size: 'shelvesMeasureEncodingSize',
  color: 'shelvesMeasureEncodingColor',
  detail: 'shelvesMeasureEncodingDetail',
  column: 'shelvesMeasureEncodingColumn',
  label: 'shelvesMeasureEncodingLabel',
  tooltip: 'shelvesMeasureEncodingTooltip',
  value: 'shelvesMeasureEncodingValue',
  q1: 'shelvesMeasureEncodingQ1',
  q3: 'shelvesMeasureEncodingQ3',
  min: 'shelvesMeasureEncodingMin',
  max: 'shelvesMeasureEncodingMax',
  median: 'shelvesMeasureEncodingMedian',
  outliers: 'shelvesMeasureEncodingOutliers',
  x0: 'shelvesMeasureEncodingX0',
  x1: 'shelvesMeasureEncodingX1',
}

export function buildMeasureMenuItems(
  measure: VBIMeasureStore,
  measures: VBIMeasureStore[],
  fieldTypeMap: Record<string, string>,
  chartBuilder: VBIChartBuilder | undefined,
  t: Translate,
): CascadingMenuItem[] {
  const items: CascadingMenuItem[] = []

  if (!chartBuilder) return []

  const supportedEncodings = chartBuilder.chartType.getSupportedMeasureEncodings()
  const measureIndex = measures.findIndex((item) => item.id === measure.id)
  const recommendedEncoding =
    measureIndex >= 0 ? chartBuilder.chartType.getRecommendedMeasureEncodings(measures.length)[measureIndex] : undefined

  const fieldType = fieldTypeMap[measure.field]
  const fieldRole = getMeasureFieldRoleBySchemaType(fieldType)
  const availableAggregates = getAggregateItemsByFieldRole(fieldRole, t)

  const aggregateMenuItems = availableAggregates.map((item) => {
    if (item.key !== 'quantile') {
      return {
        id: `aggregate:${item.key}`,
        label: item.shortLabel,
        value: `aggregate:${item.key}`,
        isActive:
          (measure.aggregate as MeasureAggregate)?.func === item.aggregate.func &&
          (measure.aggregate as MeasureAggregate)?.func !== 'quantile',
      }
    }

    return {
      id: 'aggregate:quantile',
      label: t('shelvesMenuQuantile'),
      children: QUANTILE_PERCENT_OPTIONS.map((percent) => ({
        id: `aggregate:quantile:${percent}`,
        label: `P${percent}`,
        value: `aggregate:quantile:${percent}`,
        isActive:
          (measure.aggregate as MeasureAggregate)?.func === 'quantile' &&
          (measure.aggregate as Extract<MeasureAggregate, { func: 'quantile' }>)?.quantile === percent / 100,
      })),
    }
  })

  items.push({
    id: 'aggregate',
    label: t('shelvesMenuAggregate'),
    children: aggregateMenuItems,
  })

  items.push({
    id: 'encoding',
    label: t('shelvesMenuEncoding'),
    children: supportedEncodings.map((encoding) => {
      const recommendedSuffix = recommendedEncoding === encoding ? t('commonStatusRecommended') : ''

      return {
        id: `encoding:${encoding}`,
        label: buildShelfMenuLabel(t(MEASURE_ENCODING_LABEL_KEY_MAP[encoding]), recommendedSuffix),
        value: `encoding:${encoding}`,
        isActive: measure.encoding === encoding,
      }
    }),
  })

  items.push({
    id: 'format',
    label: t('shelvesMenuFormat'),
    children: [
      {
        id: `format:panel:${measure.id}`,
        slot: 'measure_format',
      },
    ],
  })

  items.push({
    id: 'sort',
    label: buildShelfMenuLabel(t('shelvesMenuSort'), formatSortMenuSummary(measure.sort, t)),
    children: [
      {
        id: 'sort:asc',
        label: t('shelvesSortAsc'),
        value: 'sort:asc',
        isActive: measure.sort?.order === 'asc',
      },
      {
        id: 'sort:desc',
        label: t('shelvesSortDesc'),
        value: 'sort:desc',
        isActive: measure.sort?.order === 'desc',
      },
      {
        id: 'sort:clear',
        label: t('shelvesSortClear'),
        value: 'sort:clear',
      },
    ],
  })

  items.push(
    {
      id: 'rename',
      label: t('shelvesMenuRename'),
      value: 'rename',
    },
    {
      id: 'delete_divider',
      slot: 'delete_divider',
      disabled: true,
    },
    {
      id: 'delete',
      label: t('shelvesMenuDelete'),
      value: 'delete',
      slot: 'delete_label',
    },
  )

  return items
}

export interface MeasureMenuCallbacks {
  changeAggregate: (id: string, aggregate: MeasureAggregate) => void
  changeSort: (id: string, sort: VBIMeasureStore['sort'] | undefined) => void
  changeEncoding: (id: string, encoding: NonNullable<VBIMeasureStore['encoding']>) => void
  changeFormat: (id: string, format: VBIMeasureFormat | undefined) => void
  openRename: (id: string, currentAlias: string, currentField: string) => void
  removeMeasure: (id: string) => void
  showWarning: (message: string) => void
}

export function handleMeasureMenuAction(
  key: string,
  measure: VBIMeasureStore,
  fieldTypeMap: Record<string, string>,
  callbacks: MeasureMenuCallbacks,
  t: Translate,
): void {
  if (key === 'rename') {
    callbacks.openRename(measure.id, measure.alias || measure.field, measure.field)
    return
  }

  if (key === 'delete') {
    callbacks.removeMeasure(measure.id)
    return
  }

  if (key.startsWith('encoding:')) {
    const nextEncoding = key.replace('encoding:', '') as NonNullable<VBIMeasureStore['encoding']>
    callbacks.changeEncoding(measure.id, nextEncoding)
    return
  }

  if (key.startsWith('sort:')) {
    const nextSort = key.replace('sort:', '') as 'asc' | 'desc' | 'clear'

    if (nextSort === 'clear') {
      callbacks.changeSort(measure.id, undefined)
      return
    }

    if (nextSort === 'asc' || nextSort === 'desc') {
      callbacks.changeSort(measure.id, { order: nextSort })
    }
    return
  }

  if (!key.startsWith('aggregate:')) {
    return
  }

  const aggregateKey = key.replace('aggregate:', '')
  const fieldType = fieldTypeMap[measure.field]
  const fieldRole = getMeasureFieldRoleBySchemaType(fieldType)

  if (aggregateKey === 'quantile') {
    callbacks.changeAggregate(measure.id, { func: 'quantile', quantile: 0.5 })
    return
  }

  if (aggregateKey.startsWith('quantile:')) {
    const percentValue = Number(aggregateKey.replace('quantile:', ''))
    if (!Number.isFinite(percentValue)) {
      return
    }

    const quantileValue = Math.max(0, Math.min(100, percentValue)) / 100
    callbacks.changeAggregate(measure.id, {
      func: 'quantile',
      quantile: quantileValue,
    })
    return
  }

  const selectedAggregate = getAggregateItemsByFieldRole(fieldRole, t).find(
    (item) => item.key === aggregateKey,
  )?.aggregate

  if (!selectedAggregate) {
    return
  }

  if (!isAggregateSupportedByFieldRole(selectedAggregate, fieldRole)) {
    callbacks.showWarning(t('shelvesMeasureUnsupportedAggregate'))
    return
  }

  callbacks.changeAggregate(measure.id, selectedAggregate)
}
