import { VBI, type VBIChartBuilder } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'
import { randomShortId } from '../random'

export type LocalValue = string | number | boolean | null | undefined
export type LocalRow = Record<string, LocalValue>
type QueryValue = string | number
type FieldSelection = { alias: string; field: string }

function inferSchema(data: LocalRow[]): DatasetColumn[] {
  const firstRow = data[0]
  if (!firstRow) {
    return []
  }

  return Object.entries(firstRow).map(([name, value]) => ({
    name,
    type: typeof value === 'number' ? 'number' : 'string',
  }))
}

function getFieldSelections(queryDSL: VQueryDSL<Record<string, QueryValue>>): {
  dimensionFields: FieldSelection[]
  measureFields: FieldSelection[]
} {
  const dimensionFields: FieldSelection[] = []
  const measureFields: FieldSelection[] = []

  for (const item of queryDSL.select ?? []) {
    if (typeof item === 'string') {
      dimensionFields.push({ alias: item, field: item })
      continue
    }

    if (!item || typeof item !== 'object') {
      continue
    }

    const field = item.field
    const alias = item.alias ?? field

    if (!field || !alias) {
      continue
    }

    if (item.aggr?.func) {
      measureFields.push({ alias, field })
      continue
    }

    dimensionFields.push({ alias, field })
  }

  return { dimensionFields, measureFields }
}

function normalizeMeasureValue(value: unknown): number | null {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'bigint') {
    return Number(value)
  }

  if (typeof value === 'string') {
    const nextValue = Number(value)
    return Number.isNaN(nextValue) ? null : nextValue
  }

  return null
}

function normalizeDataset(queryDSL: VQueryDSL<Record<string, QueryValue>>, dataset: LocalRow[]): LocalRow[] {
  const { dimensionFields, measureFields } = getFieldSelections(queryDSL)

  if (dimensionFields.length === 0 && measureFields.length === 0) {
    return dataset
  }

  return dataset.map((row) => {
    const normalizedRow: LocalRow = {}

    for (const { alias, field } of measureFields) {
      const sourceKey = alias || field
      const nextValue = normalizeMeasureValue(row[sourceKey])
      if (nextValue !== null) {
        normalizedRow[sourceKey] = nextValue
      }
    }

    for (const { alias, field } of dimensionFields) {
      const sourceKey = alias || field
      if (sourceKey in row) {
        normalizedRow[sourceKey] = row[sourceKey]
      }
    }

    return normalizedRow
  })
}

export class LocalConnector {
  public readonly id: string
  private localData: LocalRow[] = []
  private localSchema: DatasetColumn[] | null = null
  private datasetNeedsRefresh = true
  private vquery = new VQuery()

  constructor(id?: string) {
    this.id = id || `local_${randomShortId()}`
  }

  public setDataWithSchema(data: LocalRow[], schema: DatasetColumn[] | null): void {
    this.localData = data
    this.localSchema = schema
    this.datasetNeedsRefresh = true
  }

  public async loadCsvData(source: string | File, schema?: DatasetColumn[] | null): Promise<void> {
    let csv: string

    if (typeof source === 'string') {
      const response = await fetch(source)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      csv = await response.text()
    } else {
      csv = await source.text()
    }

    const { parseCsv } = await import('./parseCsv')
    const { rowsToDataset, inferSchema: inferCsvSchema } = await import('./dataset')
    const [headerRow = [], ...dataRows] = parseCsv(csv)

    const headers = headerRow.map((h) => h.trim())
    const finalSchema = schema || inferCsvSchema(headers, dataRows)

    const data = rowsToDataset(headers, dataRows, finalSchema)
    this.setDataWithSchema(data, finalSchema)
  }

  public register(): string {
    VBI.connectors.register(this.id, async () => ({
      discoverSchema: async () => {
        if (this.localSchema) return this.localSchema
        return this.localData.length === 0 ? [] : inferSchema(this.localData)
      },
      query: async ({ queryDSL, schema }) => {
        if ((await this.vquery.hasDataset(this.id)) && this.datasetNeedsRefresh) {
          await this.vquery.dropDataset(this.id)
        }
        if (!(await this.vquery.hasDataset(this.id))) {
          if (this.localData.length === 0) return { dataset: [] }
          await this.vquery.createDataset(
            this.id,
            schema as DatasetColumn[],
            { rawDataset: this.localData, type: 'json' } as RawDatasetSource,
          )
          this.datasetNeedsRefresh = false
        }
        const dataset = await this.vquery.connectDataset(this.id)
        const dsl = queryDSL as VQueryDSL<Record<string, QueryValue>>
        const result = await dataset.query(dsl)
        return { dataset: normalizeDataset(dsl, result.dataset as LocalRow[]) }
      },
    }))
    return this.id
  }

  public createBuilder(): VBIChartBuilder {
    return VBI.chart.create(VBI.chart.createEmpty(this.id))
  }
}

export function createDefaultBuilder(): VBIChartBuilder {
  const connector = new LocalConnector()
  connector.register()
  import('./supermarketSchema')
    .then(({ supermarketSchema }) =>
      connector.loadCsvData('https://visactor.github.io/VBI/dataset/supermarket.csv', supermarketSchema),
    )
    .catch(console.error)
  return connector.createBuilder()
}
