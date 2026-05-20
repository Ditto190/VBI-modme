import { rs } from '@rstest/core'
import { createVBI, type VBIReportBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('report / ReportWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('board-report-resource-lifecycle', async () => {
    const LocalVBI = createVBI()
    const resources = {
      charts: {
        salesChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'column',
          dimensions: [
            {
              field: 'area',
              alias: '区域',
            },
          ],
          measures: [
            {
              field: 'sales',
              alias: '销售额',
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
        }),
      },
      insights: {
        salesInsight: LocalVBI.insight.create({
          content: '华东区域销售额高，但利润率仍需结合折扣策略复盘。',
          version: 0,
        }),
      },
    }
    const builder = LocalVBI.report.create({
      pages: [],
      version: 0,
    })

    const applyBuilder = (builder: VBIReportBuilder, resources: any) => {
      if (!builder.isEmpty()) {
        throw new Error('new report should start without pages')
      }

      const RegistryVBI = createVBI()
      const registeredChart = RegistryVBI.chart.create({
        connectorId: 'demoSupermarket',
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
      })
      const registeredInsight = RegistryVBI.insight.create({ content: '资源池中的经营备注', version: 0 })
      if (!RegistryVBI.resources.chart.has(registeredChart.getUUID())) {
        throw new Error('created chart builder should register as a resource')
      }
      if (!RegistryVBI.resources.insight.has(registeredInsight.getUUID())) {
        throw new Error('created insight builder should register as a resource')
      }
      if (!RegistryVBI.resources.chart.get(registeredChart.getUUID())) {
        throw new Error('resource namespace should build registered chart')
      }
      if (RegistryVBI.resources.chart.list().length !== 1 || RegistryVBI.resources.insight.list().length !== 1) {
        throw new Error('resource namespace should list registered resources')
      }
      const resourceSnapshot = RegistryVBI.resources.snapshot()
      if (
        !resourceSnapshot.charts[registeredChart.getUUID()] ||
        !resourceSnapshot.insights[registeredInsight.getUUID()]
      ) {
        throw new Error('resource snapshot should include both resource types')
      }

      RegistryVBI.resources.chart.unregister(registeredChart.getUUID())
      RegistryVBI.resources.insight.unregister(registeredInsight.getUUID())
      RegistryVBI.resources.register({
        charts: [registeredChart.build()],
        insights: [registeredInsight.build()],
      })
      if (
        !RegistryVBI.resources.chart.has(registeredChart.getUUID()) ||
        !RegistryVBI.resources.insight.has(registeredInsight.getUUID())
      ) {
        throw new Error('bulk resource registration should restore DSL resources')
      }

      let missingChartUuidRejected = false
      try {
        RegistryVBI.resources.chart.register({ ...registeredChart.build(), uuid: '' })
      } catch {
        missingChartUuidRejected = true
      }
      let missingInsightUuidRejected = false
      try {
        RegistryVBI.resources.insight.register({ ...registeredInsight.build(), uuid: '' })
      } catch {
        missingInsightUuidRejected = true
      }
      if (!missingChartUuidRejected || !missingInsightUuidRejected) {
        throw new Error('resource registration should require uuid')
      }
      RegistryVBI.resources.clear()
      if (
        RegistryVBI.resources.chart.has(registeredChart.getUUID()) ||
        RegistryVBI.resources.insight.has(registeredInsight.getUUID())
      ) {
        throw new Error('resource clear should remove all resources')
      }

      const emptyReport = RegistryVBI.report.createEmpty('empty-report-resource')
      const emptyPage = RegistryVBI.report.createEmptyPage('appendix-page')
      const emptyDashboard = RegistryVBI.dashboard.createEmpty('empty-dashboard-resource')
      const emptyInsight = RegistryVBI.insight.createEmpty('empty-insight-resource')
      const emptyChart = RegistryVBI.chart.createEmpty('demoSupermarket', 'empty-chart-resource')
      if (emptyReport.uuid !== 'empty-report-resource' || emptyPage.id !== 'appendix-page') {
        throw new Error('report empty factories should honor explicit ids')
      }
      if (
        emptyDashboard.uuid !== 'empty-dashboard-resource' ||
        emptyInsight.uuid !== 'empty-insight-resource' ||
        emptyChart.uuid !== 'empty-chart-resource'
      ) {
        throw new Error('empty factories should honor explicit resource ids')
      }

      builder.page
        .add('销售摘要', (page) => {
          page.setChartId(resources.charts.salesChart).setInsightId(resources.insights.salesInsight)
          if (!page.chart || !page.insight) {
            throw new Error('report page should resolve referenced resources')
          }
        })
        .page.add('行动计划')

      const pages = builder.build().pages
      const summaryPageId = pages[0]?.id
      const actionPageId = pages[1]?.id
      if (!summaryPageId || !actionPageId) {
        throw new Error('report should create summary and action pages')
      }

      builder.page.update(summaryPageId, (page) => {
        page.setTitle('销售与利润摘要')
        if (page.toJSON().title !== '销售与利润摘要') {
          throw new Error('report page title should update')
        }
      })
      if (!builder.page.get(summaryPageId) || builder.page.get('missing-page') !== undefined) {
        throw new Error('report page lookup should distinguish present and missing pages')
      }

      let missingPageRejected = false
      try {
        builder.page.update('missing-page', (page) => page.setTitle('missing'))
      } catch {
        missingPageRejected = true
      }
      if (!missingPageRejected) {
        throw new Error('updating a missing report page should fail')
      }

      builder.page.remove(actionPageId)
      builder.page.remove('missing-page')
      if (builder.build().pages.length !== 1) {
        throw new Error('draft action page should be removed')
      }

      const reportSnapshot = builder.snapshot()
      if (!reportSnapshot.charts[resources.charts.salesChart.getUUID()]) {
        throw new Error('report snapshot should include referenced chart resource')
      }

      const ReplicaVBI = createVBI()
      const replica = ReplicaVBI.report.create({ pages: [], version: 0 })
      replica.applyUpdate(builder.encodeStateAsUpdate(), 'report-sync')
      replica.build()
    }
    await applyBuilder(builder, resources)

    const reportDSL = builder.build()
    expect(reportDSL).toMatchInlineSnapshot(`
      {
        "pages": [
          {
            "chartId": "uuid-1",
            "id": "id-3",
            "insightId": "uuid-2",
            "title": "销售与利润摘要",
          },
        ],
        "uuid": "uuid-3",
        "version": 0,
      }
    `)

    const snapshotDSL = builder.snapshot()
    expect(snapshotDSL).toMatchInlineSnapshot(`
      {
        "charts": {
          "uuid-1": {
            "chartType": "column",
            "connectorId": "demoSupermarket",
            "dimensions": [
              {
                "alias": "区域",
                "field": "area",
                "id": "id-2",
              },
            ],
            "havingFilter": {
              "conditions": [],
              "id": "root",
              "op": "and",
            },
            "locale": "zh-CN",
            "measures": [
              {
                "aggregate": {
                  "func": "sum",
                },
                "alias": "销售额",
                "encoding": "yAxis",
                "field": "sales",
                "id": "id-1",
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
          },
        },
        "insights": {
          "uuid-2": {
            "content": "华东区域销售额高，但利润率仍需结合折扣策略复盘。",
            "uuid": "uuid-2",
            "version": 0,
          },
        },
        "report": {
          "pages": [
            {
              "chartId": "uuid-1",
              "id": "id-3",
              "insightId": "uuid-2",
              "title": "销售与利润摘要",
            },
          ],
          "uuid": "uuid-3",
          "version": 0,
        },
      }
    `)
  })

  it('executive-report-page-lifecycle', async () => {
    const LocalVBI = createVBI()
    const resources = {
      charts: {
        regionalSalesChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'column',
          dimensions: [
            {
              field: 'region',
              alias: '区域',
            },
          ],
          measures: [
            {
              field: 'sales',
              alias: '销售额',
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
        }),
        customerSegmentChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'donut',
          dimensions: [
            {
              field: 'segment',
              alias: '客户分层',
            },
          ],
          measures: [
            {
              field: 'profit',
              alias: '利润',
              encoding: 'angle',
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
        }),
      },
      insights: {
        regionalInsight: LocalVBI.insight.create({
          content: '华东与华南继续贡献主要销售额，北区需要结合客户分层拆解增长来源。',
          version: 0,
        }),
        segmentInsight: LocalVBI.insight.create({
          content: '企业客户贡献利润更稳定，消费者客户受促销波动影响更明显。',
          version: 0,
        }),
      },
    }
    const builder = LocalVBI.report.create({
      pages: [],
      version: 0,
    })

    const applyBuilder = (builder: VBIReportBuilder, resources: any) => {
      expect(builder.isEmpty()).toBe(true)

      builder.page.add('区域销售总览', (page) => {
        page.setChartId(resources.charts.regionalSalesChart)
        page.setInsightId(resources.insights.regionalInsight)
      })
      builder.page.add('客户分层利润', (page) => {
        page.setChartId(resources.charts.customerSegmentChart)
        page.setInsightId(resources.insights.segmentInsight)
      })
      builder.page.add('临时附录', (page) => {
        page.setChartId(resources.charts.regionalSalesChart.getUUID())
      })

      const reportDraft = builder.build()
      const [overviewPage, segmentPage, appendixPage] = reportDraft.pages
      expect(builder.page.get(overviewPage.id)?.chart?.build().chartType).toBe('column')
      expect(builder.page.get(segmentPage.id)?.insight?.build().content).toContain('企业客户')

      builder.page.update(segmentPage.id, (page) => {
        page.setTitle('客户分层利润复盘')
        page.setChartId(resources.charts.customerSegmentChart.getUUID())
        page.setInsightId(resources.insights.segmentInsight.getUUID())
      })
      builder.page.remove(appendixPage.id)
      expect(builder.page.get(appendixPage.id)).toBeUndefined()
      expect(builder.isEmpty()).toBe(false)
    }
    await applyBuilder(builder, resources)

    const reportDSL = builder.build()
    expect(reportDSL).toMatchInlineSnapshot(`
      {
        "pages": [
          {
            "chartId": "uuid-1",
            "id": "id-5",
            "insightId": "uuid-3",
            "title": "区域销售总览",
          },
          {
            "chartId": "uuid-2",
            "id": "id-6",
            "insightId": "uuid-4",
            "title": "客户分层利润复盘",
          },
        ],
        "uuid": "uuid-5",
        "version": 0,
      }
    `)

    const snapshotDSL = builder.snapshot()
    expect(snapshotDSL).toMatchInlineSnapshot(`
      {
        "charts": {
          "uuid-1": {
            "chartType": "column",
            "connectorId": "demoSupermarket",
            "dimensions": [
              {
                "alias": "区域",
                "field": "region",
                "id": "id-2",
              },
            ],
            "havingFilter": {
              "conditions": [],
              "id": "root",
              "op": "and",
            },
            "locale": "zh-CN",
            "measures": [
              {
                "aggregate": {
                  "func": "sum",
                },
                "alias": "销售额",
                "encoding": "yAxis",
                "field": "sales",
                "id": "id-1",
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
          },
          "uuid-2": {
            "chartType": "donut",
            "connectorId": "demoSupermarket",
            "dimensions": [
              {
                "alias": "客户分层",
                "field": "segment",
                "id": "id-4",
              },
            ],
            "havingFilter": {
              "conditions": [],
              "id": "root",
              "op": "and",
            },
            "locale": "zh-CN",
            "measures": [
              {
                "aggregate": {
                  "func": "sum",
                },
                "alias": "利润",
                "encoding": "angle",
                "field": "profit",
                "id": "id-3",
              },
            ],
            "theme": "light",
            "uuid": "uuid-2",
            "version": 1,
            "whereFilter": {
              "conditions": [],
              "id": "root",
              "op": "and",
            },
          },
        },
        "insights": {
          "uuid-3": {
            "content": "华东与华南继续贡献主要销售额，北区需要结合客户分层拆解增长来源。",
            "uuid": "uuid-3",
            "version": 0,
          },
          "uuid-4": {
            "content": "企业客户贡献利润更稳定，消费者客户受促销波动影响更明显。",
            "uuid": "uuid-4",
            "version": 0,
          },
        },
        "report": {
          "pages": [
            {
              "chartId": "uuid-1",
              "id": "id-5",
              "insightId": "uuid-3",
              "title": "区域销售总览",
            },
            {
              "chartId": "uuid-2",
              "id": "id-6",
              "insightId": "uuid-4",
              "title": "客户分层利润复盘",
            },
          ],
          "uuid": "uuid-5",
          "version": 0,
        },
      }
    `)
  })
})
