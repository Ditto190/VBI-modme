import type { VBIDimension, VBIMeasure } from '@visactor/vbi'
import type { SchemaField } from 'src/types'

export type SelectedMapping = {
  item: VBIDimension | VBIMeasure
  role: SchemaField['role']
  roleIndex: number
}

export const getSlotSelection = (params: {
  dimensions: VBIDimension[]
  dimensionEncoding?: VBIDimension['encoding']
  measureEncoding?: VBIMeasure['encoding']
  measures: VBIMeasure[]
}) => {
  const selectedMeasures = params.measureEncoding
    ? params.measures.filter((measure) => measure.encoding === params.measureEncoding)
    : []
  const selectedDimensions = params.dimensionEncoding
    ? params.dimensions.filter((dimension) => dimension.encoding === params.dimensionEncoding)
    : []

  return [
    ...selectedMeasures.map((item, roleIndex) => ({ item, role: 'measure' as const, roleIndex })),
    ...selectedDimensions.map((item, roleIndex) => ({ item, role: 'dimension' as const, roleIndex })),
  ]
}

export const getRoleCount = (selected: SelectedMapping[], role: SchemaField['role']) => {
  return selected.filter((item) => item.role === role).length
}
