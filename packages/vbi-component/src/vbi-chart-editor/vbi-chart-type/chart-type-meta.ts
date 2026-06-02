import {
  translateVBIChartEditorText,
  type VBIChartEditorText,
  type VBIChartEditorTextSource,
  type VBIChartEditorTranslate,
} from '../chart-editor-text'

export type VBIChartTypeGroupKey =
  | 'table'
  | 'comparison'
  | 'trend'
  | 'proportion'
  | 'distribution'
  | 'hierarchy'
  | 'dynamic'

export type VBIChartTypeIcon =
  | 'area'
  | 'bar'
  | 'circlePacking'
  | 'column'
  | 'dualAxis'
  | 'funnel'
  | 'heatmap'
  | 'hierarchy'
  | 'line'
  | 'pie'
  | 'radar'
  | 'sankey'
  | 'scatter'
  | 'table'

export interface VBIChartTypeGroupMeta {
  key: VBIChartTypeGroupKey
  labelKey: string
  descriptionKey: string
}

export interface VBIChartTypeMeta {
  type: string
  group: VBIChartTypeGroupKey
  labelKey: string
  descriptionKey: string
  icon: VBIChartTypeIcon
}

export interface ResolvedVBIChartTypeGroup extends VBIChartTypeGroupMeta {
  label: string
  description: string
}

export interface ResolvedVBIChartTypeMeta extends VBIChartTypeMeta {
  label: string
  description: string
}

export interface VBIChartTypeChangeDetail {
  chartType: string
  type: string
}

export type VBIChartTypeText = VBIChartEditorText
export type VBIChartTypeTranslate = VBIChartEditorTranslate
export type VBIChartTypeTextSource = VBIChartEditorTextSource

export const VBI_CHART_TYPE_GROUPS: VBIChartTypeGroupMeta[] = [
  {
    key: 'table',
    labelKey: 'toolbarChartTypeGroupsTableLabel',
    descriptionKey: 'toolbarChartTypeGroupsTableDescription',
  },
  {
    key: 'comparison',
    labelKey: 'toolbarChartTypeGroupsComparisonLabel',
    descriptionKey: 'toolbarChartTypeGroupsComparisonDescription',
  },
  {
    key: 'trend',
    labelKey: 'toolbarChartTypeGroupsTrendLabel',
    descriptionKey: 'toolbarChartTypeGroupsTrendDescription',
  },
  {
    key: 'proportion',
    labelKey: 'toolbarChartTypeGroupsProportionLabel',
    descriptionKey: 'toolbarChartTypeGroupsProportionDescription',
  },
  {
    key: 'distribution',
    labelKey: 'toolbarChartTypeGroupsDistributionLabel',
    descriptionKey: 'toolbarChartTypeGroupsDistributionDescription',
  },
  {
    key: 'hierarchy',
    labelKey: 'toolbarChartTypeGroupsHierarchyLabel',
    descriptionKey: 'toolbarChartTypeGroupsHierarchyDescription',
  },
  {
    key: 'dynamic',
    labelKey: 'toolbarChartTypeGroupsDynamicLabel',
    descriptionKey: 'toolbarChartTypeGroupsDynamicDescription',
  },
]

