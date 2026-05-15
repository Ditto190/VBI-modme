import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import type { StreamLabels } from 'src/i18n'
import type { SchemaField } from 'src/types'
import type { StreamFilterCondition, StreamFilterKind } from 'src/utils/filterActions'

type FilterTokenProps = {
  condition: StreamFilterCondition
  field?: SchemaField
  kind: StreamFilterKind
  labels: StreamLabels
  onEdit: () => void
  onRemove: () => void
}

const getText = (condition: StreamFilterCondition, kind: StreamFilterKind) => {
  const aggregate = kind === 'having' && condition.aggregate?.func ? `${condition.aggregate.func} ` : ''
  return `${aggregate}${condition.field} ${condition.op} ${String(condition.value ?? '')}`.trim()
}

export const FilterToken = ({ condition, field, kind, labels, onEdit, onRemove }: FilterTokenProps) => (
  <div className={`stream-token stream-token--${field?.role ?? 'dimension'}`}>
    <span className='stream-token__mark' />
    <span className='stream-token__content'>
      <span className='stream-token__label'>{getText(condition, kind)}</span>
      <span className='stream-token__type'>{kind === 'where' ? labels.whereFilter : labels.havingFilter}</span>
    </span>
    <span className='stream-token__actions'>
      <button className='stream-token__remove' onClick={onEdit} type='button'>
        <EditOutlined />
      </button>
    </span>
    <button
      aria-label={`${labels.removeField}: ${condition.field}`}
      className='stream-token__remove'
      onClick={onRemove}
      title={labels.removeField}
      type='button'
    >
      <CloseOutlined />
    </button>
  </div>
)
