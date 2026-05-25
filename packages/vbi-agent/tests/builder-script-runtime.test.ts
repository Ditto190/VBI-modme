import { describe, expect, test } from '@rstest/core'
import { executeAgentScript } from '../src/script/runtime.js'
import { createBuilderTools } from '../src/tools/builder-tools.js'

const createDimensionNode = (state: Record<string, unknown>) => ({
  getField: () => state.field as string,
  getId: () => state.id as string,
  setAggregate: (aggregate: unknown) => void (state.aggregate = aggregate),
  setAlias: (alias: string) => void (state.alias = alias),
  setEncoding: (encoding: string) => void (state.encoding = encoding),
  setSort: (sort: unknown) => void (state.sort = sort),
})

const createMeasureNode = (state: Record<string, unknown>) => ({
  getField: () => state.field as string,
  getId: () => state.id as string,
  setAggregate: (aggregate: unknown) => void (state.aggregate = aggregate),
  setAlias: (alias: string) => void (state.alias = alias),
  setEncoding: (encoding: string) => void (state.encoding = encoding),
  setFormat: (format: unknown) => void (state.format = format),
  setSort: (sort: unknown) => void (state.sort = sort),
})

const createChartBuilder = () => {
  let chartType = 'columnParallel'
  let theme = 'light'
  let locale = 'zh-CN'
  let limit: number | undefined
  const dimensions: Array<Record<string, unknown>> = [{ id: 'dim-1', field: 'area', alias: 'area', encoding: 'xAxis' }]
  const measures: Array<Record<string, unknown>> = [{ id: 'mea-1', field: 'sales', alias: 'sales', encoding: 'yAxis' }]
  const whereFilter = { conditions: [] as unknown[], id: 'root', op: 'and' }
  const havingFilter = { conditions: [] as unknown[], id: 'root', op: 'and' }

  return {
    build: () => ({
      chartType,
      dimensions: [...dimensions],
      havingFilter,
      limit,
      locale,
      measures: [...measures],
      theme,
      whereFilter,
    }),
    chartType: {
      changeChartType: (value: string) => {
        chartType = value
      },
      getChartType: () => chartType,
    },
    dimensions: {
      add: (field: string, callback: (node: ReturnType<typeof createDimensionNode>) => void) => {
        const entry = { alias: field, field, id: `dim-${dimensions.length + 1}` }
        dimensions.push(entry)
        callback(createDimensionNode(entry))
      },
      findAll: () => dimensions.map(createDimensionNode),
      toJSON: () => [...dimensions],
      update: (id: string, callback: (node: ReturnType<typeof createDimensionNode>) => void) =>
        callback(createDimensionNode(dimensions.find((item) => item.id === id)!)),
    },
    havingFilter: {
      add: (
        field: string,
        callback: (node: {
          setAggregate(aggregate: unknown): void
          setOperator(operator: string): void
          setValue(value: unknown): void
        }) => void,
      ) => {
        const entry: Record<string, unknown> = {
          aggregate: { func: 'sum' },
          field,
          id: `having-${havingFilter.conditions.length + 1}`,
        }
        havingFilter.conditions.push(entry)
        callback({
          setAggregate: (aggregate) => void (entry.aggregate = aggregate),
          setOperator: (operator) => void (entry.op = operator),
          setValue: (value) => void (entry.value = value),
        })
      },
      toJSON: () => havingFilter,
    },
    limit: {
      getLimit: () => limit,
      setLimit: (value: number) => void (limit = value),
    },
    locale: {
      getLocale: () => locale,
      setLocale: (value: string) => void (locale = value),
    },
    measures: {
      add: (field: string, callback: (node: ReturnType<typeof createMeasureNode>) => void) => {
        const entry = { aggregate: { func: 'sum' }, alias: field, field, id: `mea-${measures.length + 1}` }
        measures.push(entry)
        callback(createMeasureNode(entry))
      },
      findAll: () => measures.map(createMeasureNode),
      toJSON: () => [...measures],
      update: (id: string, callback: (node: ReturnType<typeof createMeasureNode>) => void) =>
        callback(createMeasureNode(measures.find((item) => item.id === id)!)),
    },
    theme: {
      getTheme: () => theme,
      setTheme: (value: string) => void (theme = value),
    },
    whereFilter: {
      add: (
        field: string,
        callback: (node: { setOperator(operator: string): void; setValue(value: unknown): void }) => void,
      ) => {
        const entry: Record<string, unknown> = { field, id: `where-${whereFilter.conditions.length + 1}` }
        whereFilter.conditions.push(entry)
        callback({
          setOperator: (operator) => void (entry.op = operator),
          setValue: (value) => void (entry.value = value),
        })
      },
      toJSON: () => whereFilter,
    },
  }
}

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

