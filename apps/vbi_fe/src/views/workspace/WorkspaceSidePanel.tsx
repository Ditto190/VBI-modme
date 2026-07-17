'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { applicationShallowEqual, useApplication } from '../../application'
import { PanelRightClose, PanelRightOpen, PictureInPicture2, Pin } from '../../components/ui/icons'
import { Tooltip } from '../../components/ui/tooltip'
import { useResizableWidth } from '../../hooks/useResizableWidth'
import { useTranslation } from '../../i18n'
import { cn } from '../../lib/utils'
import {
  defaultWorkspaceSidePanelWidth,
  maxWorkspaceSidePanelWidth,
  minWorkspaceSidePanelWidth,
} from '../../application/layout/constants'
import type { ManageRouteRenameChrome } from './ManageRouteChrome'
import { WorkspaceSlotHeader } from './WorkspaceSlotHeader'

const collapsedSidePanelWidth = 44
const floatingMargin = 12
const minFloatingPanelHeight = 360
const sidePanelFloatingHeight = 'min(680px, calc(100vh - 96px))'
const sidePanelActionClassName =
  'grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-vbi-text-muted transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-vbi-hover-bg hover:text-vbi-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vbi-primary/35'
const sidePanelResizeHandleClassName =
  'absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none bg-transparent outline-none'

const readViewportSize = () => ({
  height: typeof window === 'undefined' ? 0 : window.innerHeight,
  width: typeof window === 'undefined' ? 0 : window.innerWidth,
})

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

type WorkspaceSidePanelProps = {
  actions?: ReactNode
  ariaLabel?: string
  backLabel?: string
  children: ReactNode
  className?: string
  contentClassName?: string
  contentKind: 'agent' | 'resource'
  rename?: ManageRouteRenameChrome
  title: string
  onBack?: () => void
}

