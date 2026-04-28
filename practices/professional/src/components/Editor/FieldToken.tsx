import { MoreOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import type { ProfessionalLabels } from 'src/config/labels'
import { dateAggregateOptions, measureAggregateOptions, sortOptions } from 'src/utils/fieldOptions'
import { getFieldLabel } from 'src/utils/mappedFields'
import type { MappedField } from 'src/types'
import { useProfessionalDraggable } from './dnd/useProfessionalDraggable'

type FieldTokenProps = {
  dragId?: string
  item: MappedField
  labels: ProfessionalLabels
  onAction: (item: MappedField, action: string) => void
  slotTokenIndex?: number
}

export const FieldToken = ({ dragId, item, labels, onAction, slotTokenIndex }: FieldTokenProps) => {
  const draggable = useProfessionalDraggable(dragId ?? `token-${item.id}`, { item, kind: 'mapped-field' })

  return (
    <span
      {...draggable.attributes}
      {...draggable.listeners}
      {...draggable.pointerHandlers}
      className={`pro-slot-token pro-slot-token--${item.role}${draggable.isDragging ? ' pro-slot-token--dragging' : ''}`}
      data-slot-token-index={slotTokenIndex}
      ref={draggable.setNodeRef}
    >
      <span className='pro-slot-token__label'>{getFieldLabel(item)}</span>
      <Dropdown
        trigger={['click']}
        menu={{ items: menuItems(item, labels), onClick: ({ key }) => onAction(item, String(key)) }}
      >
        <button className='pro-token-menu' type='button' onClick={(event) => event.preventDefault()}>
          <MoreOutlined />
        </button>
      </Dropdown>
    </span>
  )
}

const menuItems = (item: MappedField, labels: ProfessionalLabels): MenuProps['items'] => [
  ...((item.role === 'measure' ? measureItems(labels) : dimensionItems(item, labels)) ?? []),
  {
    key: 'sort',
    label: labels.menuSort,
    children: sortOptions.map((option) => ({ key: `sort:${option.value}`, label: sortLabel(option.value, labels) })),
  },
  ...(item.role === 'measure'
    ? [
        { key: 'format:auto', label: labels.menuAutoFormat },
        { key: 'format:clear', label: labels.menuRaw },
      ]
    : []),
  { key: 'rename', label: labels.menuRename },
  { type: 'divider' },
  { key: 'delete', danger: true, label: labels.menuDelete },
]

const measureItems = (labels: ProfessionalLabels): MenuProps['items'] => [
  {
    key: 'aggregate',
    label: labels.menuAggregate,
    children: measureAggregateOptions.map((option) => ({ key: `aggregate:${option.value}`, label: option.label })),
  },
]

const dimensionItems = (item: MappedField, labels: ProfessionalLabels): MenuProps['items'] =>
  item.isDate
    ? [
        {
          key: 'aggregate',
          label: labels.menuAggregate,
          children: dateAggregateOptions.map((option) => ({ key: `aggregate:${option.value}`, label: option.label })),
        },
      ]
    : []

const sortLabel = (value: string, labels: ProfessionalLabels) => {
  if (value === 'asc') return labels.menuSortAsc
  if (value === 'desc') return labels.menuSortDesc
  return labels.menuSortClear
}
