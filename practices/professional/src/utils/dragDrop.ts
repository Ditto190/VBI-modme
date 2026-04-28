import type { DragEvent } from 'react'
import type { SchemaField } from 'src/types'

export const FIELD_DRAG_TYPE = 'application/x-vbi-professional-field'
export const TOKEN_DRAG_TYPE = 'application/x-vbi-professional-token'
const FIELD_ROLE_TYPE_PREFIX = 'application/x-vbi-professional-field-role-'
const TOKEN_ROLE_TYPE_PREFIX = 'application/x-vbi-professional-token-role-'

export type TokenDragPayload = {
  id: string
  role: SchemaField['role']
}

let activeFieldName = ''
let activeToken: TokenDragPayload | undefined

export const writeDraggedField = (event: DragEvent, field: SchemaField) => {
  activeFieldName = field.name
  activeToken = undefined
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData(FIELD_DRAG_TYPE, field.name)
  event.dataTransfer.setData(`${FIELD_ROLE_TYPE_PREFIX}${field.role}`, field.role)
  event.dataTransfer.setData('text/plain', field.name)
}

export const readDraggedField = (event: DragEvent, fields: SchemaField[]) => {
  const types = Array.from(event.dataTransfer.types)
  const isFieldDrag = types.includes(FIELD_DRAG_TYPE) || types.some((type) => type.startsWith(FIELD_ROLE_TYPE_PREFIX))
  const transferredName = event.dataTransfer.getData(FIELD_DRAG_TYPE) || event.dataTransfer.getData('text/plain')
  if (!isFieldDrag && !transferredName) return undefined
  const name = transferredName || activeFieldName
  return fields.find((field) => field.name === name)
}

export const writeDraggedToken = (event: DragEvent, payload: TokenDragPayload) => {
  activeFieldName = ''
  activeToken = payload
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData(TOKEN_DRAG_TYPE, JSON.stringify(payload))
  event.dataTransfer.setData(`${TOKEN_ROLE_TYPE_PREFIX}${payload.role}`, payload.role)
}

export const readDraggedRole = (event: DragEvent): SchemaField['role'] | undefined => {
  const types = Array.from(event.dataTransfer.types)
  if (types.includes(`${FIELD_ROLE_TYPE_PREFIX}measure`) || types.includes(`${TOKEN_ROLE_TYPE_PREFIX}measure`)) {
    return 'measure'
  }
  if (types.includes(`${FIELD_ROLE_TYPE_PREFIX}dimension`) || types.includes(`${TOKEN_ROLE_TYPE_PREFIX}dimension`)) {
    return 'dimension'
  }
  return undefined
}

export const readDraggedToken = (event: DragEvent): TokenDragPayload | undefined => {
  const raw = event.dataTransfer.getData(TOKEN_DRAG_TYPE)
  const hasTokenType = Array.from(event.dataTransfer.types).some((type) => type.startsWith(TOKEN_ROLE_TYPE_PREFIX))
  if (!raw && hasTokenType) return activeToken
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as TokenDragPayload
  } catch {
    return undefined
  }
}
