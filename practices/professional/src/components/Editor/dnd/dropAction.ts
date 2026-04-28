import type { VBIChartBuilder } from '@visactor/vbi'
import type { ProfessionalDragPayload, SlotDropPayload } from 'src/types/dnd'
import { addOrMoveField, reorderMappedField } from 'src/utils/mappingActions'

export const applyDrop = (
  builder: VBIChartBuilder,
  dragPayload: ProfessionalDragPayload,
  dropPayload: SlotDropPayload,
) => {
  if (dragPayload.kind === 'schema-field') {
    if (dropPayload.slot.accepts.includes(dragPayload.field.role)) {
      addOrMoveField(builder, dragPayload.field, dropPayload.slot, dropPayload.insertIndex)
    }
    return
  }

  if (dropPayload.slot.accepts.includes(dragPayload.item.role)) {
    reorderMappedField(builder, {
      id: dragPayload.item.id,
      insertIndex: dropPayload.insertIndex,
      role: dragPayload.item.role,
      slot: dropPayload.slot,
    })
  }
}
