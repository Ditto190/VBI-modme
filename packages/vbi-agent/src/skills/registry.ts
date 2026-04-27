// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../types/assets.d.ts" />

import hypothesisLoop from './hypothesis-loop/SKILL.md?raw'
import experimentDesign from './hypothesis-loop/references/experiment-design.md?raw'
import validationRubric from './hypothesis-loop/references/validation-rubric.md?raw'
import vbiBuilder from './vbi-builder/SKILL.md?raw'
import chartBuilder from './vbi-builder/references/chart-builder.md?raw'
import insightBuilder from './vbi-builder/references/insight-builder.md?raw'
import reportBuilder from './vbi-builder/references/report-builder.md?raw'
import { parseSkillAsset, type SkillAssetMeta } from './frontmatter.js'

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

const assetFromMeta = (meta: SkillAssetMeta, content: string): BuiltinSkillAsset => ({ ...meta, content })

const parseAsset = (source: string) => {
  const { content, meta } = parseSkillAsset(source)
  return assetFromMeta(meta, content)
}

const referenceAssets = [
  parseAsset(chartBuilder),
  parseAsset(reportBuilder),
  parseAsset(insightBuilder),
  parseAsset(experimentDesign),
  parseAsset(validationRubric),
]

const referencesByName = new Map(referenceAssets.map((reference) => [reference.name, reference]))

const parseSkill = (source: string): BuiltinSkill => {
  const { content, meta } = parseSkillAsset(source)
  return {
    ...meta,
    content,
    references: meta.references.map((name) => {
      const reference = referencesByName.get(name)
      if (!reference) throw new Error(`unknown reference "${name}" for builtin skill "${meta.name}"`)
      return reference
    }),
  }
}

const builtinSkills: BuiltinSkill[] = [parseSkill(vbiBuilder), parseSkill(hypothesisLoop)]

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
