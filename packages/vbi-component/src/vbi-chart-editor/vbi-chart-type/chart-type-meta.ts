import { svg } from 'lit'
import { translateVBIComponentText, type VBIComponentTextSource } from '../../localization'

export type VBIChartTypeGroupKey =
  | 'table'
  | 'comparison'
  | 'trend'
  | 'proportion'
  | 'distribution'
  | 'hierarchy'
  | 'dynamic'

export type VBIChartTypeIcon = ReturnType<typeof svg>

export interface VBIChartTypeGroupMeta {
  key: string
  labelKey: string
  descriptionKey: string
}

export interface VBIChartTypeMeta {
  type: string
  group: string
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
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="M4 10h16"/><path d="M4 15h16"/><path d="M10 5v14"/><path d="M16 5v14"/></svg>`,
  },
  {
    type: 'pivotTable',
    group: 'table',
    labelKey: 'toolbarChartTypeItemsPivotTableLabel',
    descriptionKey: 'toolbarChartTypeItemsPivotTableDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v6H4z"/><path d="M13 5h7v4h-7z"/><path d="M13 11h7v8h-7z"/><path d="M4 13h7v6H4z"/></svg>`,
  },
  {
    type: 'column',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><path d="M7 17V9"/><path d="M12 17V5"/><path d="M17 17v-6"/></svg>`,
  },
  {
    type: 'columnParallel',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnParallelDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><path d="M7 17V9"/><path d="M12 17V5"/><path d="M17 17v-6"/></svg>`,
  },
  {
    type: 'columnPercent',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnPercentDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><path d="M7 17V9"/><path d="M12 17V5"/><path d="M17 17v-6"/></svg>`,
  },
  {
    type: 'bar',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarLabel',
    descriptionKey: 'toolbarChartTypeItemsBarDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h14"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>`,
  },
  {
    type: 'barParallel',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsBarParallelDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h14"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>`,
  },
  {
    type: 'barPercent',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsBarPercentDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h14"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>`,
  },
  {
    type: 'dualAxis',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsDualAxisLabel',
    descriptionKey: 'toolbarChartTypeItemsDualAxisDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V5"/><path d="M19 19V5"/><path d="M5 18h14"/><path d="M7 14l4-5 3 3 3-5"/><path d="M7 16h3"/><path d="M12 16h3"/></svg>`,
  },
  {
    type: 'line',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsLineLabel',
    descriptionKey: 'toolbarChartTypeItemsLineDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16"/><path d="M5 15l4-5 4 3 5-7"/></svg>`,
  },
  {
    type: 'area',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsAreaLabel',
    descriptionKey: 'toolbarChartTypeItemsAreaDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16"/><path d="M5 16l4-6 4 3 5-7v10z"/></svg>`,
  },
  {
    type: 'areaPercent',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsAreaPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsAreaPercentDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16"/><path d="M5 16l4-6 4 3 5-7v10z"/></svg>`,
  },
  {
    type: 'pie',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsPieLabel',
    descriptionKey: 'toolbarChartTypeItemsPieDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 108 8h-8z"/><path d="M13 3v8h8a8 8 0 00-8-8z"/></svg>`,
  },
  {
    type: 'donut',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsDonutLabel',
    descriptionKey: 'toolbarChartTypeItemsDonutDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 108 8h-8z"/><path d="M13 3v8h8a8 8 0 00-8-8z"/></svg>`,
  },
  {
    type: 'rose',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsRoseLabel',
    descriptionKey: 'toolbarChartTypeItemsRoseDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 108 8h-8z"/><path d="M13 3v8h8a8 8 0 00-8-8z"/></svg>`,
  },
  {
    type: 'roseParallel',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsRoseParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsRoseParallelDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l7 5v7l-7 4-7-4V9z"/><path d="M12 8l4 3v4l-4 2-4-2v-4z"/><path d="M12 4v16"/><path d="M5 9l14 7"/><path d="M19 9L5 16"/></svg>`,
  },
  {
    type: 'funnel',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsFunnelLabel',
    descriptionKey: 'toolbarChartTypeItemsFunnelDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7z"/></svg>`,
  },
  {
    type: 'scatter',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsScatterLabel',
    descriptionKey: 'toolbarChartTypeItemsScatterDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="15" r="1.8"/><circle cx="11" cy="9" r="1.8"/><circle cx="16" cy="14" r="1.8"/><circle cx="18" cy="7" r="1.8"/><path d="M4 20h16"/></svg>`,
  },
  {
    type: 'heatmap',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsHeatmapLabel',
    descriptionKey: 'toolbarChartTypeItemsHeatmapDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h5v5H5z"/><path d="M14 5h5v5h-5z"/><path d="M5 14h5v5H5z"/><path d="M14 14h5v5h-5z"/></svg>`,
  },
  {
    type: 'radar',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsRadarLabel',
    descriptionKey: 'toolbarChartTypeItemsRadarDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l7 5v7l-7 4-7-4V9z"/><path d="M12 8l4 3v4l-4 2-4-2v-4z"/><path d="M12 4v16"/><path d="M5 9l14 7"/><path d="M19 9L5 16"/></svg>`,
  },
  {
    type: 'treeMap',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsTreeMapLabel',
    descriptionKey: 'toolbarChartTypeItemsTreeMapDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v6H4z"/><path d="M13 5h7v4h-7z"/><path d="M13 11h7v8h-7z"/><path d="M4 13h7v6H4z"/></svg>`,
  },
  {
    type: 'sunburst',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsSunburstLabel',
    descriptionKey: 'toolbarChartTypeItemsSunburstDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v6H4z"/><path d="M13 5h7v4h-7z"/><path d="M13 11h7v8h-7z"/><path d="M4 13h7v6H4z"/></svg>`,
  },
  {
    type: 'circlePacking',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsCirclePackingLabel',
    descriptionKey: 'toolbarChartTypeItemsCirclePackingDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r="2.5"/><circle cx="14" cy="9" r="2"/><circle cx="14" cy="15" r="3"/></svg>`,
  },
  {
    type: 'sankey',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsSankeyLabel',
    descriptionKey: 'toolbarChartTypeItemsSankeyDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7c6 0 7 10 16 10"/><path d="M4 17c5 0 7-10 16-10"/><path d="M4 7v4"/><path d="M4 15v4"/><path d="M20 5v4"/><path d="M20 15v4"/></svg>`,
  },
  {
    type: 'hierarchySankey',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsHierarchySankeyLabel',
    descriptionKey: 'toolbarChartTypeItemsHierarchySankeyDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7c6 0 7 10 16 10"/><path d="M4 17c5 0 7-10 16-10"/><path d="M4 7v4"/><path d="M4 15v4"/><path d="M20 5v4"/><path d="M20 15v4"/></svg>`,
  },
  {
    type: 'raceBar',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceBarLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceBarDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h14"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>`,
  },
  {
    type: 'raceColumn',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceColumnLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceColumnDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><path d="M7 17V9"/><path d="M12 17V5"/><path d="M17 17v-6"/></svg>`,
  },
  {
    type: 'raceLine',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceLineLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceLineDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16"/><path d="M5 15l4-5 4 3 5-7"/></svg>`,
  },
  {
    type: 'raceScatter',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceScatterLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceScatterDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="15" r="1.8"/><circle cx="11" cy="9" r="1.8"/><circle cx="16" cy="14" r="1.8"/><circle cx="18" cy="7" r="1.8"/><path d="M4 20h16"/></svg>`,
  },
  {
    type: 'racePie',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRacePieLabel',
    descriptionKey: 'toolbarChartTypeItemsRacePieDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 108 8h-8z"/><path d="M13 3v8h8a8 8 0 00-8-8z"/></svg>`,
  },
  {
    type: 'raceDonut',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceDonutLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceDonutDescription',
    icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 108 8h-8z"/><path d="M13 3v8h8a8 8 0 00-8-8z"/></svg>`,
  },
]

