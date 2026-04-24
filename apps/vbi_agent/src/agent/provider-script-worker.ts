import { parentPort, workerData } from 'node:worker_threads'
import { executeProviderScript } from './provider-script-runtime.js'
import { createCliClient } from '../client.js'

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
