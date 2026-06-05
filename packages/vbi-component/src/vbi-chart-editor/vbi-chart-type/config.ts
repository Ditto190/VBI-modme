import { translateVBIComponentText as translate } from 'src/localization'

export interface VBIChartTypeItem {
  type: string
  label: string
  description: string
  icon: string
}

export interface VBIChartTypeGroup {
  key: string
  label: string
  description: string
  items: VBIChartTypeItem[]
}

export const VBI_CHART_TYPE_GROUP: VBIChartTypeGroup[] = [
  {
    key: 'table',
    label: translate('toolbarChartTypeGroupsTableLabel'),
    description: translate('toolbarChartTypeGroupsTableDescription'),
    items: [
      {
        type: 'table',
        label: translate('toolbarChartTypeItemsTableLabel'),
        description: translate('toolbarChartTypeItemsTableDescription'),
        icon: 'table',
      },
      {
        type: 'pivotTable',
        label: translate('toolbarChartTypeItemsPivotTableLabel'),
        description: translate('toolbarChartTypeItemsPivotTableDescription'),
        icon: 'table-cells',
      },
    ],
  },
  {
    key: 'comparison',
    label: translate('toolbarChartTypeGroupsComparisonLabel'),
    description: translate('toolbarChartTypeGroupsComparisonDescription'),
    items: [
      {
        type: 'column',
        label: translate('toolbarChartTypeItemsColumnLabel'),
        description: translate('toolbarChartTypeItemsColumnDescription'),
        icon: 'chart-column',
      },
      {
        type: 'columnParallel',
        label: translate('toolbarChartTypeItemsColumnParallelLabel'),
        description: translate('toolbarChartTypeItemsColumnParallelDescription'),
        icon: 'chart-column',
      },
      {
        type: 'columnPercent',
        label: translate('toolbarChartTypeItemsColumnPercentLabel'),
        description: translate('toolbarChartTypeItemsColumnPercentDescription'),
        icon: 'chart-column',
      },
      {
        type: 'bar',
        label: translate('toolbarChartTypeItemsBarLabel'),
        description: translate('toolbarChartTypeItemsBarDescription'),
        icon: 'chart-bar',
      },
      {
        type: 'barParallel',
        label: translate('toolbarChartTypeItemsBarParallelLabel'),
        description: translate('toolbarChartTypeItemsBarParallelDescription'),
        icon: 'chart-bar',
      },
      {
        type: 'barPercent',
        label: translate('toolbarChartTypeItemsBarPercentLabel'),
        description: translate('toolbarChartTypeItemsBarPercentDescription'),
        icon: 'chart-bar',
      },
      {
        type: 'dualAxis',
        label: translate('toolbarChartTypeItemsDualAxisLabel'),
        description: translate('toolbarChartTypeItemsDualAxisDescription'),
        icon: 'chart-line',
      },
    ],
  },
  {
    key: 'trend',
    label: translate('toolbarChartTypeGroupsTrendLabel'),
    description: translate('toolbarChartTypeGroupsTrendDescription'),
    items: [
      {
        type: 'line',
        label: translate('toolbarChartTypeItemsLineLabel'),
        description: translate('toolbarChartTypeItemsLineDescription'),
        icon: 'chart-line',
      },
      {
        type: 'area',
        label: translate('toolbarChartTypeItemsAreaLabel'),
        description: translate('toolbarChartTypeItemsAreaDescription'),
        icon: 'chart-area',
      },
      {
        type: 'areaPercent',
        label: translate('toolbarChartTypeItemsAreaPercentLabel'),
        description: translate('toolbarChartTypeItemsAreaPercentDescription'),
        icon: 'chart-area',
      },
    ],
  },
  {
    key: 'proportion',
    label: translate('toolbarChartTypeGroupsProportionLabel'),
    description: translate('toolbarChartTypeGroupsProportionDescription'),
    items: [
      {
        type: 'pie',
        label: translate('toolbarChartTypeItemsPieLabel'),
        description: translate('toolbarChartTypeItemsPieDescription'),
        icon: 'chart-pie',
      },
      {
        type: 'donut',
        label: translate('toolbarChartTypeItemsDonutLabel'),
        description: translate('toolbarChartTypeItemsDonutDescription'),
        icon: 'chart-pie',
      },
      {
        type: 'rose',
        label: translate('toolbarChartTypeItemsRoseLabel'),
        description: translate('toolbarChartTypeItemsRoseDescription'),
        icon: 'chart-pie',
      },
      {
        type: 'roseParallel',
        label: translate('toolbarChartTypeItemsRoseParallelLabel'),
        description: translate('toolbarChartTypeItemsRoseParallelDescription'),
        icon: 'chart-pie',
      },
      {
        type: 'funnel',
        label: translate('toolbarChartTypeItemsFunnelLabel'),
        description: translate('toolbarChartTypeItemsFunnelDescription'),
        icon: 'filter',
      },
    ],
  },
  {
    key: 'distribution',
    label: translate('toolbarChartTypeGroupsDistributionLabel'),
    description: translate('toolbarChartTypeGroupsDistributionDescription'),
    items: [
      {
        type: 'scatter',
        label: translate('toolbarChartTypeItemsScatterLabel'),
        description: translate('toolbarChartTypeItemsScatterDescription'),
        icon: 'chart-simple',
      },
      {
        type: 'heatmap',
        label: translate('toolbarChartTypeItemsHeatmapLabel'),
        description: translate('toolbarChartTypeItemsHeatmapDescription'),
        icon: 'table-cells',
      },
      {
        type: 'radar',
        label: translate('toolbarChartTypeItemsRadarLabel'),
        description: translate('toolbarChartTypeItemsRadarDescription'),
        icon: 'chart-simple',
      },
    ],
  },
  {
    key: 'hierarchy',
    label: translate('toolbarChartTypeGroupsHierarchyLabel'),
    description: translate('toolbarChartTypeGroupsHierarchyDescription'),
    items: [
      {
        type: 'treeMap',
        label: translate('toolbarChartTypeItemsTreeMapLabel'),
        description: translate('toolbarChartTypeItemsTreeMapDescription'),
        icon: 'table-cells',
      },
      {
        type: 'sunburst',
        label: translate('toolbarChartTypeItemsSunburstLabel'),
        description: translate('toolbarChartTypeItemsSunburstDescription'),
        icon: 'chart-pie',
      },
      {
        type: 'circlePacking',
        label: translate('toolbarChartTypeItemsCirclePackingLabel'),
        description: translate('toolbarChartTypeItemsCirclePackingDescription'),
        icon: 'circle-nodes',
      },
      {
        type: 'sankey',
        label: translate('toolbarChartTypeItemsSankeyLabel'),
        description: translate('toolbarChartTypeItemsSankeyDescription'),
        icon: 'diagram-project',
      },
      {
        type: 'hierarchySankey',
        label: translate('toolbarChartTypeItemsHierarchySankeyLabel'),
        description: translate('toolbarChartTypeItemsHierarchySankeyDescription'),
        icon: 'diagram-project',
      },
    ],
  },
  {
    key: 'dynamic',
    label: translate('toolbarChartTypeGroupsDynamicLabel'),
    description: translate('toolbarChartTypeGroupsDynamicDescription'),
    items: [
      {
        type: 'raceBar',
        label: translate('toolbarChartTypeItemsRaceBarLabel'),
        description: translate('toolbarChartTypeItemsRaceBarDescription'),
        icon: 'chart-bar',
      },
      {
        type: 'raceColumn',
        label: translate('toolbarChartTypeItemsRaceColumnLabel'),
        description: translate('toolbarChartTypeItemsRaceColumnDescription'),
        icon: 'chart-column',
      },
      {
        type: 'raceLine',
        label: translate('toolbarChartTypeItemsRaceLineLabel'),
        description: translate('toolbarChartTypeItemsRaceLineDescription'),
        icon: 'chart-line',
      },
      {
        type: 'raceScatter',
        label: translate('toolbarChartTypeItemsRaceScatterLabel'),
        description: translate('toolbarChartTypeItemsRaceScatterDescription'),
        icon: 'chart-simple',
      },
      {
        type: 'racePie',
        label: translate('toolbarChartTypeItemsRacePieLabel'),
        description: translate('toolbarChartTypeItemsRacePieDescription'),
        icon: 'chart-pie',
      },
      {
        type: 'raceDonut',
        label: translate('toolbarChartTypeItemsRaceDonutLabel'),
        description: translate('toolbarChartTypeItemsRaceDonutDescription'),
        icon: 'chart-pie',
      },
    ],
  },
]
