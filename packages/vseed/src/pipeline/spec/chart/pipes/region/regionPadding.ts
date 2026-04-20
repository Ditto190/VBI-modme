import type { RegionPadding, VChartSpecPipe } from 'src/types'

type RegionPaddingConfig = {
  regionPadding?: RegionPadding
}

export const regionPadding: VChartSpecPipe = (spec, context) => {
  const chartConfig = context.advancedVSeed.config?.[context.vseed.chartType] as RegionPaddingConfig | undefined
  const padding = chartConfig?.regionPadding

  if (padding == null || !Array.isArray((spec as { region?: unknown }).region)) {
    return spec
  }

  const region = (spec as { region: Array<Record<string, unknown>> }).region
  if (region.length === 0) {
    return spec
  }

  return {
    ...spec,
    region: [
      {
        ...region[0],
        padding,
      },
      ...region.slice(1),
    ],
  }
}
