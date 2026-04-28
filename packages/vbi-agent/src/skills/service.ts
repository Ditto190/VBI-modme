import { findBuiltinSkill, findBuiltinSkillReferences, listBuiltinSkills } from './registry.js'
import { listMarkdownSections, pickExistingMarkdownSections } from './sections.js'
import type { BuiltinSkill, BuiltinSkillAsset, SkillReadInput, SkillSearchInput } from '../types/index.js'

const metadata = (asset: BuiltinSkillAsset) => ({
  capabilities: asset.capabilities,
  description: asset.description,
  name: asset.name,
  tags: asset.tags,
  tools: asset.tools,
  version: asset.version,
})

const skillMetadata = (skill: BuiltinSkill) => ({
  ...metadata(skill),
  references: skill.references.map(metadata),
})

const renderAssetList = (assets: BuiltinSkillAsset[]) =>
  assets.map((asset) => `- ${asset.name}: ${asset.description}`).join('\n')

const pickAssetContent = (asset: BuiltinSkillAsset, sections: string[]) => {
  const content = pickExistingMarkdownSections(asset.content, sections)
  if (!content) return ''
  return sections.length ? `# ${asset.name}\n\n${content}` : content
}

const renderAssets = (assets: BuiltinSkillAsset[], sections: string[]) =>
  assets
    .map((asset) => pickAssetContent(asset, sections))
    .filter(Boolean)
    .map((content) => `\n\n---\n\n${content}`)

export const listSkills = () => listBuiltinSkills().map(skillMetadata)

export const renderSkillList = () =>
  listBuiltinSkills()
    .map((skill) =>
      [
        `- ${skill.name}: ${skill.description}`,
        `  references: ${skill.references.map((ref) => ref.name).join(', ')}`,
      ].join('\n'),
    )
    .join('\n')

export const readSkill = (name: string, input: SkillReadInput = {}) => {
  const sections = input.sections ?? []
  const skill = findBuiltinSkill(name)
  const references = findBuiltinSkillReferences(skill, input.references ?? [])
  const skillContent = pickExistingMarkdownSections(skill.content, sections)
  const content = [
    skillContent,
    `\n## Available References\n\n${renderAssetList(skill.references)}`,
    ...renderAssets(references, sections),
  ].join('')
  return { content, references: references.map(metadata), skill: skillMetadata(skill) }
}

const allSearchSkills = (name?: string) => (name ? [findBuiltinSkill(name)] : listBuiltinSkills())

const selectedReferences = (skill: BuiltinSkill, names?: string[]) =>
  names?.length ? findBuiltinSkillReferences(skill, names) : skill.references

const includes = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase())

export const searchSkillReferences = ({ name, query, references }: SkillSearchInput) => {
  const trimmed = query.trim()
  if (!trimmed) throw new Error('query is required')

  return allSearchSkills(name).flatMap((skill) =>
    selectedReferences(skill, references).flatMap((reference) =>
      listMarkdownSections(reference.content)
        .filter((section) => includes(`${section.title}\n${section.content}`, trimmed))
        .map((section) => ({
          content: section.content,
          reference: metadata(reference),
          section: section.title,
          skill: metadata(skill),
        })),
    ),
  )
}
