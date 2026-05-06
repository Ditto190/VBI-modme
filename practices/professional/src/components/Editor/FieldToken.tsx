import { MoreOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import type { ProfessionalLabels } from 'src/config/labels'
import { getFieldLabel } from 'src/utils/mappedFields'
import type { MappedField } from 'src/types'
import { createMappedFieldDragPayload } from './dnd/dragPayload'
import { useProfessionalDraggable } from './dnd/useProfessionalDraggable'
import { buildFieldTokenMenuItems } from './fieldTokenMenu'

type FieldTokenProps = {
  dragId?: string
  item: MappedField
  labels: ProfessionalLabels
  onAction: (item: MappedField, action: string) => void
  sourceEncoding?: string
  sourceIndex?: number
  sourceSlotIndex?: number
  slotTokenIndex?: number
}

export const FieldToken = (props: FieldTokenProps) => {
  const { dragId, item, labels, onAction, sourceEncoding, sourceIndex, sourceSlotIndex, slotTokenIndex } = props
  const dragPayload = createMappedFieldDragPayload(item, { sourceEncoding, sourceIndex, sourceSlotIndex })
  const draggable = useProfessionalDraggable(dragId ?? `token-${item.id}`, dragPayload)

  return (
    <span
      {...draggable.attributes}
      {...draggable.listeners}
      className={`pro-slot-token pro-slot-token--${item.role}${draggable.isDragging ? ' pro-slot-token--dragging' : ''}`}
      data-slot-token-index={slotTokenIndex}
      ref={draggable.setNodeRef}
    >
      <span className='pro-slot-token__label'>{getFieldLabel(item)}</span>
      <Dropdown
        trigger={['click']}
        menu={{ items: buildFieldTokenMenuItems(item, labels), onClick: ({ key }) => onAction(item, String(key)) }}
      >
        <button
          aria-label={labels.menuFormat}
          className='pro-token-menu'
          type='button'
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <MoreOutlined />
        </button>
      </Dropdown>
    </span>
  )
}
