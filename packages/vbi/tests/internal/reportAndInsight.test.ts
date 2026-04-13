import * as Y from 'yjs'
import { VBI } from '@visactor/vbi'
import { VBIInsightBuilder } from 'src/insight-builder'
import { VBIReportBuilder } from 'src/report-builder'
import { getResourceUUID } from 'src/vbi/resource-uuid'

describe('report and insight internals', () => {
  test('insight builder initializes defaults and tracks empty state', () => {
    const builder = new VBIInsightBuilder(new Y.Doc())
    expect(builder.isEmpty()).toBe(true)
    expect(builder.build()).toMatchObject({ content: '', version: 0 })

    builder.setContent('filled')
    expect(builder.isEmpty()).toBe(false)
  })

  test('report page collection exposes getters and missing-page errors', () => {
    const chart = VBI.chart.create(VBI.chart.createEmpty('demo'))
    const insight = VBI.insight.create(VBI.insight.createEmpty('summary'))
    const report = VBI.report.create(VBI.report.createEmpty())

    const pageId = report.page.add('Story', (page) => page.setChartId(chart).setInsightId(insight)).build().pages[0].id
    const page = report.page.get(pageId)

    expect(page?.getId()).toBe(pageId)
    expect(page?.chart?.getUUID()).toBe(chart.getUUID())
    expect(page?.insight?.getUUID()).toBe(insight.getUUID())
    expect(page?.toJSON()).toMatchObject({ title: 'Story' })
    expect(report.page.get('missing')).toBeUndefined()
    expect(() => report.page.update('missing', () => {})).toThrow('not found')
    expect(report.getChartBuilder('')).toBeUndefined()
    expect(report.getInsightBuilder('')).toBeUndefined()
  })

  test('report snapshot requires registry and validates missing insight resources', () => {
    expect(() => new VBIReportBuilder(new Y.Doc()).snapshot()).toThrow('requires a resource registry')

    const report = VBI.report.create(VBI.report.createEmpty())
    report.page.add('Broken', (page) => page.setChartId('chart-1').setInsightId('insight-404'))

    expect(() => report.snapshot()).toThrow('Missing chart resource "chart-1"')

    const local = VBI.report.create(VBI.report.createEmpty())
    const chart = VBI.chart.create(VBI.chart.createEmpty('demo'))
    local.page.add('Broken', (page) => page.setChartId(chart).setInsightId('insight-404'))
    expect(() => local.snapshot()).toThrow('Missing insight resource "insight-404"')
  })

  test('report builder preserves explicit version and resource uuid access is guarded', () => {
    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    dsl.set('version', 3)
    const builder = new VBIReportBuilder(doc)

    expect(builder.build()).toMatchObject({ version: 3 })
    expect(() => getResourceUUID(new Y.Doc().getMap('missing'))).toThrow('Resource UUID has not been initialized')
  })
})
