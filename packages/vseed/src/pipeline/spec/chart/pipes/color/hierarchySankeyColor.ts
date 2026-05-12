import { createSpecifiedForColorMapping } from './color'
import type { VChartSpecPipe, Color as ColorConfig, Datum } from 'src/types'

const flattenNodes = (nodes: Datum[] = []): Datum[] => {
  return nodes.flatMap((node) => [node, ...flattenNodes((node.children as Datum[]) || [])])
}

export const hierarchySankeyColor: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { chartType, dataset } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { color?: ColorConfig }

  const nodeList = flattenNodes(dataset as Datum[])
  const colorItems = Array.from(new Set(nodeList.map((node) => String(node.color ?? node.name)).filter(Boolean)))
  const colorIdMap = colorItems.reduce(
    (prev, item) => {
      prev[item] = { id: item, alias: item }
      return prev
    },
    {} as Record<string, { id: string; alias: string }>,
  )

  result.color = {
    type: 'ordinal',
    field: 'color',
    domain: colorItems,
    range: baseConfig?.color?.colorScheme,
    specified: createSpecifiedForColorMapping(baseConfig?.color?.colorMapping, colorIdMap, colorItems),
  }

  return result as any
}
