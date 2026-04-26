import { jsonSchema } from 'ai'
import type { AgentTool } from '../types.js'
import { findBuiltinSkill, findBuiltinSkillReferences, listBuiltinSkills } from '../skills/registry.js'
import type { BuiltinSkill, BuiltinSkillReference } from '../skills/types.js'

const requireStringArray = (value: unknown): string[] => {
  if (value === undefined) return []
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error('references must be a string array')
  }
  return value
}

const renderReferenceList = (skill: BuiltinSkill) =>
  skill.references.map((reference) => `- ${reference.name}: ${reference.description}`).join('\n')

const renderSkill = (skill: BuiltinSkill, references: BuiltinSkillReference[] = []) =>
  [
    skill.content.trim(),
    `\n## Available References\n\n${renderReferenceList(skill)}`,
    ...references.map((reference) => `\n\n---\n\n${reference.content.trim()}`),
  ].join('')

const renderSkillList = () =>
  listBuiltinSkills()
    .map(
      (skill) =>
        `- ${skill.name}: ${skill.description}\n  references: ${skill.references.map((ref) => ref.name).join(', ')}`,
    )
    .join('\n')

const createInputSchema = () =>
  jsonSchema({
    additionalProperties: false,
    properties: {
      name: { type: 'string' },
      references: { items: { type: 'string' }, type: 'array' },
    },
    type: 'object',
  })

export const renderBuiltinSkill = (name: string, referencesInput: unknown = []) => {
  const skill = findBuiltinSkill(name)
  const references = findBuiltinSkillReferences(skill, requireStringArray(referencesInput))
  return renderSkill(skill, references)
}

export const createBuiltinSkillTools = (): AgentTool[] => [
  {
    name: 'vbi_skill',
    descriptor: {
      description:
        'List or read VBI Agent builtin skills. Pass name to read SKILL.md, and references to include selected reference files.',
      inputSchema: createInputSchema(),
      strict: true,
    },
    execute: async (input) => {
      const name = typeof input.name === 'string' ? input.name : undefined
      const content = name ? renderBuiltinSkill(name, input.references) : renderSkillList()
      return { content, display: content, summary: name ? `builtin skill ${name} returned` : 'builtin skills listed' }
    },
  },
]
