import { describe, expect, test } from '@rstest/core'
import { createBuiltinSkillTools } from '../src/tools/skill-tools.js'
import { createToolKit } from '../src/tools/toolkit.js'

const parseContent = <T>(content: string) => JSON.parse(content) as T

describe('builtin skill tools', () => {
  test('lists builtin skills with frontmatter metadata', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({})
    const content = parseContent<{ skills: Array<{ name: string; references: Array<{ name: string }> }> }>(
      result.content,
    )

    expect(content.skills.map((skill) => skill.name)).toEqual(['vbi-builder', 'hypothesis-loop'])
    expect(content.skills[0].references.map((ref) => ref.name)).toContain('chart-builder')
    expect(result.display).toContain('report-builder')
  })

  test('returns skill body without loading references by default', async () => {
    const [, tool] = createBuiltinSkillTools()
    const result = await tool.execute({ name: 'vbi-builder' })
    const content = parseContent<{ content: string; skill: { tools: string[] } }>(result.content)

    expect(content.skill.tools).toContain('vbi_builder')
    expect(content.content).toContain('# VBI Builder')
    expect(content.content).toContain('## Runtime')
    expect(content.content).toContain('## Available References')
    expect(content.content).toContain('chart.open(id?)')
    expect(content.content).not.toContain('# VBIChartBuilder')
  })

  test('includes requested references and section filters', async () => {
    const [, tool] = createBuiltinSkillTools()
    const result = await tool.execute({
      name: 'vbi-builder',
      references: ['chart-builder'],
      sections: ['Examples'],
    })
    const content = parseContent<{ content: string; references: Array<{ name: string }> }>(result.content)

    expect(content.references.map((ref) => ref.name)).toEqual(['chart-builder'])
    expect(content.content).toContain('# chart-builder')
    expect(content.content).toContain('## Examples')
    expect(content.content).not.toContain('## Runtime')
  })

  test('searches reference sections', async () => {
    const [, , tool] = createBuiltinSkillTools()
    const result = await tool.execute({ name: 'vbi-builder', query: 'date filters', references: ['chart-builder'] })
    const content = parseContent<{ matches: Array<{ reference: { name: string }; section: string }> }>(result.content)

    expect(content.matches).toHaveLength(1)
    expect(content.matches[0]).toMatchObject({ reference: { name: 'chart-builder' }, section: 'Examples' })
  })

  test('wraps unknown references through toolkit errors', async () => {
    const tool = createToolKit(createBuiltinSkillTools())
    const result = await tool.execute({
      arguments: { name: 'vbi-builder', references: ['missing'] },
      id: '1',
      name: 'read_skill',
    })

    expect(JSON.parse(result.content)).toMatchObject({ ok: false, tool: 'read_skill' })
    expect(result.display).toContain('unknown reference "missing"')
  })
})
