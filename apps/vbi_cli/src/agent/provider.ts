import { createVBIProviderClient } from '@visactor/headless-bi-provider'
import type { VBIProviderClient } from '@visactor/headless-bi-provider'
import type { VBIChartBuilder, VBIReportBuilder } from '@visactor/vbi'
import type { VBIAgentWorkspace, VBIWorkspaceSlot } from '@visactor/vbi-agent'
import { createConnectorRegistry, getOptionalConnectorId, type CliConnectorRegistry } from './connector-registry.js'

const getWebSocketPolyfill = () => (typeof WebSocket === 'function' ? WebSocket : undefined)

export const createCliProviderClient = (apiBaseUrl: string): VBIProviderClient =>
  createVBIProviderClient({
    baseUrl: apiBaseUrl,
    ...(getWebSocketPolyfill() ? { webSocketPolyfill: getWebSocketPolyfill() } : {}),
  })

const resolveId = (defaultId: string | undefined, id: string | undefined, resource: string) => {
  const resolved = id ?? defaultId
  if (resolved) return resolved
  throw new Error(`${resource} id is required. Use vbi_resource list first, then call ${resource}.open(id).`)
}

const createChartSlot = (
  client: VBIProviderClient,
  connectors: CliConnectorRegistry,
  defaultId?: string,
): VBIWorkspaceSlot<VBIChartBuilder> => ({
  describe: async (id?: string) => client.chart(resolveId(defaultId, id, 'chart')).getSummary(),
  open: async (id?: string) => {
    const builder = await client.chart(resolveId(defaultId, id, 'chart')).open()
    const connectorId = getOptionalConnectorId(builder.build())
    if (connectorId) await connectors.ensureKnownConnector(connectorId)
    return builder
  },
  save: async () => {
    await client.chart(resolveId(defaultId, undefined, 'chart')).snapshot()
  },
})

const createReportSlot = (client: VBIProviderClient, defaultId?: string): VBIWorkspaceSlot<VBIReportBuilder> => ({
  describe: async (id?: string) => client.report(resolveId(defaultId, id, 'report')).getSummary(),
  open: async (id?: string) => client.report(resolveId(defaultId, id, 'report')).open(),
  save: async (id?: string) => {
    await client.report(resolveId(defaultId, id, 'report')).snapshot()
  },
})

export const createProviderWorkspace = ({
  chartId,
  client,
  reportId,
}: {
  chartId?: string
  client: VBIProviderClient
  reportId?: string
}): VBIAgentWorkspace => {
  const connectors = createConnectorRegistry(client, chartId)
  return {
    chart: createChartSlot(client, connectors, chartId),
    connectors,
    report: createReportSlot(client, reportId),
  }
}
