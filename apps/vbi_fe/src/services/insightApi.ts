import { withApiErrorToast } from './apiClient'
import { tRuntime } from '../i18n'
import { getResourceHandle, listResources, removeResource } from './resourceApi'
import type { InsightRecord } from '../types'

const mapInsightDetail = (detail: {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
  dsl: { content?: string }
}): InsightRecord => ({
  id: detail.id,
  name: detail.name,
  createdAt: detail.createdAt,
  updatedAt: detail.updatedAt,
  content: detail.dsl.content ?? '',
})

const fetchInsightDetail = (id: string) => getResourceHandle('insight', id).getDetail().then(mapInsightDetail)

export const fetchInsights = () => listResources('insight')

export const fetchInsight = (id: string) => withApiErrorToast(fetchInsightDetail(id), tRuntime('api.loadInsightFailed'))

export const createInsight = (input: { name: string; content?: string }) =>
  withApiErrorToast(
    getResourceHandle('insight')
      .create(input)
      .then((resource) => fetchInsightDetail(resource.id)),
    tRuntime('api.createInsightFailed'),
  )

export const updateInsight = (id: string, input: { name?: string; content?: string }) =>
  withApiErrorToast(
    getResourceHandle('insight', id).update(input).then(mapInsightDetail),
    tRuntime('api.saveInsightFailed'),
  )

export const deleteInsight = (id: string) => removeResource('insight', id)