export const VBI_CHART_TYPE_META_MAP = Object.fromEntries(
  VBI_CHART_TYPE_METAS.map((meta) => [meta.type, meta]),
) as Record<string, VBIChartTypeMeta>

export const getVBIChartTypeGroups = (
  text?: VBIComponentTextSource,
  groups: VBIChartTypeGroupMeta[] = VBI_CHART_TYPE_GROUPS,
): ResolvedVBIChartTypeGroup[] => {
  return groups.map((group) => ({
    ...group,
    label: translateVBIComponentText(group.labelKey, text),
    description: translateVBIComponentText(group.descriptionKey, text),
  }))
}

export const getVBIChartTypeMeta = (
  chartType: string,
  text?: VBIComponentTextSource,
  metas: VBIChartTypeMeta[] = VBI_CHART_TYPE_METAS,
): ResolvedVBIChartTypeMeta => {
  const meta =
    metas === VBI_CHART_TYPE_METAS
      ? VBI_CHART_TYPE_META_MAP[chartType]
      : Object.fromEntries(metas.map((item) => [item.type, item]))[chartType]

  if (!meta) {
    return {
      type: chartType,
      group: 'distribution',
      labelKey: chartType,
      descriptionKey: 'toolbarChartTypeFallbackDescription',
      icon: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="15" r="1.8"/><circle cx="11" cy="9" r="1.8"/><circle cx="16" cy="14" r="1.8"/><circle cx="18" cy="7" r="1.8"/><path d="M4 20h16"/></svg>`,
      label: chartType,
      description: translateVBIComponentText('toolbarChartTypeFallbackDescription', text),
    }
  }

  return {
    ...meta,
    label: translateVBIComponentText(meta.labelKey, text),
    description: translateVBIComponentText(meta.descriptionKey, text),
  }
}
