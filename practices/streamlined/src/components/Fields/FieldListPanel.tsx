import { CalendarOutlined, FontSizeOutlined, NumberOutlined, SearchOutlined, TableOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { useState } from 'react'
import { writeDraggedField } from 'src/utils/dragDrop'
import type { StreamLabels } from 'src/config/labels'
import type { SchemaField } from 'src/types'

type FieldListPanelProps = {
  fields: SchemaField[]
  labels: StreamLabels
  onAddField: (field: SchemaField) => void
  sourceName: string
}

const iconByField = (field: SchemaField) => {
  if (field.role === 'measure') return <NumberOutlined />
  if (field.isDate) return <CalendarOutlined />
  return <FontSizeOutlined />
}

const FieldItem = ({ field, onClick }: { field: SchemaField; onClick: () => void }) => (
  <button
    className={`stream-field stream-field--${field.role}`}
    draggable
    onClick={onClick}
    onDragStart={(event) => writeDraggedField(event, field)}
    type='button'
  >
    <span className='stream-field__icon'>{iconByField(field)}</span>
    <span className='stream-field__name'>{field.name}</span>
  </button>
)

const FieldGroup = (props: {
  fields: SchemaField[]
  title: string
  total?: number
  onAddField: (field: SchemaField) => void
}) => {
  const { fields, onAddField, title } = props

  return (
    <section className='stream-field-group'>
      <div className='stream-field-group__title'>
        <span>{title}</span>
        <span>{props.total ?? fields.length}</span>
      </div>
      <div className='stream-field-group__list'>
        {fields.map((field) => (
          <FieldItem key={`${field.role}-${field.name}`} field={field} onClick={() => onAddField(field)} />
        ))}
      </div>
    </section>
  )
}

export const FieldListPanel = ({ fields, labels, onAddField, sourceName }: FieldListPanelProps) => {
  const [expanded, setExpanded] = useState(false)
  const [keyword, setKeyword] = useState('')
  const normalizedKeyword = keyword.trim().toLowerCase()

  const filteredFields = normalizedKeyword
    ? fields.filter((field) => field.name.toLowerCase().includes(normalizedKeyword))
    : fields

  const metrics = filteredFields.filter((field) => field.role === 'measure')
  const dimensions = filteredFields.filter((field) => field.role === 'dimension')
  const visibleDimensions = expanded || normalizedKeyword ? dimensions : dimensions.slice(0, 10)

  return (
    <aside className='stream-panel stream-panel--source'>
      <div className='stream-panel__header'>{labels.source}</div>
      <Select
        className='stream-source-select'
        disabled
        options={[{ label: sourceName, value: sourceName }]}
        prefix={<TableOutlined />}
        value={sourceName}
      />
      <Input
        allowClear
        className='stream-search'
        placeholder={labels.search}
        prefix={<SearchOutlined />}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <div className='stream-field-scroll'>
        <FieldGroup fields={metrics} title={labels.metrics} onAddField={onAddField} />
        <FieldGroup
          fields={visibleDimensions}
          title={labels.dimensions}
          total={dimensions.length}
          onAddField={onAddField}
        />
      </div>
      <button className='stream-expand-button' onClick={() => setExpanded((value) => !value)} type='button'>
        {expanded ? labels.collapse : labels.expandAll}
      </button>
    </aside>
  )
}
