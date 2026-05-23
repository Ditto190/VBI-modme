import { expect, rs, test } from '@rstest/core'
import { render, screen } from '@testing-library/react'

rs.mock('../src/views/report-detail/useInsightPreview', () => ({
  useInsightPreview: () => ({
    content: '# 核心结论\n\n- 数据表现稳定',
    loading: false,
  }),
}))

const { ReportInsightPanel } = await import('../src/views/report-detail/ReportInsightPanel')

test('report insight panel renders preview content without connected builder', () => {
  render(<ReportInsightPanel builder={null} insightId='insight-1' onEdit={() => undefined} />)

  expect(screen.getByText('核心结论')).toBeInTheDocument()
  expect(screen.getByText('数据表现稳定')).toBeInTheDocument()
  expect(screen.queryByText('页面洞察摘要')).toBeNull()
  expect(screen.queryByText('当前页面暂无洞察')).toBeNull()
})
