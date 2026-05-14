import type { VChartSpecPipe } from 'src/types'

export const initHierarchySankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo[0]

  result.type = 'sankey'
  result.nodeKey = (datum: any) => datum?.key
  result.categoryField = 'key'
  result.valueField = foldInfo.measureValue

  result.nodeAlign = 'justify'
  result.nodeGap = 8
  result.nodeWidth = 12
  result.minNodeHeight = 4
  result.iterations = 0
  result.padding = {
    top: 0,
    left: 2,
    bottom: 0,
    right: 2,
  }

  result.link = {
    style: {
      pathType: 'smooth',
    },
  }

  return result as any
}
