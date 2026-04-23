import * as Y from 'yjs'
import * as root from '@visactor/vbi'
import { id, preorderTraverse } from 'src/utils'
import {
  getOrCreateDimensions,
  locateDimensionIndexById,
  normalizeDimensionNodeIds,
} from 'src/chart-builder/features/dimensions/dimension-utils'
import {
  getOrCreateMeasures,
  locateMeasureIndexById,
  normalizeMeasureNodeIds,
} from 'src/chart-builder/features/measures/measure-utils'
import { createReportPageYMap, getOrCreateReportPages, locateReportPageIndexById } from 'src/vbi/from'

describe('utils and exports', () => {
  test('barrel exports are reachable and tree traversal is re-exported', () => {
    expect(root.VBI).toBeDefined()
    expect(root.createVBI).toBeDefined()
    expect(root.VBIChartBuilder).toBeDefined()
    const values: number[] = []
    preorderTraverse([{ value: 1, children: [{ value: 2 }] }], (node) => {
      values.push(node.value)
      return false
    })
    expect(values).toEqual([1, 2])
  })

  test('id helpers, collection helpers and report-page helpers cover fallback branches', () => {
    expect(id.resourceUUID()).toBe('uuid-1')
    expect(id.uuid()).toEqual(expect.any(String))

    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    const dimensions = getOrCreateDimensions(dsl)
    const measures = getOrCreateMeasures(dsl)
    const dimension = new Y.Map<any>()
    const measure = new Y.Map<any>()
    dimension.set('field', 'area')
    measure.set('field', 'sales')
    dimensions.push([dimension])
    measures.push([measure])
    normalizeDimensionNodeIds(dimensions)
    normalizeMeasureNodeIds(measures)
    expect(locateDimensionIndexById(dimensions, dimensions.get(0).get('id'))).toBe(0)
    expect(locateMeasureIndexById(measures, measures.get(0).get('id'))).toBe(0)

    const reportDSL = new Y.Doc().getMap('report')
    const emptyPages = getOrCreateReportPages(reportDSL)
    expect(emptyPages.length).toBe(0)
    emptyPages.push([
      createReportPageYMap({ id: 'p1', title: 'A' }),
      createReportPageYMap({ id: 'p2', title: 'Story' }),
    ])
    expect(emptyPages.get(1).toJSON().chartId).toBe('')
    expect(locateReportPageIndexById(emptyPages, 'p1')).toBe(0)
  })
})
