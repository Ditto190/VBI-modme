import { unique } from 'remeda'
import type { Builder } from '../builder'
import { isPivotTable, isTable } from 'src/pipeline'
import { isLinearColor } from 'src/pipeline/spec/chart/pipes'
import { createSpecifiedForColorMapping } from 'src/pipeline/spec/chart/pipes/color/color'
import type { Color } from 'src/types'

export const getColorItems = (builder: Builder): { id: string; alias: string }[] => {
  const advancedVSeed = builder.advancedVSeed

  if (!advancedVSeed || isTable(builder.vseed) || isPivotTable(builder.vseed)) {
    return []
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))
  const colorIdMap = datasetReshapeInfo.reduce<Record<string, { id: string; alias: string }>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  return colorItems.map((d) => ({
    id: d,
    alias: colorIdMap[d]?.alias,
  }))
}

export const getColorIdMap = (builder: Builder): Record<string, { id: string; alias: string }> => {
  const advancedVSeed = builder.advancedVSeed

  if (!advancedVSeed || isTable(builder.vseed) || isPivotTable(builder.vseed)) {
    return {}
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorIdMap = datasetReshapeInfo.reduce<Record<string, { id: string; alias: string }>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  return colorIdMap
}

export const getColorValueMap = (builder: Builder): Record<string, string> | undefined => {
  const advancedVSeed = builder.advancedVSeed

  if (
    !advancedVSeed ||
    isTable(builder.vseed) ||
    isPivotTable(builder.vseed) ||
    isLinearColor(advancedVSeed, builder.vseed)
  ) {
    return undefined
  }

  const { datasetReshapeInfo, chartType } = advancedVSeed
  const unfoldInfo = datasetReshapeInfo[0]?.unfoldInfo
  const baseConfig = advancedVSeed.config?.[chartType] as { color?: Color } | undefined
  const colorConfig = baseConfig?.color

  if (!unfoldInfo || !colorConfig) {
    return undefined
  }

  const colorItems = unfoldInfo.colorItems ?? []
  const colorIdMap = unfoldInfo.colorIdMap
  const colorScheme = colorConfig.colorScheme ?? []
  const specified = createSpecifiedForColorMapping(colorConfig.colorMapping, colorIdMap, colorItems) ?? {}

  return colorItems.reduce<Record<string, string>>((prev, colorId, index) => {
    const colorValue = specified[colorId] ?? colorScheme[index % colorScheme.length]

    if (colorValue) {
      prev[colorId] = colorValue
    }

    return prev
  }, {})
}
