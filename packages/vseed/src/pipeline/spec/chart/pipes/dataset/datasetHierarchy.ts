import { buildHierarchyTree } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { VChartSpecPipe, Datum } from 'src/types'

export const datasetHierarchy: VChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { datasetReshapeInfo, dataset, measures } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  // 1. 获取 hierarchy encoding 对应的字段
  // 在 advanced pipeline 中，encodingForHierarchy 已经确保了 dimensions 被正确映射到 'hierarchy' 通道
  const hierarchyFields = (advancedVSeed.encoding as Datum)?.hierarchy || []

  const measureKeys = findAllMeasures(measures).map((m) => m.id)

  // 2. 如果没有 hierarchy 字段，直接返回原始数据（虽然这可能导致图表无法正确渲染，但比报错好）
  if (!hierarchyFields.length) {
    result.data = [{ id: 'data', values: dataset }]
    return result
  }

  // 3. 构建树形结构
  const tree = buildHierarchyTree(dataset, hierarchyFields, foldInfo, unfoldInfo, measureKeys)

  result.data = [
    {
      id: 'data',
      values: tree,
    },
  ]

  return result
}

export const buildTree = buildHierarchyTree
