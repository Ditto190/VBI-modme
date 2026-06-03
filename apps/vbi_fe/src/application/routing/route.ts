import type { ApplicationRouteMatch, ApplicationRouteTarget } from './contract'

const agentConversationRoutePrefix = '/agent/'

const readRouteId = (pathname: string, prefix: string) => {
  const segment = pathname.slice(prefix.length).split('/')[0] ?? ''
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

export const resolveApplicationRoute = (target: ApplicationRouteTarget) => {
  if (typeof target === 'string') return target

  switch (target.name) {
    case 'agent':
      return target.conversationId ? `/agent/${encodeURIComponent(target.conversationId)}` : '/agent'
    case 'chartDetail':
      return `/manage/charts/${encodeURIComponent(target.id)}`
    case 'charts':
      return '/manage/charts'
    case 'insightDetail':
      return `/manage/insights/${encodeURIComponent(target.id)}`
    case 'insights':
      return '/manage/insights'
    case 'reportDetail':
      return `/manage/reports/${encodeURIComponent(target.id)}`
    case 'reports':
      return '/manage/reports'
  }
}

export const matchApplicationRoute = (pathname: string): ApplicationRouteMatch => {
  if (pathname === '/' || pathname === '/manage') return { name: 'reports' }
  if (isAgentRoute(pathname)) {
    return {
      name: 'agent',
      conversationId: readAgentConversationRouteId(pathname) || undefined,
    }
  }
  if (pathname === '/manage/charts') return { name: 'charts' }
  if (pathname.startsWith('/manage/charts/')) {
    return { name: 'chartDetail', id: readRouteId(pathname, '/manage/charts/') }
  }
  if (pathname === '/manage/insights') return { name: 'insights' }
  if (pathname.startsWith('/manage/insights/')) {
    return { name: 'insightDetail', id: readRouteId(pathname, '/manage/insights/') }
  }
  if (pathname.startsWith('/manage/reports/')) {
    return { name: 'reportDetail', id: readRouteId(pathname, '/manage/reports/') }
  }
  return { name: 'reports' }
}

export const matchRouteBranch = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`)

export const isNewConversationRoute = (pathname: string) => pathname === '/agent' || pathname === '/manage/agent'

export const createAgentConversationRoute = (conversationId: string) =>
  `${agentConversationRoutePrefix}${encodeURIComponent(conversationId)}`

export const readAgentConversationRouteId = (pathname: string) => {
  if (!pathname.startsWith(agentConversationRoutePrefix)) return ''
  return readRouteId(pathname, agentConversationRoutePrefix)
}

export const isAgentConversationRoute = (pathname: string, conversationId?: string) => {
  const routeConversationId = readAgentConversationRouteId(pathname)

  if (!conversationId) return Boolean(routeConversationId)
  return routeConversationId === conversationId
}

export const isAgentRoute = (pathname: string) => isNewConversationRoute(pathname) || isAgentConversationRoute(pathname)
