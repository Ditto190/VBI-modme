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

type FrontmatterMap = Record<string, string | string[]>

const emptyMeta: SkillAssetMeta = {
  capabilities: [],
  description: '',
  name: '',
  references: [],
  tags: [],
  tools: [],
  version: '',
}

const trimQuotes = (value: string) => value.trim().replace(/^['"]|['"]$/g, '')

const parseInlineList = (value: string) => value.slice(1, -1).split(',').map(trimQuotes).filter(Boolean)

const parseValue = (value: string): string | string[] => {
  const trimmed = value.trim()
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return parseInlineList(trimmed)
  return trimQuotes(trimmed)
}

const parseFrontmatter = (source: string) => {
  const data: FrontmatterMap = {}
  let currentListKey = ''

  for (const line of source.split('\n')) {
    const listItem = line.match(/^\s+-\s+(.+)$/)
    if (listItem && currentListKey) {
      const items = data[currentListKey]
      if (Array.isArray(items)) items.push(trimQuotes(listItem[1]))
      continue
    }

    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (!field) continue
    const [, key, value] = field
    currentListKey = value ? '' : key
    data[key] = value ? parseValue(value) : []
  }

  return data
}

const getString = (data: FrontmatterMap, key: keyof SkillAssetMeta) => {
  const value = data[key]
  if (typeof value !== 'string' || !value.trim()) throw new Error(`skill frontmatter ${key} is required`)
  return value
}

const getStringArray = (data: FrontmatterMap, key: keyof SkillAssetMeta) => {
  const value = data[key]
  if (value === undefined) return []
  if (!Array.isArray(value)) throw new Error(`skill frontmatter ${key} must be a string array`)
  return value
}

const toMeta = (data: FrontmatterMap): SkillAssetMeta => ({
  ...emptyMeta,
  capabilities: getStringArray(data, 'capabilities'),
  description: getString(data, 'description'),
  name: getString(data, 'name'),
  references: getStringArray(data, 'references'),
  tags: getStringArray(data, 'tags'),
  tools: getStringArray(data, 'tools'),
  version: getString(data, 'version'),
})

export const parseSkillAsset = (source: string): ParsedSkillAsset => {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) throw new Error('skill markdown must start with frontmatter')
  return { content: match[2].trim(), meta: toMeta(parseFrontmatter(match[1])) }
}
