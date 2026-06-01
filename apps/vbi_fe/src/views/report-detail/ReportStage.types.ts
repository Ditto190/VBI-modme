import type { RefObject } from 'react'
import type { VBIChartBuilder, VBIInsightBuilder } from '@visactor/vbi'
import type { ReportPage } from '../../types'

export type ReportStagePage = {
  chartBuilder: VBIChartBuilder | null
  hasChart: boolean
  hasInsight: boolean
  insightBuilder: VBIInsightBuilder | null
  page: ReportPage
}

export type ReportRendererProps = {
  activePageId: string
  emptyDescription: string
  onPageRef: (pageId: string) => (node: HTMLDivElement | null) => void
  pages: ReportStagePage[]
  stageRef: RefObject<HTMLDivElement | null>
}

export type ReportPageRendererProps = ReportStagePage & Omit<ReportRendererProps, 'pages' | 'stageRef'>
