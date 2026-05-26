import type { AgentMessage, AgentState, ThinkingLevel } from '@earendil-works/pi-agent-core'

type PiStorageStore = {
  getConfig(): unknown
  setBackend(backend: unknown): void
}
type PiStorageStoreConstructor<TStore extends PiStorageStore = PiStorageStore> = new () => TStore
type PiWebUIStorageModule = {
  AppStorage: new (
    settings: PiStorageStore,
    providerKeys: PiStorageStore,
    sessions: PiStorageStore,
    customProviders: PiStorageStore,
    backend: unknown,
  ) => PiAgentStorage
  CustomProvidersStore: PiStorageStoreConstructor
  IndexedDBStorageBackend: new (config: unknown) => unknown
  ProviderKeysStore: PiStorageStoreConstructor
  SessionsStore: PiStorageStoreConstructor & { getMetadataConfig(): unknown }
  SettingsStore: PiStorageStoreConstructor
  setAppStorage(storage: PiAgentStorage): void
}
type PiWebUIStorageLoader = () => Promise<PiWebUIStorageModule>

type Usage = {
  cacheRead: number
  cacheWrite: number
  cost: {
    cacheRead: number
    cacheWrite: number
    input: number
    output: number
    total: number
  }
  input: number
  output: number
  totalTokens: number
}

type AgentStateSnapshot = Pick<AgentState, 'messages' | 'model' | 'thinkingLevel'>

export type AgentConversationMetadata = {
  createdAt: string
  id: string
  lastModified: string
  messageCount: number
  preview: string
  thinkingLevel: ThinkingLevel
  title: string
  usage: Usage
}

export type AgentConversationSession = {
  createdAt: string
  id: string
  lastModified: string
  messages: AgentMessage[]
  model: AgentState['model']
  thinkingLevel: ThinkingLevel
  title: string
}

export type AgentConversationStatus = 'completed' | 'running'

export type AgentConversationSummary = AgentConversationMetadata & {
  status: AgentConversationStatus
}

export type PiAgentSessionsStore = {
  get(id: string): Promise<AgentConversationSession | null>
  getAllMetadata(): Promise<AgentConversationMetadata[]>
  loadSession(id: string): Promise<AgentConversationSession | null>
  save(data: AgentConversationSession, metadata: AgentConversationMetadata): Promise<void>
}

export type PiAgentStorage = {
  backend: unknown
  sessions: PiAgentSessionsStore
}

type CreateAgentSessionMetadataInput = {
  createdAt: string
  fallbackTitle: string
  id: string
  lastModified: string
  state: Pick<AgentStateSnapshot, 'messages' | 'thinkingLevel'> | { messages?: unknown[]; thinkingLevel?: unknown }
  title?: string
}

type SaveAgentConversationInput = {
  createdAt?: string
  fallbackTitle: string
  id: string
  lastModified?: string
  state: AgentStateSnapshot
  title?: string
}

const emptyUsage: Usage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: {
    cacheRead: 0,
    cacheWrite: 0,
    input: 0,
    output: 0,
    total: 0,
  },
  input: 0,
  output: 0,
  totalTokens: 0,
}

let storageSetup: Promise<PiAgentStorage> | undefined

const defaultLoadPiWebUIStorage: PiWebUIStorageLoader = async () => {
  const [
    { AppStorage, setAppStorage },
    { CustomProvidersStore },
    { IndexedDBStorageBackend },
    { ProviderKeysStore },
    { SessionsStore },
    { SettingsStore },
  ] = await Promise.all([
    import('../../../node_modules/@earendil-works/pi-web-ui/dist/storage/app-storage.js'),
    import('../../../node_modules/@earendil-works/pi-web-ui/dist/storage/stores/custom-providers-store.js'),
    import('../../../node_modules/@earendil-works/pi-web-ui/dist/storage/backends/indexeddb-storage-backend.js'),
    import('../../../node_modules/@earendil-works/pi-web-ui/dist/storage/stores/provider-keys-store.js'),
    import('../../../node_modules/@earendil-works/pi-web-ui/dist/storage/stores/sessions-store.js'),
    import('../../../node_modules/@earendil-works/pi-web-ui/dist/storage/stores/settings-store.js'),
  ])

  return {
    AppStorage,
    CustomProvidersStore,
    IndexedDBStorageBackend,
    ProviderKeysStore,
    SessionsStore,
    SettingsStore,
    setAppStorage,
  } as unknown as PiWebUIStorageModule
}
let loadPiWebUIStorage = defaultLoadPiWebUIStorage

