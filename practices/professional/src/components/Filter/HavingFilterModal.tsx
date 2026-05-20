import type { VBIHavingAggregate } from '@visactor/vbi'
import { Form, InputNumber, Modal, Select } from 'antd'
import type { FormInstance } from 'antd'
import type { aggregateOptionsForRole } from './havingOptions'
import { operatorOptions } from './havingOptions'
import type { HavingAggregateFunc, HavingField } from './havingTypes'

type HavingFilterModalProps = {
  aggregateOptions: ReturnType<typeof aggregateOptionsForRole>
  editingIndex: number | null
  fields: HavingField[]
  form: FormInstance
  isZh: boolean
  open: boolean
  operator?: string
  selectedAggregate?: HavingAggregateFunc
  onCancel: () => void
  onFieldChange: (field: string) => void
  onSubmit: () => void
}

export const HavingFilterModal = (props: HavingFilterModalProps) => (
  <Modal
    title={title(props.isZh, props.editingIndex)}
    open={props.open}
    onOk={props.onSubmit}
    onCancel={props.onCancel}
  >
    <Form form={props.form} layout='vertical'>
      <Form.Item label={props.isZh ? '字段' : 'Field'} name='field' rules={[{ required: true }]}>
        <Select options={fieldOptions(props.fields)} onChange={props.onFieldChange} />
      </Form.Item>
      <Form.Item label={props.isZh ? '聚合方式' : 'Aggregate'} name='aggregate' rules={[{ required: true }]}>
        <Select options={props.aggregateOptions} />
      </Form.Item>
      {props.selectedAggregate === 'quantile' && (
        <Form.Item label='Quantile' name='quantile'>
          <InputNumber min={0} max={1} step={0.1} className='pro-filter-full' />
        </Form.Item>
      )}
      <Form.Item label={props.isZh ? '操作符' : 'Operator'} name='operator' rules={[{ required: true }]}>
        <Select options={operatorOptions} />
      </Form.Item>
      {props.operator === 'between' ? <RangeFields isZh={props.isZh} /> : <ValueField isZh={props.isZh} />}
    </Form>
  </Modal>
)

export const aggregateFromValues = (values: {
  aggregate: HavingAggregateFunc
  quantile?: number
}): VBIHavingAggregate =>
  values.aggregate === 'quantile' ? { func: 'quantile', quantile: values.quantile ?? 0.5 } : { func: values.aggregate }

const title = (isZh: boolean, editingIndex: number | null) =>
  editingIndex === null ? (isZh ? '新增分组筛选' : 'Add Having Filter') : isZh ? '编辑分组筛选' : 'Edit Having Filter'

const fieldOptions = (fields: HavingField[]) =>
  fields.map((field) => ({
    label: `${field.name} (${field.role})`,
    value: field.name,
  }))

const RangeFields = (props: { isZh: boolean }) => (
  <Form.Item label={props.isZh ? '范围' : 'Range'} required>
    <div className='pro-having-range'>
      <Form.Item name={['range', 'min']} noStyle rules={[{ required: true, message: '' }]}>
        <InputNumber placeholder={props.isZh ? '最小值' : 'Min'} />
      </Form.Item>
      <Form.Item name={['range', 'max']} noStyle rules={[{ required: true, message: '' }]}>
        <InputNumber placeholder={props.isZh ? '最大值' : 'Max'} />
      </Form.Item>
    </div>
  </Form.Item>
)

const ValueField = (props: { isZh: boolean }) => (
  <Form.Item label={props.isZh ? '值' : 'Value'} name='value' rules={[{ required: true }]}>
    <InputNumber className='pro-filter-full' />
  </Form.Item>
)
