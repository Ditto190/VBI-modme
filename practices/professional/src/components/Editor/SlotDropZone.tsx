import { SlotFieldToken } from './SlotFieldToken'
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

  return (
    <div
      className={[
        'pro-slot',
        isAvailable ? 'pro-slot--available' : '',
        isBlocked ? 'pro-slot--blocked' : '',
        activeRole ? 'pro-slot--dragging' : '',
      ].join(' ')}
      data-slot-index={props.slotIndex}
    >
      <div className='pro-slot__label'>
        <span>{slot.title}</span>
        {isBlocked && <span>{labels.dropUnavailable}</span>}
      </div>
      <div className='pro-slot__body'>
        {values.length ? (
          <>
            {values.map((value, index) => (
              <SlotFieldToken
                activeRole={activeRole ?? null}
                index={index}
                item={value}
                itemCount={values.length}
                key={value.id}
                labels={labels}
                slot={slot}
                slotIndex={props.slotIndex}
                onFieldAction={props.onFieldAction}
              />
            ))}
          </>
        ) : (
          <SlotDropTarget
            activeRole={activeRole ?? null}
            insertIndex={0}
            itemCount={0}
            slot={slot}
            slotIndex={props.slotIndex}
            zone='empty'
          >
            {labels.dropHere}
          </SlotDropTarget>
        )}
        {values.length > 0 && (
          <SlotDropTarget
            activeRole={activeRole ?? null}
            insertIndex={values.length}
            itemCount={values.length}
            slot={slot}
            slotIndex={props.slotIndex}
            zone='tail'
          />
        )}
      </div>
    </div>
  )
}
