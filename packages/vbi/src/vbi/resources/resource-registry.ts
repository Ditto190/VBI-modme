import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { createChartStore, type ChartStore } from './chart-store'
import { createInsightStore, type InsightStore } from './insight-store'

export interface VBIResourceRegistry<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  charts: ChartStore<TQueryDSL, TSeedDSL>
  insights: InsightStore
}

export const createVBIResourceRegistry = <
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
>(): VBIResourceRegistry<TQueryDSL, TSeedDSL> => ({
  charts: createChartStore<TQueryDSL, TSeedDSL>(),
  insights: createInsightStore(),
})
