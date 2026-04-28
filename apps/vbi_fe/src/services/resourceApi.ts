import { withApiErrorToast } from './apiClient'
import { platformClient } from './platformClient'
import { getResourceLabel, tRuntime } from '../i18n'
import type { ResourceItem, ResourceKind } from '../types'

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

export const listResources = (kind: ResourceKind) =>
  withApiErrorToast(
    (kind === 'chart'
      ? platformClient.listCharts()
      : kind === 'insight'
        ? platformClient.listInsights()
        : platformClient.listReports()) as Promise<ResourceItem[]>,
    tRuntime('api.listFailed', { resource: getResourceLabel(kind) }),
  )

export const createResource = (kind: ResourceKind, name: string) =>
  withApiErrorToast(
    getResourceHandle(kind).create({ name }) as Promise<ResourceItem>,
    tRuntime('api.createFailed', { resource: getResourceLabel(kind) }),
  )

export const renameResource = (kind: ResourceKind, id: string, name: string) =>
  withApiErrorToast(
    getResourceHandle(kind, id).rename(name) as Promise<ResourceItem>,
    tRuntime('api.saveFailed', { resource: getResourceLabel(kind) }),
  )

export const removeResource = (kind: ResourceKind, id: string) =>
  withApiErrorToast(
    getResourceHandle(kind, id).remove() as Promise<ResourceItem>,
    tRuntime('api.deleteFailed', { resource: getResourceLabel(kind) }),
  )
