import { buildReportSnapshot } from './report-snapshot'

describe('buildReportSnapshot', () => {
  test('builds report snapshot from report pages and resource maps', () => {
    const snapshot = buildReportSnapshot(
      {
        uuid: 'report-1',
        version: 0,
        pages: [
          {
            id: 'page-1',
            title: 'Page 1',
            chartId: 'chart-1',
            insightId: 'insight-1',
          },
        ],
      },
      [
        {
          id: 'chart-1',
          dsl: {
            uuid: 'chart-1',
            connectorId: 'demo',
            chartType: 'table',
            measures: [],
            dimensions: [],
            whereFilter: { id: 'root', op: 'and', conditions: [] },
            havingFilter: { id: 'root', op: 'and', conditions: [] },
            theme: 'light',
            locale: 'zh-CN',
            version: 0,
          },
        },
      ],
      [
        {
          id: 'insight-1',
          dsl: { uuid: 'insight-1', content: 'hello', version: 0 },
        },
      ],
    )

    expect(snapshot).toMatchObject({
      report: { uuid: 'report-1' },
      charts: { 'chart-1': { uuid: 'chart-1' } },
      insights: { 'insight-1': { uuid: 'insight-1', content: 'hello' } },
    })
  })

  test('throws when a page references a missing chart', () => {
    expect(() =>
      buildReportSnapshot(
        {
          uuid: 'report-1',
          version: 0,
          pages: [
            {
              id: 'page-1',
              title: 'Page 1',
              chartId: 'chart-404',
              insightId: 'insight-1',
            },
          ],
        },
        [],
        [
          {
            id: 'insight-1',
            dsl: { uuid: 'insight-1', content: '', version: 0 },
          },
        ],
      ),
    ).toThrow('Missing chart resource "chart-404"')
  })
})
