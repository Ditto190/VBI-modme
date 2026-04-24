import { createVBIProviderClient } from '@visactor/vbi-provider'

const getApiBaseUrl = () => process.env.VBI_API_BASE_URL?.trim() || 'http://localhost:3030/api/v1'
const getWebSocketPolyfill = () => (typeof WebSocket === 'function' ? WebSocket : undefined)

export const createCliClient = () =>
  createVBIProviderClient({
    baseUrl: getApiBaseUrl(),
    ...(getWebSocketPolyfill() ? { webSocketPolyfill: getWebSocketPolyfill() } : {}),
  })
