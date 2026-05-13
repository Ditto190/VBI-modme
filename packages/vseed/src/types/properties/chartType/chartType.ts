import { z } from 'zod'

export type ChartType =
  | 'table'
  | 'pivotTable'
  // cartesian
  | 'line'
  | 'column'
  | 'columnPercent'
  | 'columnParallel'
  | 'bar'
  | 'barPercent'
  | 'barParallel'
  | 'area'
  | 'areaPercent'
  | 'scatter'
  | 'dualAxis'
  // polar
  | 'rose'
  | 'roseParallel'
  | 'pie'
  | 'donut'
  | 'radar'
  // race
  | 'raceBar'
  | 'raceColumn'
  | 'raceScatter'
  | 'raceLine'
  | 'racePie'
  | 'raceDonut'
  // hierarchy
  | 'treeMap'
  | 'sunburst'
  | 'circlePacking'
  | 'hierarchySankey'
  | 'graphSankey'
  // other
  | 'heatmap'
  | 'funnel'
  | 'boxPlot'
  | 'histogram'

export const zChartType = z.enum([
  'table',
  'pivotTable',
  // cartesian
  'line',
  'column',
  'columnPercent',
  'columnParallel',
  'bar',
  'barPercent',
  'barParallel',
  'raceBar',
  'area',
  'areaPercent',
  'scatter',
  'dualAxis',
  // polar
  'rose',
  'roseParallel',
  'pie',
  'donut',
  'radar',
  // race
  'raceBar',
  'raceColumn',
  'raceScatter',
  'raceLine',
  'racePie',
  'raceDonut',
  // hierarchy
  'treeMap',
  'sunburst',
  'circlePacking',
  'hierarchySankey',
  'graphSankey',
  // other
  'funnel',
  'heatmap',
  'boxPlot',
  'histogram',
])
