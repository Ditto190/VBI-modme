import { beforeEach, describe, expect, rs, test } from '@rstest/core'

type RecordValue = {
  metadata: { id: string; lastModified: string; title?: string }
  session: { id: string; title?: string }
}

const createMemoryDatabase = () => {
  const records = new Map<string, RecordValue>()

  return {
    database: {
      get: rs.fn(async (id: string) => records.get(id) ?? null),
      getAll: rs.fn(async () => [...records.values()]),
      put: rs.fn(async (record: RecordValue) => {
        records.set(record.session.id, record)
      }),
      delete: rs.fn(async (id: string) => {
        records.delete(id)
      }),
    },
    records,
  }
}

let memory = createMemoryDatabase()
const createDatabase = rs.fn(async () => memory.database)

const {
  createAgentSessionMetadata,
  deleteAgentConversation,
  extractAgentConversationPreview,
  listAgentConversations,
  renameAgentConversation,
  resetVbiAgentStorageForTests,
  saveAgentConversation,
  setVbiAgentIndexedDBFactoryForTests,
  setupVbiAgentIndexedDBStorage,
} = await import('../src/views/agent/agent-storage')

describe('agent storage', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    memory = createMemoryDatabase()
    setVbiAgentIndexedDBFactoryForTests(createDatabase as never)
    resetVbiAgentStorageForTests()
  })

  test('initializes VBI-owned IndexedDB storage once and persists conversations', async () => {
    const first = await setupVbiAgentIndexedDBStorage()
    const second = await setupVbiAgentIndexedDBStorage()

    expect(first).toBe(second)
    expect(createDatabase).toHaveBeenCalledTimes(1)

    const metadata = await saveAgentConversation(first, {
      createdAt: '2026-05-26T01:00:00.000Z',
      fallbackTitle: 'New conversation',
      id: 'conversation-1',
      lastModified: '2026-05-26T01:02:00.000Z',
      state: {
        messages: [{ role: 'user', content: 'Build a revenue chart', timestamp: 1 }],
        model: { id: 'test-model' },
        thinkingLevel: 'high',
      } as never,
    })

    expect(metadata).toMatchObject({ id: 'conversation-1', title: 'Build a revenue chart' })
    expect(await listAgentConversations(first)).toMatchObject([{ id: 'conversation-1' }])
    expect(memory.records.get('conversation-1')?.metadata.id).toBe('conversation-1')
  })

  test('renames and deletes persisted conversations', async () => {
    const storage = await setupVbiAgentIndexedDBStorage()

    await saveAgentConversation(storage, {
      createdAt: '2026-05-26T01:00:00.000Z',
      fallbackTitle: 'New conversation',
      id: 'conversation-1',
      lastModified: '2026-05-26T01:02:00.000Z',
      state: {
        messages: [{ role: 'user', content: 'Build a revenue chart', timestamp: 1 }],
        model: { id: 'test-model' },
        thinkingLevel: 'high',
      } as never,
    })

    const renamed = await renameAgentConversation(storage, 'conversation-1', 'Renamed analysis')

    expect(renamed).toMatchObject({ id: 'conversation-1', title: 'Renamed analysis' })
    expect(memory.records.get('conversation-1')?.metadata.title).toBe('Renamed analysis')
    expect(memory.records.get('conversation-1')?.session.title).toBe('Renamed analysis')

    await deleteAgentConversation(storage, 'conversation-1')

    expect(await listAgentConversations(storage)).toEqual([])
    expect(memory.records.has('conversation-1')).toBe(false)
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
      thinkingLevel: 'high',
    })
  })
})
