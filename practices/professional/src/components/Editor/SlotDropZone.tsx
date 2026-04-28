import { Fragment } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { FieldToken } from './FieldToken'
import { SlotDropTarget } from './dnd/SlotDropTarget'
import type { ProfessionalLabels } from 'src/config/labels'
import type { FieldSlot, MappedField, SchemaField } from 'src/types'

type SlotDropZoneProps = {
  activeRole?: SchemaField['role'] | null
  labels: ProfessionalLabels
  onFieldAction: (item: MappedField, action: string) => void
  slot: FieldSlot
  slotIndex: number
  values: MappedField[]
}

const acceptsRole = (slot: FieldSlot, role: SchemaField['role'] | undefined) =>
  Boolean(role && slot.accepts.includes(role))

export const SlotDropZone = (props: SlotDropZoneProps) => {
  const { activeRole, labels, slot, values } = props
  const isAvailable = acceptsRole(slot, activeRole ?? undefined)
  const isBlocked = Boolean(activeRole && !isAvailable)
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${props.slotIndex}-slot`,
    data: { insertIndex: values.length, kind: 'slot-insert', slot, slotIndex: props.slotIndex, target: 'slot' },
    disabled: !isAvailable,
  })

  return (
    <div
      className={[
        'pro-slot',
        isAvailable ? 'pro-slot--available' : '',
        isBlocked ? 'pro-slot--blocked' : '',
        activeRole ? 'pro-slot--dragging' : '',
        isOver ? 'pro-slot--over' : '',
      ].join(' ')}
      data-slot-index={props.slotIndex}
      ref={setNodeRef}
    >
      <div className='pro-slot__label'>
        <span>{slot.title}</span>
        {isBlocked && <span>{labels.dropUnavailable}</span>}
      </div>
      <div className='pro-slot__body'>
        {values.length ? (
          values.map((value, index) => (
            <Fragment key={value.id}>
              <SlotDropTarget
                activeRole={activeRole ?? null}
                insertIndex={index}
                slot={slot}
                slotIndex={props.slotIndex}
              />
              <FieldToken
                dragId={`slot-${props.slotIndex}-token-${value.id}`}
                item={value}
                labels={labels}
                slotTokenIndex={index}
                onAction={props.onFieldAction}
              />
            </Fragment>
          ))
        ) : (
          <SlotDropTarget activeRole={activeRole ?? null} insertIndex={0} slot={slot} slotIndex={props.slotIndex}>
            {labels.dropHere}
          </SlotDropTarget>
        )}
        {values.length > 0 && (
          <SlotDropTarget
            activeRole={activeRole ?? null}
            insertIndex={values.length}
            slot={slot}
            slotIndex={props.slotIndex}
          />
        )}
      </div>
    </div>
  )
}
