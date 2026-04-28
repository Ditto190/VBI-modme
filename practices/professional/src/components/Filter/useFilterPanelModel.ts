import { Form } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'src/i18n'
import type { FilterField, FilterItem } from './filterTypes'
import { defaultOperatorForRole } from './filterOperators'
import { formValueFromFilter, roleForFilter, submitValue } from './filterValue'

type FilterPanelModelProps = {
  activeFields: string[]
  fields: FilterField[]
  filters: FilterItem[]
  onChange: (filters: FilterItem[]) => void
}

export const useFilterPanelModel = ({ activeFields, fields, filters, onChange }: FilterPanelModelProps) => {
  const { locale, t } = useTranslation()
  const [form] = Form.useForm()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const role = (Form.useWatch('role', form) ?? 'dimension') as FilterField['role']
  const operator = Form.useWatch('operator', form) as string | undefined
  const selectedField = Form.useWatch('field', form) as string | undefined
  const displayFields = useMemo(() => sortFields(fields, activeFields, role), [activeFields, fields, role])

  const close = () => {
    setOpen(false)
    setEditingIndex(null)
    form.resetFields()
  }

  const openAdd = () => {
    setEditingIndex(null)
    form.setFieldsValue({ field: undefined, operator: 'in', role: 'dimension', value: undefined })
    setOpen(true)
  }

  const openEdit = (index: number) => {
    const item = filters[index]
    const filterRole = roleForFilter(fields, item)
    setEditingIndex(index)
    form.setFieldsValue({
      field: item.field,
      operator: item.operator,
      role: filterRole,
      value: formValueFromFilter(item),
    })
    setOpen(true)
  }

  const submit = async () => {
    const values = await form.validateFields()
    const nextItem = {
      field: values.field,
      operator: values.operator,
      value: submitValue(values.operator, values.value),
    }
    onChange(
      editingIndex === null
        ? [...filters, nextItem]
        : filters.map((item, index) => (index === editingIndex ? nextItem : item)),
    )
    close()
  }

  return {
    close,
    displayFields,
    editingIndex,
    form,
    isZh: locale === 'zh-CN',
    open,
    openAdd,
    openEdit,
    operator: operator ?? defaultOperatorForRole(role),
    remove: (index: number) => onChange(filters.filter((_, itemIndex) => itemIndex !== index)),
    role,
    selectedField,
    submit,
    t,
  }
}

const sortFields = (fields: FilterField[], activeFields: string[], role: FilterField['role']) => {
  const activeSet = new Set(activeFields)
  return fields
    .filter((field) => field.role === role)
    .sort((a, b) => Number(activeSet.has(b.name)) - Number(activeSet.has(a.name)))
}
