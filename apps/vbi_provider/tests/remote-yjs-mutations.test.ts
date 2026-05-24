import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const { FakeProvider, FakeWebsocketProvider, websocketInstances } = rs.hoisted(() => {
  const websocketInstances: { configuration: { url: string } }[] = []

  class FakeWebsocketProvider {
    constructor(readonly configuration: { url: string }) {
      websocketInstances.push(this)
    }

    destroy() {}
  }

  class FakeProvider {
    synced = false
    readonly listeners = new Map<string, Set<(payload: unknown) => void>>()

    constructor(readonly configuration: unknown) {}

    attach() {
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

  return { FakeProvider, FakeWebsocketProvider, websocketInstances }
})

rs.mock('@hocuspocus/provider', () => ({
  HocuspocusProvider: FakeProvider,
  HocuspocusProviderWebsocket: FakeWebsocketProvider,
}))

import { createVBIProviderClient } from '../src'

const jsonResponse = <T>(data: T) => ({
  ok: true,
  status: 200,
  json: async () => ({ data }),
  text: async () => JSON.stringify({ data }),
})

const resource = (id: string, name: string) => ({
  id,
  name,
  createdAt: '2026-04-09',
  updatedAt: '2026-04-09',
})

describe('remote provider Yjs mutations', () => {
  beforeEach(() => {
    websocketInstances.length = 0
  })

  test('creates report pages through Yjs after creating linked resources through REST', async () => {
    const requests: { body?: string; method?: string; url: string }[] = []
    const fetch = rs.fn(async (url: string, init?: { method?: string; body?: string }) => {
      requests.push({ body: init?.body, method: init?.method, url })
      if (url.endsWith('/reports/report-1/collaboration')) {
        return jsonResponse({ roomName: 'report:report-1', websocketUrl: 'ws://localhost:1234' })
      }
      if (url.endsWith('/charts') && init?.method === 'POST') {
        return jsonResponse(resource('chart-created', 'Chart 1'))
      }
      if (url.endsWith('/insights') && init?.method === 'POST') {
        return jsonResponse(resource('insight-created', 'Insight 1'))
      }
      if (url.endsWith('/reports/report-1')) {
        return jsonResponse({ ...resource('report-1', 'Report'), pages: [] })
      }
      throw new Error(`Unexpected request: ${url}`)
    })

    const provider = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch }).report('report-1')

    await expect(provider.createPage({ title: 'Yjs Page' })).resolves.toMatchObject({
      dsl: {
        pages: [{ title: 'Yjs Page', chartId: 'chart-created', insightId: 'insight-created' }],
      },
    })

    expect(requests.some((request) => request.url.includes('/reports/report-1/pages'))).toBe(false)
    expect(websocketInstances[0]?.configuration.url).toBe(
      'ws://localhost:1234/provider/resourceType=report&resourceId=report-1',
    )
  })

  test('updates, reorders, and removes report pages through Yjs', async () => {
    let resourceIndex = 0
    const requests: { method?: string; url: string }[] = []
    const fetch = rs.fn(async (url: string, init?: { method?: string; body?: string }) => {
      requests.push({ method: init?.method, url })
      if (url.endsWith('/reports/report-1/collaboration')) {
        return jsonResponse({ roomName: 'report:report-1', websocketUrl: 'ws://localhost:1234' })
      }
      if (url.endsWith('/charts') && init?.method === 'POST') {
        resourceIndex += 1
        return jsonResponse(resource(`chart-${resourceIndex}`, `Chart ${resourceIndex}`))
      }
      if (url.endsWith('/insights') && init?.method === 'POST') {
        return jsonResponse(resource(`insight-${resourceIndex}`, `Insight ${resourceIndex}`))
      }
      if (url.endsWith('/charts/chart-external')) {
        return jsonResponse(resource('chart-external', 'External Chart'))
      }
      if (url.endsWith('/insights/insight-external')) {
        return jsonResponse(resource('insight-external', 'External Insight'))
      }
      if (url.endsWith('/reports/report-1')) {
        return jsonResponse({ ...resource('report-1', 'Report'), pages: [] })
      }
      throw new Error(`Unexpected request: ${url}`)
    })
    const provider = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch }).report('report-1')

    const firstCreate = await provider.createPage({ title: 'First' })
    const firstPageId = firstCreate.dsl.pages[0].id
    const secondCreate = await provider.createPage({ title: 'Second' })
    const secondPageId = secondCreate.dsl.pages[1].id

    await expect(
      provider.updatePage(firstPageId, {
        chartId: 'chart-external',
        insightId: 'insight-external',
        title: 'Updated First',
      }),
    ).resolves.toMatchObject({
      dsl: {
        pages: [{ chartId: 'chart-external', insightId: 'insight-external', title: 'Updated First' }],
      },
    })

    await expect(provider.reorderPages([secondPageId, firstPageId])).resolves.toMatchObject({
      dsl: { pages: [{ id: secondPageId }, { id: firstPageId }] },
    })
    await expect(provider.removePage(secondPageId)).resolves.toMatchObject({
      dsl: { pages: [{ id: firstPageId }] },
    })

    expect(requests.some((request) => request.url.includes('/reports/report-1/pages'))).toBe(false)
  })
})