describe('createBuilderTools', () => {
  test('mutates the injected chart builder without platform provider access', async () => {
    const builder = createChartBuilder()
    const [tool] = createBuilderTools({ chart: { open: async () => builder as never } })
    const result = await tool.execute('call-1', {
      code: `
        const b = await chart.open();
        b.chartType.changeChartType('line');
        b.dimensions.add('category', n => { n.setAlias('Category'); n.setEncoding('color'); });
        const areaDim = b.dimensions.findAll().find(d => d.getField() === 'area');
        b.dimensions.update(areaDim.getId(), n => { n.setAlias('Area'); n.setEncoding('xAxis'); });
        b.measures.add('profit', n => { n.setAlias('Profit'); n.setEncoding('yAxis'); n.setAggregate({ func: 'sum' }); });
        const salesMea = b.measures.findAll().find(m => m.getField() === 'sales');
        b.measures.update(salesMea.getId(), n => { n.setAlias('Sales'); n.setFormat({ precision: 2 }); });
        b.whereFilter.add('area', n => { n.setOperator('='); n.setValue('East'); });
        b.havingFilter.add('profit', n => { n.setOperator('>'); n.setValue(100); n.setAggregate({ func: 'sum' }); });
        b.theme.setTheme('dark');
        b.locale.setLocale('en-US');
        b.limit.setLimit(10);
        return json(b.build());
      `,
    })
    const content = result.content.find((part) => part.type === 'text')?.text ?? ''
    const details = result.details as { display?: string; summary: string }
    const payload = JSON.parse(content) as { result: ReturnType<typeof builder.build> }

    expect(details.summary).toBe('vbi_chart_builder succeeded: 0 logs, object result')
    expect(details.display).toContain('Status: succeeded')
    expect(details.display).toContain('Logs: none')
    expect(details.display).toContain('Result:')
    expect(payload.result).toMatchObject({
      chartType: 'line',
      dimensions: expect.arrayContaining([expect.objectContaining({ alias: 'Area', field: 'area' })]),
      havingFilter: { conditions: [expect.objectContaining({ field: 'profit', op: '>', value: 100 })] },
      limit: 10,
      locale: 'en-US',
      measures: expect.arrayContaining([
        expect.objectContaining({ alias: 'Sales', field: 'sales', format: { precision: 2 } }),
      ]),
      theme: 'dark',
      whereFilter: { conditions: [expect.objectContaining({ field: 'area', op: '=', value: 'East' })] },
    })
  })

  test('exposes workspace connector helpers to builder scripts', async () => {
    const register = (...[id]: [string, unknown]) => id
    const [tool] = createBuilderTools({ connectors: { register }, chart: { open: async () => ({}) as never } })
    const result = await tool.execute('call-1', {
      code: `
        return json({ connectorId: workspace.connectors.register('demo', { discoverSchema: async () => [], query: async () => ({ dataset: [] }) }) });
      `,
    })
    const content = result.content.find((part) => part.type === 'text')?.text ?? ''
    const payload = JSON.parse(content) as { result: { connectorId: string } }

    expect(payload.result).toEqual({ connectorId: 'demo' })
  })

  test('exposes insight builder slots to insight scripts', async () => {
    const [, tool] = createBuilderTools({
      insight: { open: async () => ({ build: () => ({ content: 'summary' }) }) as never },
    })

    const result = await tool.execute('call-1', {
      code: `
        const i = await insight.open('insight-1');
        const alias = await builder.open('insight-1');
        return json({ insight: i.build().content, alias: alias.build().content });
      `,
    })
    const content = result.content.find((part) => part.type === 'text')?.text ?? ''
    const payload = JSON.parse(content) as { result: { alias: string; insight: string } }

    expect(payload.result).toEqual({ alias: 'summary', insight: 'summary' })
  })

  test('exposes report builder slots to report scripts', async () => {
    const pages: Array<{ id: string; title: string }> = []
    const reportBuilder = {
      build: () => ({ pages }),
      page: {
        add: (title: string) => {
          pages.push({ id: `page-${pages.length + 1}`, title })
          return reportBuilder
        },
      },
    }
    const [, , tool] = createBuilderTools({ report: { open: async () => reportBuilder as never } })

    const result = await tool.execute('call-1', {
      code: `
        const b = await report.open('report-1');
        b.page.add('Overview');
        const alias = await builder.open('report-1');
        return json({ same: alias === b, report: b.build() });
      `,
    })
    const content = result.content.find((part) => part.type === 'text')?.text ?? ''
    const payload = JSON.parse(content) as { result: { report: { pages: typeof pages }; same: boolean } }

    expect(payload.result).toEqual({
      report: { pages: [{ id: 'page-1', title: 'Overview' }] },
      same: true,
    })
  })
})
