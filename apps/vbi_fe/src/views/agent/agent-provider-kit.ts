import type { VBIChartBuilder, VBIConnector, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import { createVBIResourceTools } from '@visactor/vbi-agent/resource-tools'
import type {
  VBIReferenceWorkspaceSlot,
  VBIReportPageInput,
  VBIReportWorkspaceSlot,
  VBIResourceCreateInput,
} from '@visactor/vbi-agent'
import type { ResourceKind } from '../../types'

type Resource = 'chart' | 'insight' | 'report'

type BuilderByResource = {
  chart: VBIChartBuilder
  insight: VBIInsightBuilder
  report: VBIReportBuilder
}

type ResourceHandle<TBuilder> = {
  close(): Promise<void>
  getSummary(): Promise<unknown>
  open(): Promise<TBuilder>
  snapshot(): Promise<unknown>
}

type WorkspaceSlot<TBuilder> = {
  close(id?: string): Promise<void>
  describe(id?: string): Promise<unknown>
  open(id?: string): Promise<TBuilder>
  snapshot(id?: string): Promise<unknown>
}

type ConnectorRegistration = VBIConnector | (() => Promise<VBIConnector>)

type BrowserConnectorRegistry = {
  ensureKnownConnector(connectorId: string): Promise<void>
  getChartConnectorId(chartId?: string): Promise<string>
  register(id: string, connector: ConnectorRegistration): string
  registerChart(chartId: string | undefined, connector: ConnectorRegistration): Promise<string>
}

type AgentProviderKitOptions = {
  baseUrl: string
  chartId?: string
  insightId?: string
  reportId?: string
}

type RemoteSessionConnection = {
  roomName: string
  websocketUrl: string
}

type SyncedProvider = {
  destroy(): void
  off(event: 'synced', handler: (payload: { state: boolean }) => void): void
  on(event: 'synced', handler: (payload: { state: boolean }) => void): void
  synced: boolean
}

type RemoteBuilderState<TBuilder> = {
  builder: TBuilder | null
  doc: { destroy(): void } | null
  opening: Promise<TBuilder> | null
  provider: SyncedProvider | null
  websocketProvider: { destroy(): void } | null
}

const demoSchema = [
  { name: 'id', type: 'string' },
  { name: 'order_id', type: 'string' },
  { name: 'order_date', type: 'date' },
  { name: 'delivery_date', type: 'date' },
  { name: 'delivery_method', type: 'string' },
  { name: 'customer_id', type: 'string' },
  { name: 'customer_name', type: 'string' },
  { name: 'customer_type', type: 'string' },
  { name: 'city', type: 'string' },
  { name: 'province', type: 'string' },
  { name: 'country_or_region', type: 'string' },
  { name: 'area', type: 'string' },
  { name: 'product_id', type: 'string' },
  { name: 'product_type', type: 'string' },
  { name: 'product_sub_type', type: 'string' },
  { name: 'product_name', type: 'string' },
  { name: 'sales', type: 'number' },
  { name: 'amount', type: 'number' },
  { name: 'discount', type: 'number' },
  { name: 'profit', type: 'number' },
]

const requestJson = async <T>(baseUrl: string, path: string, init?: { body?: unknown; method?: string }) => {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, {
    method: init?.method ?? 'GET',
    headers: init?.body === undefined ? undefined : { 'Content-Type': 'application/json' },
    ...(init?.body === undefined ? {} : { body: JSON.stringify(init.body) }),
  })
  const payload = (await response.json()) as { data?: T; message?: string }
  if (!response.ok) throw new Error(payload.message || `Request failed: ${response.status}`)
  return payload.data as T
}

const requireString = (value: string | undefined, label: string) => {
  if (!value) throw new Error(`${label} is required`)
  return value
}

const resourcePath = (resource: Resource) => {
  if (resource === 'chart') return '/charts'
  if (resource === 'insight') return '/insights'
  return '/reports'
}

const createResourceBody = (resource: Resource, input?: VBIResourceCreateInput) => ({
  ...(input?.name === undefined ? {} : { name: input.name }),
  ...(resource === 'insight' && input?.content !== undefined ? { content: input.content } : {}),
})

