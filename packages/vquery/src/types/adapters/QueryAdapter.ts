import type { DatasetColumn } from '../DataSet'
import type { DatasetSource } from '../DataSource'
import type { QueryResult } from '../QueryResult'

export interface QueryAdapter {
  open: () => Promise<void>

  close: () => Promise<void>

  loadDataset: (datasetId: string, columns: DatasetColumn[], source: DatasetSource) => Promise<void>

  dropDataset: (datasetId: string) => Promise<void>

  getSchema: (fileName: string) => Promise<QueryResult>

  query: (sql: string) => Promise<{
    dataset: any[]
    table: any
  }>
}
