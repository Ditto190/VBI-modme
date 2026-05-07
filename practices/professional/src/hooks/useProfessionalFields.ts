import { useMemo } from 'react'
import type { SchemaField } from 'src/types'

type ProfessionalSchemaColumn = { name: string; type: string }

export const useProfessionalFields = (schema: ProfessionalSchemaColumn[]) =>
  useMemo<SchemaField[]>(
    () =>
      schema.map((field) => ({
        isDate: ['date', 'datetime', 'timestamp'].includes(field.type),
        name: field.name,
        role: field.type === 'number' ? 'measure' : 'dimension',
        type: field.type,
      })),
    [schema],
  )
