import type { CSSProperties } from 'react'

const baseCardStyle: CSSProperties = {
  background: 'var(--starter-surface)',
  border: '1px solid var(--starter-border)',
  borderRadius: 'var(--starter-radius-md)',
  boxSizing: 'border-box',
}

export const fieldPanelStyle: CSSProperties = {
  ...baseCardStyle,
  color: 'var(--starter-text-primary)',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
}

export const chartRendererStyle: CSSProperties = {
  ...baseCardStyle,
  height: '100%',
  minHeight: 0,
  minWidth: 0,
  overflow: 'hidden',
}

export const chartCanvasStyle: CSSProperties = {
  borderRadius: 'var(--starter-radius-sm)',
  minHeight: 0,
  overflow: 'hidden',
}

export const layoutStyle: CSSProperties = {
  gridTemplateRows: 'auto minmax(320px, 1fr) auto',
  height: '100%',
  minHeight: '100%',
}
