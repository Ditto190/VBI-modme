import { CalendarOutlined, DownOutlined, FontSizeOutlined, NumberOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useMemo, useState } from 'react'
import type { ProfessionalLabels } from 'src/config/labels'
import type { SchemaField } from 'src/types'
import { createSchemaFieldDragPayload } from './dnd/dragPayload'
import { useProfessionalDnd } from './dnd/ProfessionalDndProvider'
import { useProfessionalDraggable } from './dnd/useProfessionalDraggable'

type FieldGroupProps = {
  fields: SchemaField[]
  labels: ProfessionalLabels
  title: string
  onAddField: (field: SchemaField) => void
}

const COLLAPSED_COUNT = 10

export const FieldGroup = ({ fields, labels, title, onAddField }: FieldGroupProps) => {
  const [expanded, setExpanded] = useState(false)
  const canCollapse = fields.length > COLLAPSED_COUNT
  const visibleFields = useMemo(
    () => (canCollapse && !expanded ? fields.slice(0, COLLAPSED_COUNT) : fields),
    [canCollapse, expanded, fields],
  )

  return (
    <section className='pro-field-group'>
      <div className='pro-field-group__title'>
        <span>{title}</span>
        <span>{fields.length}</span>
      </div>
      {visibleFields.map((field) => (
        <FieldButton field={field} key={`${field.role}-${field.name}`} onAddField={onAddField} />
      ))}
      {canCollapse && (
        <Button
          block
          className='pro-field-toggle'
          icon={expanded ? <UpOutlined /> : <DownOutlined />}
          size='small'
          type='text'
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? labels.fieldCollapse : labels.fieldExpand}
        </Button>
      )}
    </section>
  )
}

const FieldButton = ({ field, onAddField }: { field: SchemaField; onAddField: (field: SchemaField) => void }) => {
  const draggable = useProfessionalDraggable(`field-${field.role}-${field.name}`, createSchemaFieldDragPayload(field))
  const { activeDrag } = useProfessionalDnd()

  return (
    <Tooltip mouseEnterDelay={0.4} open={activeDrag ? false : undefined} title={field.name}>
      <button
        {...draggable.attributes}
        {...draggable.listeners}
        className={`pro-field pro-field--${field.role}${draggable.isDragging ? ' pro-field--dragging' : ''}`}
        ref={draggable.setNodeRef}
        type='button'
        onClick={() => onAddField(field)}
      >
        <span className='pro-field__icon'>{iconByField(field)}</span>
        <span className='pro-field__name'>{field.name}</span>
      </button>
    </Tooltip>
  )
}

const iconByField = (field: SchemaField) => {
  if (field.role === 'measure') return <NumberOutlined />
  if (field.isDate) return <CalendarOutlined />
  return <FontSizeOutlined />
}
