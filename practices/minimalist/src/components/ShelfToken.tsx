import { DeleteOutlined } from '@ant-design/icons'
import type { VBIChartBuilder, VBIDimension, VBIMeasure } from '@visactor/vbi'
import { Button, Dropdown, type MenuProps } from 'antd'
import {
  dateOptions,
  measureOptions,
  normalizeMeasureAggregate,
  type DateAggregate,
  type MeasureAggregate,
} from 'src/config/aggregates'
import type { MinimalLabels } from 'src/i18n'
import type { EditorField, FieldRole } from 'src/types'
import { removeField } from 'src/utils/fields'
type ShelfItem = VBIDimension | VBIMeasure

type ShelfTokenProps = {
  builder: VBIChartBuilder
  fields: EditorField[]
  item: ShelfItem
  labels: MinimalLabels
  role: FieldRole
}

const getLabel = (item: ShelfItem, role: FieldRole, field?: EditorField) => {
  const name = item.alias ?? item.field
  if (role === 'measure') return `${normalizeMeasureAggregate((item as VBIMeasure).aggregate?.func)}(${name})`
  const aggregate = (item as VBIDimension).aggregate?.func
  return field?.isDate && aggregate ? `${String(aggregate).replace('to', '')}(${name})` : name
}

const getMenuItems = (role: FieldRole, labels: MinimalLabels, field?: EditorField): MenuProps['items'] => {
  const options = role === 'measure' ? measureOptions : field?.isDate ? dateOptions(labels.rawDate) : []
  return [
    options.length
      ? {
          key: 'aggregate',
          label: labels.aggregate,
          children: options.map((item) => ({ key: `aggregate:${item.value}`, label: item.label })),
        }
      : null,
    options.length ? { type: 'divider' } : null,
    { danger: true, key: 'delete', label: labels.remove },
  ].filter(Boolean) as MenuProps['items']
}

const getSelectedKeys = (item: ShelfItem, role: FieldRole) => {
  const aggregate =
    role === 'measure'
      ? normalizeMeasureAggregate((item as VBIMeasure).aggregate?.func)
      : ((item as VBIDimension).aggregate?.func ?? 'raw')
  return [`aggregate:${aggregate}`]
}

const applyMenu = (props: ShelfTokenProps, key: string) => {
  if (key === 'delete') {
    removeField(props.builder, props.role, props.item.id)
    return
  }
  if (!key.startsWith('aggregate:')) return
  const func = key.replace('aggregate:', '')
  if (props.role === 'measure') {
    props.builder.measures.update(props.item.id, (node) => node.setAggregate({ func: func as MeasureAggregate }))
    return
  }
  props.builder.dimensions.update(props.item.id, (node) =>
    func === 'raw' ? node.clearAggregate() : node.setAggregate({ func: func as DateAggregate }),
  )
}

export const ShelfToken = (props: ShelfTokenProps) => {
  const field = props.fields.find((item) => item.name === props.item.field)
  return (
    <span className='mini-token'>
      <Dropdown
        menu={{
          items: getMenuItems(props.role, props.labels, field),
          selectedKeys: getSelectedKeys(props.item, props.role),
          onClick: ({ key }) => applyMenu(props, String(key)),
        }}
        placement='bottomLeft'
        trigger={['click']}
      >
        <span className='mini-token__body' role='button' tabIndex={0}>
          <span className='mini-token__name'>{getLabel(props.item, props.role, field)}</span>
        </span>
      </Dropdown>
      <Button
        aria-label={props.labels.remove}
        className='mini-token__remove'
        icon={<DeleteOutlined />}
        size='small'
        type='text'
        onClick={(event) => {
          event.stopPropagation()
          removeField(props.builder, props.role, props.item.id)
        }}
      />
    </span>
  )
}
