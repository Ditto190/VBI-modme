import { withApiErrorToast } from './apiClient'
import { requestProvider } from './providerHttp'
import { tRuntime } from '../i18n/runtime'
import { listResources, removeResource } from './resourceApi'
import type { InsightRecord } from '../types'

type InsightDetailResponse = {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
  dsl?: { content?: string } | null
}

const mapInsightDetail = (detail: InsightDetailResponse): InsightRecord => ({
  id: detail.id,
  name: detail.name,
  createdAt: detail.createdAt,
  updatedAt: detail.updatedAt,
  content: detail.dsl?.content ?? '',
})

const fetchInsightDetail = (id: string) =>
  requestProvider<InsightDetailResponse>(`/insights/${id}`).then(mapInsightDetail)

export const fetchInsights = () => listResources('insight')

export const fetchInsight = (id: string) => withApiErrorToast(fetchInsightDetail(id), tRuntime('api.loadInsightFailed'))

export const createInsight = (input: { name: string; content?: string }) =>
  withApiErrorToast(
    requestProvider<InsightDetailResponse>('/insights', { body: input, method: 'POST' }).then(mapInsightDetail),
    tRuntime('api.createInsightFailed'),
  )

export const updateInsight = (id: string, input: { name?: string; content?: string }) =>
  withApiErrorToast(
    requestProvider<InsightDetailResponse>(`/insights/${id}`, { body: input, method: 'PATCH' }).then(mapInsightDetail),
    tRuntime('api.saveInsightFailed'),
  )

export const deleteInsight = (id: string) => removeResource('insight', id)
