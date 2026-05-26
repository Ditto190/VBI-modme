import type { VBIChartBuilder, VBIConnector, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import type { ResourceKind } from '../../types'

type Resource = 'chart' | 'insight' | 'report'

type ResourceToolInput = {
  action?: string
  chartId?: string
  content?: string
  id?: string
  insightId?: string
  name?: string
  pageAction?: string
  pageId?: string
  pageIds?: string[]
  resource?: Resource
  title?: string
}

type AgentToolResult = {
  content: Array<{ text: string; type: 'text' }>
  details: { display: string; summary: string }
}

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

const readInput = (input: unknown): ResourceToolInput => {
  if (typeof input === 'object' && input !== null && !Array.isArray(input)) return input as ResourceToolInput
  throw new Error('vbi_resource input must be an object')
}

const requireString = (value: string | undefined, label: string) => {
  if (!value) throw new Error(`vbi_resource.${label} is required`)
  return value
}

const resourcePath = (resource: Resource) => {
  if (resource === 'chart') return '/charts'
  if (resource === 'insight') return '/insights'
  return '/reports'
}

const executeResourceAction = async (baseUrl: string, input: ResourceToolInput) => {
  const resource = requireString(input.resource, 'resource') as Resource
  const action = requireString(input.action, 'action')
  const collection = resourcePath(resource)
  const idPath = input.id ? `${collection}/${input.id}` : collection

  if (action === 'list') return requestJson(baseUrl, collection)
  if (action === 'create') return requestJson(baseUrl, collection, { method: 'POST', body: { name: input.name } })
  if (action === 'get') return requestJson(baseUrl, idPath)
  if (action === 'rename')
    return requestJson(baseUrl, idPath, { method: 'PATCH', body: { name: requireString(input.name, 'name') } })
  if (action === 'remove') return requestJson(baseUrl, idPath, { method: 'DELETE' })

  if ((resource === 'chart' || resource === 'insight') && action === 'references') {
    return requestJson(baseUrl, `${collection}/${requireString(input.id, 'id')}/references`)
  }
  if (resource === 'report' && action === 'exportSnapshot') {
    return requestJson(baseUrl, `${collection}/${requireString(input.id, 'id')}/snapshot`)
  }
  if (resource === 'report' && action === 'page') {
    const reportId = requireString(input.id, 'id')
    if (input.pageAction === 'create') {
      return requestJson(baseUrl, `${collection}/${reportId}/pages`, { method: 'POST', body: { title: input.title } })
    }
    if (input.pageAction === 'remove') {
      return requestJson(baseUrl, `${collection}/${reportId}/pages/${requireString(input.pageId, 'pageId')}`, {
        method: 'DELETE',
      })
    }
    if (input.pageAction === 'reorder') {
      return requestJson(baseUrl, `${collection}/${reportId}/pages/reorder`, {
        method: 'PATCH',
        body: { pageIds: input.pageIds ?? [] },
      })
    }
    if (input.pageAction === 'update') {
      return requestJson(baseUrl, `${collection}/${reportId}/pages/${requireString(input.pageId, 'pageId')}`, {
        method: 'PATCH',
        body: { chartId: input.chartId, insightId: input.insightId, title: input.title },
      })
    }
  }
  throw new Error('Unsupported vbi_resource action')
}

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
  const chart = createBuilderSlot({
    afterOpen: async (builder) => {
      const connectorId = getOptionalConnectorId(builder.build())
      if (connectorId) await connectors.ensureKnownConnector(connectorId)
    },
    baseUrl,
    defaultId: chartId,
    kind: 'chart',
  })
  connectors = createConnectorRegistry(chart.open)

  return {
    tools: [
      {
        description:
          'Discover and manage VBI resources. Supports list/create/get/rename/remove for chart, insight, and report; references for chart and insight; report exportSnapshot; and report page create/remove/reorder/update.',
        execute: async (_toolCallId: string, input: unknown): Promise<AgentToolResult> => {
          const params = readInput(input)
          const result = await executeResourceAction(baseUrl, params)
          const content = JSON.stringify(result, null, 2)
          return {
            content: [{ text: content, type: 'text' }],
            details: {
              display: content,
              summary: `vbi_resource ${params.resource}.${params.action} completed`,
            },
          }
        },
        label: 'VBI Resource',
        name: 'vbi_resource',
        parameters: {
          type: 'object',
          additionalProperties: true,
          properties: {
            action: { type: 'string' },
            chartId: { type: 'string' },
            content: { type: 'string' },
            id: { type: 'string' },
            insightId: { type: 'string' },
            name: { type: 'string' },
            pageAction: { type: 'string' },
            pageId: { type: 'string' },
            pageIds: { type: 'array', items: { type: 'string' } },
            resource: { type: 'string', enum: ['chart', 'insight', 'report'] },
            title: { type: 'string' },
          },
        },
      },
    ],
    workspace: {
      chart,
      connectors,
      insight: createBuilderSlot({ baseUrl, defaultId: insightId, kind: 'insight' }),
      report: createBuilderSlot({ baseUrl, defaultId: reportId, kind: 'report' }),
    },
  }
}
