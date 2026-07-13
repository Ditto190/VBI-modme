import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { Button, Input, Popover, Select } from 'antd'
import { useState, type ChangeEvent } from 'react'
import type { MinimalLabels } from 'src/i18n'
import type { EditorField } from 'src/types'
import { addFilter, getFilters, getOperators, removeFilter } from 'src/utils/filter'

type FilterPanelProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  fields: EditorField[]
  labels: MinimalLabels
}

export const FilterPanel = ({ builder, dsl, fields, labels }: FilterPanelProps) => {
  const selectedFieldNames = new Set([
    ...dsl.dimensions.filter((item) => 'field' in item).map((item) => item.field),
    ...dsl.measures.filter((item) => 'field' in item).map((item) => item.field),
  ])
  const fieldOptions = [...fields].sort(
    (a, b) => Number(selectedFieldNames.has(b.name)) - Number(selectedFieldNames.has(a.name)),
  )
  const [fieldName, setFieldName] = useState<string>()
  const field = fields.find((item) => item.name === fieldName) ?? fieldOptions[0]
  const operators = getOperators(field)
  const [operator, setOperator] = useState<string>()
  const activeOperator = operator && operators.includes(operator) ? operator : operators[0]
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const filters = getFilters(dsl)

  const submit = () => {
    if (!field || !activeOperator) return
    addFilter(builder, field, activeOperator, value)
    setOpen(false)
    setValue('')
  }

  const content = (
    <div className='mini-filter-popover'>
      <div className='mini-filter-form'>
        <Select
          showSearch
          value={field?.name}
          options={fieldOptions.map((item) => ({ label: item.name, value: item.name }))}
          onChange={setFieldName}
        />
        <Select
          value={activeOperator}
          options={operators.map((item) => ({ label: item, value: item }))}
          onChange={setOperator}
        />
        <Input
          placeholder={labels.value}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          onPressEnter={submit}
        />
        <Button autoInsertSpace={false} type='primary' onClick={submit}>
          {labels.add}
        </Button>
      </div>
    </div>
  )

  return (
    <section className='mini-filter-bar'>
      <span className='mini-filter-label'>{labels.filters}</span>
      <div className='mini-filter-list mini-filter-list--compact'>
        {filters.length === 0 && <span className='mini-drop'>{labels.noFilters}</span>}
        {filters.map((item) => (
          <span className='mini-filter-token' key={`${item.kind}-${item.id}`}>
            <span className='mini-filter-token__text'>
              {`${item.field} ${item.op} ${Array.isArray(item.value) ? item.value.join(',') : (item.value ?? '')}`}
            </span>
            <Button
              aria-label={labels.remove}
              icon={<DeleteOutlined />}
              size='small'
              type='text'
              onClick={() => removeFilter(builder, item.kind, item.id)}
            />
          </span>
        ))}
      </div>
      <Popover content={content} open={open} placement='bottomRight' trigger='click' onOpenChange={setOpen}>
        <Button aria-label={labels.filters} icon={<PlusOutlined />} size='small' type='text' />
      </Popover>
    </section>
  )
}
