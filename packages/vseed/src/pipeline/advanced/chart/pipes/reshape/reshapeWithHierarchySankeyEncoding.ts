import { uniqueBy } from 'remeda'
import { buildHierarchyTree, dataReshapeByEncoding } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, Datum, Dimension, Encoding, HierarchySankey, Measure } from 'src/types'

/**
 * hierarchySankey 的 advanced 数据处理分为两步：
 * 1. 复用通用 encoding reshape，将 tidy data 折叠成 hierarchy 可消费的扁平结构
 * 2. 再将扁平结构转为递归 children 树，并额外计算 sankey 需要的入度/出度
 */
export const reshapeWithHierarchySankeyEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as HierarchySankey
  const { encoding, reshapeMeasures = [], measures } = advancedVSeed

  // 先复用通用 reshape 逻辑，得到 fold/unfold 后的扁平数据与元信息。
  const {
    dataset: reshapedDataset,
    foldInfo,
    unfoldInfo,
  } = dataReshapeByEncoding(
    dataset,
    uniqueBy(advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? [], (item: Dimension) => item.id),
    uniqueBy(advancedVSeed.reshapeMeasures?.[0] ?? [], (item: Measure) => item.id),
    encoding as Encoding,
    {
      colorItemAsId: false,
      omitIds: (reshapeMeasures[0] ?? []).map((m: Measure) => m.id),
      locale: advancedVSeed.locale,
    },
  )

  const hierarchyFields = ((encoding as Datum)?.hierarchy ?? []) as string[]
  const measureKeys = findAllMeasures(measures).map((m) => m.id)

  // hierarchySankey 最终不直接消费扁平表，而是消费递归树结构。
  // 这里开启 withDegree，让节点额外带上 sankey 需要的 inDegree / outDegree。
  const treeDataset =
    hierarchyFields.length > 0
      ? buildHierarchyTree(reshapedDataset, hierarchyFields, foldInfo, unfoldInfo, measureKeys, {
          withDegree: true,
        })
      : reshapedDataset

  return {
    ...result,
    dataset: treeDataset,
    datasetReshapeInfo: [
      {
        id: String(chartType),
        index: 0,
        foldInfo,
        unfoldInfo,
      },
    ],
  } as AdvancedVSeed
}
