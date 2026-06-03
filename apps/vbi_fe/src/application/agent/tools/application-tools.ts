import type { AgentTool, AgentToolResult } from '@visactor/vbi-agent'
import { executeTrustedApplicationScript } from './application-script-runtime'
import {
  listVBIApplicationSkills,
  readVBIApplicationSkill,
  vbiApplicationSkillNames,
  type VBIApplicationSkillName,
} from './application-skill-registry'

type ToolInput = Record<string, unknown>

const readSkillParameters = {
  additionalProperties: false,
  properties: {
    action: { enum: ['list', 'read'], type: 'string' },
    skill: { enum: vbiApplicationSkillNames, type: 'string' },
  },
  required: ['action'],
  type: 'object',
}

const applicationParameters = {
  additionalProperties: false,
  properties: {
    code: { type: 'string' },
  },
  required: ['code'],
  type: 'object',
}

const asToolParameters = (schema: unknown) => schema as AgentTool['parameters']

const stringifyJson = (value: unknown) => {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

const clipText = (value: string, limit = 12000) => {
  if (value.length <= limit) return value
  const half = Math.floor(limit / 2)
  return `${value.slice(0, half)}\n...\n${value.slice(-half)}`
}

const createJsonResult = (summary: string, value: unknown): AgentToolResult<unknown> => {
  const text = stringifyJson(value)
  return {
    content: [{ text, type: 'text' }],
    details: { display: clipText(text), summary },
  }
}

const asObject = (toolName: string, input: unknown): ToolInput => {
  if (typeof input === 'object' && input !== null && !Array.isArray(input)) return input as ToolInput
  throw new Error(`${toolName} input must be an object`)
}

const requireString = (toolName: string, input: ToolInput, key: string) => {
  const value = input[key]
  if (typeof value === 'string' && value.trim()) return value.trim()
  throw new Error(`${toolName}.${key} is required`)
}

export const createVBIApplicationTools = (): AgentTool[] => [
  {
    description: 'Read lazy-loaded VBI application operation skills before using vbi_application.',
    execute: async (_toolCallId, input) => {
      const params = asObject('read_skill', input)
      const action = requireString('read_skill', params, 'action')

      if (action === 'list') return createJsonResult('read_skill list completed', listVBIApplicationSkills())
      if (action === 'read') {
        const skill = requireString('read_skill', params, 'skill') as VBIApplicationSkillName
        return createJsonResult(`read_skill ${skill} completed`, {
          content: await readVBIApplicationSkill(skill),
          skill,
        })
      }

      throw new Error('read_skill.action must be list or read')
    },
    label: 'Read VBI Application Skill',
    name: 'read_skill',
    parameters: asToolParameters(readSkillParameters),
  },
  {
    description:
      'Run trusted JavaScript against the semantic VBI application API. Use read_skill first for available APIs.',
    execute: async (_toolCallId, input, signal) => {
      const params = asObject('vbi_application', input)
      return executeTrustedApplicationScript(requireString('vbi_application', params, 'code'), signal)
    },
    label: 'VBI Application',
    name: 'vbi_application',
    parameters: asToolParameters(applicationParameters),
  },
]
