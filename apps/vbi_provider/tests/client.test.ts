import { createVBIProviderClient } from '../src'
import { describe, expect, test, vi } from 'vitest'

const jsonResponse = <T>(data: T) => ({
  ok: true,
  status: 200,
  json: async () => ({ data }),
  text: async () => JSON.stringify({ data }),
})

describe('createVBIProviderClient', () => {
  test('creates resource providers and list methods from baseUrl', async () => {
    const fetch = vi.fn(async (url: string) => {
      if (url.endsWith('/charts'))
        return jsonResponse([{ id: 'chart-1', name: null, createdAt: '2026-04-09', updatedAt: '2026-04-09' }])
      if (url.endsWith('/insights'))
        return jsonResponse([{ id: 'insight-1', name: null, createdAt: '2026-04-09', updatedAt: '2026-04-09' }])
      if (url.endsWith('/reports'))
        return jsonResponse([{ id: 'report-1', name: null, createdAt: '2026-04-09', updatedAt: '2026-04-09' }])
      throw new Error(`Unexpected request: ${url}`)
    })
    const client = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch })

    expect(client.chart('chart-1').getResourceId()).toBe('chart-1')
    expect(client.insight('insight-1').getResourceId()).toBe('insight-1')
    expect(client.report('report-1').getResourceId()).toBe('report-1')
    expect(client.chart().getResourceId()).toBeNull()
    await expect(client.listCharts()).resolves.toHaveLength(1)
    await expect(client.listInsights()).resolves.toHaveLength(1)
    await expect(client.listReports()).resolves.toHaveLength(1)
  })
})
