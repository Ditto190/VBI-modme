import { findAllMeasures } from 'src/pipeline/utils'
import type { Datum, PivotChartSpecPipe } from 'src/types'
import { omit } from 'remeda'
import { buildHierarchySankeyNodes } from './datasetHierarchySankey'
import { groupByDimensions } from './datasetPivotHierarchy'

export const datasetPivotHierarchySankey: PivotChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { dataset, datasetReshapeInfo, measures } = advancedVSeed
  const measureKeys = findAllMeasures(measures).map((m) => m.id)

  const hierarchyFields = (advancedVSeed.encoding as Datum)?.hierarchy || []
  const rows = (advancedVSeed.encoding as Datum)?.row || []
  const columns = (advancedVSeed.encoding as Datum)?.column || []
  const pivotDims = [...rows, ...columns]
  const records = dataset.reduce(
    (pre, cur, index) => {
      const id = datasetReshapeInfo[index].id
      const { foldInfo, unfoldInfo } = datasetReshapeInfo[index]

      if (pivotDims.length > 0) {
        const groupedDataset = groupByDimensions(cur as Datum[], pivotDims) as Datum[]
        pre[id] = groupedDataset.flatMap((data) => {
          const root = {
            ...data,
            children: buildHierarchySankeyNodes(
              data.children as Datum[],
              hierarchyFields,
              foldInfo,
              unfoldInfo,
              measureKeys,
            ),
          }
          const rootProps = omit(root, ['children'])
          const rootTree = root.children.map((child: Datum) => ({
            ...child,
            ...rootProps,
          }))
          return rootTree
        })
      } else {
        const nodes = buildHierarchySankeyNodes(cur as Datum[], hierarchyFields, foldInfo, unfoldInfo, measureKeys)
        pre[id] = nodes
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
