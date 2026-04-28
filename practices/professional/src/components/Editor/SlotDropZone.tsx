import { Fragment, type DragEvent, useState } from 'react'
import { FieldToken } from './FieldToken'
import type { ProfessionalLabels } from 'src/config/labels'
import type { FieldSlot, MappedField, SchemaField } from 'src/types'
import { readDraggedRole } from 'src/utils/dragDrop'

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
  const [insertIndex, setInsertIndex] = useState<number | null>(null)
  const isAvailable = acceptsRole(slot, activeRole ?? undefined)
  const isBlocked = Boolean(activeRole && !isAvailable)

  const readInsertIndex = (event: DragEvent<HTMLDivElement>) => {
    const tokens = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('.pro-slot-token'))
    const targetIndex = tokens.findIndex((token) => {
      const rect = token.getBoundingClientRect()
      const isBeforeRow = event.clientY < rect.top + rect.height / 2
      const isSameRowBeforeToken = event.clientY <= rect.bottom && event.clientX < rect.left + rect.width / 2
      return isBeforeRow || isSameRowBeforeToken
    })
    return targetIndex < 0 ? values.length : targetIndex
  }

  return (
    <div
      className={[
        'pro-slot',
        isAvailable ? 'pro-slot--available' : '',
        isBlocked ? 'pro-slot--blocked' : '',
        insertIndex !== null ? 'pro-slot--dragging' : '',
      ].join(' ')}
      data-slot-index={props.slotIndex}
      onDragLeave={() => setInsertIndex(null)}
      onDragOver={(event) => {
        const role = readDraggedRole(event)
        if (!acceptsRole(slot, role)) return
        event.preventDefault()
        setInsertIndex(readInsertIndex(event))
      }}
    >
      <div className='pro-slot__label'>
        <span>{slot.title}</span>
        {isBlocked && <span>{labels.dropUnavailable}</span>}
      </div>
      <div className='pro-slot__body'>
        {values.length ? (
          values.map((value, index) => (
            <Fragment key={value.id}>
              {insertIndex === index && <DropIndexLabel index={index} labels={labels} />}
              <FieldToken item={value} labels={labels} onAction={props.onFieldAction} />
            </Fragment>
          ))
        ) : (
          <em>{labels.dropHere}</em>
        )}
        {insertIndex === values.length && <DropIndexLabel index={values.length} labels={labels} />}
      </div>
    </div>
  )
}

const DropIndexLabel = ({ index, labels }: { index: number; labels: ProfessionalLabels }) => (
  <span className='pro-slot-index'>{`${labels.insertAt} ${index + 1}`}</span>
)
