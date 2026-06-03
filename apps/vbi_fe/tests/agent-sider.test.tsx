import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

rs.mock('../src/views/AgentPage', () => ({
  AgentChatSurface: ({ className }: { className?: string }) => (
    <div className={className} data-testid='agent-chat-surface' />
  ),
}))

const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const {
  defaultAgentPanelWidth,
  agentPanelFloatingPositionStorageKey,
  agentPanelModeStorageKey,
  agentPanelWidthStorageKey,
  useAgentPanelStore,
} = await import('../src/stores/agent-panel.store')
const { AgentSider } = await import('../src/views/agent/AgentSider')

describe('AgentSider', () => {
  beforeEach(() => {
    cleanup()
    window.localStorage.clear()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useAgentPanelStore.setState({
      collapsed: false,
      floatingPosition: null,
      mode: 'fixed',
      width: defaultAgentPanelWidth,
    })
  })

  test('renders fixed by default and persists floating mode', () => {
    render(<AgentSider />)

    const sider = screen.getByLabelText('VBI Agent')
    expect(sider).toHaveAttribute('data-agent-panel-mode', 'fixed')
    expect(sider).toHaveStyle({ width: `${defaultAgentPanelWidth}px` })
    expect(screen.getByRole('heading', { name: 'VBI Agent' })).toBeInTheDocument()
    expect(screen.getByTestId('agent-chat-surface')).toHaveClass('h-full')

    fireEvent.click(screen.getByRole('button', { name: 'Float Agent' }))

    expect(sider).toHaveAttribute('data-agent-panel-mode', 'floating')
    expect(window.localStorage.getItem(agentPanelModeStorageKey)).toBe('floating')
    expect(screen.getByRole('button', { name: 'Dock Agent' })).toBeInTheDocument()
  })

  test('collapses to a compact rail and expands again', () => {
    render(<AgentSider />)

    const sider = screen.getByLabelText('VBI Agent')
    expect(sider).toHaveAttribute('data-agent-panel-collapsed', 'false')
    expect(screen.getByTestId('agent-chat-surface')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Collapse Agent' }))

    expect(sider).toHaveAttribute('data-agent-panel-collapsed', 'true')
    expect(screen.queryByTestId('agent-chat-surface')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'VBI Agent' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Expand Agent' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Expand Agent' }))

    expect(sider).toHaveAttribute('data-agent-panel-collapsed', 'false')
    expect(screen.getByTestId('agent-chat-surface')).toBeInTheDocument()
  })

  test('resizes the docked panel and persists width', () => {
    render(<AgentSider />)

    fireEvent.pointerDown(screen.getByRole('separator', { name: 'Resize Agent' }), { clientX: 0 })
    fireEvent.pointerMove(document, { clientX: -80 })
    fireEvent.pointerUp(document)

    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ width: '580px' })
    expect(window.localStorage.getItem(agentPanelWidthStorageKey)).toBe('580')
  })

  test('resets the docked panel width on separator double click', () => {
    useAgentPanelStore.setState({ collapsed: false, floatingPosition: null, mode: 'fixed', width: 560 })
    render(<AgentSider />)

    const separator = screen.getByRole('separator', { name: 'Resize Agent' })
    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ width: '560px' })

    fireEvent.doubleClick(separator)

    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ width: `${defaultAgentPanelWidth}px` })
    expect(window.localStorage.getItem(agentPanelWidthStorageKey)).toBe(String(defaultAgentPanelWidth))
  })

  test('drags the floating panel and persists position', async () => {
    render(<AgentSider />)

    fireEvent.click(screen.getByRole('button', { name: 'Float Agent' }))

    await waitFor(() => {
      expect(screen.getByLabelText('VBI Agent')).toHaveAttribute('data-agent-panel-mode', 'floating')
      expect(window.localStorage.getItem(agentPanelFloatingPositionStorageKey)).not.toBeNull()
    })

    fireEvent.pointerDown(screen.getByTestId('agent-sider-drag-handle'), { clientX: 900, clientY: 40 })
    fireEvent.pointerMove(document, { clientX: 800, clientY: 120 })
    fireEvent.pointerUp(document)

    const position = JSON.parse(window.localStorage.getItem(agentPanelFloatingPositionStorageKey) ?? '{}') as {
      x: number
      y: number
    }
    expect(position.x).toBeLessThan(594)
    expect(position.y).toBeGreaterThan(12)
    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ left: `${position.x}px`, top: `${position.y}px` })
  })
})
