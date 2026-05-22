type ProviderResponse<T> = {
  data: T
}

const baseUrl = '/api/v1'

const resolveBody = (body: unknown) => (body === undefined ? {} : { body: JSON.stringify(body) })

const toProviderError = async (response: Response) => {
  const payload = await response.text()
  try {
    const parsed = JSON.parse(payload) as { message?: string }
    return parsed.message || payload || `Request failed: ${response.status}`
  } catch {
    return payload || `Request failed: ${response.status}`
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
