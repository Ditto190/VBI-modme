import { jsonSchema } from 'ai'
import { listSkills, readSkill, renderSkillList, searchSkillReferences } from '../skills/service.js'
import type { AgentTool } from '../types/index.js'

const stringify = (value: unknown) => JSON.stringify(value, null, 2)

const stringArraySchema = { items: { type: 'string' }, type: 'array' } as const

const requireString = (key: string, value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${key} is required`)
  return value
}

const optionalString = (value: unknown) => (typeof value === 'string' && value.trim() ? value : undefined)

const optionalStringArray = (key: string, value: unknown): string[] | undefined => {
  if (value === undefined) return undefined
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${key} must be a string array`)
  }
  return value
}

const createListSkillsTool = (): AgentTool => ({
  name: 'list_skills',
  descriptor: {
    description: 'List VBI Agent builtin skills with metadata, tools, capabilities, and available references.',
    inputSchema: jsonSchema({ additionalProperties: false, properties: {}, type: 'object' }),
    strict: true,
  },
  execute: async () => {
    const skills = listSkills()
    return {
      content: stringify({ skills }),
      display: renderSkillList(),
      summary: `${skills.length} builtin skills listed`,
    }
  },
})

const createReadSkillTool = (): AgentTool => ({
  name: 'read_skill',
  descriptor: {
    description:
      'Read one VBI Agent builtin skill. Use references to include selected reference files and sections to return only matching headings.',
    inputSchema: jsonSchema({
      additionalProperties: false,
      properties: { name: { type: 'string' }, references: stringArraySchema, sections: stringArraySchema },
      required: ['name'],
      type: 'object',
    }),
    strict: true,
  },
  execute: async (input) => {
    const result = readSkill(requireString('name', input.name), {
      references: optionalStringArray('references', input.references),
      sections: optionalStringArray('sections', input.sections),
    })
    return {
      content: stringify(result),
      display: result.content,
      summary: `builtin skill ${result.skill.name} returned`,
    }
  },
})

const createSearchSkillReferenceTool = (): AgentTool => ({
  name: 'search_skill_reference',
  descriptor: {
    description: 'Search VBI Agent builtin skill reference sections and return focused matching sections.',
    inputSchema: jsonSchema({
      additionalProperties: false,
      properties: { name: { type: 'string' }, query: { type: 'string' }, references: stringArraySchema },
      required: ['query'],
      type: 'object',
    }),
    strict: true,
  },
  execute: async (input) => {
    const matches = searchSkillReferences({
      name: optionalString(input.name),
      query: requireString('query', input.query),
      references: optionalStringArray('references', input.references),
    })
    return {
      content: stringify({ matches }),
      display: matches.map((match) => `## ${match.reference.name} / ${match.section}\n\n${match.content}`).join('\n\n'),
      summary: `skill reference search returned ${matches.length} matches`,
    }
  },
})

export const createBuiltinSkillTools = (): AgentTool[] => [
  createListSkillsTool(),
  createReadSkillTool(),
  createSearchSkillReferenceTool(),
]
