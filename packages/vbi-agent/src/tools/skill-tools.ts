import { jsonSchema } from 'ai'
import type { AgentTool } from '../types.js'
import { findBuiltinSkill, findBuiltinSkillReferences, listBuiltinSkills } from '../skills/registry.js'
import type { BuiltinSkill, BuiltinSkillAsset, BuiltinSkillReference } from '../skills/types.js'

const requireStringArray = (key: string, value: unknown): string[] => {
  if (value === undefined) return []
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${key} must be a string array`)
  }
  return value
}

const renderAssetList = (assets: BuiltinSkillAsset[]) =>
  assets.map((asset) => `- ${asset.name}: ${asset.description}`).join('\n')

const renderAssets = (assets: BuiltinSkillAsset[]) => assets.map((asset) => `\n\n---\n\n${asset.content.trim()}`)

const renderSkill = (skill: BuiltinSkill, references: BuiltinSkillReference[] = []) =>
  [
    skill.content.trim(),
    `\n## Available References\n\n${renderAssetList(skill.references)}`,
    ...renderAssets(references),
  ].join('')

const renderSkillList = () =>
  listBuiltinSkills()
    .map((skill) =>
      [
        `- ${skill.name}: ${skill.description}`,
        `  references: ${skill.references.map((ref) => ref.name).join(', ')}`,
      ].join('\n'),
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

const createReadSkillTool = (name: string): AgentTool => ({
  name,
  descriptor: {
    description:
      'List or read VBI Agent builtin skills. Pass name to read SKILL.md, and references to include selected reference files.',
    inputSchema: createInputSchema(),
    strict: true,
  },
  execute: async (input) => {
    const skillName = typeof input.name === 'string' ? input.name : undefined
    const content = skillName ? renderBuiltinSkill(skillName, input.references) : renderSkillList()
    return {
      content,
      display: content,
      summary: skillName ? `builtin skill ${skillName} returned` : 'builtin skills listed',
    }
  },
})

export const renderBuiltinSkill = (name: string, referencesInput: unknown = []) => {
  const skill = findBuiltinSkill(name)
  const references = findBuiltinSkillReferences(skill, requireStringArray('references', referencesInput))
  return renderSkill(skill, references)
}

export const createBuiltinSkillTools = (): AgentTool[] => [createReadSkillTool('read_skill')]
