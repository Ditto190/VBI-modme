import { describe, expect, test } from '@rstest/core'
import { executeAgentScript } from '../src/script/runtime'

describe('executeAgentScript', () => {
  test('runs code with injected globals and captures logs', async () => {
    const result = await executeAgentScript({
      code: `
        console.log('using', name);
        assert(name === 'builder', 'wrong global');
        return json({ name });
      `,
      globals: { name: 'builder' },
    })

    expect(result).toEqual({ logs: ['using builder'], result: { name: 'builder' } })
  })

  test('allows snippets to shadow injected global names', async () => {
    const result = await executeAgentScript({
      code: `
        const builder = await chart.open('Chart1');
        return json({ chartType: builder.build().chartType });
      `,
      globals: {
        builder: { open: async () => ({ build: () => ({ chartType: 'unused' }) }) },
        chart: { open: async () => ({ build: () => ({ chartType: 'line' }) }) },
      },
    })

    expect(result).toEqual({ logs: [], result: { chartType: 'line' } })
  })
})
