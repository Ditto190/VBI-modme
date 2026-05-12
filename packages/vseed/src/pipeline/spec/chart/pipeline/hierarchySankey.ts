import type { VChartSpecPipeline } from 'src/types'
import {
  backgroundColor,
  datasetHierarchySankey,
  fontFamilyTheme,
  hierarchySankeyColor,
  hierarchySankeyInteractive,
  hierarchySankeyLegend,
  initHierarchySankey,
  label,
  tooltipHierarchySankey,
} from '../pipes'

export const hierarchySankeySpecPipeline: VChartSpecPipeline = [
  fontFamilyTheme,
  initHierarchySankey,
  datasetHierarchySankey,
  hierarchySankeyColor,
  backgroundColor,
  hierarchySankeyLegend,
  tooltipHierarchySankey,
  label,
  hierarchySankeyInteractive,
]
