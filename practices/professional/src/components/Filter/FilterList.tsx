import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, List, Tooltip, Typography } from 'antd'
import type { FilterItem } from './filterTypes'
import { filterLabel } from './filterValue'

const { Text } = Typography

type FilterListProps = {
  editLabel: string
  filters: FilterItem[]
  removeLabel: string
  onDelete: (index: number) => void
  onEdit: (index: number) => void
}

export const FilterList = (props: FilterListProps) => (
  <List
    dataSource={props.filters}
    renderItem={(item, index) => (
      <List.Item
        actions={[
          <Tooltip title={props.editLabel} key='edit'>
            <Button type='text' size='small' icon={<EditOutlined />} onClick={() => props.onEdit(index)} />
          </Tooltip>,
          <Tooltip title={props.removeLabel} key='delete'>
            <Button type='text' size='small' danger icon={<DeleteOutlined />} onClick={() => props.onDelete(index)} />
          </Tooltip>,
        ]}
        className='pro-filter-item'
      >
        <Text className='pro-filter-text' ellipsis>
          {filterLabel(item)}
        </Text>
      </List.Item>
    )}
    size='small'
  />
)
