import { parentPort, workerData } from 'node:worker_threads'
import { createVBIProviderClient } from '@visactor/vbi-provider'
import { executeProviderScript } from './provider-script-runtime.js'

const getApiBaseUrl = () => process.env.VBI_API_BASE_URL?.trim() || 'http://localhost:3030/api/v1'
const getWebSocketPolyfill = () => (typeof WebSocket === 'function' ? WebSocket : undefined)

const createCliClient = () =>
  createVBIProviderClient({
    baseUrl: getApiBaseUrl(),
    ...(getWebSocketPolyfill() ? { webSocketPolyfill: getWebSocketPolyfill() } : {}),
  })

const post = (message: unknown) => parentPort?.postMessage(message)

const main = async () => {
  try {
    const result = await executeProviderScript({
      client: createCliClient(),
      code: workerData.code,
      resource: workerData.resource,
      resourceId: workerData.resourceId,
    })
    post({ ok: true, ...result })
  } catch (error) {
    post({
      error: error instanceof Error ? error.stack || error.message : String(error),
      logs: [],
      ok: false,
    })
  }
}

void main()
