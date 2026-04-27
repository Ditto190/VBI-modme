export interface BuiltinSkillAsset {
  content: string
  description: string
  name: string
}

export type BuiltinSkillReference = BuiltinSkillAsset

export interface BuiltinSkill {
  content: string
  description: string
  name: string
  references: BuiltinSkillReference[]
}
