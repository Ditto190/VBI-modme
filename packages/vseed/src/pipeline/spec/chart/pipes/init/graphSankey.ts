import { ColorEncoding } from 'src/dataReshape'
import type { VChartSpecPipe } from 'src/types'

export const initGraphSankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const hasColorEncoding = (advancedVSeed.encoding?.color?.length || 0) > 0

  result.type = 'sankey'
  result.categoryField = hasColorEncoding ? ColorEncoding : 'nodeName'
  result.valueField = 'value'
  result.sourceField = 'source'
  result.targetField = 'target'

  result.nodeAlign = 'justify'
  result.nodeGap = 8
  result.nodeWidth = 10
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
