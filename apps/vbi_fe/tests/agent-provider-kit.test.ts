import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { createAgentProviderKit } from '../src/views/agent/agent-provider-kit'

const jsonResponse = <T>(data: T) =>
  ({
    ok: true,
    status: 200,
    json: async () => ({ data }),
    text: async () => JSON.stringify({ data }),
  }) as Response

describe('createAgentProviderKit', () => {
  beforeEach(() => {
    rs.clearAllMocks()
  })

  test('delegates agent workspace creation to the provider kit', async () => {
    const requestedUrls: string[] = []
    globalThis.fetch = rs.fn(async (url: string | URL | Request) => {
      const requestUrl = String(url)
      requestedUrls.push(requestUrl)

      if (requestUrl.endsWith('/charts/chart-1')) {
        return jsonResponse({ id: 'chart-1', name: 'Chart' })
      }
      if (requestUrl.endsWith('/insights/insight-1')) {
        return jsonResponse({ id: 'insight-1', name: 'Insight' })
      }
      if (requestUrl.endsWith('/reports/report-1')) {
        return jsonResponse({ id: 'report-1', name: 'Report' })
      }

      throw new Error(`Unexpected request: ${requestUrl}`)
    }) as typeof fetch

    const kit = createAgentProviderKit({
      baseUrl: 'http://provider.test/api/v1',
      chartId: 'chart-1',
      insightId: 'insight-1',
      reportId: 'report-1',
    })

    expect(kit.tools.map((tool) => tool.name)).toEqual([
      'read_skill',
      'vbi_resource_lookup',
      'vbi_chart',
      'vbi_insight',
      'vbi_report',
    ])
    await expect(kit.workspace.chart.describe()).resolves.toEqual({ id: 'chart-1', name: 'Chart' })
    await expect(kit.workspace.insight.describe()).resolves.toEqual({ id: 'insight-1', name: 'Insight' })
    await expect(kit.workspace.report.describe()).resolves.toEqual({ id: 'report-1', name: 'Report' })
    expect(requestedUrls).toEqual([
      'http://provider.test/api/v1/charts/chart-1',
      'http://provider.test/api/v1/insights/insight-1',
      'http://provider.test/api/v1/reports/report-1',
    ])
  })
})
