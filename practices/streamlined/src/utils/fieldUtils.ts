import type { SchemaField } from 'src/types'

export const toSchemaField = (field: { name: string; type: string }): SchemaField => {
  const normalizedType = field.type.toLowerCase()
  const isDate = ['date', 'datetime', 'timestamp'].includes(normalizedType)

  return {
    name: field.name,
    type: field.type,
    isDate,
    role: normalizedType === 'number' ? 'measure' : 'dimension',
  }
}
