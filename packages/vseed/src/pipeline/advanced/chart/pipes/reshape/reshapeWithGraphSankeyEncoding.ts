import { Separator } from 'src/dataReshape'
import type { AdvancedPipe, AdvancedVSeed, Datum, Dimension, GraphSankey } from 'src/types'

const SourceField = '__Dim_Source__'
const TargetField = '__Dim_Target__'

const mergeDimensionValues = (datum: Datum, dimensions: Dimension[]) => {
  return dimensions
    .map((dimension) => datum[dimension.id])
    .filter((value) => value !== undefined && value !== null && value !== '')
    .map((value) => String(value))
    .join(Separator)
}

const createStatistics = (values: number[]) => {
  if (values.length === 0) {
    return {
      min: 0,
      max: 0,
      sum: 0,
      count: 0,
      colorMin: 0,
      colorMax: 0,
    }
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
    sum: values.reduce((sum, value) => sum + value, 0),
    count: values.length,
    colorMin: 0,
    colorMax: 0,
  }
}

export const reshapeWithGraphSankeyEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as GraphSankey
  const { dimensions = [], measures = [], encoding = {} } = advancedVSeed

  const sourceDimensions = dimensions.filter((dimension) => (encoding.source || []).includes(dimension.id))
  const targetDimensions = dimensions.filter((dimension) => (encoding.target || []).includes(dimension.id))
  const sizeField = encoding.size?.[0] || measures[0]?.id || ''
  const sizeMeasure = measures.find((measure) => measure.id === sizeField)

  const mergedDataset: Datum[] = (dataset || []).map((datum) => ({
    ...datum,
    [SourceField]: mergeDimensionValues(datum, sourceDimensions),
    [TargetField]: mergeDimensionValues(datum, targetDimensions),
  }))

  const values = mergedDataset.map((datum) => Number(datum[sizeField] ?? 0)).filter((value) => !Number.isNaN(value))

  return {
    ...result,
    dataset: mergedDataset,
    datasetReshapeInfo: [
      {
        id: String(chartType),
        index: 0,
        foldInfo: {
          foldMap: sizeField ? { [sizeField]: sizeMeasure?.alias ?? sizeField } : {},
          statistics: createStatistics(values),
          measureId: sizeField || '__MeaId__',
          measureName: sizeMeasure?.alias ?? (sizeField || '__MeaName__'),
          measureValue: sizeField || '__MeaValue__',
        },
        unfoldInfo: {
          encodingX: '',
          encodingY: '',
          encodingColor: '',
          encodingColorId: '',
          encodingDetail: '',
          encodingAngle: '',
          encodingPlayer: '',
          encodingHierarchy: '',
          encodingSource: SourceField,
          encodingTarget: TargetField,
          colorItems: [],
          colorIdMap: {},
        },
      },
    ],
  } as unknown as AdvancedVSeed
}
