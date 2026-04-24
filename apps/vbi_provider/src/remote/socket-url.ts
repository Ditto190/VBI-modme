import type { RemoteSessionConnection } from '../types'

const parseRoomName = (roomName: string) => {
  const separator = roomName.indexOf(':')
  if (separator <= 0 || separator >= roomName.length - 1) return null
  return {
    resourceId: roomName.slice(separator + 1),
    resourceType: roomName.slice(0, separator),
  }
}

const appendPathname = (pathname: string, metadata: { resourceId: string; resourceType: string }) => {
  const base = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return `${base}/provider/resourceType=${metadata.resourceType}&resourceId=${metadata.resourceId}`.replace(/\/+/g, '/')
}

export const buildSocketUrl = (session: RemoteSessionConnection) => {
  const metadata = parseRoomName(session.roomName)
  if (!metadata) return session.websocketUrl
  try {
    const url = new URL(session.websocketUrl)
    url.pathname = appendPathname(url.pathname, metadata)
    return url.toString()
  } catch {
    return appendPathname(session.websocketUrl, metadata)
  }
}
