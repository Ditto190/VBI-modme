import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import type { ReactNode } from 'react'

type FilterChipProps = {
  children: ReactNode
  editLabel: string
  removeLabel: string
  onDelete: () => void
  onEdit: () => void
}

export const FilterChip = (props: FilterChipProps) => (
  <div className='pro-filter-chip'>
    <div className='pro-filter-chip__content'>{props.children}</div>
    <div className='pro-filter-chip__actions'>
      <Tooltip title={props.editLabel}>
        <Button type='text' size='small' icon={<EditOutlined />} onClick={props.onEdit} />
      </Tooltip>
      <Tooltip title={props.removeLabel}>
        <Button type='text' size='small' danger icon={<DeleteOutlined />} onClick={props.onDelete} />
      </Tooltip>
    </div>
  </div>
)

export const FilterChipList = ({ children }: { children: ReactNode }) => (
  <div className='pro-filter-list'>{children}</div>
)
