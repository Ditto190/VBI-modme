import type { VBIAgentWorkspace, VBIWorkspaceSlot } from '@visactor/vbi-agent'
import type { VBIProviderClient } from '@visactor/headless-bi-provider'

interface ProviderWorkspaceInput {
  chartId?: string
  client: VBIProviderClient
  reportId?: string
}

const resolveId = (defaultId: string | undefined, id: string | undefined, resource: string) => {
  const resolved = id ?? defaultId
  if (resolved) return resolved
  throw new Error(`${resource} id is required. Use vbi_resource list first, then call ${resource}.open(id).`)
}

const createChartSlot = (client: VBIProviderClient, defaultId?: string): VBIWorkspaceSlot => ({
  describe: async (id?: string) => client.chart(resolveId(defaultId, id, 'chart')).getSummary(),
  open: async (id?: string) => client.chart(resolveId(defaultId, id, 'chart')).open(),
  save: async () => {
    await client.chart(resolveId(defaultId, undefined, 'chart')).snapshot()
  },
})

const createReportSlot = (client: VBIProviderClient, defaultId?: string): VBIWorkspaceSlot => ({
  describe: async (id?: string) => client.report(resolveId(defaultId, id, 'report')).getSummary(),
  open: async (id?: string) => client.report(resolveId(defaultId, id, 'report')).open(),
  save: async (id?: string) => {
    await client.report(resolveId(defaultId, id, 'report')).snapshot()
  },
})

export const createProviderWorkspace = ({ chartId, client, reportId }: ProviderWorkspaceInput): VBIAgentWorkspace => ({
  chart: createChartSlot(client, chartId),
  report: createReportSlot(client, reportId),
})
