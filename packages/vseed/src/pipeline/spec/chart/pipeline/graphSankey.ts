import type { PivotChartSpecPipeline, VChartSpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  colorAdapter,
  colorLegend,
  datasetGraphSankey,
  datasetPivotGraphSankey,
  discreteLegend,
  fontFamilyTheme,
  initGraphSankey,
  initPivot,
  labelGraphSankey,
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
  tooltipGraphSankey,
} from '../pipes'

const graphSankey: VChartSpecPipeline = [
  fontFamilyTheme,
  initGraphSankey,
  datasetGraphSankey,
  colorAdapter(color, linearColor),
  backgroundColor,
  colorAdapter(discreteLegend, colorLegend),
  tooltipGraphSankey,
  labelGraphSankey,
  sankeyInteractive,
]

const pivotGraphSankey: PivotChartSpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  pivotHideIndicatorName,
  datasetPivotGraphSankey,
  pivotIndicators([
    fontFamilyTheme,
    initGraphSankey,
    datasetGraphSankey,
    colorAdapter(color, linearColor),
    backgroundColor,
    tooltipGraphSankey,
    labelGraphSankey,
    sankeyInteractive,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotTitle,
  colorAdapter(pivotDiscreteLegend, pivotColorLegend),
]

export const graphSankeySpecPipeline = [pivotAdapter(graphSankey, pivotGraphSankey)]
