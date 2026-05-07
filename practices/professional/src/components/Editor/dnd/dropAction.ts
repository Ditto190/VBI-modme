import type { VBIChartBuilder } from '@visactor/vbi'
import type { ProfessionalDragPayload, SlotDropPayload } from 'src/types/dnd'
import { addOrMoveField, reorderMappedField } from 'src/utils/mappingActions'
import { resolveProfessionalDropAction } from './dropLogic'

export const applyDrop = (
  builder: VBIChartBuilder,
  dragPayload: ProfessionalDragPayload,
  dropPayload: SlotDropPayload,
) => {
  const action = resolveProfessionalDropAction({ dragPayload, dropPayload })
  if (action.type === 'none') return

  if (action.type === 'add-field') {
    addOrMoveField(builder, action.field, action.slot, action.insertIndex)
    return
  }

  reorderMappedField(builder, {
    id: action.id,
    insertIndex: action.insertIndex,
    role: action.role,
    slot: action.slot,
  })
}
