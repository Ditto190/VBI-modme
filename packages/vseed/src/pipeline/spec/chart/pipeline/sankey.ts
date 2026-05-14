import type { PivotChartSpecPipeline, VChartSpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  colorAdapter,
  colorLegend,
  datasetSankey,
  datasetPivotSankey,
  discreteLegend,
  fontFamilyTheme,
  initSankey,
  initPivot,
  labelSankey,
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
  tooltipSankey,
} from '../pipes'

const sankey: VChartSpecPipeline = [
  fontFamilyTheme,
  initSankey,
  datasetSankey,
  colorAdapter(color, linearColor),
  backgroundColor,
  colorAdapter(discreteLegend, colorLegend),
  tooltipSankey,
  labelSankey,
  sankeyInteractive,
]

const pivotSankey: PivotChartSpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  pivotHideIndicatorName,
  datasetPivotSankey,
  pivotIndicators([
    fontFamilyTheme,
    initSankey,
    datasetSankey,
    colorAdapter(color, linearColor),
    backgroundColor,
    tooltipSankey,
    labelSankey,
    sankeyInteractive,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotTitle,
  colorAdapter(pivotDiscreteLegend, pivotColorLegend),
]

export const sankeySpecPipeline = [pivotAdapter(sankey, pivotSankey)]