const resourceIdPath = (resource: Resource, id: string) =>
  `${resourcePath(resource)}/${requireString(id, `${resource} id`)}`

const resolveWorkspaceId = (resource: ResourceKind, defaultId?: string, id?: string, activeId?: string) => {
  const resourceId = id?.trim() || activeId?.trim() || defaultId?.trim()
  if (!resourceId) throw new Error(`${resource} workspace requires a resource id`)
  return resourceId
}

const getOptionalConnectorId = (dsl: unknown) =>
  dsl && typeof dsl === 'object' && 'connectorId' in dsl && typeof dsl.connectorId === 'string' ? dsl.connectorId : null

const getConnectorId = (dsl: unknown) => {
  const connectorId = getOptionalConnectorId(dsl)
  if (!connectorId) throw new Error('chart connectorId is required')
  return connectorId
}

const loadVBI = async () => (await import('@visactor/vbi')).VBI

const registerKnownDemoConnector = async () => {
  const VBI = await loadVBI()
  VBI.connectors.register('demo', {
    discoverSchema: async () => demoSchema,
    query: async () => {
      throw new Error('Demo connector query is not available in the web agent builder workspace.')
    },
  })
}

const hasSchemaConnector = async (id: string) => {
  try {
    const VBI = await loadVBI()
    const connector = await VBI.connectors.get(id)
    return typeof connector.discoverSchema === 'function'
  } catch {
    return false
  }
}

const createConnectorRegistry = (
  openChart: (chartId?: string) => Promise<VBIChartBuilder>,
): BrowserConnectorRegistry => {
  const registerConnector = async (id: string, connector: ConnectorRegistration) => {
    if (!connector) throw new Error('connector registration is required')
    const VBI = await loadVBI()
    VBI.connectors.register(id, connector)
    return id
  }
  const register = (id: string, connector: ConnectorRegistration) => {
    void registerConnector(id, connector)
    return id
  }
  const ensureKnownConnector = async (connectorId: string) => {
    if (await hasSchemaConnector(connectorId)) return
    if (connectorId === 'demo') await registerKnownDemoConnector()
  }
  const getChartConnectorId = async (chartId?: string) => {
    const connectorId = getConnectorId((await openChart(chartId)).build())
    await ensureKnownConnector(connectorId)
    return connectorId
  }
  return {
    ensureKnownConnector,
    getChartConnectorId,
    register,
    registerChart: async (chartId, connector) => registerConnector(await getChartConnectorId(chartId), connector),
  }
}

const parseRoomName = (roomName: string) => {
  const separator = roomName.indexOf(':')
  if (separator <= 0 || separator >= roomName.length - 1) return null
  return {
    resourceId: roomName.slice(separator + 1),
    resourceType: roomName.slice(0, separator),
  }
}

const appendCollaborationPath = (pathname: string, metadata: { resourceId: string; resourceType: string }) => {
  const base = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return `${base}/provider/resourceType=${metadata.resourceType}&resourceId=${metadata.resourceId}`.replace(/\/+/g, '/')
}

const buildSocketUrl = (session: RemoteSessionConnection) => {
  const metadata = parseRoomName(session.roomName)
  if (!metadata) return session.websocketUrl
  try {
    const url = new URL(session.websocketUrl)
    url.pathname = appendCollaborationPath(url.pathname, metadata)
    return url.toString()
  } catch {
    return appendCollaborationPath(session.websocketUrl, metadata)
  }
}

const waitForSync = (provider: SyncedProvider, timeoutMs: number) =>
  new Promise<void>((resolve, reject) => {
    if (provider.synced) return resolve()
    const onSynced = ({ state }: { state: boolean }) => {
      if (!state) return
      provider.off('synced', onSynced)
      clearTimeout(timer)
      resolve()
    }
    const timer = setTimeout(() => {
      provider.off('synced', onSynced)
      reject(new Error(`Collaboration sync timeout after ${timeoutMs}ms`))
    }, timeoutMs)
    provider.on('synced', onSynced)
  })

