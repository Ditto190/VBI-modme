import type { VChartSpecPipe } from 'src/types'

export const initHierarchySankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo[0]

  result.type = 'sankey'
  result.nodeGap = 5
  result.nodeWidth = 12
  result.nodeAlign = 'justify'
  result.iterations = 0
  result.padding = {
    top: 0,
    left: 2,
    bottom: 0,
    right: 2,
  }
  result.nodeKey = (datum: any) => datum?.key
  result.categoryField = 'key'
  result.valueField = foldInfo.measureValue
  result.link = {
    style: {
      pathType: 'smooth',
    },
  }

  return result as any
}
