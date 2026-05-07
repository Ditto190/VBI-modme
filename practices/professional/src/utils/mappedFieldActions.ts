import type { VBIChartBuilder } from '@visactor/vbi'
import type { ProfessionalLabels } from 'src/config/labels'
import type { MappedField } from 'src/types'
import { removeMappedField, setMappedAggregate, setMappedSort, setMeasureFormat } from './fieldMutations'
import { openRenameModal } from './openRenameModal'

export const runMappedFieldAction = (
  builder: VBIChartBuilder,
  labels: ProfessionalLabels,
  item: MappedField,
  action: string,
) => {
  if (action === 'delete') removeMappedField(builder, item)
  if (action === 'rename') openRenameModal(builder, item, labels)
  if (action.startsWith('aggregate:')) setMappedAggregate(builder, item, action.replace('aggregate:', ''))
  if (action.startsWith('sort:')) setMappedSort(builder, item, action.replace('sort:', ''))
  if (action.startsWith('format:')) setMeasureFormat(builder, item, action.replace('format:', ''))
}
