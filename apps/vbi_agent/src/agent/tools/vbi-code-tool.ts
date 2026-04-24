import { Worker } from 'node:worker_threads'
import { clipText } from './shared.js'
import { formatVbiCodeContent, formatVbiCodeDisplay } from './vbi-code-display.js'
import type { AgentTool } from '../types.js'

const outputLimit = 12000
const displayLimit = 1200

interface WorkerResult {
  error?: string
  logs?: string[]
  ok: boolean
  result?: unknown
}

const requireString = (value: unknown, label: string) => {
  if (typeof value === 'string' && value.trim()) return value
  throw new Error(`${label} is required`)
}

const readOptionalString = (value: unknown) => (typeof value === 'string' && value.trim() ? value : undefined)

const executeInWorker = (input: { code: string; resource?: string; resourceId?: string; timeoutMs: number }) =>
  new Promise<WorkerResult>((resolve, reject) => {
    const worker = new Worker(new URL('./agent/provider-script-worker.js', import.meta.url), {
      workerData: { code: input.code, resource: input.resource, resourceId: input.resourceId },
    })
    const timer = setTimeout(() => {
      void worker.terminate().then(() => reject(new Error(`vbi_code timed out after ${input.timeoutMs}ms`)))
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
      reject(new Error(`vbi_code worker exited with code ${code}`))
    })
  })

export const createVbiCodeTool = (timeoutMs = 30000): AgentTool => ({
  definition: {
    description:
      'Run JavaScript against VBI providers. Available runtime variables: client, vbi, resource, resourceId, json, assert, console. Use this when you need to open a provider, get a builder, and call builder APIs directly. vbi includes helpers for chartType, dimensions, measures, where/having filters, theme, locale, and limit. Example: const { builder } = await vbi.openChart(resourceId); vbi.changeChartType(builder, "line"); vbi.addDimension(builder, { field: "area" }); return json(vbi.getChartState(builder));',
    inputSchema: {
      additionalProperties: false,
      properties: {
        code: { type: 'string' },
        resource: { enum: ['chart', 'insight', 'report'], type: 'string' },
        resourceId: { type: 'string' },
      },
      required: ['code'],
      type: 'object',
    },
    name: 'vbi_code',
  },
  execute: async (input) => {
    const toolInput = {
      code: requireString(input.code, 'code'),
      resource: readOptionalString(input.resource),
      resourceId: readOptionalString(input.resourceId),
    }
    const result = await executeInWorker({ ...toolInput, timeoutMs })
    if (!result.ok) throw new Error(result.error || 'vbi_code failed')
    return {
      content: clipText(formatVbiCodeContent(result), outputLimit),
      display: clipText(formatVbiCodeDisplay(toolInput, result), displayLimit),
      summary: `vbi_code executed successfully (${(result.logs ?? []).length} logs)`,
    }
  },
})