export const VBI_CHART_TYPE_METAS: VBIChartTypeMeta[] = [
  {
    type: 'table',
    group: 'table',
    labelKey: 'toolbarChartTypeItemsTableLabel',
    descriptionKey: 'toolbarChartTypeItemsTableDescription',
    icon: 'table',
  },
  {
    type: 'pivotTable',
    group: 'table',
    labelKey: 'toolbarChartTypeItemsPivotTableLabel',
    descriptionKey: 'toolbarChartTypeItemsPivotTableDescription',
    icon: 'hierarchy',
  },
  {
    type: 'column',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnDescription',
    icon: 'column',
  },
  {
    type: 'columnParallel',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnParallelDescription',
    icon: 'column',
  },
  {
    type: 'columnPercent',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnPercentDescription',
    icon: 'column',
  },
  {
    type: 'bar',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarLabel',
    descriptionKey: 'toolbarChartTypeItemsBarDescription',
    icon: 'bar',
  },
  {
    type: 'barParallel',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsBarParallelDescription',
    icon: 'bar',
  },
  {
    type: 'barPercent',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsBarPercentDescription',
    icon: 'bar',
  },
  {
    type: 'dualAxis',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsDualAxisLabel',
    descriptionKey: 'toolbarChartTypeItemsDualAxisDescription',
    icon: 'dualAxis',
  },
  {
    type: 'line',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsLineLabel',
    descriptionKey: 'toolbarChartTypeItemsLineDescription',
    icon: 'line',
  },
  {
    type: 'area',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsAreaLabel',
    descriptionKey: 'toolbarChartTypeItemsAreaDescription',
    icon: 'area',
  },
  {
    type: 'areaPercent',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsAreaPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsAreaPercentDescription',
    icon: 'area',
  },
  {
    type: 'pie',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsPieLabel',
    descriptionKey: 'toolbarChartTypeItemsPieDescription',
    icon: 'pie',
  },
  {
    type: 'donut',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsDonutLabel',
    descriptionKey: 'toolbarChartTypeItemsDonutDescription',
    icon: 'pie',
  },
  {
    type: 'rose',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsRoseLabel',
    descriptionKey: 'toolbarChartTypeItemsRoseDescription',
    icon: 'pie',
  },
  {
    type: 'roseParallel',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsRoseParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsRoseParallelDescription',
    icon: 'radar',
  },
  {
    type: 'funnel',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsFunnelLabel',
    descriptionKey: 'toolbarChartTypeItemsFunnelDescription',
    icon: 'funnel',
  },
  {
    type: 'scatter',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsScatterLabel',
    descriptionKey: 'toolbarChartTypeItemsScatterDescription',
    icon: 'scatter',
  },
  {
    type: 'heatmap',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsHeatmapLabel',
    descriptionKey: 'toolbarChartTypeItemsHeatmapDescription',
    icon: 'heatmap',
  },
  {
    type: 'radar',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsRadarLabel',
    descriptionKey: 'toolbarChartTypeItemsRadarDescription',
    icon: 'radar',
  },
  {
    type: 'treeMap',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsTreeMapLabel',
    descriptionKey: 'toolbarChartTypeItemsTreeMapDescription',
    icon: 'hierarchy',
  },
  {
    type: 'sunburst',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsSunburstLabel',
    descriptionKey: 'toolbarChartTypeItemsSunburstDescription',
    icon: 'hierarchy',
  },
  {
    type: 'circlePacking',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsCirclePackingLabel',
    descriptionKey: 'toolbarChartTypeItemsCirclePackingDescription',
    icon: 'circlePacking',
  },
  {
    type: 'sankey',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsSankeyLabel',
    descriptionKey: 'toolbarChartTypeItemsSankeyDescription',
    icon: 'sankey',
  },
  {
    type: 'hierarchySankey',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsHierarchySankeyLabel',
    descriptionKey: 'toolbarChartTypeItemsHierarchySankeyDescription',
    icon: 'sankey',
  },
  {
    type: 'raceBar',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceBarLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceBarDescription',
    icon: 'bar',
  },
  {
    type: 'raceColumn',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceColumnLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceColumnDescription',
    icon: 'column',
  },
  {
    type: 'raceLine',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceLineLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceLineDescription',
    icon: 'line',
  },
  {
    type: 'raceScatter',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceScatterLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceScatterDescription',
    icon: 'scatter',
  },
  {
    type: 'racePie',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRacePieLabel',
    descriptionKey: 'toolbarChartTypeItemsRacePieDescription',
    icon: 'pie',
  },
  {
    type: 'raceDonut',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceDonutLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceDonutDescription',
    icon: 'pie',
  },
]

export const VBI_CHART_TYPE_META_MAP = Object.fromEntries(
  VBI_CHART_TYPE_METAS.map((meta) => [meta.type, meta]),
) as Record<string, VBIChartTypeMeta>

export const DEFAULT_AVAILABLE_CHART_TYPES = [
  'table',
  'pivotTable',
  'column',
  'columnParallel',
  'columnPercent',
  'bar',
  'barParallel',
  'barPercent',
  'line',
  'area',
  'areaPercent',
  'dualAxis',
  'scatter',
  'pie',
  'donut',
  'rose',
  'roseParallel',
  'radar',
  'funnel',
  'heatmap',
  'treeMap',
  'sunburst',
  'circlePacking',
  'sankey',
  'hierarchySankey',
  'raceBar',
  'raceColumn',
  'raceLine',
  'raceScatter',
  'racePie',
  'raceDonut',
]

export const translateVBIChartTypeText = translateVBIChartEditorText

export const getVBIChartTypeGroups = (text?: VBIChartTypeTextSource): ResolvedVBIChartTypeGroup[] => {
  return VBI_CHART_TYPE_GROUPS.map((group) => ({
    ...group,
    label: translateVBIChartTypeText(group.labelKey, text),
    description: translateVBIChartTypeText(group.descriptionKey, text),
  }))
}

export const getVBIChartTypeMeta = (
  chartType: string,
  text?: VBIChartTypeTextSource,
): ResolvedVBIChartTypeMeta => {
  const meta = VBI_CHART_TYPE_META_MAP[chartType]

  if (!meta) {
    return {
      type: chartType,
      group: 'distribution',
      labelKey: chartType,
      descriptionKey: 'toolbarChartTypeFallbackDescription',
      icon: 'scatter',
      label: chartType,
      description: translateVBIChartTypeText('toolbarChartTypeFallbackDescription', text),
    }
  }

  return {
    ...meta,
    label: translateVBIChartTypeText(meta.labelKey, text),
    description: translateVBIChartTypeText(meta.descriptionKey, text),
  }
}
