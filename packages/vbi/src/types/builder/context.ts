import type { VBIChartDSL } from '../chartDSL'

export interface BuilderContext {
  getVBIChartDSL(): VBIChartDSL
}
