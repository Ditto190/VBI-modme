import { isSankey } from 'src/pipeline/utils'
import type { VChartSpecPipe } from 'src/types'

export const sankeyInteractive: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { vseed } = context
  result.emphasis = {
    enable: true,
    effect: isSankey(vseed) ? 'adjacency' : 'related',
  }

  result.node = {
    ...(result.node || {}),
    state: {
      ...(result.node?.state || {}),
      blur: {
        opacity: 0.2,
      },
    },
  }

  result.link = {
    ...(result.link || {}),
    state: {
      ...(result.link?.state || {}),
      blur: {
        opacity: 0.05,
      },
    },
  }

  return result as any
}
