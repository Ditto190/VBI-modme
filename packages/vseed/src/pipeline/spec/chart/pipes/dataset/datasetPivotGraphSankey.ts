import type { Datum, PivotChartSpecPipe } from 'src/types'
import { buildGraphSankeyData } from './datasetGraphSankey'
import { groupByDimensions } from './datasetPivotHierarchy'

export const datasetPivotGraphSankey: PivotChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { dataset, datasetReshapeInfo } = advancedVSeed
  const rows = (advancedVSeed.encoding as Datum)?.row || []
  const columns = (advancedVSeed.encoding as Datum)?.column || []
  const pivotDims = [...rows, ...columns]

  const records = dataset.reduce(
    (pre, cur, index) => {
      const reshapeInfo = datasetReshapeInfo[index]
      const id = reshapeInfo.id
      const { foldInfo, unfoldInfo } = reshapeInfo

      if (pivotDims.length > 0) {
        const groupedDataset = groupByDimensions(cur as Datum[], pivotDims) as Datum[]
        pre[id] = groupedDataset.map((data) => ({
          ...Object.fromEntries(pivotDims.map((dim) => [dim, data[dim]])),
          ...buildGraphSankeyData(
            (data.children || []) as Datum[],
            unfoldInfo.encodingSource || 'source',
            unfoldInfo.encodingTarget || 'target',
            foldInfo.measureValue,
          ),
        }))
      } else {
        pre[id] = [
          buildGraphSankeyData(
            cur as Datum[],
            unfoldInfo.encodingSource || 'source',
            unfoldInfo.encodingTarget || 'target',
            foldInfo.measureValue,
          ),
        ]
      }

      return pre
    },
    {} as Record<string, any>,
  )

  return {
    ...result,
    records,
  }
}
