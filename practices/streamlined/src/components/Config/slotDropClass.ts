import type { SchemaField } from 'src/types'

export type InsertTarget = {
  index: number
  role: SchemaField['role']
}

export const getTokenDropClass = (params: {
  insertTarget?: InsertTarget
  role: SchemaField['role']
  roleIndex: number
}) => {
  const { insertTarget, role, roleIndex } = params
  const isSameRole = insertTarget?.role === role
  return [
    'stream-token-drop',
    isSameRole && insertTarget.index === roleIndex ? 'stream-token-drop--before' : '',
    isSameRole && insertTarget.index === roleIndex + 1 ? 'stream-token-drop--after' : '',
  ]
    .filter(Boolean)
    .join(' ')
}
