import type { NextRequest } from 'next/server'
import { proxyRuntimeRequest, type RuntimeProxyContext } from '../../runtime-proxy'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const proxyApiRequest = (request: NextRequest, context: RuntimeProxyContext) =>
  proxyRuntimeRequest(request, context, {
    basePath: '/api',
    envKey: 'VBI_API_ORIGIN',
    fallbackOrigin: 'http://localhost:3030',
  })

export const DELETE = proxyApiRequest
export const GET = proxyApiRequest
export const HEAD = proxyApiRequest
export const OPTIONS = proxyApiRequest
export const PATCH = proxyApiRequest
export const POST = proxyApiRequest
export const PUT = proxyApiRequest
