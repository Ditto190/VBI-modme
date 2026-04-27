import { describe, expect, test } from 'vitest'
import { createBuiltinSkillTools } from '../src/tools/skill-tools.js'
import { createToolKit } from '../src/tools/toolkit.js'

describe('builtin skill tools', () => {
  test('lists builtin skills', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({})

    expect(result.content).toContain('vbi-builder')
    expect(result.content).toContain('hypothesis-loop')
    expect(result.content).toContain('chart-builder')
    expect(result.content).toContain('report-builder')
  })

  test('returns skill body without loading references by default', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({ name: 'vbi-builder' })

    expect(result.content).toContain('# VBI Builder')
    expect(result.content).toContain('## Runtime')
    expect(result.content).toContain('## Available References')
    expect(result.content).toContain('chart.open(id?)')
    expect(result.content).not.toContain('# VBIChartBuilder')
  })

  test('includes requested references', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({
      name: 'vbi-builder',
      references: ['chart-builder'],
    })

    expect(result.content).toContain('# VBIChartBuilder')
    expect(result.content).toContain('## Examples')
  })

  test('returns hypothesis skill body and requested references', async () => {
    const [tool] = createBuiltinSkillTools()
    const result = await tool.execute({
      name: 'hypothesis-loop',
      references: ['experiment-design'],
    })

    expect(result.content).toContain('# Hypothesis Loop')
    expect(result.content).toContain('vbi_experiment')
    expect(result.content).toContain('# Experiment Design')
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
