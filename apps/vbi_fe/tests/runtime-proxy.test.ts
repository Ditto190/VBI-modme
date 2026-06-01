import { afterEach, describe, expect, rs, test } from '@rstest/core'
import { proxyRuntimeRequest, type RuntimeProxyContext } from '../src/app/runtime-proxy'

type FetchMock = ReturnType<typeof rs.fn>

const createRequest = (input: {
  body?: ReadableStream<Uint8Array> | null
  headers?: HeadersInit
  method?: string
  signal?: AbortSignal
  url?: string
}) =>
  ({
    body: input.body ?? null,
    headers: new Headers(input.headers),
    method: input.method ?? 'GET',
    nextUrl: new URL(input.url ?? 'http://localhost/api/v1/charts?limit=10'),
    signal: input.signal ?? new AbortController().signal,
  }) as never

const createContext = (path: string[]): RuntimeProxyContext => ({
  params: Promise.resolve({ path }),
})

describe('runtime proxy', () => {
  afterEach(() => {
    rs.restoreAllMocks()
    delete process.env.VBI_API_ORIGIN
  })

  test('forwards the incoming abort signal to the upstream fetch', async () => {
    const controller = new AbortController()
    const fetchMock = rs.fn(() => Promise.resolve(new Response(JSON.stringify({ data: [] })))) as FetchMock
    rs.stubGlobal('fetch', fetchMock)
    process.env.VBI_API_ORIGIN = 'http://backend:3030'

    await proxyRuntimeRequest(createRequest({ signal: controller.signal }), createContext(['charts']), {
      basePath: '/api',
      envKey: 'VBI_API_ORIGIN',
      fallbackOrigin: 'http://localhost:3030',
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
      signal: controller.signal,
    })
  })

  test('keeps path segments encoded while preserving query strings', async () => {
    const fetchMock = rs.fn(() => Promise.resolve(new Response('ok'))) as FetchMock
    rs.stubGlobal('fetch', fetchMock)
    process.env.VBI_API_ORIGIN = 'http://backend:3030/root'

    await proxyRuntimeRequest(createRequest({ url: 'http://localhost/api/v1/a?needle=x y' }), createContext(['a/b']), {
      basePath: '/api',
      envKey: 'VBI_API_ORIGIN',
      fallbackOrigin: 'http://localhost:3030',
    })

    expect(String(fetchMock.mock.calls[0]?.[0])).toBe('http://backend:3030/root/api/a%2Fb?needle=x%20y')
  })
})
