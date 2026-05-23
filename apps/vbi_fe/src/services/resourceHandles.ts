import { platformClient } from './platformClient'
import type { ResourceKind } from '../types'

type ResourceHandleByKind = {
  chart: ReturnType<typeof platformClient.chart>
  insight: ReturnType<typeof platformClient.insight>
  report: ReturnType<typeof platformClient.report>
}

export const getResourceHandle = <TKind extends ResourceKind>(kind: TKind, resourceId = '') => {
  if (kind === 'chart') {
    return platformClient.chart(resourceId) as ResourceHandleByKind[TKind]
  }
  if (kind === 'insight') {
    return platformClient.insight(resourceId) as ResourceHandleByKind[TKind]
  }
  return platformClient.report(resourceId) as ResourceHandleByKind[TKind]
}
