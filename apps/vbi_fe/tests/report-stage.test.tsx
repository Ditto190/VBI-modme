import { createRef } from 'react'
import { expect, rs, test } from '@rstest/core'
import { render, screen, waitFor } from '@testing-library/react'

rs.mock('../src/views/report-detail/ReportChartPanel', () => ({
  ReportChartPanel: () => <div data-report-panel='chart' />,
}))

rs.mock('../src/views/report-detail/ReportInsightPanel', () => ({
  ReportInsightPanel: () => <div data-report-panel='insight' />,
}))

const { ReportStage } = await import('../src/views/report-detail/ReportStage')

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
    />,
  )

  expect(screen.getByText(/This page has no chart or insight|当前页面暂无图表和洞察/)).toBeInTheDocument()
})

test('report stage places insight before chart when both resources exist', async () => {
  const { container } = render(
    <ReportStage
      activePageId='page-1'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[bothPage]}
      stageRef={createRef()}
    />,
  )
  await waitFor(() => {
    const sections = [...container.querySelectorAll('[data-report-page-id="page-1"] [data-report-panel]')].map((node) =>
      node.getAttribute('data-report-panel'),
    )

    expect(sections).toEqual(['insight', 'chart'])
  })
})

test('report stage renders page title dividers between pages', () => {
  const { container } = render(
    <ReportStage
      activePageId='page-1'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[bothPage, secondPage]}
      stageRef={createRef()}
    />,
  )
  const dividers = container.querySelectorAll('[data-report-divider="page"]')

  expect(dividers).toHaveLength(1)
  expect(dividers[0].textContent).toBe('02Page 2')
})

test('report stage renders report DSL pages in order and marks the active page', () => {
  const { container } = render(
    <ReportStage
      activePageId='page-2'
      onEditChart={noop}
      onEditInsight={noop}
      onPageRef={() => () => undefined}
      pageSections={[bothPage, secondPage]}
      stageRef={createRef()}
    />,
  )
  const pageNodes = [...container.querySelectorAll<HTMLElement>('[data-report-page-id]')]

  expect(pageNodes.map((node) => node.dataset.reportPageId)).toEqual(['page-1', 'page-2'])
  expect(pageNodes[0].classList.contains('is-active')).toBe(false)
  expect(pageNodes[1].classList.contains('is-active')).toBe(true)
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
    />,
  )

  expect(container.querySelector('[data-report-panel="insight"]')).toBeTruthy()
  expect(container.querySelector('[data-report-panel="chart"]')).toBeNull()
  expect(container.querySelector('[data-report-stage="vertical"]')).toBeTruthy()
})
