import type { DragEvent } from 'react'
import type { SchemaField } from 'src/types'

export const FIELD_DRAG_TYPE = 'application/x-vbi-field'
export const TOKEN_DRAG_TYPE = 'application/x-vbi-token'

export type TokenDragPayload = {
  id: string
  role: SchemaField['role']
}

export const writeDraggedField = (event: DragEvent, field: SchemaField) => {
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData(FIELD_DRAG_TYPE, field.name)
}

export const readDraggedField = (event: DragEvent, fields: SchemaField[]) => {
  const fieldName = event.dataTransfer.getData(FIELD_DRAG_TYPE)
  return fields.find((field) => field.name === fieldName)
}

export const writeDraggedToken = (event: DragEvent, payload: TokenDragPayload) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData(TOKEN_DRAG_TYPE, JSON.stringify(payload))
}

export const readDraggedToken = (event: DragEvent): TokenDragPayload | undefined => {
  const raw = event.dataTransfer.getData(TOKEN_DRAG_TYPE)
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as TokenDragPayload
  } catch {
    return undefined
  }
}
