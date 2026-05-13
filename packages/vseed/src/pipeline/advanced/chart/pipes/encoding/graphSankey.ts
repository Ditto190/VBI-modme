import { unique } from 'remeda'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measures } from 'src/types'

export const defaultEncodingForGraphSankey: AdvancedPipe = (advancedVSeed) => {
  const { dimensions = [], measures = [] } = advancedVSeed
  const encoding: Encoding = {}
  generateDefaultDimensionEncoding(dimensions, encoding)
  generateMeasureEncoding(measures, encoding)
  return { ...advancedVSeed, encoding }
}

export const encodingForGraphSankey: AdvancedPipe = (advancedVSeed) => {
  const { dimensions = [], measures = [] } = advancedVSeed
  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const encoding: Encoding = {}

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding)
  } else {
    generateDefaultDimensionEncoding(dimensions, encoding)
  }

  generateMeasureEncoding(measures, encoding)

  return { ...advancedVSeed, encoding }
}

const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  const uniqueDimIds = unique(dimensions.map((d) => d.id))
  encoding.source = uniqueDimIds.slice(0, 1)
  encoding.target = uniqueDimIds.slice(1)
  encoding.tooltip = uniqueDimIds.slice(0)
  encoding.label = []
  encoding.detail = []
  encoding.row = []
  encoding.column = []
}

const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  encoding.source = unique(dimensions.filter((item) => item.encoding === 'source').map((item) => item.id))
  encoding.target = unique(dimensions.filter((item) => item.encoding === 'target').map((item) => item.id))

  if (encoding.source.length === 0 && dimensions[0]) {
    encoding.source = [dimensions[0].id]
  }
  if (encoding.target.length === 0 && dimensions.length > 1) {
    encoding.target = dimensions.slice(1).map((item) => item.id)
  }

  encoding.tooltip = unique(dimensions.map((item) => item.id))
  encoding.label = unique(dimensions.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.detail = []
  encoding.row = []
  encoding.column = []
}

const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.size = unique(measures.filter((item) => item.encoding === 'size' || !item.encoding).map((item) => item.id))

  const label = unique(measures.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = unique([...(encoding.label || []), ...label])

  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...label, ...tooltip, ...encoding.size])
}
