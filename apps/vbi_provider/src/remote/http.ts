import type { RemoteFetch, RemoteHeaders, RemoteResponse, VBIProviderClientOptions } from '../types/client'

const resolveFetch = (fetcher?: RemoteFetch): RemoteFetch => {
  if (fetcher) {
    return fetcher
  }
  if (typeof globalThis.fetch !== 'function') {
    throw new Error('Remote VBI client requires a fetch implementation')
  }
  return globalThis.fetch.bind(globalThis) as RemoteFetch
}

const resolveHeaders = async (
  headers?: RemoteHeaders | (() => Promise<RemoteHeaders> | RemoteHeaders),
): Promise<RemoteHeaders> => {
  if (!headers) {
    return {}
  }
  return typeof headers === 'function' ? await headers() : headers
}

const toError = async (response: RemoteResponse) => {
  const payload = await response.text()
  try {
    const parsed = JSON.parse(payload) as { message?: string }
    return parsed.message || payload || `Request failed: ${response.status}`
  } catch {
    return payload || `Request failed: ${response.status}`
  }
}

export const requestRemote = async <T>(
  config: VBIProviderClientOptions,
  path: string,
  init?: { body?: unknown; method?: string },
): Promise<T> => {
  const response = await resolveFetch(config.fetch)(`${config.baseUrl.replace(/\/$/, '')}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      ...(await resolveHeaders(config.headers)),
      ...(init?.body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(init?.body === undefined ? {} : { body: JSON.stringify(init.body) }),
  })

  if (!response.ok) {
    throw new Error(await toError(response))
  }

  const payload = (await response.json()) as { data: T }
  return payload.data
}
