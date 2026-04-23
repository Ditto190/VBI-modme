import type { VBIReportPageDSL } from 'src/types'
import { id } from 'src/utils'

export const createEmptyReportPage = (pageId: string = id.uuid()): VBIReportPageDSL => {
  return {
    id: pageId,
    title: '',
    chartId: '',
    insightId: '',
  }
}
