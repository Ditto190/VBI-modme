import { describe, expect, test, vi } from 'vitest'
import { executeProviderScript } from '../src/agent/provider-script-runtime.js'

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
  let whereFilter = { conditions: [] as unknown[], id: 'root', op: 'and' }
  let havingFilter = { conditions: [] as unknown[], id: 'root', op: 'and' }

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
      getAvailableChartTypes: () => ['columnParallel', 'line', 'table'],
      getChartType: () => chartType,
    },
    dimensions: {
      add: (field: string, callback: (node: ReturnType<typeof createDimensionNode>) => void) => {
        const entry = { alias: field, field, id: `dim-${dimensions.length + 1}` }
        dimensions.push(entry)
        callback(createDimensionNode(entry))
      },
      findAll: () => dimensions.map(createDimensionNode),
      remove: (id: string) =>
        void dimensions.splice(
          dimensions.findIndex((item) => item.id === id),
          1,
        ),
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
      clear: () => void (havingFilter = { conditions: [], id: 'root', op: 'and' }),
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
      remove: (id: string) =>
        void measures.splice(
          measures.findIndex((item) => item.id === id),
          1,
        ),
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
        callback: (node: {
          setDate(value: unknown): void
          setOperator(operator: string): void
          setValue(value: unknown): void
        }) => void,
      ) => {
        const entry: Record<string, unknown> = { field, id: `where-${whereFilter.conditions.length + 1}` }
        whereFilter.conditions.push(entry)
        callback({
          setDate: (value) => {
            entry.op = 'date'
            entry.value = value
          },
          setOperator: (operator) => void (entry.op = operator),
          setValue: (value) => void (entry.value = value),
        })
      },
      clear: () => void (whereFilter = { conditions: [], id: 'root', op: 'and' }),
      toJSON: () => whereFilter,
    },
  }
}

describe('executeProviderScript', () => {
  test('lets code open a chart provider and mutate chart type through the builder', async () => {
    let chartType = 'table'
    const close = vi.fn(async () => {})
    const client = {
      chart: vi.fn(() => ({
        close,
        open: vi.fn(async () => ({
          build: () => ({ chartType }),
          chartType: {
            changeChartType: (value: string) => {
              chartType = value
            },
            getChartType: () => chartType,
          },
        })),
      })),
      insight: vi.fn(),
      listCharts: vi.fn(),
      listInsights: vi.fn(),
      listReports: vi.fn(),
      report: vi.fn(),
    } as never

    const result = await executeProviderScript({
      client,
      code: `
        const provider = client.chart(resourceId);
        const builder = await provider.open();
        builder.chartType.changeChartType('line');
        console.log('changed to', builder.chartType.getChartType());
        return json({ chartType: builder.chartType.getChartType(), dsl: builder.build() });
      `,
      resource: 'chart',
      resourceId: 'chart-1',
    })

    expect(result.result).toEqual({ chartType: 'line', dsl: { chartType: 'line' } })
    expect(result.logs).toContain('changed to line')
    expect(close).toHaveBeenCalledTimes(1)
  })

  test('still closes tracked providers when user code throws', async () => {
    const close = vi.fn(async () => {})
    const client = {
      chart: vi.fn(() => ({
        close,
        open: vi.fn(async () => ({})),
      })),
      insight: vi.fn(),
      listCharts: vi.fn(),
      listInsights: vi.fn(),
      listReports: vi.fn(),
      report: vi.fn(),
    } as never

    await expect(
      executeProviderScript({
        client,
        code: `
          const provider = client.chart(resourceId);
          await provider.open();
          throw new Error('boom');
        `,
        resource: 'chart',
        resourceId: 'chart-2',
      }),
    ).rejects.toThrow('boom')
    expect(close).toHaveBeenCalledTimes(1)
  })

  test('supports the injected vbi helper API', async () => {
    let chartType = 'columnParallel'
    const close = vi.fn(async () => {})
    const client = {
      chart: vi.fn(() => ({
        close,
        open: vi.fn(async () => ({
          build: () => ({ chartType }),
          chartType: {
            changeChartType: (value: string) => {
              chartType = value
            },
            getChartType: () => chartType,
          },
        })),
      })),
      insight: vi.fn(),
      listCharts: vi.fn(),
      listInsights: vi.fn(),
      listReports: vi.fn(),
      report: vi.fn(),
    } as never

    const result = await executeProviderScript({
      client,
      code: `
        const { builder } = await vbi.openChart(resourceId);
        vbi.changeChartType(builder, 'line');
        return json({ chartType: builder.chartType.getChartType() });
      `,
      resource: 'chart',
      resourceId: 'chart-3',
    })

    expect(result.result).toEqual({ chartType: 'line' })
    expect(close).toHaveBeenCalledTimes(1)
  })

  test('supports higher-level builder helpers for dimensions, measures, filters, and settings', async () => {
    const close = vi.fn(async () => {})
    const builder = createChartBuilder()
    const client = {
      chart: vi.fn(() => ({
        close,
        open: vi.fn(async () => builder),
      })),
      insight: vi.fn(),
      listCharts: vi.fn(),
      listInsights: vi.fn(),
      listReports: vi.fn(),
      report: vi.fn(),
    } as never

    const result = await executeProviderScript({
      client,
      code: `
        const { builder } = await vbi.openChart(resourceId);
        vbi.addDimension(builder, { field: 'category', alias: 'Category', encoding: 'color' });
        vbi.updateDimension(builder, { field: 'area', alias: 'Area', encoding: 'xAxis' });
        vbi.addMeasure(builder, { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } });
        vbi.updateMeasure(builder, { field: 'sales', alias: 'Sales', format: { precision: 2 } });
        vbi.addWhere(builder, { field: 'area', operator: '=', value: 'East' });
        vbi.addHaving(builder, { field: 'profit', operator: '>', value: 100, aggregate: { func: 'sum' } });
        vbi.setTheme(builder, 'dark');
        vbi.setLocale(builder, 'en-US');
        vbi.setLimit(builder, 10);
        return json({
          chart: vbi.getChartState(builder),
          having: vbi.getHaving(builder),
          limit: vbi.getLimit(builder),
          locale: vbi.getLocale(builder),
          measures: vbi.getMeasures(builder),
          theme: vbi.getTheme(builder),
          where: vbi.getWhere(builder)
        });
      `,
      resource: 'chart',
      resourceId: 'chart-4',
    })

    expect(result.result).toMatchObject({
      chart: {
        chartType: 'columnParallel',
        dimensions: expect.arrayContaining([expect.objectContaining({ alias: 'Area', field: 'area' })]),
        measures: expect.arrayContaining([
          expect.objectContaining({ alias: 'Sales', field: 'sales', format: { precision: 2 } }),
        ]),
      },
      having: {
        conditions: [expect.objectContaining({ field: 'profit', op: '>', value: 100 })],
        id: 'root',
        op: 'and',
      },
      limit: 10,
      locale: 'en-US',
      theme: 'dark',
      where: {
        conditions: [expect.objectContaining({ field: 'area', op: '=', value: 'East' })],
        id: 'root',
        op: 'and',
      },
    })
    expect(close).toHaveBeenCalledTimes(1)
  })
})
