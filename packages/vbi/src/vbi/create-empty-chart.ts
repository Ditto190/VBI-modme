import type { VBIChartDSL } from 'src/types'
import type { VBIConnectorId } from 'src/types/connector/connector'
import { id } from 'src/utils'

export const createEmptyChart = (connectorId: VBIConnectorId, uuid: string = id.resourceUUID()): VBIChartDSL => {
  return {
    uuid,
    connectorId,
    chartType: 'table',
    measures: [],
    dimensions: [],
    whereFilter: {
      id: 'root',
      op: 'and',
      conditions: [],
    },
    havingFilter: {
      id: 'root',
      op: 'and',
      conditions: [],
    },
    theme: 'light',
    locale: 'zh-CN',
    version: 0,
  }
}
