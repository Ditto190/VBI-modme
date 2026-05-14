import { ColorEncoding, Separator } from 'src/dataReshape'
import type { Datum, FoldInfo, VChartSpecPipe } from 'src/types'

type SankeyDataOptions = {
  foldInfo?: Pick<FoldInfo, 'measureId' | 'measureName'>
  sourceFields?: string[]
  targetFields?: string[]
}

type SankeyNodeInfo = {
  id: string
  nodeName: string
}

const getNodeInfo = (
  datum: Datum,
  encodedField: string,
  sourceFields: string[],
  foldInfo?: Pick<FoldInfo, 'measureId' | 'measureName'>,
) => {
  const id = String(datum[encodedField] ?? '')

  if (!sourceFields.length) {
    return {
      id,
      nodeName: id,
    }
  }

  const nodeName = sourceFields
    .map((field) => {
      const value = String(datum[field] ?? '')
      return field === foldInfo?.measureId && foldInfo.measureName && datum[foldInfo.measureName] !== undefined
        ? String(datum[foldInfo.measureName])
        : value
    })
    .join(Separator)

  return {
    id,
    nodeName: nodeName || id,
  }
}

export const buildSankeyData = (
  dataset: Datum[],
  sourceField: string,
  targetField: string,
  valueField: string,
  options: SankeyDataOptions = {},
) => {
  const nodeIndexMap = new Map<string, number>()
  const nodeNameMap = new Map<string, string>()
  const nodeColorMap = new Map<string, string>()
  const linksMap = new Map<
    string,
    { source: number; target: number; value: number } & Record<string, string | number>
  >()
  const { foldInfo, sourceFields = [], targetFields = [] } = options

  const ensureNode = (node: SankeyNodeInfo) => {
    const { id, nodeName } = node
    if (!nodeIndexMap.has(id)) {
      nodeIndexMap.set(id, nodeIndexMap.size)
      nodeNameMap.set(id, nodeName)
    }
    return nodeIndexMap.get(id)!
  }

  dataset.forEach((datum) => {
    const sourceNode = getNodeInfo(datum, sourceField, sourceFields, foldInfo)
    const targetNode = getNodeInfo(datum, targetField, targetFields, foldInfo)
    const rawValue = Number(datum[valueField] ?? 0)
    const colorCategory = datum[ColorEncoding]
    const colorCategoryValue =
      colorCategory === undefined || colorCategory === null || colorCategory === '' ? undefined : String(colorCategory)

    if (!sourceNode.id || !targetNode.id || Number.isNaN(rawValue)) {
      return
    }

    const source = ensureNode(sourceNode)
    const target = ensureNode(targetNode)

    if (!nodeColorMap.has(sourceNode.id) && colorCategoryValue) {
      nodeColorMap.set(sourceNode.id, colorCategoryValue)
    }
    if (!nodeColorMap.has(targetNode.id) && colorCategoryValue) {
      nodeColorMap.set(targetNode.id, colorCategoryValue)
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
        sourceNodeName: sourceNode.nodeName,
        targetNodeName: targetNode.nodeName,
      }

      if (colorCategoryValue) {
        linkDatum[ColorEncoding] = colorCategoryValue
      }

      linksMap.set(linkKey, linkDatum)
    }
  })

  const nodes = Array.from(nodeIndexMap.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([id]) => {
      const nodeDatum: Record<string, string | number> = {
        id,
        nodeName: nodeNameMap.get(id) || id,
      }
      const nodeColor = nodeColorMap.get(id)

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

export const datasetSankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { dataset = [], datasetReshapeInfo } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]
  const sourceFields = (advancedVSeed.encoding as Datum)?.source || []
  const targetFields = (advancedVSeed.encoding as Datum)?.target || []
  const graphData = buildSankeyData(
    dataset as Datum[],
    unfoldInfo.encodingSource || 'source',
    unfoldInfo.encodingTarget || 'target',
    foldInfo.measureValue,
    {
      foldInfo,
      sourceFields,
      targetFields,
    },
  )

  result.data = [
    {
      id: 'data',
      values: [graphData] as any,
    },
  ]

  return result as any
}
