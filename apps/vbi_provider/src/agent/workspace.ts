import { createVBIProviderConnectorRegistry, getOptionalConnectorId } from './connector-registry'
import { resolveResourceId } from './id'
import type { VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import type { VBIProviderClient } from '../types'
import type {
  VBIReferenceWorkspaceSlot,
  VBIReportPageInput,
  VBIReportWorkspaceSlot,
  VBIResourceCreateInput,
} from '@visactor/vbi-agent'

export type VBIProviderWorkspaceSlot<TBuilder> = VBIReferenceWorkspaceSlot<TBuilder> & {
  close(id?: string): Promise<void>
  describe(id?: string): Promise<unknown>
  open(id?: string): Promise<TBuilder>
  snapshot(id?: string): Promise<unknown>
}

export type VBIProviderReportWorkspaceSlot<TBuilder> = VBIReportWorkspaceSlot<TBuilder> & {
  close(id?: string): Promise<void>
  describe(id?: string): Promise<unknown>
  open(id?: string): Promise<TBuilder>
  snapshot(id?: string): Promise<unknown>
}

export type VBIProviderWorkspace = {
  chart: VBIProviderWorkspaceSlot<VBIChartBuilder>
  connectors: ReturnType<typeof createVBIProviderConnectorRegistry>
  insight: VBIProviderWorkspaceSlot<VBIInsightBuilder>
  report: VBIProviderReportWorkspaceSlot<VBIReportBuilder>
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
  const chart = createBuilderSlot({
    afterOpen: async (builder: VBIChartBuilder) => {
      const connectorId = getOptionalConnectorId(builder.build())
      if (connectorId) await connectors.ensureKnownConnector(connectorId)
    },
    createProvider: (id) => client.chart(id),
    defaultId: chartId,
    resource: 'chart',
  })
  const insight = createBuilderSlot({
    createProvider: (id) => client.insight(id),
    defaultId: insightId,
    resource: 'insight',
  })
  const report = createBuilderSlot({
    createProvider: (id) => client.report(id),
    defaultId: reportId,
    resource: 'report',
  })
  return {
    connectors,
    chart: {
      ...chart,
      create: (input?: VBIResourceCreateInput) => client.chart().create(input),
      list: () => client.listCharts(),
      references: (id: string) => client.chart(id).getReferences(),
      remove: (id: string) => client.chart(id).remove(),
      rename: (id: string, name: string) => client.chart(id).rename(name),
    },
    insight: {
      ...insight,
      create: (input?: VBIResourceCreateInput) => client.insight().create(input),
      list: () => client.listInsights(),
      references: (id: string) => client.insight(id).getReferences(),
      remove: (id: string) => client.insight(id).remove(),
      rename: (id: string, name: string) => client.insight(id).rename(name),
    },
    report: {
      ...report,
      create: (input?: VBIResourceCreateInput) => client.report().create(input),
      createPage: (id: string, input?: { title?: string }) => client.report(id).createPage(input),
      exportSnapshot: (id: string) => client.report(id).exportSnapshot(),
      list: () => client.listReports(),
      remove: (id: string) => client.report(id).remove(),
      removePage: (id: string, pageId: string) => client.report(id).removePage(pageId),
      rename: (id: string, name: string) => client.report(id).rename(name),
      reorderPages: (id: string, pageIds: string[]) => client.report(id).reorderPages(pageIds),
      updatePage: (id: string, pageId: string, input: VBIReportPageInput) =>
        client.report(id).updatePage(pageId, input),
    },
  }
}
