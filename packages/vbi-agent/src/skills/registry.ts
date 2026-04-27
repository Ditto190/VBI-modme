import { hypothesisLoopSkill } from './hypothesis-loop/index.js'
import { vbiBuilderSkill } from './vbi-builder/index.js'
import type { BuiltinSkill, BuiltinSkillAsset, BuiltinSkillReference } from './types.js'

const builtinSkills = [vbiBuilderSkill, hypothesisLoopSkill]

export const listBuiltinSkills = () => builtinSkills

export const findBuiltinSkill = (name: string): BuiltinSkill => {
  const skill = builtinSkills.find((item) => item.name === name)
  if (!skill) throw new Error(`unknown builtin skill: ${name}`)
  return skill
}

const findAssets = <TAsset extends BuiltinSkillAsset>(
  skill: BuiltinSkill,
  assets: TAsset[],
  kind: string,
  names: string[],
) =>
  names.map((name) => {
    const asset = assets.find((item) => item.name === name)
    if (!asset) throw new Error(`unknown ${kind} "${name}" for builtin skill "${skill.name}"`)
    return asset
  })

export const findBuiltinSkillReferences = (skill: BuiltinSkill, names: string[]): BuiltinSkillReference[] =>
  findAssets(skill, skill.references, 'reference', names)
