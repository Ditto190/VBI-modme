import type { VBIChartDSL, VBIChartBuilder } from '@visactor/vbi'
import { ConfigFieldEditor } from './ConfigFieldEditor'
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
  showEditor: boolean
  slots: FieldSlot[]
}

const valuesForSlot = (items: MappedField[], slot: FieldSlot) =>
  items.filter((item) => item.encoding === slot.dimensionEncoding || item.encoding === slot.measureEncoding)

export const ConfigOverlay = (props: ConfigOverlayProps) => {
  const mappedItems = getMappedFields(props.dsl, props.fields)

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
