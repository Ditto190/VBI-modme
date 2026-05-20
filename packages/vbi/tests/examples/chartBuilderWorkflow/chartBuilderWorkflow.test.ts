import { rs } from '@rstest/core'
import { VBI, type VBIChartBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('chart / ChartBuilderWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('regional-margin-dual-axis-governance', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [],
      measures: [],
      whereFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      havingFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
    })

    const applyBuilder = async (builder: VBIChartBuilder) => {
      expect(builder.isEmpty()).toBe(true)
      const schema = await builder.getSchema()
      expect(schema.some((field) => field.name === 'profit')).toBe(true)

      builder.theme.setTheme('dark')
      builder.locale.setLocale('en-US')
      builder.limit.setLimit(12)

      builder.dimensions.add('area', (node) => node.setAlias('Region').setEncoding('xAxis').setSort({ order: 'asc' }))
      builder.dimensions.add('product_type', (node) => node.setAlias('Trial Product Category').setEncoding('color'))

      const productTypeId = builder.dimensions.find((node) => node.getField() === 'product_type')?.getId()
      if (productTypeId) {
        builder.dimensions.remove(productTypeId)
      }

      const areaId = builder.dimensions.find((node) => node.getField() === 'area')?.getId()
      if (areaId) {
        builder.dimensions.update(areaId, (node) => node.setAlias('Region').clearSort().setSort({ order: 'desc' }))
      }

      builder.measures.add('sales', (node) =>
        node.setAlias('Sales').setEncoding('primaryYAxis').setAggregate({ func: 'sum' }),
      )
      builder.measures.add('profit', (node) =>
        node.setAlias('Profit').setEncoding('secondaryYAxis').setAggregate({ func: 'sum' }),
      )
      builder.measures.add('amount', (node) =>
        node.setAlias('Trial Quantity').setEncoding('tooltip').setAggregate({ func: 'sum' }),
      )

      const amountId = builder.measures.find((node) => node.getField() === 'amount')?.getId()
      if (amountId) {
        builder.measures.remove(amountId)
      }

      const salesId = builder.measures.find((node) => node.getField() === 'sales')?.getId()
      if (salesId) {
        builder.measures.update(salesId, (node) =>
          node.setFormat({ type: 'number', fractionDigits: 0 }).clearFormat().setSort({ order: 'desc' }),
        )
      }

      builder.chartType.changeChartType('dualAxis')
      expect(builder.chartType.getSupportedMeasureEncodings()).toContain('secondaryYAxis')
      expect(builder.chartType.getRecommendedMeasureEncodings(2)).toEqual(['primaryYAxis', 'secondaryYAxis'])
      expect(builder.limit.getLimit()).toBe(12)
      expect(builder.theme.getTheme()).toBe('dark')
      expect(builder.locale.getLocale()).toBe('en-US')
      expect(builder.isEmpty()).toBe(false)

      const beforeSync = builder.build()
      builder.applyUpdate(builder.encodeStateAsUpdate(), 'regional-review-sync')
      expect(builder.build()).toEqual(beforeSync)
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "dualAxis",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "Region",
            "encoding": "xAxis",
            "field": "area",
            "id": "id-1",
            "sort": {
              "order": "desc",
            },
          },
        ],
        "havingFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
        "limit": 12,
        "locale": "en-US",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "Sales",
            "encoding": "primaryYAxis",
            "field": "sales",
            "id": "id-3",
            "sort": {
              "order": "desc",
            },
          },
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "Profit",
            "encoding": "secondaryYAxis",
            "field": "profit",
            "id": "id-4",
          },
        ],
        "theme": "dark",
        "uuid": "uuid-1",
        "version": 1,
        "whereFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
      }
    `)

    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "area",
        ],
        "limit": 12,
        "orderBy": [
          {
            "field": "id-1",
            "order": "desc",
          },
          {
            "field": "id-3",
            "order": "desc",
          },
        ],
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-3",
            "field": "sales",
          },
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-4",
            "field": "profit",
          },
          {
            "alias": "id-1",
            "field": "area",
          },
        ],
      }
    `)

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "dualAxis",
        "dataset": [
          {
            "id-1": "西南",
            "id-3": 1303124.508000002,
            "id-4": 97636.72800000008,
          },
          {
            "id-1": "西北",
            "id-3": 815039.5959999998,
            "id-4": 98553.47600000004,
          },
          {
            "id-1": "华北",
            "id-3": 2447301.017000004,
            "id-4": 431053.2169999998,
          },
          {
            "id-1": "华东",
            "id-3": 4684506.442,
            "id-4": 607218.6819999996,
          },
          {
            "id-1": "中南",
            "id-3": 4137415.0929999948,
            "id-4": 670885.313,
          },
          {
            "id-1": "东北",
            "id-3": 2681567.469000001,
            "id-4": 242191.50899999973,
          },
        ],
        "dimensions": [
          {
            "alias": "Region",
            "encoding": "xAxis",
            "id": "id-1",
          },
        ],
        "locale": "en-US",
        "measures": [
          {
            "alias": "Sales",
            "encoding": "primaryYAxis",
            "id": "id-3",
          },
          {
            "alias": "Profit",
            "encoding": "secondaryYAxis",
            "id": "id-4",
          },
        ],
        "theme": "dark",
      }
    `)
  })

  it('customer-discount-profit-scatter', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'column',
      dimensions: [
        {
          field: 'customer_type',
          alias: '原客户类型',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '原销售额',
          encoding: 'yAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      havingFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 30,
    })

    const applyBuilder = (builder: VBIChartBuilder) => {
      builder.chartType.changeChartType('scatter')
      expect(builder.chartType.getSupportedDimensionEncodings()).toContain('color')
      expect(builder.chartType.getSupportedMeasureEncodings()).toContain('size')

      const customerTypeId = builder.dimensions.find((node) => node.getField() === 'customer_type')?.getId()
      if (customerTypeId) {
        builder.dimensions.update(customerTypeId, (node) => node.setAlias('Customer Segment').setEncoding('color'))
      }

      builder.dimensions.add('area', (node) => node.setAlias('Trial Area').setEncoding('detail'))
      const areaId = builder.dimensions.find((node) => node.getField() === 'area')?.getId()
      if (areaId) {
        builder.dimensions.remove(areaId)
      }

      const salesId = builder.measures.find((node) => node.getField() === 'sales')?.getId()
      if (salesId) {
        builder.measures.update(salesId, (node) =>
          node.setAlias('Sales Scale').setEncoding('size').setAggregate({ func: 'sum' }).setSort({ order: 'desc' }),
        )
      }

      builder.measures.add('discount', (node) =>
        node.setAlias('Average Discount').setEncoding('xAxis').setAggregate({ func: 'avg' }),
      )
      builder.measures.add('profit', (node) =>
        node.setAlias('Profit').setEncoding('yAxis').setAggregate({ func: 'sum' }),
      )

      const discountId = builder.measures.find((node) => node.getField() === 'discount')?.getId()
      if (discountId) {
        builder.measures.update(discountId, (node) => node.setFormat({ type: 'percent', fractionDigits: 1 }))
      }

      builder.limit.setLimit(18)
      expect(builder.measures.findAll().map((node) => node.getEncoding())).toContain('size')
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "scatter",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "Customer Segment",
            "encoding": "color",
            "field": "customer_type",
            "id": "id-2",
          },
        ],
        "havingFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
        "limit": 18,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "Sales Scale",
            "encoding": "size",
            "field": "sales",
            "id": "id-1",
            "sort": {
              "order": "desc",
            },
          },
          {
            "aggregate": {
              "func": "avg",
            },
            "alias": "Average Discount",
            "encoding": "xAxis",
            "field": "discount",
            "format": {
              "fractionDigits": 1,
              "type": "percent",
            },
            "id": "id-4",
          },
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "Profit",
            "encoding": "yAxis",
            "field": "profit",
            "id": "id-5",
          },
        ],
        "theme": "light",
        "uuid": "uuid-1",
        "version": 1,
        "whereFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
      }
    `)

    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "customer_type",
        ],
        "limit": 18,
        "orderBy": [
          {
            "field": "id-1",
            "order": "desc",
          },
        ],
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-1",
            "field": "sales",
          },
          {
            "aggr": {
              "func": "avg",
            },
            "alias": "id-4",
            "field": "discount",
          },
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-5",
            "field": "profit",
          },
          {
            "alias": "id-2",
            "field": "customer_type",
          },
        ],
      }
    `)

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "scatter",
        "dataset": [
          {
            "id-1": 8025072.187999996,
            "id-2": "消费者",
            "id-4": 0.10752403374533841,
            "id-5": 1053092.6280000014,
          },
          {
            "id-1": 5152793.296000013,
            "id-2": "公司",
            "id-4": 0.10954692556634248,
            "id-5": 681967.635999999,
          },
          {
            "id-1": 2891088.6410000017,
            "id-2": "小型企业",
            "id-4": 0.09771444695259639,
            "id-5": 412478.66099999944,
          },
        ],
        "dimensions": [
          {
            "alias": "Customer Segment",
            "encoding": "color",
            "id": "id-2",
          },
        ],
        "locale": "zh-CN",
        "measures": [
          {
            "alias": "Sales Scale",
            "encoding": "size",
            "id": "id-1",
          },
          {
            "alias": "Average Discount",
            "autoFormat": false,
            "encoding": "xAxis",
            "id": "id-4",
            "numFormat": {
              "fractionDigits": 1,
              "type": "percent",
            },
          },
          {
            "alias": "Profit",
            "encoding": "yAxis",
            "id": "id-5",
          },
        ],
        "theme": "light",
      }
    `)
  })

  it('weekly-fulfillment-pivot-table', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [],
      measures: [],
      whereFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      havingFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 25,
    })

    const applyBuilder = (builder: VBIChartBuilder) => {
      builder.chartType.changeChartType('pivotTable')
      expect(builder.chartType.getRecommendedDimensionEncodings(2)).toEqual(['column', 'row'])

      builder.dimensions.add('order_date', (node) =>
        node.setAlias('Order Month').setEncoding('column').setAggregate({ func: 'toWeek' }).setSort({ order: 'asc' }),
      )
      builder.dimensions.add('delivery_method', (node) => node.setAlias('Delivery Method').setEncoding('row'))

      const orderDateId = builder.dimensions.find((node) => node.getField() === 'order_date')?.getId()
      if (orderDateId) {
        builder.dimensions.update(orderDateId, (node) =>
          node.setAggregate({ func: 'toMonth' }).clearSort().setSort({ order: 'asc' }),
        )
      }

      builder.measures.add('amount', (node) =>
        node.setAlias('Order Quantity').setEncoding('detail').setAggregate({ func: 'sum' }),
      )
      builder.measures.add('sales', (node) =>
        node.setAlias('Sales').setEncoding('detail').setAggregate({ func: 'sum' }),
      )
      builder.measures.add('profit', (node) =>
        node.setAlias('Trial Profit').setEncoding('detail').setAggregate({ func: 'sum' }),
      )

      const profitId = builder.measures.find((node) => node.getField() === 'profit')?.getId()
      if (profitId) {
        builder.measures.remove(profitId)
      }

      const amountId = builder.measures.find((node) => node.getField() === 'amount')?.getId()
      if (amountId) {
        builder.measures.update(amountId, (node) => node.setSort({ order: 'desc' }).clearSort())
      }

      builder.theme.setTheme('light')
      builder.locale.setLocale('zh-CN')
      builder.limit.setLimit(20)
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "pivotTable",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "aggregate": {
              "func": "toMonth",
            },
            "alias": "Order Month",
            "encoding": "column",
            "field": "order_date",
            "id": "id-1",
            "sort": {
              "order": "asc",
            },
          },
          {
            "alias": "Delivery Method",
            "encoding": "row",
            "field": "delivery_method",
            "id": "id-2",
          },
        ],
        "havingFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
        "limit": 20,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "Order Quantity",
            "encoding": "detail",
            "field": "amount",
            "id": "id-3",
          },
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "Sales",
            "encoding": "detail",
            "field": "sales",
            "id": "id-4",
          },
        ],
        "theme": "light",
        "uuid": "uuid-1",
        "version": 1,
        "whereFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
      }
    `)

    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "id-1",
          "delivery_method",
        ],
        "limit": 20,
        "orderBy": [
          {
            "field": "id-1",
            "order": "asc",
          },
        ],
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-3",
            "field": "amount",
          },
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-4",
            "field": "sales",
          },
          {
            "aggr": {
              "func": "to_month",
            },
            "alias": "id-1",
            "field": "order_date",
          },
          {
            "alias": "id-2",
            "field": "delivery_method",
          },
        ],
      }
    `)

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "pivotTable",
        "dataset": [
          {
            "id-1": "2016-01",
            "id-2": "标准级",
            "id-3": 201,
            "id-4": 92754.45200000002,
          },
          {
            "id-1": "2016-01",
            "id-2": "当日",
            "id-3": 18,
            "id-4": 5445.16,
          },
          {
            "id-1": "2016-01",
            "id-2": "二级",
            "id-3": 167,
            "id-4": 102963.99399999999,
          },
          {
            "id-1": "2016-01",
            "id-2": "一级",
            "id-3": 104,
            "id-4": 30434.012,
          },
          {
            "id-1": "2016-02",
            "id-2": "二级",
            "id-3": 87,
            "id-4": 27447.86799999999,
          },
          {
            "id-1": "2016-02",
            "id-2": "标准级",
            "id-3": 167,
            "id-4": 66251.06599999999,
          },
          {
            "id-1": "2016-02",
            "id-2": "一级",
            "id-3": 50,
            "id-4": 10501.176,
          },
          {
            "id-1": "2016-02",
            "id-2": "当日",
            "id-3": 3,
            "id-4": 736.26,
          },
          {
            "id-1": "2016-03",
            "id-2": "当日",
            "id-3": 27,
            "id-4": 10017.812000000002,
          },
          {
            "id-1": "2016-03",
            "id-2": "标准级",
            "id-3": 197,
            "id-4": 121734.03900000003,
          },
          {
            "id-1": "2016-03",
            "id-2": "一级",
            "id-3": 27,
            "id-4": 6254.248,
          },
          {
            "id-1": "2016-03",
            "id-2": "二级",
            "id-3": 47,
            "id-4": 29167.628000000004,
          },
          {
            "id-1": "2016-04",
            "id-2": "二级",
            "id-3": 70,
            "id-4": 18848.284,
          },
          {
            "id-1": "2016-04",
            "id-2": "一级",
            "id-3": 31,
            "id-4": 6589.8,
          },
          {
            "id-1": "2016-04",
            "id-2": "标准级",
            "id-3": 198,
            "id-4": 69762.58799999999,
          },
          {
            "id-1": "2016-04",
            "id-2": "当日",
            "id-3": 6,
            "id-4": 852.18,
          },
          {
            "id-1": "2016-05",
            "id-2": "标准级",
            "id-3": 315,
            "id-4": 117742.34500000007,
          },
          {
            "id-1": "2016-05",
            "id-2": "一级",
            "id-3": 31,
            "id-4": 25164.608,
          },
          {
            "id-1": "2016-05",
            "id-2": "当日",
            "id-3": 39,
            "id-4": 12595.268,
          },
          {
            "id-1": "2016-05",
            "id-2": "二级",
            "id-3": 139,
            "id-4": 76696.886,
          },
        ],
        "dimensions": [
          {
            "alias": "Order Month",
            "encoding": "column",
            "id": "id-1",
          },
          {
            "alias": "Delivery Method",
            "encoding": "row",
            "id": "id-2",
          },
        ],
        "locale": "zh-CN",
        "measures": [
          {
            "alias": "Order Quantity",
            "encoding": "detail",
            "id": "id-3",
          },
          {
            "alias": "Sales",
            "encoding": "detail",
            "id": "id-4",
          },
        ],
        "theme": "light",
      }
    `)
  })
})
