import { Empty, Input, Select } from 'antd'
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldToken } from './FieldToken'
import type { ProfessionalLabels } from 'src/config/labels'
import type { MappedField } from 'src/types'
import {
  aggregateValue,
  dateAggregateOptions,
  measureAggregateOptions,
  sortOptions,
  sortValue,
} from 'src/utils/fieldOptions'
import { renameMappedField, setMappedAggregate, setMappedSort, setMeasureAutoFormat } from 'src/utils/fieldMutations'
import { runMappedFieldAction } from 'src/utils/mappedFieldActions'

type ConfigFieldEditorProps = {
  builder: VBIChartBuilder
  items: MappedField[]
  labels: ProfessionalLabels
}

type ConfigFieldRowProps = Omit<ConfigFieldEditorProps, 'items'> & { item: MappedField }

export const ConfigFieldEditor = ({ builder, items, labels }: ConfigFieldEditorProps) => (
  <div className='pro-config-editor'>
    <div className='pro-config-editor__title'>{labels.configuredFields}</div>
    {items.length === 0 ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={labels.emptyChart} />
    ) : (
      items.map((item) => <ConfigFieldRow builder={builder} item={item} key={item.id} labels={labels} />)
    )}
  </div>
)

const ConfigFieldRow = ({ builder, item, labels }: ConfigFieldRowProps) => (
  <div className={`pro-field-config pro-field-config--${item.role}`}>
    <FieldToken
      item={item}
      labels={labels}
      onAction={(field, action) => runMappedFieldAction(builder, labels, field, action)}
    />
    <Input
      key={`${item.id}-${item.alias ?? item.field}`}
      defaultValue={item.alias || item.field}
      onBlur={(event) => renameMappedField(builder, item, event.target.value)}
      onPressEnter={(event) => renameMappedField(builder, item, event.currentTarget.value)}
    />
    <Select
      options={aggregateOptions(item)}
      value={aggregateValue(item)}
      onChange={(value) => setMappedAggregate(builder, item, value)}
    />
    <Select
      options={sortSelectOptions(labels)}
      value={sortValue(item)}
      onChange={(value) => setMappedSort(builder, item, value)}
    />
    {item.role === 'measure' && (
      <Select
        options={[
          { label: labels.menuRaw, value: 'raw' },
          { label: labels.menuAutoFormat, value: 'auto' },
        ]}
        value={item.format?.autoFormat ? 'auto' : 'raw'}
        onChange={(value) => setMeasureAutoFormat(builder, item, value === 'auto')}
      />
    )}
  </div>
)

const aggregateOptions = (item: MappedField) => {
  if (item.role === 'measure') return measureAggregateOptions
  return item.isDate ? dateAggregateOptions : [{ label: 'Raw', value: 'none' }]
}

const sortSelectOptions = (labels: ProfessionalLabels) =>
  sortOptions.map((option) => ({
    value: option.value,
    label:
      option.value === 'asc'
        ? labels.menuSortAsc
        : option.value === 'desc'
          ? labels.menuSortDesc
          : labels.menuSortClear,
  }))
