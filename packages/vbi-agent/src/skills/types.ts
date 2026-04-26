export interface BuiltinSkillReference {
  content: string
  description: string
  name: string
}

export interface BuiltinSkill {
  content: string
  description: string
  name: string
  references: BuiltinSkillReference[]
}
