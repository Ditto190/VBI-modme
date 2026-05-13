import type { AdvancedPipeline } from 'src/types'
import {
  buildMeasures,
  defaultDimensions,
  defaultMeasureId,
  defaultMeasures,
  encodingAdapter,
  encodingForGraphSankey,
  defaultEncodingForGraphSankey,
  graphSankeyConfig,
  initAdvancedVSeed,
  page,
  pivotAdapter,
  pivotReshapeWithGraphSankeyEncoding,
  reshapeWithGraphSankeyEncoding,
  theme,
  annotation,
} from '../pipes'

export const graphSankeyAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['size', 'detail']), defaultEncodingForGraphSankey],
    [buildMeasures(['size', 'detail']), encodingForGraphSankey],
  ),
  pivotAdapter([reshapeWithGraphSankeyEncoding], [pivotReshapeWithGraphSankeyEncoding]),

  graphSankeyConfig,
  theme,
  annotation,
]
