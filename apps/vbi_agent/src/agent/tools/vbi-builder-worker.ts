import { Worker } from 'node:worker_threads'

export interface WorkerResult {
  error?: string
  logs?: string[]
  ok: boolean
  result?: unknown
}

export interface WorkerInput {
  code: string
  resource?: string
  resourceId?: string
  timeoutMs: number
}

export const executeInWorker = (input: WorkerInput) =>
  new Promise<WorkerResult>((resolve, reject) => {
    const worker = new Worker(new URL('./agent/provider-script-worker.js', import.meta.url), {
      workerData: { code: input.code, resource: input.resource, resourceId: input.resourceId },
    })
    const timer = setTimeout(() => {
      void worker.terminate().then(() => reject(new Error(`vbi_builder timed out after ${input.timeoutMs}ms`)))
    }, input.timeoutMs)

    worker.once('error', (error) => {
      clearTimeout(timer)
      reject(error)
    })
    worker.once('message', (message: WorkerResult) => {
      clearTimeout(timer)
      resolve(message)
    })
    worker.once('exit', (code) => {
      if (code === 0) return
      clearTimeout(timer)
      reject(new Error(`vbi_builder worker exited with code ${code}`))
    })
  })
