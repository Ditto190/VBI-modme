import {
  VBI,
  VBIChartBuilder,
  VBIInsightBuilder,
  VBIReportBuilder,
  type VBIChartDSL,
  type VBIInsightDSL,
  type VBIReportDSL,
} from '@visactor/vbi'
import * as Y from 'yjs'

const createDoc = (snapshot?: Uint8Array, updates: Uint8Array[] = []) => {
  const doc = new Y.Doc()
  if (snapshot?.length) {
    Y.applyUpdate(doc, snapshot)
  }
  for (const update of updates) {
    Y.applyUpdate(doc, update)
  }
  return doc
}

export const encodeDoc = (doc: Y.Doc) => Y.encodeStateAsUpdate(doc)
export const toPrismaBytes = (data: Uint8Array) => Uint8Array.from(data)
export const loadDoc = (snapshot?: Uint8Array, updates: Uint8Array[] = []) => createDoc(snapshot, updates)

export const createChartDoc = (id: string) => VBI.chart.create(VBI.chart.createEmpty('demo', id)).doc

export const createInsightDoc = (id: string, content = '') => {
  const builder = VBI.insight.create(VBI.insight.createEmpty(id))
  builder.setContent(content)
  return builder.doc
}

export const createReportDoc = (id: string, pages: VBIReportDSL['pages'] = []) =>
  VBI.report.create({ uuid: id, pages, version: 0 }).doc

export const buildChartDSL = (snapshot?: Uint8Array, updates: Uint8Array[] = []): VBIChartDSL =>
  new VBIChartBuilder(createDoc(snapshot, updates)).build()

export const buildInsightDSL = (snapshot?: Uint8Array, updates: Uint8Array[] = []): VBIInsightDSL =>
  new VBIInsightBuilder(createDoc(snapshot, updates)).build()

export const buildReportDSL = (snapshot?: Uint8Array, updates: Uint8Array[] = []): VBIReportDSL =>
  new VBIReportBuilder(createDoc(snapshot, updates)).build()
