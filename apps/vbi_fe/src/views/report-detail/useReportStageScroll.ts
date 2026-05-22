import { useCallback, useEffect, useRef } from 'react'
import { useReportDetailStore } from '../../stores/report-detail.store'

type Params = {
  activePageId: string
  pageIds: string[]
  setScrolledPage(pageId: string): void
}

const resolveVisiblePageId = (container: HTMLDivElement, pageNodes: Map<string, HTMLDivElement | null>) => {
  const containerRect = container.getBoundingClientRect()
  const anchorY = containerRect.top + Math.min(containerRect.height * 0.36, 220)
  let nearestPageId = ''
  let nearestDistance = Number.POSITIVE_INFINITY

  pageNodes.forEach((node, pageId) => {
    if (!node) return
    const pageRect = node.getBoundingClientRect()
    const containsAnchor = pageRect.top <= anchorY && pageRect.bottom >= anchorY

    if (containsAnchor) {
      nearestPageId = pageId
      nearestDistance = 0
      return
    }

    const distance = Math.min(Math.abs(pageRect.top - anchorY), Math.abs(pageRect.bottom - anchorY))
    if (distance < nearestDistance) {
      nearestPageId = pageId
      nearestDistance = distance
    }
  })

  return nearestPageId
}

export const useReportStageScroll = ({ activePageId, pageIds, setScrolledPage }: Params) => {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const pageNodes = useRef<Map<string, HTMLDivElement | null>>(new Map())
  const scrolledPageRef = useRef('')
  const scrollFrameRef = useRef<number | null>(null)

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
      block: 'start',
      inline: 'nearest',
    })
  }, [activePageId])

  useEffect(() => {
    const container = stageRef.current
    if (!container || !pageIds.length) return

    const updateScrolledPage = () => {
      scrollFrameRef.current = null
      const nextPageId = resolveVisiblePageId(container, pageNodes.current)
      if (!nextPageId || nextPageId === useReportDetailStore.getState().activePageId) return
      scrolledPageRef.current = nextPageId
      setScrolledPage(nextPageId)
    }

    const scheduleScrolledPageUpdate = () => {
      if (scrollFrameRef.current !== null) return
      scrollFrameRef.current = window.requestAnimationFrame(updateScrolledPage)
    }

    scheduleScrolledPageUpdate()
    container.addEventListener('scroll', scheduleScrolledPageUpdate, { passive: true })
    window.addEventListener('resize', scheduleScrolledPageUpdate)

    return () => {
      container.removeEventListener('scroll', scheduleScrolledPageUpdate)
      window.removeEventListener('resize', scheduleScrolledPageUpdate)
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
        scrollFrameRef.current = null
      }
    }
  }, [activePageId, pageIds, setScrolledPage])

  return { setPageNode, stageRef }
}
