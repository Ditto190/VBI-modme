import type { Datum, PivotChartSpecPipe } from 'src/types'
import { buildSankeyData } from './datasetSankey'
import { groupByDimensions } from './datasetPivotHierarchy'

export const datasetPivotSankey: PivotChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { dataset, datasetReshapeInfo } = advancedVSeed
  const rows = (advancedVSeed.encoding as Datum)?.row || []
  const columns = (advancedVSeed.encoding as Datum)?.column || []
  const sourceFields = (advancedVSeed.encoding as Datum)?.source || []
  const targetFields = (advancedVSeed.encoding as Datum)?.target || []
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
          ...buildSankeyData(
            (data.children || []) as Datum[],
            unfoldInfo.encodingSource || 'source',
            unfoldInfo.encodingTarget || 'target',
            foldInfo.measureValue,
            {
              foldInfo,
              sourceFields,
              targetFields,
            },
          ),
        }))
      } else {
        pre[id] = [
          buildSankeyData(
            cur as Datum[],
            unfoldInfo.encodingSource || 'source',
            unfoldInfo.encodingTarget || 'target',
            foldInfo.measureValue,
            {
              foldInfo,
              sourceFields,
              targetFields,
            },
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
