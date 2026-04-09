import type { VBIChartDSL } from '@visactor/vbi';

export interface ResourceItem {
  id: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChartDetail extends ResourceItem {
  dsl: VBIChartDSL;
}

export interface ReportPage {
  id: string;
  title: string;
  chartId: string;
  insightId: string;
}

export interface ReportDetail extends ResourceItem {
  pages: ReportPage[];
}

export interface InsightDetail extends ResourceItem {
  content: string;
}
