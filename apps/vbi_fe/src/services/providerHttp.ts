import { tRuntime } from '../i18n'

type ProviderResponse<T> = {
  data: T
}

const baseUrl = '/api/v1'

const resolveBody = (body: unknown) => (body === undefined ? {} : { body: JSON.stringify(body) })

const toProviderError = async (response: Response) => {
  const payload = await response.text()
  const fallback = tRuntime('api.statusFailed', { status: response.status })

  try {
    const parsed = JSON.parse(payload) as { message?: string }
    return parsed.message || payload || fallback
  } catch {
    return payload || fallback
  }
}

export const requestProvider = async <T>(
  path: string,
  init?: {
    body?: unknown
    method?: string
  },
): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      ...(init?.body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...resolveBody(init?.body),
  })

  if (!response.ok) {
    throw new Error(await toProviderError(response))
  }

  const payload = (await response.json()) as ProviderResponse<T>
  return payload.data
}
