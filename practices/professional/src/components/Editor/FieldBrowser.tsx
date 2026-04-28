import { CalendarOutlined, FontSizeOutlined, NumberOutlined, SearchOutlined, TableOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { useMemo, useState } from 'react'
import type { ProfessionalLabels } from 'src/config/labels'
import type { SchemaField } from 'src/types'
import { groupFields } from 'src/utils/fieldUtils'
import { writeDraggedField } from 'src/utils/dragDrop'

type FieldBrowserProps = {
  fields: SchemaField[]
  labels: ProfessionalLabels
  onAddField: (field: SchemaField) => void
  onDragEnd: () => void
  onDragStart: (field: SchemaField) => void
}

const iconByField = (field: SchemaField) => {
  if (field.role === 'measure') return <NumberOutlined />
  if (field.isDate) return <CalendarOutlined />
  return <FontSizeOutlined />
}

const FieldGroup = (props: FieldBrowserProps & { fields: SchemaField[]; title: string }) => (
  <section className='pro-field-group'>
    <div className='pro-field-group__title'>
      <span>{props.title}</span>
      <span>{props.fields.length}</span>
    </div>
    {props.fields.map((field) => (
      <button
        className={`pro-field pro-field--${field.role}`}
        draggable
        key={`${field.role}-${field.name}`}
        onClick={() => props.onAddField(field)}
        onDragEnd={props.onDragEnd}
        onDragStart={(event) => {
          writeDraggedField(event, field)
          props.onDragStart(field)
        }}
        type='button'
      >
        <span className='pro-field__icon'>{iconByField(field)}</span>
        <span className='pro-field__name'>{field.name}</span>
      </button>
    ))}
  </section>
)

export const FieldBrowser = (props: FieldBrowserProps) => {
  const [keyword, setKeyword] = useState('')
  const normalizedKeyword = keyword.trim().toLowerCase()
  const filteredFields = useMemo(
    () =>
      normalizedKeyword
        ? props.fields.filter((field) => field.name.toLowerCase().includes(normalizedKeyword))
        : props.fields,
    [normalizedKeyword, props.fields],
  )
  const { dimensions, measures } = groupFields(filteredFields)

  return (
    <section className='pro-panel pro-field-browser'>
      <div className='pro-panel__header'>{props.labels.dataSource}</div>
      <Select
        className='pro-source-select'
        disabled
        options={[{ label: 'supermarket', value: 'supermarket' }]}
        prefix={<TableOutlined />}
        value='supermarket'
      />
      <Input
        allowClear
        className='pro-search'
        placeholder={props.labels.search}
        prefix={<SearchOutlined />}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <div className='pro-field-scroll'>
        <FieldGroup {...props} fields={measures} title={props.labels.metrics} />
        <FieldGroup {...props} fields={dimensions} title={props.labels.dimensions} />
      </div>
    </section>
  )
}
