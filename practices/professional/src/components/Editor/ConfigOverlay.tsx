import type { VBIChartDSL, VBIChartBuilder } from '@visactor/vbi'
import { FieldToken } from './FieldToken'
import { SlotDropZone } from './SlotDropZone'
import type { ProfessionalLabels } from 'src/config/labels'
import type { FieldSlot, MappedField, SchemaField } from 'src/types'
import { getMappedFields } from 'src/utils/mappedFields'
import { runMappedFieldAction } from 'src/utils/mappedFieldActions'

type ConfigOverlayProps = {
  active: boolean
  activeRole?: SchemaField['role'] | null
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  fields: SchemaField[]
  labels: ProfessionalLabels
  slots: FieldSlot[]
}

const valuesForSlot = (items: MappedField[], slot: FieldSlot) =>
  items.filter((item) => item.encoding === slot.dimensionEncoding || item.encoding === slot.measureEncoding)

const unmatchedValues = (items: MappedField[], slots: FieldSlot[]) => {
  const encodings = new Set<string>()
  slots.forEach((slot) => {
    if (slot.dimensionEncoding) encodings.add(slot.dimensionEncoding)
    if (slot.measureEncoding) encodings.add(slot.measureEncoding)
  })
  return items.filter((item) => !item.encoding || !encodings.has(item.encoding))
}

export const ConfigOverlay = (props: ConfigOverlayProps) => {
  const mappedItems = getMappedFields(props.dsl, props.fields)
  const unmatchedItems = unmatchedValues(mappedItems, props.slots)
  const runAction = (item: MappedField, action: string) =>
    runMappedFieldAction(props.builder, props.labels, item, action)

  return (
    <div className={`pro-config ${props.active ? 'pro-config--active' : ''}`}>
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
            onFieldAction={runAction}
          />
        ))}
      </div>
      {unmatchedItems.length > 0 && !props.active && (
        <div className='pro-config__unmatched'>
          <span className='pro-config__unmatched-label'>{props.labels.unmatchedFields}</span>
          <div className='pro-config__unmatched-list'>
            {unmatchedItems.map((item) => (
              <FieldToken item={item} key={item.id} labels={props.labels} onAction={runAction} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
