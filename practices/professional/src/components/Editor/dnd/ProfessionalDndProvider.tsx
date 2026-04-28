import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'
import type { SchemaField } from 'src/types'
import type { ProfessionalDragPayload, SlotDropPayload } from 'src/types/dnd'
import { slotCollision } from './collision'
import { DragGhost } from './DragGhost'
import { applyDrop } from './dropAction'
import { readLatestPointer, readStartPointer, trackWindowPointer, type DragPointer } from './dragPointer'
import { resolveDropTarget } from './resolveDropTarget'

type DndContextValue = {
  activeDrag: ProfessionalDragPayload | null
  activeRole: SchemaField['role'] | null
}

type ProfessionalDndProviderProps = {
  builder: VBIChartBuilder
  children: ReactNode
}

const ProfessionalDndContext = createContext<DndContextValue | null>(null)

export const ProfessionalDndProvider = (props: ProfessionalDndProviderProps) => {
  const [activeDrag, setActiveDrag] = useState<ProfessionalDragPayload | null>(null)
  const [dragPointer, setDragPointer] = useState<DragPointer | null>(null)
  const stopPointerTrackingRef = useRef<(() => void) | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))
  const contextValue = useMemo(
    () => ({ activeDrag, activeRole: activeDrag ? getDragRole(activeDrag) : null }),
    [activeDrag],
  )

  const handleDragStart = (event: DragStartEvent) => {
    const pointer = readLatestPointer() ?? readStartPointer(event)
    setActiveDrag(readDragPayload(event.active.data.current))
    setDragPointer(pointer)
    stopPointerTrackingRef.current?.()
    stopPointerTrackingRef.current = trackWindowPointer(setDragPointer)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const dragPayload = readDragPayload(event.active.data.current)
    const dropPayload = readDropPayload(event.over?.data.current)
    const resolvedDrop = dropPayload ? resolveDropTarget(dropPayload, readLatestPointer()) : null
    clearDrag()
    if (!dragPayload || !resolvedDrop) return
    applyDrop(props.builder, dragPayload, resolvedDrop)
  }

  const clearDrag = () => {
    stopPointerTrackingRef.current?.()
    stopPointerTrackingRef.current = null
    setActiveDrag(null)
    setDragPointer(null)
  }

  return (
    <ProfessionalDndContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={slotCollision}
        onDragCancel={clearDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {props.children}
        {activeDrag && dragPointer && <DragGhost payload={activeDrag} position={dragPointer} />}
      </DndContext>
    </ProfessionalDndContext.Provider>
  )
}

export const useProfessionalDnd = () => {
  const context = useContext(ProfessionalDndContext)
  if (!context) throw new Error('useProfessionalDnd must be used within ProfessionalDndProvider')
  return context
}

const getDragRole = (payload: ProfessionalDragPayload) =>
  payload.kind === 'schema-field' ? payload.field.role : payload.item.role

const readDragPayload = (value: unknown) => (value ?? null) as ProfessionalDragPayload | null

const readDropPayload = (value: unknown) => {
  const payload = value as SlotDropPayload | undefined
  return payload?.kind === 'slot-insert' ? payload : null
}
