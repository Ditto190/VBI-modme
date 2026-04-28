import { Card, Form } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'src/i18n'
import { HavingFilterList } from './HavingFilterList'
import { HavingFilterModal, aggregateFromValues } from './HavingFilterModal'
import { aggregateOptionsForRole } from './havingOptions'
import type { HavingAggregateFunc, HavingField, HavingFilterItem } from './havingTypes'
import type { RootOperator } from './filterTypes'
import { FilterActions, FilterTitle } from './FilterCardParts'

export type { HavingField, HavingFilterItem }

interface HavingFilterPanelProps {
  fields: HavingField[]
  filters: HavingFilterItem[]
  rootOperator?: RootOperator
  onChange: (filters: HavingFilterItem[]) => void
  onRootOperatorChange?: (operator: RootOperator) => void
}

export const HavingFilterPanel = ({
  fields,
  filters,
  rootOperator = 'and',
  onChange,
  onRootOperatorChange,
}: HavingFilterPanelProps) => {
  const { locale } = useTranslation()
  const isZh = locale === 'zh-CN'
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const selectedField = Form.useWatch('field', form) as string | undefined
  const selectedAggregate = Form.useWatch('aggregate', form) as HavingAggregateFunc | undefined
  const operator = Form.useWatch('operator', form) as string | undefined
  const selectedRole = fields.find((field) => field.name === selectedField)?.role
  const aggregateOptions = useMemo(() => aggregateOptionsForRole(selectedRole), [selectedRole])

  const openAdd = () => {
    setEditingIndex(null)
    form.setFieldsValue({ aggregate: 'sum', field: undefined, operator: '>', value: undefined })
    setOpen(true)
  }

  const openEdit = (index: number) => {
    const item = filters[index]
    setEditingIndex(index)
    form.setFieldsValue({
      field: item.field,
      aggregate: item.aggregate.func,
      quantile: item.aggregate.func === 'quantile' ? (item.aggregate.quantile ?? 0.5) : 0.5,
      operator: item.operator,
      range: item.operator === 'between' ? item.value : undefined,
      value: item.operator === 'between' ? undefined : item.value,
    })
    setOpen(true)
  }

  const submit = async () => {
    const values = await form.validateFields()
    const nextItem = {
      field: values.field,
      aggregate: aggregateFromValues(values),
      operator: values.operator,
      value: values.operator === 'between' ? values.range : values.value,
    }
    onChange(
      editingIndex === null
        ? [...filters, nextItem]
        : filters.map((item, index) => (index === editingIndex ? nextItem : item)),
    )
    close()
  }

  const close = () => {
    setOpen(false)
    setEditingIndex(null)
    form.resetFields()
  }

  const remove = (index: number) => onChange(filters.filter((_, itemIndex) => itemIndex !== index))
  const onFieldChange = (field: string) =>
    form.setFieldsValue({
      aggregate: fields.find((item) => item.name === field)?.role === 'dimension' ? 'count' : 'sum',
    })

  return (
    <Card
      className='pro-filter-card'
      size='small'
      title={<FilterTitle text={isZh ? '分组筛选器' : 'Having Filters'} />}
      extra={<FilterActions rootOperator={rootOperator} onAdd={openAdd} onRootOperatorChange={onRootOperatorChange} />}
    >
      {filters.length === 0 ? (
        <div className='pro-filter-empty'>{isZh ? '暂无分组筛选条件' : 'No having filters yet'}</div>
      ) : (
        <HavingFilterList
          filters={filters}
          editText={isZh ? '编辑' : 'Edit'}
          removeText={isZh ? '删除' : 'Delete'}
          onDelete={remove}
          onEdit={openEdit}
        />
      )}
      <HavingFilterModal
        aggregateOptions={aggregateOptions}
        editingIndex={editingIndex}
        fields={fields}
        form={form}
        isZh={isZh}
        open={open}
        operator={operator}
        selectedAggregate={selectedAggregate}
        onCancel={close}
        onFieldChange={onFieldChange}
        onSubmit={() => void submit()}
      />
    </Card>
  )
}
