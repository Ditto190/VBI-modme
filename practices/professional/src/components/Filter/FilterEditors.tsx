import { Form, Input, InputNumber, Select, Typography } from 'antd'
import type { FilterModalProps } from './FilterModal'

const { Text } = Typography

export const RangeEditor = (props: { field?: string; isZh: boolean }) => (
  <Form.Item label={props.isZh ? '范围设置' : 'Range'}>
    <div className='pro-filter-range'>
      <Form.Item name={['value', 'min']} noStyle>
        <InputNumber placeholder={props.isZh ? '最小值' : 'Min'} controls={false} />
      </Form.Item>
      <Form.Item name={['value', 'leftOp']} noStyle>
        <Select options={[{ value: '<' }, { value: '<=' }]} />
      </Form.Item>
      <Text ellipsis className='pro-filter-range__field' title={props.field || '变量'}>
        {props.field || (props.isZh ? '变量' : 'Value')}
      </Text>
      <Form.Item name={['value', 'rightOp']} noStyle>
        <Select options={[{ value: '<' }, { value: '<=' }]} />
      </Form.Item>
      <Form.Item name={['value', 'max']} noStyle>
        <InputNumber placeholder={props.isZh ? '最大值' : 'Max'} controls={false} />
      </Form.Item>
    </div>
  </Form.Item>
)

export const ValueEditor = (props: FilterModalProps) => (
  <Form.Item label={props.t('filtersValue')} name='value' rules={[{ required: true }]}>
    <Input placeholder={props.isZh ? '输入筛选值' : 'Enter a value'} />
  </Form.Item>
)
