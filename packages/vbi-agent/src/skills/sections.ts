import type { MarkdownSection } from '../types/index.js'

const headingPattern = /^(#{1,6})\s+(.+?)\s*$/gm

const normalizeTitle = (title: string) => title.trim().toLowerCase()

export const listMarkdownSections = (content: string): MarkdownSection[] => {
  const matches = [...content.matchAll(headingPattern)]
  return matches.map((match, index) => {
    const start = match.index ?? 0
    const end = matches[index + 1]?.index ?? content.length
    return { content: content.slice(start, end).trim(), title: match[2].trim() }
  })
}

export const sectionTitles = (content: string) => listMarkdownSections(content).map((section) => section.title)

export const pickMarkdownSections = (content: string, titles: string[]) => {
  if (!titles.length) return content.trim()

  const wanted = new Set(titles.map(normalizeTitle))
  const sections = listMarkdownSections(content).filter((section) => wanted.has(normalizeTitle(section.title)))
  if (!sections.length) {
    throw new Error(`unknown section: ${titles.join(', ')}. available: ${sectionTitles(content).join(', ')}`)
  }
  return sections.map((section) => section.content).join('\n\n')
}

export const pickExistingMarkdownSections = (content: string, titles: string[]) => {
  if (!titles.length) return content.trim()

  const wanted = new Set(titles.map(normalizeTitle))
  return listMarkdownSections(content)
    .filter((section) => wanted.has(normalizeTitle(section.title)))
    .map((section) => section.content)
    .join('\n\n')
}
