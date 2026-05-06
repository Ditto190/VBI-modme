import { FieldToken } from './FieldToken'
import { SlotDropTarget } from './dnd/SlotDropTarget'
import type { ProfessionalLabels } from 'src/config/labels'
import type { FieldSlot, MappedField, SchemaField } from 'src/types'

type SlotFieldTokenProps = {
  activeRole: SchemaField['role'] | null
  index: number
  item: MappedField
  itemCount: number
  labels: ProfessionalLabels
  onFieldAction: (item: MappedField, action: string) => void
  slot: FieldSlot
  slotIndex: number
}

export const SlotFieldToken = (props: SlotFieldTokenProps) => {
  const { activeRole, index, item, itemCount, labels, slot, slotIndex } = props
  const encoding = item.encoding ?? slot.dimensionEncoding ?? slot.measureEncoding

  return (
    <span className='pro-slot-token-frame'>
      <SlotDropTarget
        activeRole={activeRole}
        insertIndex={index}
        itemCount={itemCount}
        slot={slot}
        slotIndex={slotIndex}
        zone={index === 0 ? 'head' : 'before'}
      />
      <FieldToken
        dragId={`slot-${slotIndex}-token-${item.id}`}
        item={item}
        labels={labels}
        sourceEncoding={encoding}
        sourceIndex={index}
        sourceSlotIndex={slotIndex}
        slotTokenIndex={index}
        onAction={props.onFieldAction}
      />
    </span>
  )
}
