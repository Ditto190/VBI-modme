import { describe, test, expect, beforeAll } from 'vitest'
import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll, registerCustomTheme } from '@visactor/vseed'

beforeAll(() => {
  registerAll()
})

describe('Builder - Empty Cases', () => {
  test('should throw error for empty VSeed configuration', () => {
    const vseed: VSeed = {}
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for empty dataset', () => {
    const vseed: VSeed = {
      dataset: []
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for dual axis chart without dataset', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })

  test('should throw error for pivot table without dataset', () => {
    const vseed: VSeed = {
      chartType: 'pivotTable'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })

  test('should throw error for scatter chart without dataset', () => {
    const vseed: VSeed = {
      chartType: 'scatter'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })

  test('should throw error for table without dataset', () => {
    const vseed: VSeed = {
      chartType: 'table'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })
})

describe('Builder - Error Cases', () => {
  test('should throw error for invalid chart type', () => {
    const vseed: VSeed = {
      chartType: 'test_chart_type' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('no advanced pipeline for chartType test_chart_type')
  })

  test('should throw error for invalid dataset type', () => {
    const vseed: VSeed = {
      dataset: 'invalid' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for invalid dimensions type', () => {
    const vseed: VSeed = {
      dimensions: 'invalid' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for invalid measures type', () => {
    const vseed: VSeed = {
      measures: 'invalid' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })
})

describe('Builder - Core Methods', () => {
  test('should return valid color id map', () => {
    const vseed: VSeed = { chartType: 'bar' }
    const builder = Builder.from(vseed)

    const colorIdMap = builder.getColorIdMap()
    expect(colorIdMap).toBeDefined()
  })

  test('should return valid color items', () => {
    const vseed: VSeed = { chartType: 'bar' }
    const builder = Builder.from(vseed)

    const colorItems = builder.getColorItems()
    expect(colorItems).toBeDefined()
  })

  test('should return color value map for discrete color charts', () => {
    const vseed: VSeed = {
      chartType: 'line',
      dataset: [
        { year: '2020', type: 'A', value: 10 },
        { year: '2020', type: 'B', value: 20 },
      ],
      dimensions: [
        { id: 'year', encoding: 'xAxis' },
        { id: 'type', encoding: 'color' },
      ],
      measures: [{ id: 'value', encoding: 'yAxis' }],
      color: {
        colorScheme: ['#111111', '#222222'],
        colorMapping: {
          B: '#ff0000',
        },
      },
    }
    const builder = Builder.from(vseed)
    const advanced = builder.buildAdvanced()

    expect(advanced).toBeDefined()

    const spec = builder.buildSpec(advanced!)
    expect(spec).toBeDefined()
    expect(builder.getColorValueMap()).toEqual({
      A: '#111111',
      B: '#ff0000',
    })
  })

  test('should return undefined color value map for linear color charts', () => {
    const vseed: VSeed = {
      chartType: 'heatmap',
      dataset: [
        { date: '2019', type: 'A', sales: 20 },
        { date: '2020', type: 'A', sales: 40 },
      ],
      dimensions: [
        { id: 'type', encoding: 'detail' },
        { id: 'date', encoding: 'detail' },
      ],
      measures: [{ id: 'sales', encoding: 'color' }],
    }
    const builder = Builder.from(vseed)
    const advanced = builder.buildAdvanced()

    expect(advanced).toBeDefined()

    const spec = builder.buildSpec(advanced!)
    expect(spec).toBeDefined()
    expect(builder.getColorValueMap()).toBeUndefined()
  })

  test('should return color value map from registered theme color scheme', () => {
    registerCustomTheme('unit-color-value-map-theme', ({ lightTheme }) => ({
      ...lightTheme,
      config: {
        ...lightTheme.config,
        line: {
          ...lightTheme.config?.line,
          color: {
            ...lightTheme.config?.line?.color,
            colorScheme: ['#123456', '#654321'],
          },
        },
      },
    }))

    const vseed: VSeed = {
      chartType: 'line',
      theme: 'unit-color-value-map-theme',
      dataset: [
        { year: '2020', type: 'A', value: 10 },
        { year: '2020', type: 'B', value: 20 },
      ],
      dimensions: [
        { id: 'year', encoding: 'xAxis' },
        { id: 'type', encoding: 'color' },
      ],
      measures: [{ id: 'value', encoding: 'yAxis' }],
    }
    const builder = Builder.from(vseed)
    const advanced = builder.buildAdvanced()

    expect(advanced).toBeDefined()

    const spec = builder.buildSpec(advanced!)
    expect(spec).toBeDefined()
    expect(builder.getColorValueMap()).toEqual({
      A: '#123456',
      B: '#654321',
    })
  })

  test('should return color value map for pivot charts with discrete color domain', () => {
    const vseed: VSeed = {
      chartType: 'line',
      color: {
        colorScheme: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe'],
      },
      dataset: [
        { month: '1', date: '2019', type: 'A', profit: 100, sales: 200 },
        { month: '2', date: '2019', type: 'A', profit: 200, sales: 400 },
        { month: '1', date: '2019', type: 'B', profit: 120, sales: 180 },
        { month: '2', date: '2019', type: 'B', profit: 160, sales: 260 },
        { month: '1', date: '2020', type: 'A', profit: 150, sales: 230 },
        { month: '2', date: '2020', type: 'A', profit: 220, sales: 420 },
        { month: '1', date: '2020', type: 'B', profit: 140, sales: 210 },
        { month: '2', date: '2020', type: 'B', profit: 190, sales: 310 },
      ],
      measures: [
        { id: 'sales', alias: '销售额', autoFormat: true },
        { id: 'profit', alias: '利润', autoFormat: true },
      ],
      dimensions: [
        { id: 'month', alias: '月' },
        { id: 'date', alias: '年', encoding: 'column' },
        { id: 'type', alias: '类型', encoding: 'row' },
      ],
    }
    const builder = Builder.from(vseed)
    const advanced = builder.buildAdvanced()

    expect(advanced).toBeDefined()

    const spec = builder.buildSpec(advanced!)
    expect(spec).toBeDefined()
    expect(builder.getColorValueMap()).toEqual({
      sales: '#cdb4db',
      profit: '#ffc8dd',
    })
  })

  test('should get advanced pipeline for chart type', () => {
    const pipeline = Builder.getAdvancedPipeline('bar')
    expect(pipeline).toBeDefined()
  })

  test('should get spec pipeline for chart type', () => {
    const pipeline = Builder.getSpecPipeline('bar')
    expect(pipeline).toBeDefined()
  })

  test('should get theme', () => {
    const theme = Builder.getTheme('light')
    expect(theme).toBeDefined()
  })

  test('should get theme map', () => {
    const themeMap = Builder.getThemeMap()
    expect(themeMap).toBeDefined()
  })
})
