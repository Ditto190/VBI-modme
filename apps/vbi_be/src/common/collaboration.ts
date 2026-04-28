const DEFAULT_COLLABORATION_PORT = 1234

export const getCollaborationPort = () => {
  const value = Number(process.env.VBI_COLLABORATION_PORT ?? DEFAULT_COLLABORATION_PORT)
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_COLLABORATION_PORT
}

export const getCollaborationWebSocketUrl = () =>
  process.env.VBI_COLLABORATION_WS_URL?.trim() || `ws://localhost:${getCollaborationPort()}`
