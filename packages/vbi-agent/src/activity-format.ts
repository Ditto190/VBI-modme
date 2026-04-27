import type { PendingToolCall } from './types/index.js'
import { clipText, stringifyJson } from './text-format.js'

const formatToolList = (calls: PendingToolCall[]) => calls.map((call) => call.name).join(', ')

const formatToolCall = (call: PendingToolCall, index: number) =>
  [`${index + 1}. ${call.name}`, 'Arguments:', '```json', clipText(stringifyJson(call.arguments)), '```'].join('\n')

export const formatToolCallSummary = (calls: PendingToolCall[]) =>
  calls.length === 1 ? `Calling tool: ${calls[0]!.name}` : `Calling ${calls.length} tools: ${formatToolList(calls)}`

export const formatToolCallDetail = (calls: PendingToolCall[]) => calls.map(formatToolCall).join('\n\n')
