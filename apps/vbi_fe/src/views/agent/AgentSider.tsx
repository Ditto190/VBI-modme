'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { applicationShallowEqual, useApplication } from '../../application'
import { PanelRightClose, PanelRightOpen, PictureInPicture2, Pin } from '../../components/ui/icons'
import { Tooltip } from '../../components/ui/tooltip'
import { useTranslation } from '../../i18n'
import { cn } from '../../lib/utils'
import { defaultAgentPanelWidth, maxAgentPanelWidth, minAgentPanelWidth } from '../../stores/agent-panel.store'
import { AgentChatSurface } from '../AgentPage'

const collapsedAgentSiderWidth = 44
const agentSiderLabel = 'VBI Agent'
const floatingMargin = 12
const minFloatingPanelHeight = 360
const agentSiderFloatingHeight = 'min(680px, calc(100vh - 96px))'
const agentSiderActionClassName =
  'grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-vbi-text-muted transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-vbi-hover-bg hover:text-vbi-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vbi-primary/35'
const agentSiderResizeHandleClassName =
  'absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none bg-transparent outline-none'

const readViewportSize = () => ({
  height: typeof window === 'undefined' ? 0 : window.innerHeight,
  width: typeof window === 'undefined' ? 0 : window.innerWidth,
})

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const AgentSider = () => {
  const panelRef = useRef<HTMLElement | null>(null)
  const { collapsed, floatingPosition, mode, setFloatingPosition, setWidth, toggleCollapsed, toggleMode, width } =
    useApplication(
      (state) => ({
        collapsed: state.agent.panel.collapsed,
        floatingPosition: state.agent.panel.floatingPosition,
        mode: state.agent.panel.mode,
        setFloatingPosition: state.agent.panel.setFloatingPosition,
        setWidth: state.agent.panel.setWidth,
        toggleCollapsed: state.agent.panel.toggleCollapsed,
        toggleMode: state.agent.panel.toggleMode,
        width: state.agent.panel.width,
      }),
      { equality: applicationShallowEqual },
    )
  const { t } = useTranslation()
  const isFloating = mode === 'floating'
  const modeLabel = isFloating ? t('agent.fixPanel') : t('agent.floatPanel')
  const collapsedLabel = collapsed ? t('agent.expandPanel') : t('agent.collapsePanel')
  const resizeLabel = t('agent.resizePanel')
  const panelWidth = collapsed ? collapsedAgentSiderWidth : width
  const resolveFloatingBounds = useCallback(
    (nextWidth = panelWidth) => {
      const viewport = readViewportSize()
      const measuredHeight = panelRef.current?.getBoundingClientRect().height ?? 0
      const height = measuredHeight > 0 ? measuredHeight : minFloatingPanelHeight
      return {
        maxX: Math.max(floatingMargin, viewport.width - nextWidth - floatingMargin),
        maxY: Math.max(floatingMargin, viewport.height - height - floatingMargin),
      }
    },
    [panelWidth],
  )
  const clampFloatingPosition = useCallback(
    (position: { x: number; y: number }, nextWidth = panelWidth) => {
      const bounds = resolveFloatingBounds(nextWidth)
      return {
        x: Math.round(clamp(position.x, floatingMargin, bounds.maxX)),
        y: Math.round(clamp(position.y, floatingMargin, bounds.maxY)),
      }
    },
    [panelWidth, resolveFloatingBounds],
  )
  const defaultFloatingPosition = useCallback(
    (nextWidth = panelWidth) => {
      const bounds = resolveFloatingBounds(nextWidth)
      return {
        x: bounds.maxX,
        y: floatingMargin,
      }
    },
    [panelWidth, resolveFloatingBounds],
  )
  const resolvedFloatingPosition = useMemo(() => {
    if (!isFloating) return null
    return clampFloatingPosition(floatingPosition ?? defaultFloatingPosition())
  }, [clampFloatingPosition, defaultFloatingPosition, floatingPosition, isFloating])
  const panelStyle = useMemo<CSSProperties>(
    () =>
      isFloating
        ? {
            height: collapsed ? 'auto' : agentSiderFloatingHeight,
            left: resolvedFloatingPosition?.x,
            top: resolvedFloatingPosition?.y,
            width: panelWidth,
          }
        : {
            width: panelWidth,
          },
    [collapsed, isFloating, panelWidth, resolvedFloatingPosition?.x, resolvedFloatingPosition?.y],
  )

  useEffect(() => {
    if (!isFloating) return

    const nextPosition = resolvedFloatingPosition ?? defaultFloatingPosition()
    if (floatingPosition?.x === nextPosition.x && floatingPosition?.y === nextPosition.y) return
    setFloatingPosition(nextPosition)
  }, [
    defaultFloatingPosition,
    floatingPosition?.x,
    floatingPosition?.y,
    isFloating,
    resolvedFloatingPosition,
    setFloatingPosition,
  ])

  useEffect(() => {
    if (!isFloating) return undefined

    const handleResize = () => {
      setFloatingPosition(clampFloatingPosition(floatingPosition ?? defaultFloatingPosition()))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [clampFloatingPosition, defaultFloatingPosition, floatingPosition, isFloating, setFloatingPosition])

  const handleDragPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!isFloating) return
      if ((event.target as HTMLElement).closest('button')) return

      event.preventDefault()
      const startX = event.clientX
      const startY = event.clientY
      const startPosition = resolvedFloatingPosition ?? defaultFloatingPosition()
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'

      const handlePointerMove = (pointerEvent: PointerEvent) => {
        setFloatingPosition(
          clampFloatingPosition({
            x: startPosition.x + pointerEvent.clientX - startX,
            y: startPosition.y + pointerEvent.clientY - startY,
          }),
        )
      }
      const handlePointerUp = () => {
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    },
    [clampFloatingPosition, defaultFloatingPosition, isFloating, resolvedFloatingPosition, setFloatingPosition],
  )

  const handleResizePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (collapsed) return

      event.preventDefault()
      event.stopPropagation()
      const startX = event.clientX
      const startWidth = width
      const startPosition = resolvedFloatingPosition ?? defaultFloatingPosition()
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'

      const handlePointerMove = (pointerEvent: PointerEvent) => {
        const nextWidth = startWidth + startX - pointerEvent.clientX
        setWidth(nextWidth)

        if (isFloating) {
          const boundedWidth = clamp(nextWidth, minAgentPanelWidth, maxAgentPanelWidth)
          setFloatingPosition(
            clampFloatingPosition(
              {
                x: startPosition.x - (boundedWidth - startWidth),
                y: startPosition.y,
              },
              boundedWidth,
            ),
          )
        }
      }
      const handlePointerUp = () => {
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    },
    [
      clampFloatingPosition,
      collapsed,
      defaultFloatingPosition,
      isFloating,
      resolvedFloatingPosition,
      setFloatingPosition,
      setWidth,
      width,
    ],
  )
  const handleResizeDoubleClick = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (collapsed) return

      event.preventDefault()
      event.stopPropagation()
      setWidth(defaultAgentPanelWidth)

      if (isFloating) {
        const startPosition = resolvedFloatingPosition ?? defaultFloatingPosition(defaultAgentPanelWidth)
        setFloatingPosition(
          clampFloatingPosition(
            {
              x: startPosition.x - (defaultAgentPanelWidth - width),
              y: startPosition.y,
            },
            defaultAgentPanelWidth,
          ),
        )
      }
    },
    [
      clampFloatingPosition,
      collapsed,
      defaultFloatingPosition,
      isFloating,
      resolvedFloatingPosition,
      setFloatingPosition,
      setWidth,
      width,
    ],
  )

  return (
    <aside
      aria-label={agentSiderLabel}
      ref={panelRef}
      className={cn(
        'vbi-agent-sider relative flex min-h-0 shrink-0 flex-col overflow-hidden bg-[var(--vbi-bg)] text-vbi-text transition-[width,opacity,transform,border-color,background-color,box-shadow] duration-300 ease-out',
        collapsed
          ? isFloating
            ? 'fixed z-[60] rounded-lg border border-vbi-border shadow-[0_18px_48px_rgba(15,23,42,0.18)]'
            : 'sticky top-0 h-screen border-l border-vbi-border max-[720px]:fixed max-[720px]:bottom-2 max-[720px]:right-2 max-[720px]:top-2 max-[720px]:z-[60] max-[720px]:h-auto max-[720px]:rounded-lg max-[720px]:border max-[720px]:shadow-[0_18px_48px_rgba(15,23,42,0.18)]'
          : isFloating
            ? 'fixed z-[60] rounded-lg border border-vbi-border shadow-[0_18px_48px_rgba(15,23,42,0.18)]'
            : 'sticky top-0 h-screen max-w-[calc(100vw-16px)] border-l border-vbi-border max-[720px]:fixed max-[720px]:bottom-2 max-[720px]:right-2 max-[720px]:top-2 max-[720px]:z-[60] max-[720px]:h-auto max-[720px]:rounded-lg max-[720px]:border max-[720px]:shadow-[0_18px_48px_rgba(15,23,42,0.18)]',
      )}
      data-agent-panel-collapsed={collapsed}
      data-agent-panel-mode={mode}
      style={panelStyle}
    >
      {!collapsed ? (
        <div
          aria-label={resizeLabel}
          aria-orientation='vertical'
          className={agentSiderResizeHandleClassName}
          role='separator'
          tabIndex={0}
          onDoubleClick={handleResizeDoubleClick}
          onPointerDown={handleResizePointerDown}
        />
      ) : null}
      {collapsed ? (
        <div className='flex h-full min-h-0 flex-col items-center gap-2 border-b-0 bg-[var(--vbi-secondary)] px-2 py-3 transition-colors duration-300'>
          <Tooltip side='left' title={collapsedLabel}>
            <button
              aria-label={collapsedLabel}
              className={agentSiderActionClassName}
              type='button'
              onClick={toggleCollapsed}
            >
              <PanelRightOpen className='h-3.5 w-3.5' aria-hidden='true' />
            </button>
          </Tooltip>
        </div>
      ) : (
        <>
          <div
            className={cn(
              'flex h-11 shrink-0 items-center justify-between gap-3 border-b border-vbi-border bg-[var(--vbi-secondary)] px-3 transition-colors duration-300',
              isFloating && 'cursor-grab active:cursor-grabbing',
            )}
            data-testid='agent-sider-drag-handle'
            onPointerDown={handleDragPointerDown}
          >
            <div className='flex min-w-0 items-center gap-2'>
              <h2 className='m-0 min-w-0 truncate text-[13px] font-semibold text-vbi-text-strong'>{agentSiderLabel}</h2>
            </div>
            <div className='flex shrink-0 items-center gap-1'>
              <Tooltip side='left' title={modeLabel}>
                <button aria-label={modeLabel} className={agentSiderActionClassName} type='button' onClick={toggleMode}>
                  {isFloating ? (
                    <PictureInPicture2 className='h-3.5 w-3.5' aria-hidden='true' />
                  ) : (
                    <Pin className='h-3.5 w-3.5' aria-hidden='true' />
                  )}
                </button>
              </Tooltip>
              <Tooltip side='left' title={collapsedLabel}>
                <button
                  aria-label={collapsedLabel}
                  className={agentSiderActionClassName}
                  type='button'
                  onClick={toggleCollapsed}
                >
                  <PanelRightClose className='h-3.5 w-3.5' aria-hidden='true' />
                </button>
              </Tooltip>
            </div>
          </div>
          <AgentChatSurface className='h-full flex-1' />
        </>
      )}
    </aside>
  )
}
