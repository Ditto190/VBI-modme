import type { SchemaField } from 'src/types'

export const groupFields = (fields: SchemaField[]) => ({
  dimensions: fields.filter((field) => field.role === 'dimension'),
  measures: fields.filter((field) => field.role === 'measure'),
})
