import { FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import type { RootOperator } from './filterTypes'
import { RootOperatorControl } from './RootOperatorControl'

type FilterActionsProps = {
  rootOperator: RootOperator
  onAdd: () => void
  onRootOperatorChange?: (operator: RootOperator) => void
}

export const FilterTitle = ({ text }: { text: string }) => (
  <Space>
    <FilterOutlined />
    {text}
  </Space>
)

export const FilterActions = (props: FilterActionsProps) => (
  <Space size={4}>
    <RootOperatorControl value={props.rootOperator} onChange={props.onRootOperatorChange} />
    <Button type='text' size='small' icon={<PlusOutlined />} onClick={props.onAdd} />
  </Space>
)
