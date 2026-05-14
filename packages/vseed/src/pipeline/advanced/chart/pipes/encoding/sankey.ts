import { unique } from 'remeda'
import { MeasureId } from 'src/dataReshape'
import { hasMultipleMeasureInSingleView } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

export const defaultEncodingForSankey: AdvancedPipe = (advancedVSeed) => {
  const { measures = [], reshapeMeasures = [], dimensions = [] } = advancedVSeed
  const encoding: Encoding = {}
  generateDefaultDimensionEncoding(dimensions, encoding, hasMultipleMeasureInSingleView(reshapeMeasures))
  generateDefaultMeasureEncoding(measures, encoding)
  return { ...advancedVSeed, encoding }
}

export const encodingForSankey: AdvancedPipe = (advancedVSeed) => {
  const { measures = [], reshapeMeasures = [], dimensions = [] } = advancedVSeed

  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)
  const encoding: Encoding = {}
  const hasMulti = hasMultipleMeasureInSingleView(reshapeMeasures)

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding, hasMulti)
  } else {
    generateDefaultDimensionEncoding(dimensions, encoding, hasMulti)
  }

  if (hasMeasureEncoding) {
    generateMeasureEncoding(measures, encoding)
  } else {
    generateDefaultMeasureEncoding(measures, encoding)
  }

  return { ...advancedVSeed, encoding }
}

/**
 * --------------------维度--------------------
 */
const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  const uniqueDimIds = unique(dimensions.map((d) => d.id))
  const sourceTargetDimIds = isMultiMeasure ? uniqueDimIds : uniqueDimIds.filter((d) => d !== MeasureId)

  encoding.source = sourceTargetDimIds.slice(0, 1)
  encoding.target = sourceTargetDimIds.slice(1)
  encoding.color = []
  encoding.detail = []
  encoding.tooltip = uniqueDimIds.filter((d) => d !== MeasureId)
  encoding.label = []
  encoding.row = []
  encoding.column = []
}

const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  // source
  encoding.source = unique(dimensions.filter((item) => item.encoding === 'source').map((item) => item.id))

  // target
  encoding.target = unique(dimensions.filter((item) => item.encoding === 'target').map((item) => item.id))

  if (encoding.source.length === 0 && dimensions[0]) {
    encoding.source = [dimensions[0].id]
  }
  if (isMultiMeasure && !encoding.source.includes(MeasureId) && !encoding.target.includes(MeasureId)) {
    encoding.target.push(MeasureId)
  }

  // detail
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))

  // tooltip
  encoding.tooltip = unique(dimensions.map((item) => item.id)).filter((d) => d !== MeasureId)

  // label
  encoding.label = unique(dimensions.filter((item) => item.encoding === 'label').map((item) => item.id))

  encoding.row = unique(dimensions.filter((item) => item.encoding === 'row').map((item) => item.id))
  encoding.column = unique(dimensions.filter((item) => item.encoding === 'column').map((item) => item.id))
}

/**
 * --------------------指标--------------------
 */
const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.size = unique(measures.filter((item) => item.encoding === 'size' || !item.encoding).map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...measures.map((m) => m.id)])
}

const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  // size
  encoding.size = unique(measures.filter((item) => item.encoding === 'size' || !item.encoding).map((item) => item.id))

  // label
  const label = unique(measures.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = unique([...(encoding.label || []), ...label])

  // tooltip
  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...label, ...tooltip, ...encoding.size])

  // detail
  const detail = unique(measures.filter((item) => item.encoding === 'detail').map((item) => item.id))
  encoding.detail = unique([...(encoding.detail || []), ...detail])
}
