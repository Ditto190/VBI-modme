import { createFormatterByMeasure, findMeasureById } from 'src/pipeline/utils'
import type { Datum, GraphSankeyMeasure, UnfoldInfo, VChartSpecPipe } from 'src/types'
import { tooltip as commonTooltip } from './tooltip'

const isLinkDatum = (value: unknown) => {
  const datum = value as Datum
  return !!datum && datum.source !== undefined && datum.target !== undefined
}

const getNodes = (spec: Record<string, any>) =>
  ((((spec.data || [])[0] as Record<string, any>)?.values || [])[0]?.nodes || []) as Array<{ nodeName: string }>

const getNodeNameByIndex = (nodes: Array<{ nodeName: string }>, index: unknown) => {
  const node = nodes[Number(index)]
  return node?.nodeName ?? ''
}

const getMeasureFormatter = (measures: GraphSankeyMeasure[], measureId: string) => {
  const measure = findMeasureById(measures, measureId)
  return createFormatterByMeasure(measure)
}

export const tooltipGraphSankey: VChartSpecPipe = (spec, context) => {
  const result = commonTooltip()(spec, context) as Record<string, any>
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, dimensions = [] } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]
  const nodes = getNodes(result)
  const measures = (vseed.measures || []) as GraphSankeyMeasure[]
  const sourceAlias =
    dimensions.find((dimension) => (advancedVSeed.encoding?.source || []).includes(dimension.id))?.alias || 'Source'
  const targetAlias =
    dimensions.find((dimension) => (advancedVSeed.encoding?.target || []).includes(dimension.id))?.alias || 'Target'
  const measureAlias =
    measures.find((measure) => measure.id === foldInfo.measureValue)?.alias || foldInfo.measureName || 'Value'
  const formatter = getMeasureFormatter(measures, foldInfo.measureValue)

  if (result.tooltip) {
    result.tooltip.mark = {
      title: {
        visible: true,
        value: (value: unknown) => {
          const datum = value as Datum
          if (isLinkDatum(value)) {
            return `${getNodeNameByIndex(nodes, datum.source)} -> ${getNodeNameByIndex(nodes, datum.target)}`
          }
          return String(datum?.nodeName ?? '')
        },
      },
      content: createMarkContent(nodes, unfoldInfo, sourceAlias, targetAlias, measureAlias, formatter),
    }
  }

  return result
}

const createMarkContent = (
  nodes: Array<{ nodeName: string }>,
  _unfoldInfo: UnfoldInfo,
  sourceAlias: string,
  targetAlias: string,
  measureAlias: string,
  formatter: (value: string | number) => string,
) => {
  return [
    {
      visible: (value: unknown) => !isLinkDatum(value),
      hasShape: true,
      shapeType: 'rectRound',
      key: 'Node',
      value: (value: unknown) => String((value as Datum)?.nodeName ?? ''),
    },
    {
      visible: (value: unknown) => !isLinkDatum(value),
      hasShape: true,
      shapeType: 'rectRound',
      key: measureAlias,
      value: (value: unknown) => formatter(((value as Datum)?.value ?? 0) as string | number),
    },
    {
      visible: (value: unknown) => isLinkDatum(value),
      hasShape: true,
      shapeType: 'rectRound',
      key: sourceAlias,
      value: (value: unknown) => getNodeNameByIndex(nodes, (value as Datum)?.source),
    },
    {
      visible: (value: unknown) => isLinkDatum(value),
      hasShape: true,
      shapeType: 'rectRound',
      key: targetAlias,
      value: (value: unknown) => getNodeNameByIndex(nodes, (value as Datum)?.target),
    },
    {
      visible: (value: unknown) => isLinkDatum(value),
      hasShape: true,
      shapeType: 'rectRound',
      key: measureAlias,
      value: (value: unknown) => formatter(((value as Datum)?.value ?? 0) as string | number),
    },
  ]
}
