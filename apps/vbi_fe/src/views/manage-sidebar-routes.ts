const agentConversationRoutePrefix = '/agent/'

export const matchRouteBranch = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`)

export const isNewConversationRoute = (pathname: string) => pathname === '/agent' || pathname === '/manage/agent'

export const createAgentConversationRoute = (conversationId: string) =>
  `${agentConversationRoutePrefix}${encodeURIComponent(conversationId)}`

export const readAgentConversationRouteId = (pathname: string) => {
  if (!pathname.startsWith(agentConversationRoutePrefix)) return ''

  const segment = pathname.slice(agentConversationRoutePrefix.length).split('/')[0] ?? ''
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

export const isAgentConversationRoute = (pathname: string, conversationId?: string) => {
  const routeConversationId = readAgentConversationRouteId(pathname)

  if (!conversationId) return Boolean(routeConversationId)
  return routeConversationId === conversationId
}

export const isAgentRoute = (pathname: string) => isNewConversationRoute(pathname) || isAgentConversationRoute(pathname)

export const isManageRoute = (pathname: string) => matchRouteBranch(pathname, '/manage')

export const isManagedRoute = (pathname: string) => isAgentRoute(pathname) || isManageRoute(pathname)
