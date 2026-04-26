import { describe, expect, test } from 'vitest'
import { createBuilderTools } from '../src/tools/builder-tools.js'
import { createBuiltinSkillTools } from '../src/tools/skill-tools.js'
import { createToolKit } from '../src/tools/toolkit.js'

describe('builtin skill tools', () => {
  test('lists builtin skills', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({})

    expect(result.content).toContain('vbi-builder')
    expect(result.content).toContain('runtime')
    expect(result.content).toContain('chart-builder-api')
  })

  test('returns skill body without loading references by default', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({ name: 'vbi-builder' })

    expect(result.content).toContain('# VBI Builder')
    expect(result.content).toContain('## Available References')
    expect(result.content).not.toContain('# Runtime')
  })

  test('includes requested references', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({ name: 'vbi-builder', references: ['runtime'] })

    expect(result.content).toContain('# Runtime')
    expect(result.content).toContain('chart.open(id?)')
  })

  test('wraps unknown references through toolkit errors', async () => {
    const tool = createToolKit(createBuiltinSkillTools())
    const result = await tool.execute({
      arguments: { name: 'vbi-builder', references: ['missing'] },
      id: '1',
      name: 'vbi_skill',
    })

    expect(JSON.parse(result.content)).toMatchObject({ ok: false, tool: 'vbi_skill' })
    expect(result.display).toContain('unknown reference "missing"')
  })

  test('keeps how_to_use_vbi_builder as a compatibility alias', async () => {
    const tool = createBuilderTools({} as never).find((item) => item.name === 'how_to_use_vbi_builder')!
    const result = await tool.execute({ references: ['chart-builder-api'] })

    expect(result.content).toContain('# VBI Builder')
    expect(result.content).toContain('# Chart Builder API')
  })
})
