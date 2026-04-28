import type { VBIChartDSL, VBIChartBuilder } from '@visactor/vbi'
import type { DragEvent } from 'react'
import { ConfigFieldEditor } from './ConfigFieldEditor'
import { SlotDropZone } from './SlotDropZone'
import type { ProfessionalLabels } from 'src/config/labels'
import type { FieldSlot, MappedField, SchemaField } from 'src/types'
import { readDraggedField, readDraggedToken } from 'src/utils/dragDrop'
import { addRecommendedField } from 'src/utils/fieldActions'
import { addOrMoveField, reorderMappedField } from 'src/utils/mappingActions'
import { getMappedFields } from 'src/utils/mappedFields'
import { runMappedFieldAction } from 'src/utils/mappedFieldActions'

type ConfigOverlayProps = {
  active: boolean
  activeRole?: SchemaField['role'] | null
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  fields: SchemaField[]
  labels: ProfessionalLabels
  onDropComplete: () => void
  showEditor: boolean
  slots: FieldSlot[]
}

const valuesForSlot = (items: MappedField[], slot: FieldSlot) =>
  items.filter((item) => item.encoding === slot.dimensionEncoding || item.encoding === slot.measureEncoding)

const readInsertIndex = (event: DragEvent, slotElement: HTMLElement) => {
  const tokens = Array.from(slotElement.querySelectorAll<HTMLElement>('.pro-slot-token'))
  const targetIndex = tokens.findIndex((token) => {
    const rect = token.getBoundingClientRect()
    return event.clientY < rect.top + rect.height / 2 || event.clientX < rect.left + rect.width / 2
  })
  return targetIndex < 0 ? tokens.length : targetIndex
}

export const ConfigOverlay = (props: ConfigOverlayProps) => {
  const mappedItems = getMappedFields(props.dsl, props.fields)
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const slotElement = (event.target as HTMLElement).closest<HTMLElement>('.pro-slot')
    if (slotElement) {
      dropOnSlot(props, mappedItems, event, slotElement)
      return
    }
    const field = readDraggedField(event, props.fields)
    if (field) props.builder.doc.transact(() => addRecommendedField(props.builder, props.dsl, field))
    props.onDropComplete()
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLElement).closest('.pro-slot')) event.preventDefault()
  }

  return (
    <div
      className={`pro-config ${props.active ? 'pro-config--active' : ''}`}
      onDragOver={handleDragOver}
      onDropCapture={handleDrop}
    >
      <div className='pro-config__head'>
        <strong>{props.labels.config}</strong>
        <span>{props.active ? props.labels.dragHint : props.labels.emptyChart}</span>
      </div>
      <div className='pro-config__slots'>
        {props.slots.map((slot, index) => (
          <SlotDropZone
            activeRole={props.activeRole}
            key={`${slot.dimensionEncoding ?? ''}-${slot.measureEncoding ?? ''}`}
            labels={props.labels}
            slot={slot}
            slotIndex={index}
            values={valuesForSlot(mappedItems, slot)}
            onFieldAction={(item, action) => runMappedFieldAction(props.builder, props.labels, item, action)}
          />
        ))}
      </div>
      {props.showEditor && !props.active && (
        <ConfigFieldEditor builder={props.builder} items={mappedItems} labels={props.labels} />
      )}
    </div>
  )
}

const dropOnSlot = (
  props: ConfigOverlayProps,
  mappedItems: MappedField[],
  event: DragEvent<HTMLDivElement>,
  slotElement: HTMLElement,
) => {
  const slot = props.slots[Number(slotElement.dataset.slotIndex)]
  if (!slot) return props.onDropComplete()
  const insertIndex = readInsertIndex(event, slotElement)
  const token = readDraggedToken(event)
  const item = mappedItems.find((value) => value.id === token?.id)
  if (token && slot.accepts.includes(token.role) && item) {
    reorderMappedField(props.builder, { id: item.id, insertIndex, role: item.role, slot })
  }
  const field = readDraggedField(event, props.fields)
  if (field && slot.accepts.includes(field.role)) addOrMoveField(props.builder, field, slot, insertIndex)
  props.onDropComplete()
}
