import * as VBI from '@visactor/vbi'
import { application } from '../../core/store'
import { createApplicationSnapshot } from './application-snapshot'

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (
  ...args: string[]
) => (...runtimeArgs: unknown[]) => Promise<unknown>

const scriptOutputLimit = 12000
const defaultWaitForTimeoutMs = 5000
const defaultWaitForIntervalMs = 50

type WaitForOptions = {
  intervalMs?: number
  timeoutMs?: number
}

const clipText = (value: string, limit = scriptOutputLimit) => {
  if (value.length <= limit) return value
  const half = Math.floor(limit / 2)
  return `${value.slice(0, half)}\n...\n${value.slice(-half)}`
}

const pluralize = (count: number, name: string) => `${count} ${name}${count === 1 ? '' : 's'}`

const describeScriptResult = (value: unknown) => {
  if (value === null || value === undefined) return 'null result'
  if (Array.isArray(value)) return `array result (${value.length} items)`
  return `${typeof value} result`
}

const formatConsoleValue = (value: unknown) => {
  if (typeof value === 'string') return value
  return stringifyJson(value)
}

const assert = (condition: unknown, message: string) => {
  if (condition) return
  throw new Error(message)
}

const throwIfAborted = (signal?: AbortSignal) => {
  if (signal?.aborted) throw new Error('Operation aborted')
}

const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    throwIfAborted(signal)
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer)
        reject(new Error('Operation aborted'))
      },
      { once: true },
    )
  })

const waitFor = async (
  predicate: () => unknown | Promise<unknown>,
  options: WaitForOptions = {},
  signal?: AbortSignal,
) => {
  const startedAt = Date.now()
  const timeoutMs = options.timeoutMs ?? defaultWaitForTimeoutMs
  const intervalMs = options.intervalMs ?? defaultWaitForIntervalMs

  while (Date.now() - startedAt <= timeoutMs) {
    throwIfAborted(signal)
    const value = await predicate()
    if (value) return value
    await delay(intervalMs, signal)
  }

  throw new Error(`waitFor timed out after ${timeoutMs}ms`)
}

const normalizeJsonValue = (value: unknown, seen = new WeakSet<object>()): unknown => {
  if (value === undefined) return null
  if (typeof value === 'bigint') return value.toString()
  if (typeof value === 'function') return `[Function ${value.name || 'anonymous'}]`
  if (typeof value === 'symbol') return String(value)
  if (typeof value !== 'object' || value === null) return value
  if (value instanceof Date) return value.toISOString()
  if (value instanceof Error) return { message: value.message, name: value.name, stack: value.stack }
  if (seen.has(value)) return '[Circular]'

  seen.add(value)
  if (Array.isArray(value)) return value.map((entry) => normalizeJsonValue(entry, seen))

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, normalizeJsonValue(entry, seen)]),
  )
}

const stringifyJson = (value: unknown) => JSON.stringify(normalizeJsonValue(value), null, 2)

const createToolResult = (summaryPrefix: string, logs: string[], result: unknown) => {
  const payload = { logs, result: result ?? null }
  const content = stringifyJson(payload)
  const display = [
    'Status: succeeded',
    `Logs: ${logs.length ? pluralize(logs.length, 'entry') : 'none'}`,
    ...(logs.length ? ['', 'Log output:', '```text', clipText(logs.join('\n')), '```'] : []),
    '',
    'Result:',
    '```json',
    clipText(stringifyJson(result ?? null)),
    '```',
  ].join('\n')

  return {
    content: [{ text: content, type: 'text' as const }],
    details: {
      display,
      summary: `${summaryPrefix}: ${pluralize(logs.length, 'log')}, ${describeScriptResult(result)}`,
    },
  }
}

export const executeTrustedApplicationScript = async (code: string, signal?: AbortSignal) => {
  const logs: string[] = []
  const runtimeConsole = {
    error: (...args: unknown[]) => void logs.push(`error: ${args.map(formatConsoleValue).join(' ')}`),
    log: (...args: unknown[]) => void logs.push(args.map(formatConsoleValue).join(' ')),
    warn: (...args: unknown[]) => void logs.push(`warn: ${args.map(formatConsoleValue).join(' ')}`),
  }
  const runtimeWaitFor = (predicate: () => unknown | Promise<unknown>, options?: WaitForOptions) =>
    waitFor(predicate, options, signal)

  throwIfAborted(signal)
  const result = await new AsyncFunction(
    'application',
    'VBI',
    'snapshot',
    'waitFor',
    'json',
    'assert',
    'console',
    `{\n${code}\n}`,
  )(application, VBI, createApplicationSnapshot, runtimeWaitFor, (value: unknown) => value, assert, runtimeConsole)

  return createToolResult('vbi_application run succeeded', logs, result)
}
