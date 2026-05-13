import type { VChartSpecPipe } from 'src/types'

export const sankeyInteractive: VChartSpecPipe = (spec) => {
  const result = { ...spec } as Record<string, any>

  result.emphasis = {
    enable: true,
    effect: 'related',
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
