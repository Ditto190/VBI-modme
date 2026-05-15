import { PlusOutlined } from '@ant-design/icons'
import type { VBIDimension, VBIMeasure, VBIChartBuilder } from '@visactor/vbi'
import { Select } from 'antd'
import { type DragEvent, useState } from 'react'
import { readDraggedField, readDraggedToken, writeDraggedToken } from 'src/utils/dragDrop'
import { FieldToken } from './FieldToken'
import type { StreamLabels } from 'src/i18n'
import { addOrMoveField, reorderMappedField } from 'src/utils/mappingActions'
import { getTokenDropClass, type InsertTarget } from './slotDropClass'
import { getRoleCount, getSlotSelection } from './slotSelection'
import type { FieldSlot, SchemaField } from 'src/types'

type MappingSlotProps = {
  builder: VBIChartBuilder
  dimensions: VBIDimension[]
  fields: SchemaField[]
  labels: StreamLabels
  measures: VBIMeasure[]
  slot: FieldSlot
}
const getFieldRole = (event: DragEvent, fields: SchemaField[]) => {
  return readDraggedToken(event)?.role ?? readDraggedField(event, fields)?.role
}
const getTokenInsertIndex = (event: DragEvent, roleIndex: number) => {
  const rect = event.currentTarget.getBoundingClientRect()
  return event.clientY < rect.top + rect.height / 2 ? roleIndex : roleIndex + 1
}
export const MappingSlot = ({ builder, dimensions, fields, labels, measures, slot }: MappingSlotProps) => {
  const [insertTarget, setInsertTarget] = useState<InsertTarget | undefined>()
  const acceptedFields = fields.filter((field) => slot.accepts.includes(field.role))
  const selected = getSlotSelection({
    dimensions,
    dimensionEncoding: slot.dimensionEncoding,
    measureEncoding: slot.measureEncoding,
    measures,
  })
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    const role = getFieldRole(event, acceptedFields)
    if (!role || !slot.accepts.includes(role)) return
    setInsertTarget({ role, index: getRoleCount(selected, role) })
  }
  const handleTokenDragOver = (event: DragEvent, target: InsertTarget) => {
    event.preventDefault()
    event.stopPropagation()
    if (!slot.accepts.includes(target.role)) return
    setInsertTarget({ ...target, index: getTokenInsertIndex(event, target.index) })
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const fallbackRole = getFieldRole(event, acceptedFields)
    const target =
      insertTarget ?? (fallbackRole ? { role: fallbackRole, index: getRoleCount(selected, fallbackRole) } : undefined)
    if (!target || !slot.accepts.includes(target.role)) return

    const token = readDraggedToken(event)
    if (token) reorderMappedField(builder, { id: token.id, insertIndex: target.index, role: token.role, slot })

    const field = readDraggedField(event, acceptedFields)
    if (field) addOrMoveField(builder, field, slot, target.index)
    setInsertTarget(undefined)
  }

  return (
    <div className='stream-slot'>
      <div className='stream-slot__label'>{slot.title}</div>
      <div
        className='stream-slot__box'
        onDragLeave={() => setInsertTarget(undefined)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selected.map(({ item, role, roleIndex }) => (
          <div
            className={getTokenDropClass({ insertTarget, role, roleIndex })}
            draggable
            key={item.id}
            onDragOver={(event) => handleTokenDragOver(event, { role, index: roleIndex })}
            onDragStart={(event) => writeDraggedToken(event, { id: item.id, role })}
          >
            <FieldToken
              builder={builder}
              fieldMeta={fields.find((field) => field.name === item.field)}
              item={item}
              labels={labels}
              role={role}
            />
          </div>
        ))}
        {insertTarget && getRoleCount(selected, insertTarget.role) === 0 && (
          <div className='stream-slot__empty-drop'>{labels.dropHere}</div>
        )}
        <Select
          className='stream-slot__add'
          placeholder={
            <span>
              <PlusOutlined /> {labels.addField}
            </span>
          }
          showSearch
          value={undefined}
          options={acceptedFields.map((field) => ({ label: field.name, value: field.name }))}
          onChange={(fieldName) => {
            const field = fields.find((item) => item.name === fieldName)
            if (field) addOrMoveField(builder, field, slot)
          }}
        />
      </div>
    </div>
  )
}
