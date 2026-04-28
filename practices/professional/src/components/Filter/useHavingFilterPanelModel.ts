import { Form } from 'antd'
import type { FormInstance } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'src/i18n'
import { aggregateFromValues } from './HavingFilterModal'
import { aggregateOptionsForRole } from './havingOptions'
import type { HavingAggregateFunc, HavingField, HavingFilterItem } from './havingTypes'

type HavingFilterPanelModelProps = {
  fields: HavingField[]
  filters: HavingFilterItem[]
  onChange: (filters: HavingFilterItem[]) => void
}

export const useHavingFilterPanelModel = ({ fields, filters, onChange }: HavingFilterPanelModelProps) => {
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

  const close = () => {
    setOpen(false)
    setEditingIndex(null)
    form.resetFields()
  }

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

  return {
    aggregateOptions,
    close,
    editingIndex,
    form,
    isZh,
    onFieldChange: createFieldChange(fields, form),
    open,
    openAdd,
    openEdit,
    operator,
    remove: (index: number) => onChange(filters.filter((_, itemIndex) => itemIndex !== index)),
    selectedAggregate,
    submit,
    title: isZh ? '分组筛选器' : 'Having Filters',
  }
}

const createFieldChange = (fields: HavingField[], form: FormInstance) => (field: string) =>
  form.setFieldsValue({ aggregate: fields.find((item) => item.name === field)?.role === 'dimension' ? 'count' : 'sum' })
