import { executeAgentScript } from '../script/runtime.js'
import { clipText, stringifyJson } from '../text-format.js'
import type { VBIAgentWorkspace } from '../types.js'

export const scriptOutputLimit = 12000

export const pluralize = (count: number, name: string) => `${count} ${name}${count === 1 ? '' : 's'}`

export const describeScriptResult = (value: unknown) => {
  if (value === null || value === undefined) return 'null result'
  if (Array.isArray(value)) return `array result (${value.length} items)`
  return `${typeof value} result`
}

export const clipOutput = (value: string) => clipText(value, scriptOutputLimit)

export const clipJson = (value: unknown) => clipText(stringifyJson(value), scriptOutputLimit)

export const runWorkspaceScript = (workspace: VBIAgentWorkspace, code: string, globals: Record<string, unknown> = {}) =>
  executeAgentScript({
    code,
    globals: {
      chart: workspace.chart,
      report: workspace.report,
      workspace,
      ...globals,
    },
  })
