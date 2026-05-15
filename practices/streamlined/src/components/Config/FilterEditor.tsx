import { Button, Input, InputNumber, Select, Space } from 'antd'
import type { StreamLabels } from 'src/i18n'
import type { SchemaField } from 'src/types'
import { aggregateFunctions, type StreamFilterKind } from 'src/utils/filterActions'
import type { FilterDraftValue, FilterInputMode } from 'src/utils/filterInput'

type FilterEditorProps = {
  aggregate: (typeof aggregateFunctions)[number]
  field: SchemaField
  inputMode: FilterInputMode
  kind: StreamFilterKind
  labels: StreamLabels
  onAggregateChange: (value: (typeof aggregateFunctions)[number]) => void
  onApply: () => void
  onCancel: () => void
  onOperatorChange: (value: string) => void
  onValueChange: (value: FilterDraftValue) => void
  operator: string
  operatorOptions: Array<{ label: string; value: string }>
  value: FilterDraftValue
}

const NumberInput = (props: { labels: StreamLabels; onChange: (value: string) => void; value: FilterDraftValue }) => (
  <InputNumber
    controls={false}
    placeholder={props.labels.filterValue}
    value={props.value === '' ? undefined : Number(props.value)}
    onChange={(value) => props.onChange(value === null ? '' : String(value))}
  />
)

const ValueInput = ({
  inputMode,
  labels,
  onValueChange,
  value,
}: Pick<FilterEditorProps, 'inputMode' | 'labels' | 'onValueChange' | 'value'>) => {
  if (inputMode === 'none') return <div className='stream-filter-editor__hint'>{labels.noValueRequired}</div>
  if (inputMode === 'tags') {
    return (
      <Select
        mode='tags'
        tokenSeparators={[',']}
        value={Array.isArray(value) ? value : []}
        placeholder={labels.filterValue}
        onChange={onValueChange}
      />
    )
  }
  if (inputMode === 'number') return <NumberInput labels={labels} value={value} onChange={onValueChange} />
  if (inputMode === 'range' && !Array.isArray(value) && typeof value === 'object') {
    return (
      <div className='stream-filter-editor__range'>
        <InputNumber
          controls={false}
          placeholder={labels.min}
          value={value.min === undefined ? undefined : Number(value.min)}
          onChange={(next) => onValueChange({ ...value, min: next === null ? '' : String(next) })}
        />
        <InputNumber
          controls={false}
          placeholder={labels.max}
          value={value.max === undefined ? undefined : Number(value.max)}
          onChange={(next) => onValueChange({ ...value, max: next === null ? '' : String(next) })}
        />
      </div>
    )
  }
  return (
    <Input
      value={typeof value === 'string' ? value : ''}
      placeholder={labels.filterValue}
      onChange={(event) => onValueChange(event.target.value)}
    />
  )
}

export const FilterEditor = (props: FilterEditorProps) => (
  <div className='stream-filter-editor'>
    <header className='stream-filter-editor__head'>
      <strong>{props.field.name}</strong>
      <span>{props.kind === 'where' ? props.labels.whereFilter : props.labels.havingFilter}</span>
    </header>
    {props.kind === 'having' && (
      <Select
        aria-label={props.labels.aggregate}
        options={aggregateFunctions.map((item) => ({ label: item, value: item }))}
        value={props.aggregate}
        onChange={props.onAggregateChange}
      />
    )}
    <Select
      aria-label={props.labels.operator}
      options={props.operatorOptions}
      value={props.operator}
      onChange={props.onOperatorChange}
    />
    <ValueInput
      inputMode={props.inputMode}
      labels={props.labels}
      value={props.value}
      onValueChange={props.onValueChange}
    />
    <Space className='stream-filter-editor__actions'>
      <Button size='small' onClick={props.onCancel}>
        {props.labels.cancel}
      </Button>
      <Button size='small' type='primary' onClick={props.onApply}>
        {props.labels.apply}
      </Button>
    </Space>
  </div>
)
