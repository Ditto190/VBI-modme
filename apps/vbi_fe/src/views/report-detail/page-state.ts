import type { ReportPage } from '../../types'

export const resolveActivePageId = (pages: ReportPage[], activePageId: string) => {
  if (pages.some((page) => page.id === activePageId)) {
    return activePageId
  }

  return pages[0]?.id ?? ''
}