export const WorkspaceSidePanel = ({
  actions,
  ariaLabel,
  backLabel,
  children,
  className,
  contentClassName,
  contentKind,
  onBack,
  rename,
  title,
}: WorkspaceSidePanelProps) => {
  const panelRef = useRef<HTMLElement | null>(null)
  const [floatingDragActive, setFloatingDragActive] = useState(false)
  const {
    collapsed,
    floatingPosition,
    mode,
    resetWidth,
    setFloatingPosition,
    setWidth,
    toggleCollapsed,
    toggleMode,
    width,
  } = useApplication(
    (state) => ({
      collapsed: state.layout.sidePanel.collapsed,
      floatingPosition: state.layout.sidePanel.floatingPosition,
      mode: state.layout.sidePanel.mode,
      resetWidth: state.layout.sidePanel.resetWidth,
      setFloatingPosition: state.layout.sidePanel.setFloatingPosition,
      setWidth: state.layout.sidePanel.setWidth,
      toggleCollapsed: state.layout.sidePanel.toggleCollapsed,
      toggleMode: state.layout.sidePanel.toggleMode,
      width: state.layout.sidePanel.width,
    }),
    { equality: applicationShallowEqual },
  )
  const { t } = useTranslation()
  const isFloating = mode === 'floating'
  const panelWidth = collapsed ? collapsedSidePanelWidth : width
  const resolvedAriaLabel = ariaLabel ?? title
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
            height: collapsed ? 'auto' : sidePanelFloatingHeight,
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
      setFloatingDragActive(true)
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
        setFloatingDragActive(false)
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

  const clampPanelWidth = useCallback(
    (nextWidth: number) => clamp(nextWidth, minWorkspaceSidePanelWidth, maxWorkspaceSidePanelWidth),
    [],
  )
  const handleResize = useCallback(
    (nextWidth: number) => {
      const clampedWidth = clampPanelWidth(nextWidth)
      if (isFloating) {
        const startPosition = resolvedFloatingPosition ?? defaultFloatingPosition()
        setFloatingPosition(
          clampFloatingPosition(
            {
              x: startPosition.x + (width - clampedWidth),
              y: startPosition.y,
            },
            clampedWidth,
          ),
        )
      }
      setWidth(clampedWidth)
    },
    [
      clampFloatingPosition,
      clampPanelWidth,
      defaultFloatingPosition,
      isFloating,
      resolvedFloatingPosition,
      setFloatingPosition,
      setWidth,
      width,
    ],
  )
  const handleResetWidth = useCallback(() => {
    if (isFloating) {
      const startPosition = resolvedFloatingPosition ?? defaultFloatingPosition()
      setFloatingPosition(
        clampFloatingPosition(
          {
            x: startPosition.x + (width - defaultWorkspaceSidePanelWidth),
            y: startPosition.y,
          },
          defaultWorkspaceSidePanelWidth,
        ),
      )
    }
    resetWidth()
  }, [
    clampFloatingPosition,
    defaultFloatingPosition,
    isFloating,
    resetWidth,
    resolvedFloatingPosition,
    setFloatingPosition,
    width,
  ])
  const { resizeHandleProps } = useResizableWidth({
    direction: 'left',
    disabled: collapsed,
    onResize: handleResize,
    onReset: handleResetWidth,
    width,
  })
  const handleToggleCollapsed = useCallback(() => {
    if (isFloating) {
      const startPosition = resolvedFloatingPosition ?? defaultFloatingPosition()
      const nextWidth = collapsed ? width : collapsedSidePanelWidth

      setFloatingPosition(
        clampFloatingPosition(
          {
            x: startPosition.x + (panelWidth - nextWidth),
            y: startPosition.y,
          },
          nextWidth,
        ),
      )
    }

    toggleCollapsed()
  }, [
    clampFloatingPosition,
    collapsed,
    defaultFloatingPosition,
    isFloating,
    panelWidth,
    resolvedFloatingPosition,
    setFloatingPosition,
    toggleCollapsed,
    width,
  ])
  const modeLabel = isFloating ? t('layout.dockPanel') : t('layout.floatPanel')
  const collapsedLabel = collapsed ? t('layout.expandPanel') : t('layout.collapsePanel')
  const resizeLabel = t('layout.resizePanel')
  const slotControls = (
    <>
      <Tooltip side='left' title={modeLabel}>
        <button aria-label={modeLabel} className={sidePanelActionClassName} type='button' onClick={toggleMode}>
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
          className={sidePanelActionClassName}
          type='button'
          onClick={handleToggleCollapsed}
        >
          <PanelRightClose className='h-3.5 w-3.5' aria-hidden='true' />
        </button>
      </Tooltip>
    </>
  )

  return (
    <aside
      aria-label={resolvedAriaLabel}
      ref={panelRef}
      className={cn(
        'vbi-workspace-side-panel relative flex min-h-0 shrink-0 flex-col overflow-hidden bg-[var(--vbi-bg)] text-vbi-text duration-300 ease-out',
        floatingDragActive
          ? 'transition-none'
          : 'transition-[left,top,width,opacity,transform,border-color,background-color,box-shadow]',
        collapsed
          ? isFloating
            ? 'fixed z-[60] rounded-lg border border-vbi-border shadow-[0_18px_48px_rgba(15,23,42,0.18)]'
            : 'sticky top-0 h-screen border-l border-vbi-border max-[720px]:fixed max-[720px]:bottom-2 max-[720px]:right-2 max-[720px]:top-2 max-[720px]:z-[60] max-[720px]:h-auto max-[720px]:rounded-lg max-[720px]:border max-[720px]:shadow-[0_18px_48px_rgba(15,23,42,0.18)]'
          : isFloating
            ? 'fixed z-[60] rounded-lg border border-vbi-border shadow-[0_18px_48px_rgba(15,23,42,0.18)]'
            : 'sticky top-0 h-screen max-w-[calc(100vw-16px)] border-l border-vbi-border max-[720px]:fixed max-[720px]:bottom-2 max-[720px]:right-2 max-[720px]:top-2 max-[720px]:z-[60] max-[720px]:h-auto max-[720px]:rounded-lg max-[720px]:border max-[720px]:shadow-[0_18px_48px_rgba(15,23,42,0.18)]',
        className,
      )}
      data-workspace-content={contentKind}
      data-workspace-side-panel-collapsed={collapsed}
      data-workspace-side-panel-mode={mode}
      data-workspace-slot='sidePanel'
      style={panelStyle}
    >
      {!collapsed ? (
        <div aria-label={resizeLabel} className={sidePanelResizeHandleClassName} {...resizeHandleProps} />
      ) : null}
      {collapsed ? (
        <div className='flex h-full min-h-0 flex-col items-center gap-2 border-b-0 bg-[var(--vbi-secondary)] px-2 py-3 transition-colors duration-300'>
          <Tooltip side='left' title={collapsedLabel}>
            <button
              aria-label={collapsedLabel}
              className={sidePanelActionClassName}
              type='button'
              onClick={handleToggleCollapsed}
            >
              <PanelRightOpen className='h-3.5 w-3.5' aria-hidden='true' />
            </button>
          </Tooltip>
        </div>
      ) : (
        <>
          <WorkspaceSlotHeader
            actions={actions}
            backLabel={backLabel}
            dragHandleProps={{
              className: cn(isFloating && 'cursor-grab active:cursor-grabbing'),
              'data-testid': 'workspace-side-panel-drag-handle',
              onPointerDown: handleDragPointerDown,
            }}
            rename={rename}
            slotControls={slotControls}
            title={title}
            onBack={onBack}
          />
          <div className={cn('min-h-0 w-full min-w-0 flex-1 overflow-auto bg-transparent', contentClassName)}>
            {children}
          </div>
        </>
      )}
    </aside>
  )
}
