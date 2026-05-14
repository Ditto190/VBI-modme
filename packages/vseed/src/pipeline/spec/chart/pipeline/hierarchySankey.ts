import type { PivotChartSpecPipeline, VChartSpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  colorAdapter,
  colorLegend,
  datasetHierarchySankey,
  datasetPivotHierarchySankey,
  discreteLegend,
  fontFamilyTheme,
  initHierarchySankey,
  initPivot,
  labelHierarchySankey,
  linearColor,
  pivotAdapter,
  pivotColorLegend,
  pivotColumnDimensions,
  pivotDiscreteLegend,
  pivotGridStyle,
  pivotHideIndicatorName,
  pivotIndicators,
  pivotIndicatorsAsCol,
  pivotRowDimensions,
  pivotTitle,
  sankeyInteractive,
  tooltipHierarchySankey,
} from '../pipes'

const hierarchySankey: VChartSpecPipeline = [
  fontFamilyTheme,
  initHierarchySankey,
  datasetHierarchySankey,
  colorAdapter(color, linearColor),
  backgroundColor,
  colorAdapter(discreteLegend, colorLegend),
  tooltipHierarchySankey,
  labelHierarchySankey,
  sankeyInteractive,
]

const pivotHierarchySankey: PivotChartSpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  pivotHideIndicatorName,
  datasetPivotHierarchySankey,
  pivotIndicators([
    fontFamilyTheme,
    initHierarchySankey,
    datasetHierarchySankey,
    colorAdapter(color, linearColor),
    backgroundColor,
    tooltipHierarchySankey,
    labelHierarchySankey,
    sankeyInteractive,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotTitle,
  colorAdapter(pivotDiscreteLegend, pivotColorLegend),
]

export const hierarchySankeySpecPipeline = [pivotAdapter(hierarchySankey, pivotHierarchySankey)]
