import { CalendarOutlined, FontSizeOutlined, NumberOutlined } from '@ant-design/icons'
import type { EditorField, FieldRole } from 'src/types'
import { clearDragPayload, writeFieldDrag } from 'src/utils/fields'

type FieldGroupProps = {
  fields: EditorField[]
  label: string
  role: FieldRole
  selectedFields: Set<string>
  onToggleField: (field: EditorField) => void
}

const getIcon = (field: EditorField) => {
  if (field.role === 'measure') return <NumberOutlined />
  if (field.isDate) return <CalendarOutlined />
  return <FontSizeOutlined />
}

const FieldButton = (props: { field: EditorField; selected: boolean; onToggleField: (field: EditorField) => void }) => (
  <button
    className={`mini-field mini-field--${props.field.role}${props.selected ? ' mini-field--selected' : ''}`}
    draggable
    type='button'
    onClick={() => props.onToggleField(props.field)}
    onDragEnd={clearDragPayload}
    onDragStart={(event) => writeFieldDrag(event, props.field)}
  >
    <span className='mini-field-icon'>{getIcon(props.field)}</span>
    <span className='mini-field-name'>{props.field.name}</span>
    <span className='mini-field-type'>{props.field.type}</span>
  </button>
)

export const FieldGroup = (props: FieldGroupProps) => (
  <section className={`mini-field-group mini-field-group--${props.role}`}>
    <div className='mini-section-title'>
      <span className='mini-field-group-title'>{props.label}</span>
      <span className='mini-field-group-actions'>
        <span className='mini-field-count'>{props.fields.length}</span>
      </span>
    </div>
    <div className='mini-field-list'>
      {props.fields.map((field) => (
        <FieldButton
          field={field}
          key={field.name}
          selected={props.selectedFields.has(field.name)}
          onToggleField={props.onToggleField}
        />
      ))}
    </div>
  </section>
)
