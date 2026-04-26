interface AgentScriptRuntimeInput {
  code: string
  globals?: Record<string, unknown>
}

interface AgentScriptRuntimeResult {
  logs: string[]
  result: unknown
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

export const executeAgentScript = async ({
  code,
  globals = {},
}: AgentScriptRuntimeInput): Promise<AgentScriptRuntimeResult> => {
  const logs: string[] = []
  const runtimeConsole = {
    error: (...args: unknown[]) => void logs.push(`error: ${args.map(formatConsoleValue).join(' ')}`),
    log: (...args: unknown[]) => void logs.push(args.map(formatConsoleValue).join(' ')),
    warn: (...args: unknown[]) => void logs.push(`warn: ${args.map(formatConsoleValue).join(' ')}`),
  }

  const names = [...Object.keys(globals), 'json', 'assert', 'console']
  const values = [...Object.values(globals), (value: unknown) => value, assert, runtimeConsole]
  const result = await new AsyncFunction(...names, code)(...values)
  return { logs, result }
}
