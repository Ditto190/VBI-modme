import { createFormatterByMeasure, findMeasureById } from 'src/pipeline/utils'
import type { Datum, Dimension, FoldInfo, Measure, VChartSpecPipe } from 'src/types'
import { tooltip as commonTooltip } from './tooltip'

const isLinkDatum = (value: unknown) => {
  const datum = value as Datum
  return !!datum && datum.source !== undefined && datum.target !== undefined
}

const getNodes = (spec: Record<string, any>) =>
  ((((spec.data || [])[0] as Record<string, any>)?.values || [])[0]?.nodes || []) as Array<Datum>

const getNodeNameByIndex = (nodes: Datum[], index: unknown) => {
  const node = nodes[Number(index)]
  return node?.nodeName ?? ''
}

const getWrappedDatum = (value: unknown): Datum => {
  const datum = value as Datum
  const wrappedDatum = datum?.datum

  if (Array.isArray(wrappedDatum)) {
    return (wrappedDatum[wrappedDatum.length - 1] || datum) as Datum
  }

  if (wrappedDatum && typeof wrappedDatum === 'object') {
    return wrappedDatum as Datum
  }

  return datum
}

const getNodeTitle = (value: unknown) => {
  const datum = getWrappedDatum(value)
  return String(datum?.nodeName ?? datum?.name ?? datum?.id ?? '')
}

const getEncodingAlias = (
  dimensions: Dimension[],
  encodedIds: string[] | null | undefined,
  fallback: string,
  measureId: string,
) =>
  dimensions.find((dimension) => (encodedIds || []).includes(dimension.id) && dimension.id !== measureId)?.alias ||
  fallback

export const tooltipSankey: VChartSpecPipe = (spec, context) => {
  const result = commonTooltip()(spec, context) as Record<string, any>
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, dimensions = [] } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo[0]
  const nodes = getNodes(result)
  const measures = (vseed.measures || []) as Measure[]
  const sourceAlias = getEncodingAlias(dimensions, advancedVSeed.encoding?.source, 'Source', foldInfo.measureId)

  if (result.tooltip) {
    result.tooltip.mark = {
      title: {
        visible: true,
        value: (value: unknown) => {
          const datum = value as Datum
          if (isLinkDatum(value)) {
            return `${getNodeNameByIndex(nodes, datum.source)} -> ${getNodeNameByIndex(nodes, datum.target)}`
          }
          return getNodeTitle(value)
        },
      },
      content: createMarkContent(nodes, measures, foldInfo, sourceAlias),
    }
  }

  return result
}

const createMarkContent = (nodes: Datum[], measures: Measure[] = [], foldInfo: FoldInfo, sourceAlias: string) => {
  const fallbackMeasure = findMeasureById(measures, foldInfo.measureValue) || measures[0]
  const fallbackMeasureAlias = fallbackMeasure?.alias || fallbackMeasure?.id || 'Value'

  return [
    {
      visible: (value: unknown) => isLinkDatum(value),
      hasShape: true,
      shapeType: 'rectRound',
      key: sourceAlias,
      value: (value: unknown) => {
        const datum = value as Datum
        return String(datum.sourceNodeName ?? getNodeNameByIndex(nodes, datum.source))
      },
    },
    {
      visible: () => true,
      hasShape: true,
      shapeType: 'rectRound',
      key: fallbackMeasureAlias,
      value: (value: unknown) => {
        const datum = value as Datum
        const measure = findMeasureById(measures, datum?.[foldInfo.measureId] as string) || fallbackMeasure
        const formatter = createFormatterByMeasure(measure)
        return formatter(((datum?.[foldInfo.measureValue] ?? datum?.value ?? 0) as string | number) || 0)
      },
    },
  ]
}
