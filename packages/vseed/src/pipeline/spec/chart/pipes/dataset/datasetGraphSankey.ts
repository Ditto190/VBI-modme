import { ColorEncoding } from 'src/dataReshape'
import type { Datum, VChartSpecPipe } from 'src/types'

export const buildGraphSankeyData = (
  dataset: Datum[],
  sourceField: string,
  targetField: string,
  valueField: string,
) => {
  const nodeIndexMap = new Map<string, number>()
  const nodeColorMap = new Map<string, string>()
  const linksMap = new Map<
    string,
    { source: number; target: number; value: number } & Record<string, string | number>
  >()

  const ensureNode = (nodeName: string) => {
    if (!nodeIndexMap.has(nodeName)) {
      nodeIndexMap.set(nodeName, nodeIndexMap.size)
    }
    return nodeIndexMap.get(nodeName)!
  }

  dataset.forEach((datum) => {
    const sourceName = String(datum[sourceField] ?? '')
    const targetName = String(datum[targetField] ?? '')
    const rawValue = Number(datum[valueField] ?? 0)
    const colorCategory = datum[ColorEncoding]
    const colorCategoryValue =
      colorCategory === undefined || colorCategory === null || colorCategory === '' ? undefined : String(colorCategory)

    if (!sourceName || !targetName || Number.isNaN(rawValue)) {
      return
    }

    const source = ensureNode(sourceName)
    const target = ensureNode(targetName)

    if (!nodeColorMap.has(sourceName) && colorCategoryValue) {
      nodeColorMap.set(sourceName, colorCategoryValue)
    }
    if (!nodeColorMap.has(targetName) && colorCategoryValue) {
      nodeColorMap.set(targetName, colorCategoryValue)
    }

    const linkKey = `${source}__${target}`
    const prev = linksMap.get(linkKey)

    if (prev) {
      prev.value += rawValue
    } else {
      const linkDatum: { source: number; target: number; value: number } & Record<string, string | number> = {
        source,
        target,
        value: rawValue,
      }

      if (colorCategoryValue) {
        linkDatum[ColorEncoding] = colorCategoryValue
      }

      linksMap.set(linkKey, linkDatum)
    }
  })

  const nodes = Array.from(nodeIndexMap.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([nodeName]) => {
      const nodeDatum: Record<string, string> = { nodeName }
      const nodeColor = nodeColorMap.get(nodeName)

      if (nodeColor) {
        nodeDatum[ColorEncoding] = nodeColor
      }

      return nodeDatum
    })

  return {
    nodes,
    links: Array.from(linksMap.values()),
  }
}

export const datasetGraphSankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { dataset = [], datasetReshapeInfo } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]
  const graphData = buildGraphSankeyData(
    dataset as Datum[],
    unfoldInfo.encodingSource || 'source',
    unfoldInfo.encodingTarget || 'target',
    foldInfo.measureValue,
  )

  result.data = [
    {
      id: 'data',
      parser: {
        clone: false,
      },
      values: [graphData] as any,
    },
  ]

  return result as any
}