const closeRemoteState = async <TBuilder>(state: RemoteBuilderState<TBuilder>) => {
  state.provider?.destroy()
  state.websocketProvider?.destroy()
  state.doc?.destroy()
  Object.assign(state, { builder: null, doc: null, opening: null, provider: null, websocketProvider: null })
}

const createBuilderFromDoc = async <TKind extends ResourceKind>(
  kind: TKind,
  doc: unknown,
): Promise<BuilderByResource[TKind]> => {
  const { VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } = await import('@visactor/vbi')
  if (kind === 'chart') return new VBIChartBuilder(doc as never) as BuilderByResource[TKind]
  if (kind === 'insight') return new VBIInsightBuilder(doc as never) as BuilderByResource[TKind]
  return new VBIReportBuilder(doc as never) as BuilderByResource[TKind]
}

const createRemoteHandle = <TKind extends ResourceKind>(
  baseUrl: string,
  kind: TKind,
  resourceId: string,
): ResourceHandle<BuilderByResource[TKind]> => {
  const state: RemoteBuilderState<BuilderByResource[TKind]> = {
    builder: null,
    doc: null,
    opening: null,
    provider: null,
    websocketProvider: null,
  }
  const path = resourcePath(kind)
  const getResource = () => requestJson<unknown>(baseUrl, `${path}/${resourceId}`)
  const open = async () => {
    if (state.builder) return state.builder
    if (state.opening) return state.opening

    const opening = (async () => {
      const [{ HocuspocusProvider, HocuspocusProviderWebsocket }, Y] = await Promise.all([
        import('@hocuspocus/provider'),
        import('yjs'),
      ])
      const session = await requestJson<RemoteSessionConnection>(baseUrl, `${path}/${resourceId}/collaboration`)
      const doc = new Y.Doc()
      const websocketProvider = new HocuspocusProviderWebsocket({ url: buildSocketUrl(session) })
      const provider = new HocuspocusProvider({ document: doc, name: session.roomName, websocketProvider })
      Object.assign(state, { doc, provider, websocketProvider })
      provider.attach()

      try {
        await waitForSync(provider, 10000)
        state.builder = await createBuilderFromDoc(kind, doc)
        return state.builder
      } catch (error) {
        await closeRemoteState(state)
        throw error
      }
    })()

    state.opening = opening
    try {
      return await opening
    } finally {
      if (state.opening === opening) state.opening = null
    }
  }

  return {
    close: () => closeRemoteState(state),
    getSummary: getResource,
    open,
    snapshot: async () => ({
      dsl: (await open()).build(),
      resource: await getResource(),
    }),
  }
}

const createBuilderSlot = <TKind extends ResourceKind>({
  afterOpen,
  baseUrl,
  defaultId,
  kind,
}: {
  afterOpen?(builder: BuilderByResource[TKind]): Promise<void>
  baseUrl: string
  defaultId?: string
  kind: TKind
}): WorkspaceSlot<BuilderByResource[TKind]> => {
  const handles = new Map<string, ResourceHandle<BuilderByResource[TKind]>>()
  let activeId = defaultId?.trim() || ''
  const getHandle = (id?: string) => {
    const resourceId = resolveWorkspaceId(kind, defaultId, id, activeId)
    const handle = handles.get(resourceId) ?? createRemoteHandle(baseUrl, kind, resourceId)
    handles.set(resourceId, handle)
    activeId = resourceId
    return handle
  }
  const open = async (id?: string) => {
    const builder = await getHandle(id).open()
    await afterOpen?.(builder)
    return builder
  }

  return {
    close: (id?: string) => getHandle(id).close(),
    describe: (id?: string) => getHandle(id).getSummary(),
    open,
    snapshot: async (id?: string) => {
      const handle = getHandle(id)
      const builder = await handle.open()
      await afterOpen?.(builder)
      return handle.snapshot()
    },
  }
}