export const setPiWebUIStorageLoaderForTests = (loader?: PiWebUIStorageLoader) => {
  loadPiWebUIStorage = loader ?? defaultLoadPiWebUIStorage
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const readContentText = (content: unknown): string => {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''

  return content
    .map((part) => {
      if (!isRecord(part)) return ''
      if (typeof part.text === 'string') return part.text
      if (typeof part.content === 'string') return part.content
      return ''
    })
    .filter(Boolean)
    .join(' ')
}

const readMessageText = (message: unknown) => {
  if (!isRecord(message)) return ''
  if (message.role !== 'user' && message.role !== 'assistant' && message.role !== 'user-with-attachments') return ''
  return readContentText(message.content).replace(/\s+/g, ' ').trim()
}

const readMessageUsage = (message: unknown): Usage => {
  if (!isRecord(message) || !isRecord(message.usage)) return emptyUsage
  const usage = message.usage
  const cost = isRecord(usage.cost) ? usage.cost : {}

  return {
    cacheRead: Number(usage.cacheRead) || 0,
    cacheWrite: Number(usage.cacheWrite) || 0,
    cost: {
      cacheRead: Number(cost.cacheRead) || 0,
      cacheWrite: Number(cost.cacheWrite) || 0,
      input: Number(cost.input) || 0,
      output: Number(cost.output) || 0,
      total: Number(cost.total) || 0,
    },
    input: Number(usage.input) || 0,
    output: Number(usage.output) || 0,
    totalTokens: Number(usage.totalTokens) || 0,
  }
}

const addUsage = (left: Usage, right: Usage): Usage => ({
  cacheRead: left.cacheRead + right.cacheRead,
  cacheWrite: left.cacheWrite + right.cacheWrite,
  cost: {
    cacheRead: left.cost.cacheRead + right.cost.cacheRead,
    cacheWrite: left.cost.cacheWrite + right.cost.cacheWrite,
    input: left.cost.input + right.cost.input,
    output: left.cost.output + right.cost.output,
    total: left.cost.total + right.cost.total,
  },
  input: left.input + right.input,
  output: left.output + right.output,
  totalTokens: left.totalTokens + right.totalTokens,
})

const resolveThinkingLevel = (value: unknown): ThinkingLevel =>
  value === 'minimal' ||
  value === 'low' ||
  value === 'medium' ||
  value === 'high' ||
  value === 'xhigh' ||
  value === 'off'
    ? value
    : 'off'

export const createAgentConversationId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `conversation-${Date.now()}`
}

export const extractAgentConversationPreview = (messages: unknown[] = []) =>
  messages.map(readMessageText).filter(Boolean).join('\n').slice(0, 2048)

export const createAgentSessionMetadata = ({
  createdAt,
  fallbackTitle,
  id,
  lastModified,
  state,
  title,
}: CreateAgentSessionMetadataInput): AgentConversationMetadata => {
  const messages = Array.isArray(state.messages) ? state.messages : []
  const preview = extractAgentConversationPreview(messages)
  const resolvedTitle = (title?.trim() || preview.split('\n')[0]?.trim() || fallbackTitle).slice(0, 80)
  const usage = messages.map(readMessageUsage).reduce(addUsage, emptyUsage)

  return {
    id,
    title: resolvedTitle,
    createdAt,
    lastModified,
    messageCount: messages.length,
    usage,
    thinkingLevel: resolveThinkingLevel(state.thinkingLevel),
    preview,
  }
}

export const mapAgentConversationMetadata = (
  metadata: AgentConversationMetadata,
  status: AgentConversationStatus = 'completed',
): AgentConversationSummary => ({
  ...metadata,
  status,
})

export const sortAgentConversations = <T extends Pick<AgentConversationMetadata, 'lastModified'>>(items: T[]) =>
  [...items].sort((left, right) => right.lastModified.localeCompare(left.lastModified))

export const setupPiAgentIndexedDBStorage = async (): Promise<PiAgentStorage> => {
  if (typeof window === 'undefined') {
    throw new Error('Pi Agent storage is only available in the browser')
  }

  storageSetup ??= (async () => {
    const {
      AppStorage,
      CustomProvidersStore,
      IndexedDBStorageBackend,
      ProviderKeysStore,
      SessionsStore,
      SettingsStore,
      setAppStorage,
    } = await loadPiWebUIStorage()

    const settings = new SettingsStore()
    const providerKeys = new ProviderKeysStore()
    const sessions = new SessionsStore()
    const customProviders = new CustomProvidersStore()
    const backend = new IndexedDBStorageBackend({
      dbName: 'vbi-agent',
      version: 1,
      stores: [
        settings.getConfig(),
        providerKeys.getConfig(),
        sessions.getConfig(),
        SessionsStore.getMetadataConfig(),
        customProviders.getConfig(),
      ],
    })

    ;[settings, providerKeys, sessions, customProviders].forEach((store) => store.setBackend(backend))

    const appStorage = new AppStorage(settings, providerKeys, sessions, customProviders, backend) as PiAgentStorage
    setAppStorage(appStorage)
    return appStorage
  })()

  return storageSetup
}

export const listAgentConversations = async (storage: PiAgentStorage) =>
  sortAgentConversations((await storage.sessions.getAllMetadata()).map((item) => mapAgentConversationMetadata(item)))

export const loadAgentConversation = async (storage: PiAgentStorage, id: string) =>
  (await storage.sessions.loadSession(id)) ?? storage.sessions.get(id)

export const saveAgentConversation = async (
  storage: PiAgentStorage,
  { createdAt, fallbackTitle, id, lastModified, state, title }: SaveAgentConversationInput,
) => {
  const now = new Date().toISOString()
  const nextCreatedAt = createdAt ?? now
  const nextLastModified = lastModified ?? now
  const metadata = createAgentSessionMetadata({
    createdAt: nextCreatedAt,
    fallbackTitle,
    id,
    lastModified: nextLastModified,
    state,
    title,
  })

  const data: AgentConversationSession = {
    id,
    title: metadata.title,
    model: state.model,
    thinkingLevel: metadata.thinkingLevel,
    messages: state.messages,
    createdAt: nextCreatedAt,
    lastModified: nextLastModified,
  }

  await storage.sessions.save(data, metadata)
  return metadata
}

export const resetPiAgentStorageForTests = () => {
  storageSetup = undefined
}
