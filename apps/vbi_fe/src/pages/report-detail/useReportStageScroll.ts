import { useCallback, useEffect, useRef } from 'react'
import { useReportDetailStore } from '../../stores/report-detail.store'

type ReportViewMode = 'horizontal' | 'vertical'

type Params = {
  activePageId: string
  pageIds: string[]
  setScrolledPage(pageId: string): void
  viewMode: ReportViewMode
}

export const useReportStageScroll = ({ activePageId, pageIds, setScrolledPage, viewMode }: Params) => {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const pageNodes = useRef<Map<string, HTMLDivElement | null>>(new Map())
  const scrolledPageRef = useRef('')
  const scrollSyncTimerRef = useRef<number | null>(null)

  const setPageNode = useCallback((pageId: string) => {
    return (node: HTMLDivElement | null) => {
      if (!node) {
        pageNodes.current.delete(pageId)
        return
      }
      pageNodes.current.set(pageId, node)
    }
  }, [])

  useEffect(() => {
    if (!activePageId) return
    if (activePageId === scrolledPageRef.current) {
      scrolledPageRef.current = ''
      return
    }
    pageNodes.current.get(activePageId)?.scrollIntoView({
      block: viewMode === 'vertical' ? 'start' : 'nearest',
      inline: viewMode === 'horizontal' ? 'start' : 'nearest',
    })
  }, [activePageId, viewMode])

  useEffect(() => {
    const container = stageRef.current
    if (!container || !pageIds.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: (entry.target as HTMLElement).dataset.reportPageId ?? '',
            ratio: entry.intersectionRatio,
            top: Math.abs((entry.intersectionRect.top || 0) - (entry.rootBounds?.top ?? 0)),
          }))
          .filter(({ id }) => id)
          .sort((a, b) => b.ratio - a.ratio || a.top - b.top)
        const nextPageId = visible[0]?.id

        if (!nextPageId || nextPageId === activePageId) return
        if (scrollSyncTimerRef.current) {
          window.clearTimeout(scrollSyncTimerRef.current)
        }
        scrollSyncTimerRef.current = window.setTimeout(() => {
          scrollSyncTimerRef.current = null
          if (nextPageId === useReportDetailStore.getState().activePageId) {
            return
          }
          scrolledPageRef.current = nextPageId
          setScrolledPage(nextPageId)
        }, 140)
      },
      {
        root: container,
        threshold: 0.62,
      },
    )

    pageNodes.current.forEach((node) => {
      if (node) observer.observe(node)
    })

    return () => {
      observer.disconnect()
      if (scrollSyncTimerRef.current) {
        window.clearTimeout(scrollSyncTimerRef.current)
        scrollSyncTimerRef.current = null
      }
    }
  }, [activePageId, pageIds, setScrolledPage])

  return { setPageNode, stageRef }
}