export const createAgentProviderKit = ({ baseUrl, chartId, insightId, reportId }: AgentProviderKitOptions) => {
  let connectors: BrowserConnectorRegistry
  const chartSlot = createBuilderSlot({
    afterOpen: async (builder) => {
      const connectorId = getOptionalConnectorId(builder.build())
      if (connectorId) await connectors.ensureKnownConnector(connectorId)
    },
    baseUrl,
    defaultId: chartId,
    kind: 'chart',
  })
  connectors = createConnectorRegistry(chartSlot.open)
  const insightSlot = createBuilderSlot({ baseUrl, defaultId: insightId, kind: 'insight' })
  const reportSlot = createBuilderSlot({ baseUrl, defaultId: reportId, kind: 'report' })
  const chart: VBIReferenceWorkspaceSlot<VBIChartBuilder> = {
    ...chartSlot,
    create: (input?: VBIResourceCreateInput) =>
      requestJson(baseUrl, resourcePath('chart'), { method: 'POST', body: createResourceBody('chart', input) }),
    list: () =>
      requestJson<Array<{ id: string; name?: string | null; [key: string]: unknown }>>(baseUrl, resourcePath('chart')),
    references: (id: string) => requestJson(baseUrl, `${resourceIdPath('chart', id)}/references`),
    remove: (id: string) => requestJson(baseUrl, resourceIdPath('chart', id), { method: 'DELETE' }),
    rename: (id: string, name: string) =>
      requestJson(baseUrl, resourceIdPath('chart', id), { method: 'PATCH', body: { name } }),
  }
  const insight: VBIReferenceWorkspaceSlot<VBIInsightBuilder> = {
    ...insightSlot,
    create: (input?: VBIResourceCreateInput) =>
      requestJson(baseUrl, resourcePath('insight'), { method: 'POST', body: createResourceBody('insight', input) }),
    list: () =>
      requestJson<Array<{ id: string; name?: string | null; [key: string]: unknown }>>(
        baseUrl,
        resourcePath('insight'),
      ),
    references: (id: string) => requestJson(baseUrl, `${resourceIdPath('insight', id)}/references`),
    remove: (id: string) => requestJson(baseUrl, resourceIdPath('insight', id), { method: 'DELETE' }),
    rename: (id: string, name: string) =>
      requestJson(baseUrl, resourceIdPath('insight', id), { method: 'PATCH', body: { name } }),
  }
  const report: VBIReportWorkspaceSlot<VBIReportBuilder> = {
    ...reportSlot,
    create: (input?: VBIResourceCreateInput) =>
      requestJson(baseUrl, resourcePath('report'), { method: 'POST', body: createResourceBody('report', input) }),
    createPage: (id: string, input?: { title?: string }) =>
      requestJson(baseUrl, `${resourceIdPath('report', id)}/pages`, {
        method: 'POST',
        body: { title: input?.title },
      }),
    exportSnapshot: (id: string) => requestJson(baseUrl, `${resourceIdPath('report', id)}/snapshot`),
    list: () =>
      requestJson<Array<{ id: string; name?: string | null; [key: string]: unknown }>>(baseUrl, resourcePath('report')),
    remove: (id: string) => requestJson(baseUrl, resourceIdPath('report', id), { method: 'DELETE' }),
    removePage: (id: string, pageId: string) =>
      requestJson(baseUrl, `${resourceIdPath('report', id)}/pages/${requireString(pageId, 'page id')}`, {
        method: 'DELETE',
      }),
    rename: (id: string, name: string) =>
      requestJson(baseUrl, resourceIdPath('report', id), { method: 'PATCH', body: { name } }),
    reorderPages: (id: string, pageIds: string[]) =>
      requestJson(baseUrl, `${resourceIdPath('report', id)}/pages/reorder`, { method: 'PATCH', body: { pageIds } }),
    updatePage: (id: string, pageId: string, input: VBIReportPageInput) =>
      requestJson(baseUrl, `${resourceIdPath('report', id)}/pages/${requireString(pageId, 'page id')}`, {
        method: 'PATCH',
        body: input,
      }),
  }
  const workspace = {
    chart,
    connectors,
    insight,
    report,
  }

  return {
    tools: createVBIResourceTools({ workspace }),
    workspace,
  }
}
