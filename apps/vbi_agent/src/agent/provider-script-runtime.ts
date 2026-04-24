import type { VBIProviderClient } from '@visactor/vbi-provider'
import { createVbiHelpers } from './vbi-helper/index.js'

interface ProviderRuntimeInput {
  client: VBIProviderClient
  code: string
  resource?: string
  resourceId?: string
}

interface ProviderRuntimeResult {
  logs: string[]
  result: unknown
}

interface ClosableProvider {
  close?: () => Promise<void>
  open(): Promise<unknown>
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (
  ...args: string[]
) => (...runtimeArgs: unknown[]) => Promise<unknown>

const formatConsoleValue = (value: unknown) => {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

const assert = (condition: unknown, message: string) => {
  if (condition) return
  throw new Error(message)
}

const createTrackedClient = (client: VBIProviderClient) => {
  const trackedProviders = new Set<ClosableProvider>()
  const track = <T extends ClosableProvider>(provider: T) => {
    trackedProviders.add(provider)
    return provider
  }

  return {
    client: {
      chart: (id?: string) => track(client.chart(id)),
      insight: (id?: string) => track(client.insight(id)),
      listCharts: () => client.listCharts(),
      listInsights: () => client.listInsights(),
      listReports: () => client.listReports(),
      report: (id?: string) => track(client.report(id)),
    } satisfies VBIProviderClient,
    closeAll: async () => {
      for (const provider of trackedProviders) {
        await provider.close?.()
      }
    },
  }
}

export const executeProviderScript = async ({
  client,
  code,
  resource,
  resourceId,
}: ProviderRuntimeInput): Promise<ProviderRuntimeResult> => {
  const logs: string[] = []
  const tracked = createTrackedClient(client)
  const vbi = createVbiHelpers(tracked.client)
  const runtimeConsole = {
    error: (...args: unknown[]) => void logs.push(`error: ${args.map(formatConsoleValue).join(' ')}`),
    log: (...args: unknown[]) => void logs.push(args.map(formatConsoleValue).join(' ')),
    warn: (...args: unknown[]) => void logs.push(`warn: ${args.map(formatConsoleValue).join(' ')}`),
  }

  try {
    const run = new AsyncFunction('client', 'vbi', 'resource', 'resourceId', 'json', 'assert', 'console', code)
    const result = await run(
      tracked.client,
      vbi,
      resource,
      resourceId,
      (value: unknown) => value,
      assert,
      runtimeConsole,
    )
    return { logs, result }
  } finally {
    await tracked.closeAll()
  }
}
