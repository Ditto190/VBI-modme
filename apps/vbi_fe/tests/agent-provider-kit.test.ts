import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const providerInstances: FakeProvider[] = []
const websocketInstances: FakeWebsocketProvider[] = []

class FakeDoc {
  destroy = rs.fn()
}

class FakeWebsocketProvider {
  destroy = rs.fn()

  constructor(readonly configuration: { url: string }) {
    websocketInstances.push(this)
  }
}

class FakeProvider {
  destroy = rs.fn()
  synced = false
  readonly listeners = new Map<string, Set<(payload: { state: boolean }) => void>>()

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
    queueMicrotask(() => {
      this.synced = true
      this.listeners.get('synced')?.forEach((handler) => handler({ state: true }))
    })
  }

  off(event: string, handler: (payload: { state: boolean }) => void) {
    this.listeners.get(event)?.delete(handler)
  }

  on(event: string, handler: (payload: { state: boolean }) => void) {
    const listeners = this.listeners.get(event) ?? new Set()
    listeners.add(handler)
    this.listeners.set(event, listeners)
  }
}

class FakeChartBuilder {
  constructor(readonly doc: FakeDoc) {}

  build() {
    return { connectorId: 'demo', kind: 'chart' }
  }
}

class FakeInsightBuilder {
  constructor(readonly doc: FakeDoc) {}

  build() {
    return { kind: 'insight' }
  }
}

class FakeReportBuilder {
  constructor(readonly doc: FakeDoc) {}

  build() {
    return { kind: 'report' }
  }
}

rs.mock('@hocuspocus/provider', () => ({
  HocuspocusProvider: FakeProvider,
  HocuspocusProviderWebsocket: FakeWebsocketProvider,
}))

rs.mock('yjs', () => ({
  Doc: FakeDoc,
}))

rs.mock('@visactor/vbi', () => ({
  VBIChartBuilder: FakeChartBuilder,
  VBIInsightBuilder: FakeInsightBuilder,
  VBIReportBuilder: FakeReportBuilder,
  VBI: {
    connectors: {
      get: rs.fn(async () => ({ discoverSchema: rs.fn() })),
      register: rs.fn(),
    },
  },
}))

const { createAgentProviderKit } = await import('../src/views/agent/agent-provider-kit')

describe('createAgentProviderKit', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    providerInstances.length = 0
    websocketInstances.length = 0
    globalThis.fetch = rs.fn(async (url: string) => {
      if (url.endsWith('/charts/chart-1/collaboration')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ data: { roomName: 'chart:chart-1', websocketUrl: 'ws://localhost:1234' } }),
          text: async () => '',
        } as Response
      }
      if (url.endsWith('/insights/insight-1/collaboration')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ data: { roomName: 'insight:insight-1', websocketUrl: 'ws://localhost:1234' } }),
          text: async () => '',
        } as Response
      }
      if (url.endsWith('/reports/report-1/collaboration')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ data: { roomName: 'report:report-1', websocketUrl: 'ws://localhost:1234' } }),
          text: async () => '',
        } as Response
      }
      if (url.endsWith('/reports/report-1')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ data: { id: 'report-1', name: 'Report' } }),
          text: async () => '',
        } as Response
      }
      if (url.endsWith('/charts/chart-1')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ data: { id: 'chart-1', name: 'Chart' } }),
          text: async () => '',
        } as Response
      }
      throw new Error(`Unexpected request: ${url}`)
    }) as typeof fetch
  })

  test('opens builder workspace slots through collaboration sessions', async () => {
    const kit = createAgentProviderKit({ baseUrl: '/api/v1' })

    await expect(kit.workspace.chart.open('chart-1')).resolves.toBeInstanceOf(FakeChartBuilder)
    await expect(kit.workspace.chart.snapshot()).resolves.toEqual({
      dsl: { connectorId: 'demo', kind: 'chart' },
      resource: { id: 'chart-1', name: 'Chart' },
    })
    await expect(kit.workspace.insight.open('insight-1')).resolves.toBeInstanceOf(FakeInsightBuilder)
    await expect(kit.workspace.report.snapshot('report-1')).resolves.toEqual({
      dsl: { kind: 'report' },
      resource: { id: 'report-1', name: 'Report' },
    })

    expect(websocketInstances.map((provider) => provider.configuration.url)).toEqual([
      'ws://localhost:1234/provider/resourceType=chart&resourceId=chart-1',
      'ws://localhost:1234/provider/resourceType=insight&resourceId=insight-1',
      'ws://localhost:1234/provider/resourceType=report&resourceId=report-1',
    ])
    expect(providerInstances.map((provider) => provider.configuration.name)).toEqual([
      'chart:chart-1',
      'insight:insight-1',
      'report:report-1',
    ])
  })
})
