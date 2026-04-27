export interface SkillAssetMeta {
  capabilities: string[]
  description: string
  name: string
  references: string[]
  tags: string[]
  tools: string[]
  version: string
}

export interface ParsedSkillAsset {
  content: string
  meta: SkillAssetMeta
}

export type FrontmatterMap = Record<string, string | string[]>

export interface MarkdownSection {
  content: string
  title: string
}

export interface BuiltinSkillAsset {
  capabilities: string[]
  content: string
  description: string
  name: string
  tags: string[]
  tools: string[]
  version: string
}

export type BuiltinSkillReference = BuiltinSkillAsset

export interface BuiltinSkill {
  capabilities: string[]
  content: string
  description: string
  name: string
  references: BuiltinSkillReference[]
  tags: string[]
  tools: string[]
  version: string
}

export interface SkillReadInput {
  references?: string[]
  sections?: string[]
}

export interface SkillSearchInput {
  name?: string
  query: string
  references?: string[]
}
