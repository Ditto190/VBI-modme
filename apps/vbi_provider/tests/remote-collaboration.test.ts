import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const { FakeDoc, FakeProvider, FakeWebsocketProvider, providerInstances, websocketInstances } = rs.hoisted(() => {
  const providerInstances: {
    configuration: {
      document: unknown
      name: string
      websocketProvider: unknown
    }
    synced: boolean
    attach(): void
    destroy(): void
    off(event: string, handler: (payload: unknown) => void): void
    on(event: string, handler: (payload: unknown) => void): void
  }[] = []
  const websocketInstances: { configuration: { url: string } }[] = []

  class FakeDoc {}

  class FakeWebsocketProvider {
    constructor(readonly configuration: { url: string }) {
      websocketInstances.push(this)
    }

    destroy() {}
  }

  class FakeProvider {
    static attachCount = 0

    synced = false
    readonly listeners = new Map<string, Set<(payload: unknown) => void>>()

    constructor(
      readonly configuration: {
        document: FakeDoc
        name: string
        websocketProvider: FakeWebsocketProvider
      },
    ) {
      providerInstances.push(this)
    }

    attach() {
      FakeProvider.attachCount += 1
      queueMicrotask(() => {
        this.synced = true
        this.emit('synced', { state: true })
      })
    }

    destroy() {
      this.listeners.clear()
    }

    off(event: string, handler: (payload: unknown) => void) {
      this.listeners.get(event)?.delete(handler)
    }

    on(event: string, handler: (payload: unknown) => void) {
      const handlers = this.listeners.get(event) ?? new Set()
      handlers.add(handler)
      this.listeners.set(event, handlers)
    }

    private emit(event: string, payload: unknown) {
      this.listeners.get(event)?.forEach((handler) => handler(payload))
    }
  }

  return {
    FakeDoc,
    FakeProvider,
    FakeWebsocketProvider,
    providerInstances,
    websocketInstances,
  }
})

rs.mock('yjs', () => ({
  Doc: FakeDoc,
}))

rs.mock('@hocuspocus/provider', () => ({
  HocuspocusProvider: FakeProvider,
  HocuspocusProviderWebsocket: FakeWebsocketProvider,
}))

import { createRemoteBuilderState, openRemoteBuilder } from '../src/remote/collaboration'

describe('openRemoteBuilder', () => {
  const loadSession = () =>
    Promise.resolve({
      resourceId: 'chart-1',
      roomName: 'chart:chart-1',
      websocketUrl: 'ws://localhost:1234',
    })

  beforeEach(() => {
    FakeProvider.attachCount = 0
    providerInstances.length = 0
    websocketInstances.length = 0
  })

  test('attaches provider before waiting for sync', async () => {
    const state = createRemoteBuilderState<{ ok: true }>('chart-1')

    await expect(
      openRemoteBuilder({ baseUrl: 'http://localhost:3030/api/v1' }, state, loadSession, () => ({ ok: true })),
    ).resolves.toEqual({ ok: true })

    expect(FakeProvider.attachCount).toBe(1)
    expect(providerInstances).toHaveLength(1)
    expect(providerInstances[0]?.configuration.name).toBe('chart:chart-1')
    expect(websocketInstances).toHaveLength(1)
    expect(websocketInstances[0]?.configuration.url).toBe(
      'ws://localhost:1234/provider/resourceType=chart&resourceId=chart-1',
    )
    expect(websocketInstances[0]?.configuration.url).not.toContain('%')
  })

  test('reuses in-flight open call', async () => {
    const state = createRemoteBuilderState<{ ok: true }>('chart-1')

    const [first, second] = await Promise.all([
      openRemoteBuilder({ baseUrl: 'http://localhost:3030/api/v1' }, state, loadSession, () => ({ ok: true })),
      openRemoteBuilder({ baseUrl: 'http://localhost:3030/api/v1' }, state, loadSession, () => ({ ok: true })),
    ])

    expect(first).toBe(second)
    expect(FakeProvider.attachCount).toBe(1)
  })
})
