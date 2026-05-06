import type { MenuProps } from 'antd'
import type { ProfessionalLabels } from 'src/config/labels'
import type { MappedField } from 'src/types'
import { dateAggregateOptions, formatPresets, measureAggregateOptions, sortOptions } from 'src/utils/fieldOptions'

type FieldMenuItems = NonNullable<MenuProps['items']>

export const buildFieldTokenMenuItems = (item: MappedField, labels: ProfessionalLabels): FieldMenuItems => [
  ...aggregateItems(item, labels),
  {
    key: 'sort',
    label: labels.menuSort,
    children: sortOptions.map((option) => ({ key: `sort:${option.value}`, label: sortLabel(option.value, labels) })),
  },
  ...formatItems(item, labels),
  { key: 'rename', label: labels.menuRename },
  { type: 'divider' },
  { key: 'delete', danger: true, label: labels.menuDelete },
]

const aggregateItems = (item: MappedField, labels: ProfessionalLabels): FieldMenuItems => {
  if (item.role === 'measure') {
    return [
      {
        key: 'aggregate',
        label: labels.menuAggregate,
        children: measureAggregateOptions.map((option) => ({ key: `aggregate:${option.value}`, label: option.label })),
      },
    ]
  }
  if (!item.isDate) return []
  return [
    {
      key: 'aggregate',
      label: labels.menuAggregate,
      children: dateAggregateOptions.map((option) => ({ key: `aggregate:${option.value}`, label: option.label })),
    },
  ]
}

const formatItems = (item: MappedField, labels: ProfessionalLabels): FieldMenuItems =>
  item.role === 'measure'
    ? [
        {
          key: 'format',
          label: labels.menuFormat,
          children: formatPresets.map((preset) => ({
            key: `format:${preset.key}`,
            label: labels[preset.labelKey as keyof ProfessionalLabels],
          })),
        },
      ]
    : []

const sortLabel = (value: string, labels: ProfessionalLabels) => {
  if (value === 'asc') return labels.menuSortAsc
  if (value === 'desc') return labels.menuSortDesc
  return labels.menuSortClear
}
