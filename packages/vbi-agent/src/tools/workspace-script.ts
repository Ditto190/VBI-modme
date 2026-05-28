import type { AgentToolResult } from '@earendil-works/pi-agent-core'
import { executeAgentScript } from '../script/runtime'
import { clipText, stringifyJson } from '../text-format'
import type { VBIAgentWorkspace } from '../types/index'

const scriptOutputLimit = 12000

const pluralize = (count: number, name: string) => `${count} ${name}${count === 1 ? '' : 's'}`

const describeScriptResult = (value: unknown) => {
  if (value === null || value === undefined) return 'null result'
  if (Array.isArray(value)) return `array result (${value.length} items)`
  return `${typeof value} result`
}

export const clipOutput = (value: string) => clipText(value, scriptOutputLimit)

const clipJson = (value: unknown) => clipText(stringifyJson(value), scriptOutputLimit)

export const createWorkspaceScriptToolResult = (
  summaryPrefix: string,
  logs: string[],
  result: unknown,
): AgentToolResult<unknown> => {
  const content = clipJson({ logs, result: result ?? null })
  const display = [
    'Status: succeeded',
    `Logs: ${logs.length ? pluralize(logs.length, 'entry') : 'none'}`,
    ...(logs.length ? ['', 'Log output:', '```text', clipOutput(logs.join('\n')), '```'] : []),
    '',
    'Result:',
    '```json',
    clipJson(result ?? null),
    '```',
  ].join('\n')
  return {
    content: [{ text: content, type: 'text' }],
    details: {
      display,
      summary: `${summaryPrefix}: ${pluralize(logs.length, 'log')}, ${describeScriptResult(result)}`,
    },
  }
}

export const runScopedWorkspaceScript = (
  workspace: VBIAgentWorkspace,
  code: string,
  globals: Record<string, unknown>,
) =>
  executeAgentScript({
    code,
    globals: {
      workspace,
      ...globals,
    },
  })
