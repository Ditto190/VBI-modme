import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'

type LocalValue = string | number | boolean | null | undefined
export type LocalRow = Record<string, LocalValue>
type QueryValue = string | number
type Selection = { alias: string; field: string }

export const inferSchema = (data: LocalRow[]): DatasetColumn[] =>
  Object.entries(data[0] ?? {}).map(([name, value]) => ({
    name,
    type: typeof value === 'number' ? 'number' : 'string',
  }))

const readSelections = (queryDSL: VQueryDSL<Record<string, QueryValue>>) => {
  const dimensions: Selection[] = []
  const measures: Selection[] = []

  for (const item of queryDSL.select ?? []) {
    if (typeof item === 'string') {
      dimensions.push({ alias: item, field: item })
    } else if (item?.field) {
      const selection = { alias: item.alias ?? item.field, field: item.field }
      ;(item.aggr?.func ? measures : dimensions).push(selection)
    }
  }

  return { dimensions, measures }
}

const toNumber = (value: unknown) => {
  if (typeof value === 'number') return value
  if (typeof value === 'bigint') return Number(value)
  if (typeof value === 'string') {
    const numericValue = Number(value)
    return Number.isNaN(numericValue) ? null : numericValue
  }
  return null
}

export const normalizeDataset = (queryDSL: VQueryDSL<Record<string, QueryValue>>, dataset: LocalRow[]) => {
  const { dimensions, measures } = readSelections(queryDSL)
  if (dimensions.length === 0 && measures.length === 0) return dataset

  return dataset.map((row) => {
    const normalized: LocalRow = {}
    measures.forEach(({ alias, field }) => {
      const value = toNumber(row[alias || field])
      if (value !== null) normalized[alias || field] = value
    })
    dimensions.forEach(({ alias, field }) => {
      const key = alias || field
      if (key in row) normalized[key] = row[key]
    })
    return normalized
  })
}

export const rowsToDataset = (headers: string[], rows: string[][], schema: DatasetColumn[]): LocalRow[] => {
  const schemaByName = new Map(schema.map((field) => [field.name, field.type]))
  return rows
    .map((values) =>
      Object.fromEntries(
        headers.map((header, index) => {
          const value = values[index]?.trim() ?? ''
          return [header, schemaByName.get(header) === 'number' ? (value ? Number(value) : null) : value]
        }),
      ),
    )
    .filter((row) => Object.values(row).some((value) => value !== '' && value !== null))
}
