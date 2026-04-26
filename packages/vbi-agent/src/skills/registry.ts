import { vbiBuilderSkill } from './vbi-builder/index.js'
import type { BuiltinSkill, BuiltinSkillReference } from './types.js'

const builtinSkills = [vbiBuilderSkill]

export const listBuiltinSkills = () => builtinSkills

export const findBuiltinSkill = (name: string): BuiltinSkill => {
  const skill = builtinSkills.find((item) => item.name === name)
  if (!skill) throw new Error(`unknown builtin skill: ${name}`)
  return skill
}

export const findBuiltinSkillReferences = (skill: BuiltinSkill, names: string[]): BuiltinSkillReference[] =>
  names.map((name) => {
    const reference = skill.references.find((item) => item.name === name)
    if (!reference) throw new Error(`unknown reference "${name}" for builtin skill "${skill.name}"`)
    return reference
  })
