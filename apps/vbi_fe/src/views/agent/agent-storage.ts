import type { AgentMessage, AgentState, ThinkingLevel } from '@earendil-works/pi-agent-core'

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

export type VbiAgentConversationRecord = {
  metadata: AgentConversationMetadata
  schemaVersion: 1
  session: AgentConversationSession
}

export type VbiAgentConversationDatabase = {
  delete(id: string): Promise<void>
  getAll(): Promise<VbiAgentConversationRecord[]>
  get(id: string): Promise<VbiAgentConversationRecord | null>
  put(record: VbiAgentConversationRecord): Promise<void>
}

export type VbiAgentConversationsStore = {
  delete(id: string): Promise<void>
  get(id: string): Promise<AgentConversationSession | null>
  getAllMetadata(): Promise<AgentConversationMetadata[]>
  loadSession(id: string): Promise<AgentConversationSession | null>
  rename(id: string, title: string): Promise<AgentConversationMetadata | null>
  save(data: AgentConversationSession, metadata: AgentConversationMetadata): Promise<void>
}

export type VbiAgentStorage = {
  conversations: VbiAgentConversationsStore
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

type VbiAgentIndexedDBFactory = () => Promise<VbiAgentConversationDatabase>

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

const databaseName = 'vbi-agent-conversations'
const databaseVersion = 1
const conversationStoreName = 'conversations'

let storageSetup: Promise<VbiAgentStorage> | undefined

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const readAgentContentText = (content: unknown): string => {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''

  return content
    .map((part) => {
      if (!isRecord(part)) return ''
      if (typeof part.text === 'string') return part.text
      if (typeof part.content === 'string') return part.content
      if (typeof part.thinking === 'string') return part.thinking
      return ''
    })
    .filter(Boolean)
    .join(' ')
}

export const readAgentMessageText = (message: unknown) => {
  if (!isRecord(message)) return ''
  if (message.role !== 'user' && message.role !== 'assistant' && message.role !== 'user-with-attachments') return ''
  return readAgentContentText(message.content).replace(/\s+/g, ' ').trim()
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
  messages.map(readAgentMessageText).filter(Boolean).join('\n').slice(0, 2048)

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

const requestToPromise = <T>(request: IDBRequest<T>) =>
  new Promise<T>((resolve, reject) => {
    request.addEventListener('success', () => resolve(request.result))
    request.addEventListener('error', () => reject(request.error ?? new Error('IndexedDB request failed')))
  })

const transactionDone = (transaction: IDBTransaction) =>
  new Promise<void>((resolve, reject) => {
    transaction.addEventListener('complete', () => resolve())
    transaction.addEventListener('abort', () => reject(transaction.error ?? new Error('IndexedDB transaction aborted')))
    transaction.addEventListener('error', () => reject(transaction.error ?? new Error('IndexedDB transaction failed')))
  })

const openVbiAgentDatabase = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseName, databaseVersion)

    request.addEventListener('upgradeneeded', () => {
      const db = request.result
      if (!db.objectStoreNames.contains(conversationStoreName)) {
        const store = db.createObjectStore(conversationStoreName, { keyPath: 'session.id' })
        store.createIndex('lastModified', 'metadata.lastModified')
      }
    })
    request.addEventListener('success', () => {
      const db = request.result
      db.addEventListener('versionchange', () => db.close())
      resolve(db)
    })
    request.addEventListener('error', () => reject(request.error ?? new Error('Unable to open VBI Agent storage')))
  })

const createBrowserIndexedDBConversationDatabase = async (): Promise<VbiAgentConversationDatabase> => {
  const db = await openVbiAgentDatabase()

  const withStore = async <T>(
    mode: IDBTransactionMode,
    action: (store: IDBObjectStore) => Promise<T> | T,
  ): Promise<T> => {
    const transaction = db.transaction(conversationStoreName, mode)
    const store = transaction.objectStore(conversationStoreName)
    const result = await action(store)
    await transactionDone(transaction)
    return result
  }

  return {
    delete: (id) =>
      withStore('readwrite', async (store) => {
        await requestToPromise(store.delete(id))
      }),
    get: (id) => withStore('readonly', async (store) => (await requestToPromise(store.get(id))) ?? null),
    getAll: () => withStore('readonly', (store) => requestToPromise(store.getAll())),
    put: (record) =>
      withStore('readwrite', async (store) => {
        await requestToPromise(store.put(record))
      }),
  }
}

let createIndexedDBConversationDatabase: VbiAgentIndexedDBFactory = createBrowserIndexedDBConversationDatabase

export const setVbiAgentIndexedDBFactoryForTests = (factory?: VbiAgentIndexedDBFactory) => {
  createIndexedDBConversationDatabase = factory ?? createBrowserIndexedDBConversationDatabase
}

export const createVbiAgentStorage = (database: VbiAgentConversationDatabase): VbiAgentStorage => ({
  conversations: {
    delete: (id) => database.delete(id),
    get: async (id) => (await database.get(id))?.session ?? null,
    getAllMetadata: async () => (await database.getAll()).map((record) => record.metadata),
    loadSession: async (id) => (await database.get(id))?.session ?? null,
    rename: async (id, title) => {
      const nextTitle = title.trim()
      if (!nextTitle) return null

      const record = await database.get(id)
      if (!record) return null

      const metadata: AgentConversationMetadata = {
        ...record.metadata,
        title: nextTitle,
      }
      const session: AgentConversationSession = {
        ...record.session,
        title: nextTitle,
      }

      await database.put({
        ...record,
        metadata,
        session,
      })

      return metadata
    },
    save: async (session, metadata) => {
      await database.put({
        metadata,
        schemaVersion: 1,
        session,
      })
    },
  },
})

export const setupVbiAgentIndexedDBStorage = async (): Promise<VbiAgentStorage> => {
  if (typeof window === 'undefined') {
    throw new Error('VBI Agent storage is only available in the browser')
  }

  storageSetup ??= createIndexedDBConversationDatabase().then(createVbiAgentStorage)
  return storageSetup
}

export const listAgentConversations = async (storage: VbiAgentStorage) =>
  sortAgentConversations(
    (await storage.conversations.getAllMetadata()).map((item) => mapAgentConversationMetadata(item)),
  )

export const deleteAgentConversation = (storage: VbiAgentStorage, id: string) => storage.conversations.delete(id)

export const loadAgentConversation = async (storage: VbiAgentStorage, id: string) =>
  (await storage.conversations.loadSession(id)) ?? storage.conversations.get(id)

export const renameAgentConversation = (storage: VbiAgentStorage, id: string, title: string) =>
  storage.conversations.rename(id, title)

export const saveAgentConversation = async (
  storage: VbiAgentStorage,
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

  await storage.conversations.save(data, metadata)
  return metadata
}

export const resetVbiAgentStorageForTests = () => {
  storageSetup = undefined
}
