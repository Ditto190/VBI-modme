import type { NextRequest } from 'next/server'
import { proxyRuntimeRequest, type RuntimeProxyContext } from '../../runtime-proxy'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const proxyCollaborationRequest = (request: NextRequest, context: RuntimeProxyContext) =>
  proxyRuntimeRequest(request, context, {
    envKey: 'VBI_COLLABORATION_ORIGIN',
    fallbackOrigin: 'http://localhost:1234',
  })

export const DELETE = proxyCollaborationRequest
export const GET = proxyCollaborationRequest
export const HEAD = proxyCollaborationRequest
export const OPTIONS = proxyCollaborationRequest
export const PATCH = proxyCollaborationRequest
export const POST = proxyCollaborationRequest
export const PUT = proxyCollaborationRequest
