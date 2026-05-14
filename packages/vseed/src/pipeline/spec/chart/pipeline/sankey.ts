import type { PivotChartSpecPipeline, VChartSpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  colorAdapter,
  datasetSankey,
  datasetPivotSankey,
  fontFamilyTheme,
  initSankey,
  initPivot,
  labelSankey,
  linearColor,
  pivotAdapter,
  pivotColumnDimensions,
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
]

export const sankeySpecPipeline = [pivotAdapter(sankey, pivotSankey)]
