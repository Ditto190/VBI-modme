import {
  ApartmentOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  DotChartOutlined,
  FunnelPlotOutlined,
  FundProjectionScreenOutlined,
  HeatMapOutlined,
  LineChartOutlined,
  NodeIndexOutlined,
  PartitionOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  TableOutlined,
} from '@ant-design/icons-svg'
import { type MenuItem } from 'src/components'

export const CHART_TYPE: MenuItem[] = [
  {
    isTitle: true,
    label: 'toolbarChartTypePanelTitle',
  },
  {
    label: 'toolbarChartTypeGroupsTableLabel',
    description: 'toolbarChartTypeGroupsTableDescription',
    children: [
      {
        label: 'toolbarChartTypeItemsTableLabel',
        description: 'toolbarChartTypeItemsTableDescription',
        icon: TableOutlined,
        value: 'table',
      },
      {
        label: 'toolbarChartTypeItemsPivotTableLabel',
        description: 'toolbarChartTypeItemsPivotTableDescription',
        icon: PartitionOutlined,
        value: 'pivotTable',
      },
    ],
  },
  {
    label: 'toolbarChartTypeGroupsComparisonLabel',
    description: 'toolbarChartTypeGroupsComparisonDescription',
    children: [
      {
        label: 'toolbarChartTypeItemsColumnLabel',
        description: 'toolbarChartTypeItemsColumnDescription',
        icon: BarChartOutlined,
        value: 'column',
      },
      {
        label: 'toolbarChartTypeItemsColumnParallelLabel',
        description: 'toolbarChartTypeItemsColumnParallelDescription',
        icon: FundProjectionScreenOutlined,
        value: 'columnParallel',
      },
      {
        label: 'toolbarChartTypeItemsColumnPercentLabel',
        description: 'toolbarChartTypeItemsColumnPercentDescription',
        icon: DashboardOutlined,
        value: 'columnPercent',
      },
      {
        label: 'toolbarChartTypeItemsBarLabel',
        description: 'toolbarChartTypeItemsBarDescription',
        icon: BarChartOutlined,
        value: 'bar',
      },
      {
        label: 'toolbarChartTypeItemsBarParallelLabel',
        description: 'toolbarChartTypeItemsBarParallelDescription',
        icon: FundProjectionScreenOutlined,
        value: 'barParallel',
      },
      {
        label: 'toolbarChartTypeItemsBarPercentLabel',
        description: 'toolbarChartTypeItemsBarPercentDescription',
        icon: DashboardOutlined,
        value: 'barPercent',
      },
      {
        label: 'toolbarChartTypeItemsDualAxisLabel',
        description: 'toolbarChartTypeItemsDualAxisDescription',
        icon: FundProjectionScreenOutlined,
        value: 'dualAxis',
      },
    ],
  },
  {
    label: 'toolbarChartTypeGroupsTrendLabel',
    description: 'toolbarChartTypeGroupsTrendDescription',
    children: [
      {
        label: 'toolbarChartTypeItemsLineLabel',
        description: 'toolbarChartTypeItemsLineDescription',
        icon: LineChartOutlined,
        value: 'line',
      },
      {
        label: 'toolbarChartTypeItemsAreaLabel',
        description: 'toolbarChartTypeItemsAreaDescription',
        icon: AreaChartOutlined,
        value: 'area',
      },
      {
        label: 'toolbarChartTypeItemsAreaPercentLabel',
        description: 'toolbarChartTypeItemsAreaPercentDescription',
        icon: AreaChartOutlined,
        value: 'areaPercent',
      },
    ],
  },
  {
    label: 'toolbarChartTypeGroupsProportionLabel',
    description: 'toolbarChartTypeGroupsProportionDescription',
    children: [
      {
        label: 'toolbarChartTypeItemsPieLabel',
        description: 'toolbarChartTypeItemsPieDescription',
        icon: PieChartOutlined,
        value: 'pie',
      },
      {
        label: 'toolbarChartTypeItemsDonutLabel',
        description: 'toolbarChartTypeItemsDonutDescription',
        icon: PieChartOutlined,
        value: 'donut',
      },
      {
        label: 'toolbarChartTypeItemsRoseLabel',
        description: 'toolbarChartTypeItemsRoseDescription',
        icon: PieChartOutlined,
        value: 'rose',
      },
      {
        label: 'toolbarChartTypeItemsRoseParallelLabel',
        description: 'toolbarChartTypeItemsRoseParallelDescription',
        icon: RadarChartOutlined,
        value: 'roseParallel',
      },
      {
        label: 'toolbarChartTypeItemsFunnelLabel',
        description: 'toolbarChartTypeItemsFunnelDescription',
        icon: FunnelPlotOutlined,
        value: 'funnel',
      },
    ],
  },
  {
    label: 'toolbarChartTypeGroupsDistributionLabel',
    description: 'toolbarChartTypeGroupsDistributionDescription',
    children: [
      {
        label: 'toolbarChartTypeItemsScatterLabel',
        description: 'toolbarChartTypeItemsScatterDescription',
        icon: DotChartOutlined,
        value: 'scatter',
      },
      {
        label: 'toolbarChartTypeItemsHeatmapLabel',
        description: 'toolbarChartTypeItemsHeatmapDescription',
        icon: HeatMapOutlined,
        value: 'heatmap',
      },
      {
        label: 'toolbarChartTypeItemsRadarLabel',
        description: 'toolbarChartTypeItemsRadarDescription',
        icon: RadarChartOutlined,
        value: 'radar',
      },
    ],
  },
  {
    label: 'toolbarChartTypeGroupsHierarchyLabel',
    description: 'toolbarChartTypeGroupsHierarchyDescription',
    children: [
      {
        label: 'toolbarChartTypeItemsTreeMapLabel',
        description: 'toolbarChartTypeItemsTreeMapDescription',
        icon: ApartmentOutlined,
        value: 'treeMap',
      },
      {
        label: 'toolbarChartTypeItemsSunburstLabel',
        description: 'toolbarChartTypeItemsSunburstDescription',
        icon: DeploymentUnitOutlined,
        value: 'sunburst',
      },
      {
        label: 'toolbarChartTypeItemsCirclePackingLabel',
        description: 'toolbarChartTypeItemsCirclePackingDescription',
        icon: NodeIndexOutlined,
        value: 'circlePacking',
      },
      {
        label: 'toolbarChartTypeItemsSankeyLabel',
        description: 'toolbarChartTypeItemsSankeyDescription',
        icon: NodeIndexOutlined,
        value: 'sankey',
      },
      {
        label: 'toolbarChartTypeItemsHierarchySankeyLabel',
        description: 'toolbarChartTypeItemsHierarchySankeyDescription',
        icon: NodeIndexOutlined,
        value: 'hierarchySankey',
      },
    ],
  },
  {
    label: 'toolbarChartTypeGroupsDynamicLabel',
    description: 'toolbarChartTypeGroupsDynamicDescription',
    children: [
      {
        label: 'toolbarChartTypeItemsRaceBarLabel',
        description: 'toolbarChartTypeItemsRaceBarDescription',
        icon: BarChartOutlined,
        value: 'raceBar',
      },
      {
        label: 'toolbarChartTypeItemsRaceColumnLabel',
        description: 'toolbarChartTypeItemsRaceColumnDescription',
        icon: BarChartOutlined,
        value: 'raceColumn',
      },
      {
        label: 'toolbarChartTypeItemsRaceLineLabel',
        description: 'toolbarChartTypeItemsRaceLineDescription',
        icon: LineChartOutlined,
        value: 'raceLine',
      },
      {
        label: 'toolbarChartTypeItemsRaceScatterLabel',
        description: 'toolbarChartTypeItemsRaceScatterDescription',
        icon: DotChartOutlined,
        value: 'raceScatter',
      },
      {
        label: 'toolbarChartTypeItemsRacePieLabel',
        description: 'toolbarChartTypeItemsRacePieDescription',
        icon: PieChartOutlined,
        value: 'racePie',
      },
      {
        label: 'toolbarChartTypeItemsRaceDonutLabel',
        description: 'toolbarChartTypeItemsRaceDonutDescription',
        icon: PieChartOutlined,
        value: 'raceDonut',
      },
    ],
  },
]

export const findChartTypeByValue = (value?: string): MenuItem | undefined => {
  if (!value) return undefined
  for (const group of CHART_TYPE) {
    if (group.children) {
      const foundItem = group.children.find((item) => item.value === value)
      if (foundItem) return foundItem
    } else if (group.value === value) {
      return group
    }
  }
  return undefined
}
