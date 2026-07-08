import { type VBIChartBuilder, type VBIDimension } from '@visactor/vbi'
import { type CascadingMenuItem } from 'src/components/ui/vbi-cascading-menu/vbi-cascading-menu'
import { getDimensionDateAggregateItems, isDateDimensionField } from '../../utils/dimensionDateAggregateUtils'
import { buildShelfMenuLabel } from '../../utils/menuItemUtils'
import { formatSortMenuSummary } from '../../utils/sortUtils'

type TranslationFn = (key: string) => string
type DimensionItem = VBIDimension & { id: string }

export const DIMENSION_ENCODING_LABEL_KEY_MAP: Record<NonNullable<VBIDimension['encoding']>, string> = {
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

export function buildDimensionMenuItems(
  dimension: DimensionItem,
  dimensions: DimensionItem[],
  fieldTypeMap: Record<string, string>,
  chartBuilder: VBIChartBuilder | undefined,
  t: TranslationFn,
): CascadingMenuItem[] {
  const items: CascadingMenuItem[] = []

  if (!chartBuilder) return []

  const supportedEncodings = chartBuilder.chartType.getSupportedDimensionEncodings()
  const dimensionIndex = dimensions.findIndex((item) => item.id === dimension.id)
  const recommendedEncoding =
    dimensionIndex >= 0
      ? chartBuilder.chartType.getRecommendedDimensionEncodings(dimensions.length)[dimensionIndex]
      : undefined

  if (isDateDimensionField(fieldTypeMap[dimension.field])) {
    items.push({
      id: 'aggregate',
      label: t('shelvesMenuDateAggregate'),
      children: [
        ...getDimensionDateAggregateItems(t).map((item) => ({
          id: `aggregate:${item.key}`,
          label: item.shortLabel,
          value: `aggregate:${item.key}`,
        })),
        {
          id: 'aggregate:none',
          label: t('shelvesMenuRawValue'),
          value: 'aggregate:none',
        },
      ],
    })
  }

  items.push({
    id: 'encoding',
    label: t('shelvesMenuEncoding'),
    children: supportedEncodings.map((encoding) => {
      const recommendedSuffix = recommendedEncoding === encoding ? t('commonStatusRecommended') : ''

      return {
        id: `encoding:${encoding}`,
        label: buildShelfMenuLabel(t(DIMENSION_ENCODING_LABEL_KEY_MAP[encoding]), recommendedSuffix),
        value: `encoding:${encoding}`,
      }
    }),
  })

  items.push({
    id: 'sort',
    label: buildShelfMenuLabel(t('shelvesMenuSort'), formatSortMenuSummary(dimension.sort, t)),
    children: [
      {
        id: 'sort:asc',
        label: t('shelvesSortAsc'),
        value: 'sort:asc',
      },
      {
        id: 'sort:desc',
        label: t('shelvesSortDesc'),
        value: 'sort:desc',
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

export interface DimensionMenuCallbacks {
  changeAggregate: (id: string, aggregate: NonNullable<VBIDimension['aggregate']> | undefined) => void
  changeSort: (id: string, sort: VBIDimension['sort'] | undefined) => void
  changeEncoding: (id: string, encoding: NonNullable<VBIDimension['encoding']>) => void
  openRename: (id: string, currentAlias: string, currentField: string) => void
  removeDimension: (id: string) => void
}

export function handleDimensionMenuAction(
  key: string,
  dimension: DimensionItem,
  callbacks: DimensionMenuCallbacks,
  t: TranslationFn,
): void {
  if (key.startsWith('aggregate:')) {
    const aggregateKey = key.replace('aggregate:', '')

    if (aggregateKey === 'none') {
      callbacks.changeAggregate(dimension.id, undefined)
      return
    }

    const nextAggregate = getDimensionDateAggregateItems(t).find((item) => item.key === aggregateKey)?.aggregate

    if (nextAggregate) {
      callbacks.changeAggregate(dimension.id, nextAggregate)
    }
    return
  }

  if (key.startsWith('sort:')) {
    const nextSort = key.replace('sort:', '') as 'asc' | 'desc' | 'clear'

    if (nextSort === 'clear') {
      callbacks.changeSort(dimension.id, undefined)
      return
    }

    if (nextSort === 'asc' || nextSort === 'desc') {
      callbacks.changeSort(dimension.id, { order: nextSort })
    }
    return
  }

  if (key.startsWith('encoding:')) {
    const nextEncoding = key.replace('encoding:', '') as NonNullable<VBIDimension['encoding']>
    callbacks.changeEncoding(dimension.id, nextEncoding)
    return
  }

  if (key === 'rename') {
    callbacks.openRename(dimension.id, dimension.alias || dimension.field, dimension.field)
    return
  }

  if (key === 'delete') {
    callbacks.removeDimension(dimension.id)
  }
}
