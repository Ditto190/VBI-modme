export type CollaboratorCursor = {
  x: number
  y: number
}

export type CollaboratorUser = {
  id: string
  name: string
  color: string
  updatedAt: number
  cursor?: CollaboratorCursor
}

export type CollaboratorClient = CollaboratorUser & {
  clientId: number
}

type AwarenessState = {
  user?: CollaboratorUser
}

export const getCursorPosition = (event: MouseEvent): CollaboratorCursor => ({
  x: event.clientX / window.innerWidth,
  y: event.clientY / window.innerHeight,
})

export const mergeLocalCursor = (
  user: CollaboratorUser | undefined,
  cursor: CollaboratorCursor,
): CollaboratorUser | null => {
  if (!user) return null
  return {
    ...user,
    cursor,
    updatedAt: Date.now(),
  }
}

export const getCollaboratorClients = (states: Map<number, AwarenessState>): CollaboratorClient[] =>
  Array.from(states.entries()).flatMap(([clientId, state]) => {
    const user = state.user
    return user?.id ? [{ ...user, clientId }] : []
  })

export const getAvatarUsers = (clients: CollaboratorClient[]): CollaboratorClient[] => {
  const users = new Map<string, CollaboratorClient>()

  for (const client of clients) {
    const current = users.get(client.id)
    if (!current || client.updatedAt > current.updatedAt) {
      users.set(client.id, client)
    }
  }

  return Array.from(users.values())
}

export const getCursorUsers = (clients: CollaboratorClient[], localClientId: number): CollaboratorClient[] =>
  clients.filter((client) => client.clientId !== localClientId && client.cursor)
