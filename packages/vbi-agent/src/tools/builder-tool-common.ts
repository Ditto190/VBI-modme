import { Type } from 'typebox'
import type { AgentTool } from '@earendil-works/pi-agent-core'
import type { VBIAgentWorkspace, VBIWorkspaceSlot } from '../types/index.js'
import { clipJson, clipOutput, describeScriptResult, pluralize, runScopedWorkspaceScript } from './workspace-script.js'

export type BuilderToolSlotGlobal = 'chart' | 'insight' | 'report'

export const builderToolCommonRules = [
  'Input is an async JavaScript snippet in `code`. Return serializable evidence with `return json(...)`; use `console.log` for short diagnostics and `assert(condition, message)` for checks.',
  '`workspace` is available for caller-injected cross-cutting helpers such as `workspace.connectors`. Do not use this tool to list, create, rename, remove, or discover external platform resources; use caller-provided resource tools for that.',
  'Open the active resource with no id when the caller provided a startup id; pass an explicit id only when the user or a resource-discovery tool gave you a backend id. Human display names are not reliable ids.',
  'Use the matching workspace slot snapshot method for a current DSL snapshot without manually reading Yjs internals. Use the matching slot describe method only for metadata if the caller provided it. Use the matching slot close method only when explicitly cleaning up.',
].join('\n')

const builderToolParameters = Type.Object({ code: Type.String() }, { additionalProperties: false })

type ScopedBuilderToolInput = {
  description: string
  label: string
  name: string
  slot: VBIWorkspaceSlot | undefined
  slotGlobal: BuilderToolSlotGlobal
  workspace: VBIAgentWorkspace
}

const formatBuilderDisplay = (logs: string[], result: unknown) =>
  [
    'Status: succeeded',
    `Logs: ${logs.length ? pluralize(logs.length, 'entry') : 'none'}`,
    ...(logs.length ? ['', 'Log output:', '```text', clipOutput(logs.join('\n')), '```'] : []),
    '',
    'Result:',
    '```json',
    clipJson(result ?? null),
    '```',
  ].join('\n')

const createToolResult = (summary: string, content: string, display: string) => ({
  content: [{ text: content, type: 'text' as const }],
  details: { display, summary },
})

const readCode = (toolName: string, input: unknown) => {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) throw new Error(`${toolName}.code is required`)
  const code = (input as Record<string, unknown>).code
  if (typeof code !== 'string' || !code.trim()) throw new Error(`${toolName}.code is required`)
  return code
}

export const createScopedBuilderTool = ({
  description,
  label,
  name,
  slot,
  slotGlobal,
  workspace,
}: ScopedBuilderToolInput): AgentTool => ({
  description,
  execute: async (_toolCallId, input) => {
    const code = readCode(name, input)
    if (!slot) throw new Error(`${name} requires workspace.${slotGlobal}`)
    const result = await runScopedWorkspaceScript(workspace, code, {
      builder: slot,
      [slotGlobal]: slot,
    })
    const content = clipJson({ logs: result.logs, result: result.result ?? null })
    return createToolResult(
      `${name} succeeded: ${pluralize(result.logs.length, 'log')}, ${describeScriptResult(result.result)}`,
      content,
      formatBuilderDisplay(result.logs, result.result),
    )
  },
  label,
  name,
  parameters: builderToolParameters,
})
