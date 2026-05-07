import { Input, Select } from 'antd'
import { useMemo, useState } from 'react'
import { SearchOutlined, TableOutlined } from '@ant-design/icons'
import { FieldGroup } from './FieldGroup'
import type { ProfessionalLabels } from 'src/config/labels'
import type { SchemaField } from 'src/types'
import { groupFields } from 'src/utils/fieldUtils'

type FieldBrowserProps = {
  fields: SchemaField[]
  labels: ProfessionalLabels
  onAddField: (field: SchemaField) => void
}

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
        <FieldGroup
          fields={measures}
          labels={props.labels}
          title={props.labels.metrics}
          onAddField={props.onAddField}
        />
        <FieldGroup
          fields={dimensions}
          labels={props.labels}
          title={props.labels.dimensions}
          onAddField={props.onAddField}
        />
      </div>
    </section>
  )
}
