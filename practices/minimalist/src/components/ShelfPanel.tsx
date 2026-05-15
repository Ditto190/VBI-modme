import type { VBIChartBuilder, VBIChartDSL, VBIDimension, VBIMeasure } from '@visactor/vbi'
import { useState } from 'react'
import { ShelfToken } from 'src/components/ShelfToken'
import type { MinimalLabels } from 'src/i18n'
import type { EditorField, FieldRole } from 'src/types'
import { addField, clearDragPayload, readDragPayload, removeField, writeTokenDrag } from 'src/utils/fields'

type ShelfPanelProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  fields: EditorField[]
  labels: MinimalLabels
}

type ShelfItem = VBIDimension | VBIMeasure
type InsertTarget = { index: number; role: FieldRole }

const getItems = (dsl: VBIChartDSL, role: FieldRole): ShelfItem[] => {
  return role === 'measure'
    ? (dsl.measures.filter((item) => 'field' in item) as VBIMeasure[])
    : (dsl.dimensions.filter((item) => 'field' in item) as VBIDimension[])
}

const getTokenInsertIndex = (event: React.DragEvent, index: number) => {
  const rect = event.currentTarget.getBoundingClientRect()
  return event.clientX < rect.left + rect.width / 2 ? index : index + 1
}

const getDropClass = (target: InsertTarget | undefined, role: FieldRole, index: number) => {
  if (target?.role !== role) return 'mini-token-wrap'
  const edge =
    target.index === index ? ' mini-token-wrap--before' : target.index === index + 1 ? ' mini-token-wrap--after' : ''
  return `mini-token-wrap${edge}`
}

const Shelf = (props: ShelfPanelProps & { label: string; role: FieldRole }) => {
  const [insertTarget, setInsertTarget] = useState<InsertTarget>()
  const items = getItems(props.dsl, props.role)
  const acceptDrop = (event: React.DragEvent, index: number) => {
    const payload = readDragPayload(event)
    if (!payload) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setInsertTarget({ index, role: props.role })
  }
  const drop = (event: React.DragEvent) => {
    event.preventDefault()
    const payload = readDragPayload(event)
    const index = insertTarget?.index ?? items.length
    if (!payload) return
    if (payload.kind === 'field') {
      const field = props.fields.find((item) => item.name === payload.name)
      if (field) addField(props.builder, props.dsl, field, props.role, index)
    }
    if (payload.kind === 'token') {
      const field = props.fields.find((item) => item.name === payload.field)
      if (field) addField(props.builder, props.dsl, field, props.role, index)
      if (payload.role !== props.role) removeField(props.builder, payload.role, payload.id)
    }
    setInsertTarget(undefined)
    clearDragPayload()
  }
  return (
    <section
      className={`mini-shelf mini-shelf--${props.role}${insertTarget ? ' mini-shelf--active' : ''}`}
      onDragLeave={() => setInsertTarget(undefined)}
      onDragOver={(event) => acceptDrop(event, items.length)}
      onDrop={drop}
    >
      <div className='mini-section-title'>{props.label}</div>
      <div className='mini-token-list'>
        {items.map((item, index) => (
          <span
            className={getDropClass(insertTarget, props.role, index)}
            draggable
            key={item.id}
            onDragOver={(event) => {
              event.stopPropagation()
              acceptDrop(event, getTokenInsertIndex(event, index))
            }}
            onDragEnd={clearDragPayload}
            onDragStart={(event) =>
              writeTokenDrag(event, { field: item.field, id: item.id, kind: 'token', role: props.role })
            }
          >
            <ShelfToken {...props} item={item} />
          </span>
        ))}
        {!items.length && <span className='mini-drop'>{props.labels.dropHere}</span>}
      </div>
    </section>
  )
}

export const ShelfPanel = (props: ShelfPanelProps) => (
  <div className='mini-shelves'>
    <Shelf {...props} label={props.labels.measures} role='measure' />
    <Shelf {...props} label={props.labels.dimensions} role='dimension' />
  </div>
)
