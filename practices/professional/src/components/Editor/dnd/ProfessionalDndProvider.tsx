import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'
import type { SchemaField } from 'src/types'
import type { ProfessionalDragPayload, SlotDropPayload } from 'src/types/dnd'
import { slotCollision } from './collision'
import { keepDragOverlayNearPointer } from './dragOverlayPosition'
import { getDragRole } from './dragPayload'
import { DragGhost } from './DragGhost'
import { applyDrop } from './dropAction'

type DndContextValue = {
  activeDrag: ProfessionalDragPayload | null
  activeRole: SchemaField['role'] | null
}

export type DragSourceRect = {
  height: number
  width: number
}

type ProfessionalDndProviderProps = {
  builder: VBIChartBuilder
  children: ReactNode
}

const ProfessionalDndContext = createContext<DndContextValue | null>(null)

export const ProfessionalDndProvider = (props: ProfessionalDndProviderProps) => {
  const [activeDrag, setActiveDrag] = useState<ProfessionalDragPayload | null>(null)
  const [activeRect, setActiveRect] = useState<DragSourceRect | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))
  const contextValue = useMemo(
    () => ({ activeDrag, activeRole: activeDrag ? getDragRole(activeDrag) : null }),
    [activeDrag],
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const dragPayload = readDragPayload(event.active.data.current)
    const dropPayload = readDropPayload(event.over?.data.current)
    clearDrag()
    if (!dragPayload || !dropPayload) return
    applyDrop(props.builder, dragPayload, dropPayload)
  }

  const clearDrag = () => {
    setActiveDrag(null)
    setActiveRect(null)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDrag(readDragPayload(event.active.data.current))
    setActiveRect(readSourceRect(event.active.rect.current.initial))
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
        <DragOverlay adjustScale={false} dropAnimation={null} modifiers={[keepDragOverlayNearPointer]}>
          {activeDrag ? <DragGhost payload={activeDrag} sourceRect={activeRect} /> : null}
        </DragOverlay>
      </DndContext>
    </ProfessionalDndContext.Provider>
  )
}

export const useProfessionalDnd = () => {
  const context = useContext(ProfessionalDndContext)
  if (!context) throw new Error('useProfessionalDnd must be used within ProfessionalDndProvider')
  return context
}

const readDragPayload = (value: unknown) => (value ?? null) as ProfessionalDragPayload | null

const readSourceRect = (rect: DragStartEvent['active']['rect']['current']['initial']) =>
  rect ? { height: rect.height, width: rect.width } : null

const readDropPayload = (value: unknown) => {
  const payload = value as SlotDropPayload | undefined
  return payload?.kind === 'slot-insert' ? payload : null
}
