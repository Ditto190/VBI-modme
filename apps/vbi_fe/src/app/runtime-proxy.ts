import type { NextRequest } from 'next/server'

export type RuntimeProxyContext = {
  params: Promise<{
    path?: string[]
  }>
}

type RuntimeProxyOptions = {
  basePath?: string
  envKey: string
  fallbackOrigin: string
}

type RuntimeRequestInit = RequestInit & {
  duplex?: 'half'
}

const requestHeaderBlocklist = new Set([
  'accept-encoding',
  'connection',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

const responseHeaderBlocklist = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

const copyHeaders = (headers: Headers, blocklist: Set<string>) => {
  const nextHeaders = new Headers()
  headers.forEach((value, key) => {
    if (!blocklist.has(key.toLowerCase())) nextHeaders.set(key, value)
  })
  return nextHeaders
}

const joinPath = (...parts: string[]) =>
  `/${parts
    .flatMap((part) => part.split('/'))
    .filter(Boolean)
    .join('/')}`

const buildProxyUrl = (request: NextRequest, path: string[], options: RuntimeProxyOptions) => {
  const origin = process.env[options.envKey]?.trim() || options.fallbackOrigin
  const url = new URL(origin)
  const encodedPath = path.map((segment) => encodeURIComponent(segment))
  url.pathname = joinPath(url.pathname, options.basePath ?? '', ...encodedPath)
  url.search = request.nextUrl.search
  return url
}

export const proxyRuntimeRequest = async (
  request: NextRequest,
  context: RuntimeProxyContext,
  options: RuntimeProxyOptions,
) => {
  const { path = [] } = await context.params
  const hasRequestBody = request.method !== 'GET' && request.method !== 'HEAD'
  const init: RuntimeRequestInit = {
    headers: copyHeaders(request.headers, requestHeaderBlocklist),
    method: request.method,
    redirect: 'manual',
  }

  if (hasRequestBody) {
    init.body = request.body
    init.duplex = 'half'
  }

  try {
    const response = await fetch(buildProxyUrl(request, path, options), init)
    return new Response(response.body, {
      headers: copyHeaders(response.headers, responseHeaderBlocklist),
      status: response.status,
      statusText: response.statusText,
    })
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    )
  }
}
