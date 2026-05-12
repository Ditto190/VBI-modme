import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  annotation,
  encodingForHierarchy,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForHierarchy,
  pickDimensionsForReshape,
  page,
  hierarchySankeyConfig,
  reshapeWithHierarchySankeyEncoding,
} from '../pipes'

export const hierarchySankeyAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['size', 'detail']), defaultEncodingForHierarchy],
    [buildMeasures(['size', 'detail']), encodingForHierarchy, pickDimensionsForReshape],
  ),
  reshapeWithHierarchySankeyEncoding,

  hierarchySankeyConfig,
  theme,
  annotation,
]
