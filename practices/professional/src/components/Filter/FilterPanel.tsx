import { Card, Form } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'src/i18n'
import { FilterList } from './FilterList'
import { FilterModal } from './FilterModal'
import type { FilterField, FilterItem, RootOperator } from './filterTypes'
import { defaultOperatorForRole } from './filterOperators'
import { formValueFromFilter, roleForFilter, submitValue } from './filterValue'
import { FilterActions, FilterTitle } from './FilterCardParts'

export type { FilterField, FilterItem }

interface FilterPanelProps {
  activeFields?: string[]
  fields: FilterField[]
  filters: FilterItem[]
  rootOperator?: RootOperator
  onChange: (filters: FilterItem[]) => void
  onRootOperatorChange?: (operator: RootOperator) => void
}

export const FilterPanel = ({
  activeFields = [],
  fields,
  filters = [],
  rootOperator = 'and',
  onChange,
  onRootOperatorChange,
}: FilterPanelProps) => {
  const { locale, t } = useTranslation()
  const isZh = locale === 'zh-CN'
  const [form] = Form.useForm()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const role = (Form.useWatch('role', form) ?? 'dimension') as FilterField['role']
  const operator = Form.useWatch('operator', form) as string | undefined
  const selectedField = Form.useWatch('field', form) as string | undefined
  const displayFields = useMemo(() => sortFields(fields, activeFields, role), [activeFields, fields, role])

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

  const close = () => {
    setOpen(false)
    setEditingIndex(null)
    form.resetFields()
  }

  const remove = (index: number) => onChange(filters.filter((_, itemIndex) => itemIndex !== index))

  return (
    <Card
      className='pro-filter-card'
      size='small'
      title={<FilterTitle text={t('filtersTitle')} />}
      extra={<FilterActions rootOperator={rootOperator} onAdd={openAdd} onRootOperatorChange={onRootOperatorChange} />}
    >
      {filters.length === 0 ? (
        <div className='pro-filter-empty'>{t('filtersEmpty')}</div>
      ) : (
        <FilterList
          filters={filters}
          editLabel={t('filtersEdit')}
          removeLabel={t('filtersDelete')}
          onDelete={remove}
          onEdit={openEdit}
        />
      )}
      <FilterModal
        activeFields={activeFields}
        displayFields={displayFields}
        editingIndex={editingIndex}
        form={form}
        isZh={isZh}
        open={open}
        operator={operator ?? defaultOperatorForRole(role)}
        role={role}
        selectedField={selectedField}
        t={t}
        onCancel={close}
        onSubmit={() => void submit()}
      />
    </Card>
  )
}

const sortFields = (fields: FilterField[], activeFields: string[], role: FilterField['role']) => {
  const activeSet = new Set(activeFields)
  return fields
    .filter((field) => field.role === role)
    .sort((a, b) => Number(activeSet.has(b.name)) - Number(activeSet.has(a.name)))
}
