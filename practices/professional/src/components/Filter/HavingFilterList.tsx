import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, List, Tooltip, Typography } from 'antd'
import type { HavingFilterItem } from './havingTypes'

const { Text } = Typography

type HavingFilterListProps = {
  editText: string
  filters: HavingFilterItem[]
  removeText: string
  onDelete: (index: number) => void
  onEdit: (index: number) => void
}

export const HavingFilterList = (props: HavingFilterListProps) => (
  <List
    dataSource={props.filters}
    renderItem={(item, index) => (
      <List.Item
        className='pro-filter-item'
        actions={[
          <Tooltip title={props.editText} key='edit'>
            <Button type='text' size='small' icon={<EditOutlined />} onClick={() => props.onEdit(index)} />
          </Tooltip>,
          <Tooltip title={props.removeText} key='delete'>
            <Button type='text' size='small' danger icon={<DeleteOutlined />} onClick={() => props.onDelete(index)} />
          </Tooltip>,
        ]}
      >
        <Text ellipsis className='pro-filter-text'>
          {`${item.aggregate.func}(${item.field}) ${item.operator} ${
            item.operator === 'between' ? JSON.stringify(item.value) : String(item.value)
          }`}
        </Text>
      </List.Item>
    )}
    size='small'
  />
)
