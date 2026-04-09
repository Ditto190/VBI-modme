import { createVBIProviderClient } from '../src'
import { describe, expect, test, vi } from 'vitest'

const jsonResponse = <T>(data: T) => ({
  ok: true,
  status: 200,
  json: async () => ({ data }),
  text: async () => JSON.stringify({ data }),
})

describe('remote VBI client', () => {
  test('routes chart CRUD and references through REST endpoints', async () => {
    const fetch = vi.fn(async (url: string, init?: { method?: string; body?: string }) => {
      if (url.endsWith('/charts') && init?.method === 'POST') {
        return jsonResponse({
          id: 'chart-1',
          name: 'Revenue',
          createdAt: '2026-04-09',
          updatedAt: '2026-04-09',
        })
      }
      if (url.endsWith('/charts/chart-1')) {
        return jsonResponse({
          id: 'chart-1',
          name: 'Revenue',
          createdAt: '2026-04-09',
          updatedAt: '2026-04-09',
          dsl: { uuid: 'chart-1' },
        })
      }
      if (url.endsWith('/charts/chart-1/references')) {
        return jsonResponse([{ reportId: 'report-1', pageId: 'page-1' }])
      }
      throw new Error(`Unexpected request: ${url}`)
    })
    const client = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch })

    const provider = client.chart()
    await provider.create({ name: 'Revenue' })

    await expect(provider.getSummary()).resolves.toMatchObject({ id: 'chart-1' })
    await expect(provider.getDetail()).resolves.toMatchObject({ dsl: { uuid: 'chart-1' } })
    await expect(provider.getReferences()).resolves.toEqual([{ reportId: 'report-1', pageId: 'page-1' }])
  })

  test('supports report snapshot export through REST endpoint', async () => {
    const fetch = vi.fn(async (url: string) => {
      if (url.endsWith('/reports/report-1/snapshot')) {
        return jsonResponse({
          report: { uuid: 'report-1' },
          charts: { 'chart-1': { uuid: 'chart-1' } },
          insights: { 'insight-1': { uuid: 'insight-1' } },
        })
      }
      if (url.endsWith('/reports/report-1')) {
        return jsonResponse({
          id: 'report-1',
          name: 'Quarterly Review',
          createdAt: '2026-04-09',
          updatedAt: '2026-04-09',
          pages: [],
        })
      }
      throw new Error(`Unexpected request: ${url}`)
    })
    const client = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch })

    await expect(client.report('report-1').exportSnapshot()).resolves.toMatchObject({
      report: { uuid: 'report-1' },
    })
  })

  test('supports report page reorder through REST endpoint', async () => {
    const fetch = vi.fn(async (url: string, init?: { method?: string; body?: string }) => {
      if (url.endsWith('/reports/report-1/pages/reorder') && init?.method === 'PATCH') {
        return jsonResponse({
          id: 'report-1',
          name: 'Quarterly Review',
          createdAt: '2026-04-09',
          updatedAt: '2026-04-09',
          pages: [
            { id: 'page-2', title: 'Second', chartId: 'chart-2', insightId: 'insight-2' },
            { id: 'page-1', title: 'First', chartId: 'chart-1', insightId: 'insight-1' },
          ],
        })
      }
      throw new Error(`Unexpected request: ${url}`)
    })
    const client = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch })

    await expect(client.report('report-1').reorderPages(['page-2', 'page-1'])).resolves.toMatchObject({
      dsl: { pages: [{ id: 'page-2' }, { id: 'page-1' }] },
    })
  })
})
