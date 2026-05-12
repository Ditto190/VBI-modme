import type { VChartSpecPipe } from 'src/types'

export const datasetHierarchySankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed

  result.data = [
    {
      id: 'data',
      parser: {
        clone: false,
      },
      values: [
        {
          nodes: dataset,
        },
      ],
    },
  ]

  return result as any
}
