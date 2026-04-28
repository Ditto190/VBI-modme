import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useMemo, useState } from 'react'
import { FieldGroup } from 'src/components/FieldGroup'
import type { MinimalLabels } from 'src/config/labels'
import type { EditorField } from 'src/types'

type FieldPanelProps = {
  fields: EditorField[]
  labels: MinimalLabels
  selectedFields: Set<string>
  onToggleField: (field: EditorField) => void
}

export const FieldPanel = ({ fields, labels, selectedFields, onToggleField }: FieldPanelProps) => {
  const [keyword, setKeyword] = useState('')
  const filteredFields = useMemo(() => {
    const normalized = keyword.trim().toLowerCase()
    return normalized ? fields.filter((field) => field.name.toLowerCase().includes(normalized)) : fields
  }, [fields, keyword])
  const groups = [
    { label: labels.measures, role: 'measure' as const },
    { label: labels.dimensions, role: 'dimension' as const },
  ]

  return (
    <aside className='mini-panel mini-panel--fields'>
      <div className='mini-panel-title'>{labels.fields}</div>
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder={labels.search}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      {groups.map((group) => (
        <FieldGroup
          {...group}
          fields={filteredFields.filter((field) => field.role === group.role)}
          key={group.role}
          selectedFields={selectedFields}
          onToggleField={onToggleField}
        />
      ))}
    </aside>
  )
}
