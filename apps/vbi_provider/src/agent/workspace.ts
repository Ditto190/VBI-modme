import { createVBIProviderConnectorRegistry, getOptionalConnectorId } from './connector-registry'
import { resolveResourceId } from './id'
import type { VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import type { VBIProviderClient } from '../types'

export type VBIProviderWorkspaceSlot<TBuilder> = {
  close(id?: string): Promise<void>
  describe(id?: string): Promise<unknown>
  open(id?: string): Promise<TBuilder>
  snapshot(id?: string): Promise<unknown>
}

export type VBIProviderWorkspace = {
  chart: VBIProviderWorkspaceSlot<VBIChartBuilder>
  connectors: ReturnType<typeof createVBIProviderConnectorRegistry>
  insight: VBIProviderWorkspaceSlot<VBIInsightBuilder>
  report: VBIProviderWorkspaceSlot<VBIReportBuilder>
}

type VBIProviderBuilder<TBuilder> = {
  close(): Promise<void>
  getSummary(): Promise<unknown>
  open(): Promise<TBuilder>
  snapshot(): Promise<unknown>
}

type CreateSlotInput<TBuilder> = {
  afterOpen?(builder: TBuilder): Promise<void>
  createProvider(id: string): VBIProviderBuilder<TBuilder>
  defaultId?: string
  resource: string
}

const createBuilderSlot = <TBuilder>({
  afterOpen,
  createProvider,
  defaultId,
  resource,
}: CreateSlotInput<TBuilder>): VBIProviderWorkspaceSlot<TBuilder> => {
  const providers = new Map<string, VBIProviderBuilder<TBuilder>>()
  const getProvider = (id?: string) => {
    const resourceId = resolveResourceId(defaultId, id, resource)
    const provider = providers.get(resourceId) ?? createProvider(resourceId)
    providers.set(resourceId, provider)
    return provider
  }

  return {
    close: (id?: string) => getProvider(id).close(),
    describe: (id?: string) => getProvider(id).getSummary(),
    open: async (id?: string) => {
      const builder = await getProvider(id).open()
      await afterOpen?.(builder)
      return builder
    },
    snapshot: async (id?: string) => {
      const provider = getProvider(id)
      const builder = await provider.open()
      await afterOpen?.(builder)
      return provider.snapshot()
    },
  }
}

export const createVBIProviderWorkspace = ({
  chartId,
  client,
  insightId,
  reportId,
}: {
  chartId?: string
  client: VBIProviderClient
  insightId?: string
  reportId?: string
}): VBIProviderWorkspace => {
  const connectors = createVBIProviderConnectorRegistry(client, chartId)
  return {
    chart: createBuilderSlot({
      afterOpen: async (builder) => {
        const connectorId = getOptionalConnectorId(builder.build())
        if (connectorId) await connectors.ensureKnownConnector(connectorId)
      },
      createProvider: (id) => client.chart(id),
      defaultId: chartId,
      resource: 'chart',
    }),
    connectors,
    insight: createBuilderSlot({
      createProvider: (id) => client.insight(id),
      defaultId: insightId,
      resource: 'insight',
    }),
    report: createBuilderSlot({
      createProvider: (id) => client.report(id),
      defaultId: reportId,
      resource: 'report',
    }),
  }
}
