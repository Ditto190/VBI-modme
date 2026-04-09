import {
  VBI,
  VBIChartBuilder,
  VBIInsightBuilder,
  VBIReportBuilder,
  type VBIChartDSL,
  type VBIInsightDSL,
  type VBIReportDSL,
} from '@visactor/vbi';
import * as Y from 'yjs';
import { DEFAULT_CONNECTOR_ID } from './resource.constants';

const createDoc = (snapshot?: Uint8Array, updates: Uint8Array[] = []) => {
  const doc = new Y.Doc();

  if (snapshot?.length) {
    Y.applyUpdate(doc, snapshot);
  }

  for (const update of updates) {
    Y.applyUpdate(doc, update);
  }

  return doc;
};

export const encodeDoc = (doc: Y.Doc) => Y.encodeStateAsUpdate(doc);

export const toPrismaBytes = (data: Uint8Array) => Uint8Array.from(data);

export const createChartDoc = (id: string) => {
  return VBI.chart.create(VBI.chart.generateEmptyDSL(DEFAULT_CONNECTOR_ID, id))
    .doc;
};

export const createInsightDoc = (id: string, content = '') => {
  const builder = VBI.insight.create(VBI.insight.generateEmptyDSL(id));
  builder.setContent(content);
  return builder.doc;
};

export const createReportDoc = (
  id: string,
  pages: VBIReportDSL['pages'] = [],
) => {
  return VBI.report.create({ uuid: id, pages, version: 0 }).doc;
};

export const buildReportDSL = (
  snapshot?: Uint8Array,
  updates: Uint8Array[] = [],
) => {
  const doc = createDoc(snapshot, updates);
  return new VBIReportBuilder(doc).build();
};

export const buildChartDSL = (
  snapshot?: Uint8Array,
  updates: Uint8Array[] = [],
): VBIChartDSL => {
  const doc = createDoc(snapshot, updates);
  return new VBIChartBuilder(doc).build();
};

export const buildInsightDSL = (
  snapshot?: Uint8Array,
  updates: Uint8Array[] = [],
): VBIInsightDSL => {
  const doc = createDoc(snapshot, updates);
  return new VBIInsightBuilder(doc).build();
};

export const loadDoc = (snapshot?: Uint8Array, updates: Uint8Array[] = []) => {
  return createDoc(snapshot, updates);
};
