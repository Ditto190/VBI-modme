import { createRef } from 'react'
import { expect, rs, test } from '@rstest/core'
import { render, screen } from '@testing-library/react'

rs.mock('../src/pages/report-detail/ReportChartPanel', () => ({
  ReportChartPanel: () => <div className='report-detail-slide-chart' />,
}))

rs.mock('../src/pages/report-detail/ReportInsightPanel', () => ({
  ReportInsightPanel: () => <div className='report-detail-slide-note' />,
}))

const { ReportStage } = await import('../src/pages/report-detail/ReportStage')

const noop = () => {}

const emptyPage = {
  chartBuilder: null,
  hasChart: false,
  hasInsight: false,
  insightBuilder: null,
  page: {
    id: 'page-1',
    title: 'Page 1',
    chartId: '',
    insightId: '',
  },
}

const bothPage = {
  ...emptyPage,
  hasChart: true,
  hasInsight: true,
  page: {
    ...emptyPage.page,
    chartId: 'chart-1',
    insightId: 'insight-1',
  },
}

const secondPage = {
  ...bothPage,
  page: {
    ...bothPage.page,
    id: 'page-2',
    title: 'Page 2',
  },
}

test('report stage renders empty when page has no resources', () => {
  render(
    <ReportStage
      activePageId='page-1'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[]}
      stageRef={createRef()}
      viewMode='vertical'
    />,
  )

  expect(screen.getByText('当前页面暂无图表和洞察')).toBeInTheDocument()
})

test('report stage places insight before chart when both resources exist', () => {
  const { container } = render(
    <ReportStage
      activePageId='page-1'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[bothPage]}
      stageRef={createRef()}
      viewMode='vertical'
    />,
  )
  const sections = [
    ...container.querySelectorAll(
      '.report-detail-vertical-slide .report-detail-slide-note, .report-detail-vertical-slide .report-detail-slide-chart',
    ),
  ].map((node) => node.className)

  expect(sections).toEqual(['report-detail-slide-note', 'report-detail-slide-chart'])
})

test('report stage renders page title dividers after each page', () => {
  const { container } = render(
    <ReportStage
      activePageId='page-1'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[bothPage, secondPage]}
      stageRef={createRef()}
      viewMode='vertical'
    />,
  )
  const dividers = container.querySelectorAll('.report-detail-page-divider')

  expect(dividers).toHaveLength(2)
  expect(dividers[0].textContent).toBe('01Page 1')
  expect(dividers[1].textContent).toBe('02Page 2')
})

test('report stage renders insight-only pages without chart panel', () => {
  const { container } = render(
    <ReportStage
      activePageId='page-1'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[
        {
          ...emptyPage,
          hasInsight: true,
          page: {
            ...emptyPage.page,
            insightId: 'insight-1',
          },
        },
      ]}
      stageRef={createRef()}
      viewMode='vertical'
    />,
  )

  expect(container.querySelector('.report-detail-slide-note')).toBeTruthy()
  expect(container.querySelector('.report-detail-slide-chart')).toBeNull()
  expect(container.querySelector('.report-detail-vertical-stage')).toBeTruthy()
  expect(container.querySelector('.report-detail-horizontal-stage')).toBeNull()
})

test('report stage uses the horizontal renderer in horizontal mode', () => {
  const { container } = render(
    <ReportStage
      activePageId='page-1'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[bothPage]}
      stageRef={createRef()}
      viewMode='horizontal'
    />,
  )
  const sections = [
    ...container.querySelectorAll(
      '.report-detail-horizontal-slide .report-detail-slide-note, .report-detail-horizontal-slide .report-detail-slide-chart',
    ),
  ].map((node) => node.className)

  expect(container.querySelector('.report-detail-horizontal-stage')).toBeTruthy()
  expect(container.querySelector('.report-detail-vertical-stage')).toBeNull()
  expect(sections).toEqual(['report-detail-slide-note', 'report-detail-slide-chart'])
})
