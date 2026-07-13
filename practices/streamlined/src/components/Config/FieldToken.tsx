import { CloseOutlined } from '@ant-design/icons'
import type { VBIDimension, VBIMeasure, VBIChartBuilder } from '@visactor/vbi'
import { Select } from 'antd'
import type { StreamLabels } from 'src/i18n'
import type { SchemaField } from 'src/types'

const measureAggregates = ['sum', 'count', 'countDistinct', 'avg', 'min', 'max', 'median'] as const
const dateAggregates = ['toYear', 'toQuarter', 'toMonth', 'toWeek', 'toDay'] as const
type MeasureAggregate = (typeof measureAggregates)[number]
type SupportedDateAggregate = (typeof dateAggregates)[number]
type DateAggregate = SupportedDateAggregate | 'raw'

type FieldTokenProps = {
  builder: VBIChartBuilder
  fieldMeta?: SchemaField
  item: VBIDimension | VBIMeasure
  labels: StreamLabels
  role: 'dimension' | 'measure'
}

type AggregateSelectProps = Pick<FieldTokenProps, 'builder' | 'item' | 'role'>

const normalizeMeasureAggregate = (func?: string): MeasureAggregate => {
  return measureAggregates.includes(func as MeasureAggregate) ? (func as MeasureAggregate) : 'sum'
}

const normalizeDateAggregate = (func?: string): DateAggregate => {
  return dateAggregates.includes(func as SupportedDateAggregate) ? (func as SupportedDateAggregate) : 'raw'
}

const AggregateSelect = ({ builder, item, role }: AggregateSelectProps) => {
  if (role !== 'measure') return null
  return (
    <Select
      className='stream-token__select'
      onChange={(func: MeasureAggregate) =>
        builder.measures.update(item.id, (node) => node.setAggregate({ func: func as any }))
      }
      options={measureAggregates.map((func) => ({ label: func, value: func }))}
      size='small'
      value={normalizeMeasureAggregate((item as VBIMeasure).aggregate?.func)}
      variant='borderless'
    />
  )
}

const DateSelect = ({ builder, fieldMeta, item, labels, role }: FieldTokenProps) => {
  if (role !== 'dimension' || !fieldMeta?.isDate) return null
  return (
    <Select
      className='stream-token__select'
      onChange={(func: DateAggregate) => {
        builder.dimensions.update(item.id, (node) =>
          func === 'raw' ? node.clearAggregate() : node.setAggregate({ func }),
        )
      }}
      options={[
        { label: labels.rawDate, value: 'raw' },
        ...dateAggregates.map((func) => ({ label: func.replace('to', ''), value: func })),
      ]}
      size='small'
      value={normalizeDateAggregate((item as VBIDimension).aggregate?.func)}
      variant='borderless'
    />
  )
}

export const FieldToken = (props: FieldTokenProps) => {
  const { builder, item, labels, role } = props
  const remove = () => (role === 'measure' ? builder.measures.remove(item.id) : builder.dimensions.remove(item.id))
  const roleLabel = role === 'measure' ? labels.metrics : labels.dimensions

  return (
    <div className={`stream-token stream-token--${role}`}>
      <span className='stream-token__mark' />
      <span className='stream-token__content'>
        <span className='stream-token__label'>{item.alias || item.field}</span>
        <span className='stream-token__type'>{roleLabel}</span>
      </span>
      <span className='stream-token__actions'>
        <AggregateSelect builder={builder} item={item} role={role} />
        <DateSelect {...props} />
      </span>
      <button
        aria-label={`${labels.removeField}: ${item.field}`}
        className='stream-token__remove'
        onClick={remove}
        title={labels.removeField}
        type='button'
      >
        <CloseOutlined />
      </button>
    </div>
  )
}
