import { describe, expect, test } from '@rstest/core'
import { createBuilderTools } from '../src/tools/builder-tools.js'
import type { VBIAgentWorkspace } from '../src/types.js'

type ChartBuilder = Awaited<ReturnType<NonNullable<VBIAgentWorkspace['chart']>['open']>>

const createChartBuilder = (): ChartBuilder =>
  ({ build: () => ({ dimensions: [{ field: 'area' }], measures: [{ field: 'sales' }] }) }) as ChartBuilder

describe('vbi_experiment', () => {
  test('runs batched experiments and keeps failures isolated', async () => {
    const [tool, experimentTool] = createBuilderTools({
      chart: { open: async () => createChartBuilder() },
    })
    expect(tool.name).toBe('vbi_builder')
    expect(experimentTool.name).toBe('vbi_experiment')

    const result = await experimentTool.execute({
      experiments: [
        {
          code: "const b = await chart.open(); return json({ verdict: 'supported', evidence: 'sales exists', artifacts: b.build() })",
          hypothesis: 'sales measure exists',
        },
        { code: "throw new Error('broken check')", hypothesis: 'failing experiment' },
      ],
    })
    const payload = JSON.parse(result.content) as { results: Array<Record<string, unknown>> }

    expect(result.summary).toBe('vbi_experiment finished: 1 succeeded, 1 failed')
    expect(payload.results).toHaveLength(2)
    expect(payload.results[0]).toMatchObject({
      hypothesis: 'sales measure exists',
      result: { verdict: 'supported' },
      status: 'succeeded',
    })
    expect(payload.results[1]).toMatchObject({
      error: 'broken check',
      hypothesis: 'failing experiment',
      status: 'failed',
    })
  })
})
