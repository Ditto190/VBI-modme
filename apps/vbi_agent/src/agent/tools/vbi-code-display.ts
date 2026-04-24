import { stringifyJson } from './shared.js'

interface DisplayInput {
  code: string
  resource?: string
  resourceId?: string
}

interface DisplayResult {
  logs?: string[]
  result?: unknown
}

const compactCode = (code: string) => code.trim().replace(/\s+/g, ' ')

const summarizeValue = (value: unknown): string => {
  if (value === null || value === undefined) return String(value)
  if (Array.isArray(value)) return `array(${value.length})`
  if (typeof value !== 'object') return String(value)
  const record = value as Record<string, unknown>
  const fields = ['count', 'chartType', 'name', 'id']
    .filter((key) => key in record)
    .map((key) => `${key}: ${String(record[key])}`)
  if (fields.length) return fields.join(', ')
  const keys = Object.keys(record)
  return `object(${keys.slice(0, 6).join(', ')}${keys.length > 6 ? ', ...' : ''})`
}

const summarizeResult = (value: unknown) => {
  if (Array.isArray(value)) return value.slice(0, 5).map((item, index) => `${index + 1}. ${summarizeValue(item)}`)
  if (!value || typeof value !== 'object') return [summarizeValue(value)]
  return Object.entries(value as Record<string, unknown>)
    .filter(([key]) => key !== 'availableChartTypes')
    .slice(0, 8)
    .map(([key, item]) => `${key}: ${summarizeValue(item)}`)
}

export const formatVbiCodeDisplay = (input: DisplayInput, result: DisplayResult) =>
  [
    input.resource ? `resource: ${input.resource}` : '',
    input.resourceId ? `resourceId: ${input.resourceId}` : '',
    `code: ${compactCode(input.code)}`,
    result.logs?.length ? `logs:\n\`\`\`text\n${result.logs.join('\n')}\n\`\`\`` : '',
    'result:',
    ...summarizeResult(result.result ?? null).map((line) => `- ${line}`),
  ]
    .filter(Boolean)
    .join('\n')

export const formatVbiCodeContent = (result: DisplayResult) =>
  stringifyJson({ logs: result.logs ?? [], result: result.result ?? null })
