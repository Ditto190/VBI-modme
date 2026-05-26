import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const setAppStorage = rs.fn()
const createdBackends: unknown[] = []

class MockAppStorage {
  constructor(
    readonly settings: unknown,
    readonly providerKeys: unknown,
    readonly sessions: unknown,
    readonly customProviders: unknown,
    readonly backend: unknown,
  ) {}
}

class MockIndexedDBStorageBackend {
  constructor(readonly config: unknown) {
    createdBackends.push(config)
  }
}

class MockSettingsStore {
  getConfig() {
    return { name: 'settings' }
  }
  setBackend = rs.fn()
}

class MockProviderKeysStore {
  getConfig() {
    return { name: 'provider-keys' }
  }
  setBackend = rs.fn()
}

class MockSessionsStore {
  static getMetadataConfig() {
    return { name: 'sessions-metadata', keyPath: 'id' }
  }
  getConfig() {
    return { name: 'sessions', keyPath: 'id' }
  }
  setBackend = rs.fn()
}

class MockCustomProvidersStore {
  getConfig() {
    return { name: 'custom-providers' }
  }
  setBackend = rs.fn()
}

const loadMockPiWebUI = async () =>
  ({
    AppStorage: MockAppStorage,
    CustomProvidersStore: MockCustomProvidersStore,
    IndexedDBStorageBackend: MockIndexedDBStorageBackend,
    ProviderKeysStore: MockProviderKeysStore,
    SessionsStore: MockSessionsStore,
    SettingsStore: MockSettingsStore,
    setAppStorage,
  }) as never

const {
  createAgentSessionMetadata,
  extractAgentConversationPreview,
  resetPiAgentStorageForTests,
  setPiWebUIStorageLoaderForTests,
  setupPiAgentIndexedDBStorage,
} = await import('../src/views/agent/agent-storage')

describe('agent storage', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    createdBackends.length = 0
    setPiWebUIStorageLoaderForTests(loadMockPiWebUI)
    resetPiAgentStorageForTests()
  })

  test('initializes Pi Web UI storage with IndexedDB session stores once', async () => {
    const first = await setupPiAgentIndexedDBStorage()
    const second = await setupPiAgentIndexedDBStorage()

    expect(first).toBe(second)
    expect(createdBackends).toHaveLength(1)
    expect(createdBackends[0]).toMatchObject({
      dbName: 'vbi-agent',
      version: 1,
      stores: [
        { name: 'settings' },
        { name: 'provider-keys' },
        { name: 'sessions' },
        { name: 'sessions-metadata' },
        { name: 'custom-providers' },
      ],
    })
    expect(setAppStorage).toHaveBeenCalledTimes(1)
  })

  test('creates searchable session metadata from agent messages', () => {
    const state = {
      messages: [
        { role: 'user', content: 'Build a revenue chart' },
        { role: 'assistant', content: [{ type: 'text', text: 'Created the chart.' }] },
      ],
      thinkingLevel: 'off',
    }

    expect(extractAgentConversationPreview(state.messages)).toBe('Build a revenue chart\nCreated the chart.')

    expect(
      createAgentSessionMetadata({
        createdAt: '2026-05-26T01:00:00.000Z',
        fallbackTitle: 'New conversation',
        id: 'conversation-1',
        lastModified: '2026-05-26T01:02:00.000Z',
        state,
      }),
    ).toMatchObject({
      id: 'conversation-1',
      title: 'Build a revenue chart',
      createdAt: '2026-05-26T01:00:00.000Z',
      lastModified: '2026-05-26T01:02:00.000Z',
      messageCount: 2,
      preview: 'Build a revenue chart\nCreated the chart.',
      thinkingLevel: 'off',
    })
  })
})
