import { createVBIProviderClient } from '@visactor/headless-bi-provider'
import type { VBIProviderClient } from '@visactor/headless-bi-provider'

export interface CliProviderConfig {
  apiBaseUrl: string
}

const getWebSocketPolyfill = () => (typeof WebSocket === 'function' ? WebSocket : undefined)

export const createCliProviderClient = ({ apiBaseUrl }: CliProviderConfig): VBIProviderClient =>
  createVBIProviderClient({
    baseUrl: apiBaseUrl,
    ...(getWebSocketPolyfill() ? { webSocketPolyfill: getWebSocketPolyfill() } : {}),
  })
