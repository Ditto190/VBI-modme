import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { act, cleanup, render, waitFor } from '@testing-library/react'

rs.mock('../src/services/resourceApi', () => ({
  createResource: rs.fn(),
  listResources: rs.fn(),
  removeResource: rs.fn(),
  renameResource: rs.fn(),
}))

rs.mock('../src/services/insightApi', () => ({
  createInsight: rs.fn(),
  deleteInsight: rs.fn(),
  fetchInsights: rs.fn(),
  updateInsight: rs.fn(),
}))

rs.mock('../src/stores/resource-session.store', () => ({
  connectResourceSession: rs.fn(),
  releaseResourceSession: rs.fn(),
}))

const resourceApi = await import('../src/services/resourceApi')
const insightApi = await import('../src/services/insightApi')
const resourceSession = await import('../src/stores/resource-session.store')
const { application, applicationShallowEqual, bindApplicationNavigation, setApplicationPathname, useApplication } =
  await import('../src/application')
const { VbiAppProviders } = await import('../src/app/providers')
const { appLocales } = await import('../src/i18n')
const { darkVbiThemeModes, lightVbiThemeModes } = await import('../src/theme/palette')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useAgentConversationsStore } = await import('../src/stores/agent-conversations.store')
const {
  defaultWorkspaceSidePanelWidth,
  minWorkspaceSidePanelWidth,
  useWorkspaceSidePanelStore,
  workspaceSidePanelFloatingPositionStorageKey,
  workspaceSidePanelModeStorageKey,
  workspaceSidePanelWidthStorageKey,
} = await import('../src/stores/workspace-side-panel.store')
const {
  defaultManageSidebarWidth,
  defaultWorkspacePlacement,
  manageSidebarWidthStorageKey,
  useManageSidebarStore,
  workspacePlacementStorageKey,
} = await import('../src/stores/manage-sidebar.store')
const { useManageChartsStore } = await import('../src/stores/manage-charts.store')
const { useManageInsightsStore } = await import('../src/stores/manage-insights.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')
const { useReportsStore } = await import('../src/stores/reports.store')
const { useReportDetailStore } = await import('../src/stores/report-detail.store')

const initialPreferencesState = useAppPreferencesStore.getState()
const initialAgentConversationsState = useAgentConversationsStore.getState()
const initialManageSidebarState = useManageSidebarStore.getState()
const initialWorkspaceSidePanelState = useWorkspaceSidePanelStore.getState()
const initialChartsState = useManageChartsStore.getState()
const initialInsightsState = useManageInsightsStore.getState()
const initialNavigationState = useNavigationStore.getState()
const initialReportDetailState = useReportDetailStore.getState()
const initialReportsState = useReportsStore.getState()
const navigate = rs.fn()

const createResourceItem = (id: string, name: string) => ({
  createdAt: '2026-01-01T00:00:00.000Z',
  id,
  name,
  updatedAt: '2026-01-02T00:00:00.000Z',
})

describe('application interface', () => {
  beforeEach(() => {
    cleanup()
    rs.clearAllMocks()
    Reflect.deleteProperty(window, 'VBIApplication')
    Reflect.deleteProperty(window, 'VBIApplicationAPI')
    Reflect.deleteProperty(window, 'useApplication')
    window.localStorage.removeItem(manageSidebarWidthStorageKey)
    window.localStorage.removeItem(workspacePlacementStorageKey)
    window.localStorage.removeItem(workspaceSidePanelFloatingPositionStorageKey)
    window.localStorage.removeItem(workspaceSidePanelModeStorageKey)
    window.localStorage.removeItem(workspaceSidePanelWidthStorageKey)
    window.history.replaceState(null, '', '/manage/report')
    useAppPreferencesStore.setState(initialPreferencesState, true)
    useAgentConversationsStore.setState(initialAgentConversationsState, true)
    useWorkspaceSidePanelStore.setState(initialWorkspaceSidePanelState, true)
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: null,
      mode: 'fixed',
      width: defaultWorkspaceSidePanelWidth,
    })
    useManageSidebarStore.setState(initialManageSidebarState, true)
    useManageSidebarStore.setState({
      collapsed: false,
      workspacePlacement: defaultWorkspacePlacement,
      width: defaultManageSidebarWidth,
    })
    useManageChartsStore.setState(initialChartsState, true)
    useManageInsightsStore.setState(initialInsightsState, true)
    useNavigationStore.setState(initialNavigationState, true)
    useReportDetailStore.setState(initialReportDetailState, true)
    useReportsStore.setState(initialReportsState, true)
    bindApplicationNavigation(navigate)
    setApplicationPathname('/manage/report')
  })

  test('reads fresh imperative state before any React subscription is mounted', () => {
    const listedThemes = application.theme.list()

    expect(listedThemes).toEqual({ dark: darkVbiThemeModes, light: lightVbiThemeModes })
    expect(listedThemes.light).toHaveLength(6)
    expect(listedThemes.dark).toHaveLength(6)
    listedThemes.light.pop()
    listedThemes.dark.pop()
    expect(application.theme.list()).toEqual({ dark: darkVbiThemeModes, light: lightVbiThemeModes })

    application.theme.change('blue')

    expect(application.theme.mode).toBe('blue')
    expect(application.select((state) => state.theme.mode)).toBe('blue')
    expect(useApplication((state) => state.theme.mode)).toBe('blue')

    const listedLocales = application.i18n.list()

    expect(listedLocales).toEqual(appLocales)
    listedLocales.pop()
    expect(application.i18n.list()).toEqual(appLocales)
  })

  test('rejects preference changes that are not returned from list commands', () => {
    expect(() => application.theme.change('missing-theme' as never)).toThrow(/application\.theme\.list/)
    expect(application.theme.mode).toBe(initialPreferencesState.themeMode)

    expect(() => application.i18n.change('missing-locale' as never)).toThrow(/application\.i18n\.list/)
    expect(application.i18n.locale).toBe(initialPreferencesState.locale)
  })

  test('selects and subscribes to semantic application state', () => {
    const changes: string[] = []
    const unsubscribe = application.subscribe(
      (state) => state.theme.mode,
      (mode) => changes.push(mode),
    )

    application.i18n.change('en-US')
    application.theme.change('blue')
    application.theme.change('blue')

    unsubscribe()
    expect(changes).toEqual(['blue'])
    expect(application.select((state) => state.i18n.locale)).toBe('en-US')
  })

  test('useApplication only re-renders when the selected state changes', () => {
    let renderCount = 0

    const ThemeReader = () => {
      renderCount += 1
      const theme = useApplication((state) => state.theme.mode)
      return <div>{theme}</div>
    }

    render(<ThemeReader />)
    expect(renderCount).toBe(1)

    act(() => {
      application.i18n.change('ja-JP')
    })
    expect(renderCount).toBe(1)

    act(() => {
      application.theme.change('midnight')
    })
    expect(renderCount).toBe(2)
  })

  test('keeps agent model projections stable across unrelated application updates', async () => {
    await application.agent.model.change('deepseek-v4-flash')
    const initialOptions = application.agent.model.options
    let renderCount = 0

    const AgentModelReader = () => {
      renderCount += 1
      const model = useApplication(
        (state) => ({
          options: state.agent.model.options,
          selectedId: state.agent.model.selectedId,
          thinkingLevel: state.agent.model.thinkingLevel,
        }),
        { equality: applicationShallowEqual },
      )

      return <div>{model.options.map((option) => option.id).join(',')}</div>
    }

    render(<AgentModelReader />)
    expect(renderCount).toBe(1)

    act(() => {
      application.theme.change(application.theme.mode === 'blue' ? 'slate' : 'blue')
    })
    act(() => {
      application.i18n.change(application.i18n.locale === 'en-US' ? 'ja-JP' : 'en-US')
    })
    act(() => {
      setApplicationPathname('/manage/chart')
    })
    act(() => {
      useManageChartsStore.setState({ loading: !useManageChartsStore.getState().loading })
    })

    expect(application.agent.model.options).toBe(initialOptions)
    expect(renderCount).toBe(1)
  })

  test('app providers expose application to window for React-external commands', async () => {
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    render(
      <VbiAppProviders initialLocale='zh-CN' initialThemeMode='slate'>
        <div>Workspace</div>
      </VbiAppProviders>,
    )

    await waitFor(() => expect(window.VBIApplication).toBe(application))
    expect(window.VBIApplicationAPI).toEqual({ application, useApplication })
    expect(window.useApplication).toBe(useApplication)
    expect(window.VBIApplication?.theme.list()).toEqual({ dark: darkVbiThemeModes, light: lightVbiThemeModes })
    expect(window.VBIApplication?.i18n.list()).toEqual(appLocales)

    act(() => {
      window.VBIApplication?.theme.change('blue')
      window.VBIApplication?.i18n.change('en-US')
    })
    const cleanup = window.VBIApplication?.chart.activate()

    expect(window.VBIApplication?.theme.mode).toBe('blue')
    expect(window.VBIApplication?.i18n.locale).toBe('en-US')
    await waitFor(() => expect(document.documentElement.lang).toBe('en-US'))
    expect(window.location.pathname).toBe('/manage/chart')

    const windowTheme = window.useApplication?.((state) => state.theme)

    act(() => {
      windowTheme?.change('midnight')
    })

    expect(window.VBIApplicationAPI?.useApplication((state) => state.theme.mode)).toBe('midnight')
    expect('navigation' in (window.VBIApplication as unknown as Record<string, unknown>)).toBe(false)
    cleanup?.()
  })

  test('routes semantic application actions through the bound router adapter', async () => {
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    await application.chart.open('chart 1')
    await application.insight.open('insight-1')
    await application.report.open('report-1')
    setApplicationPathname('/agent')
    const cleanup = application.report.activate()
    cleanup()

    expect(navigate).toHaveBeenNthCalledWith(1, '/manage/chart/chart%201')
    expect(navigate).toHaveBeenNthCalledWith(2, '/manage/insight/insight-1')
    expect(navigate).toHaveBeenNthCalledWith(3, '/manage/report/report-1')
    expect(navigate).toHaveBeenNthCalledWith(4, '/manage/report')
    expect('navigation' in (application as unknown as Record<string, unknown>)).toBe(false)
  })

  test('exposes grouped agent chat, conversation, model, and panel interfaces', async () => {
    useAgentConversationsStore.setState({
      activeConversationId: 'conversation-1',
      conversations: [
        {
          createdAt: '2026-01-01T00:00:00.000Z',
          id: 'conversation-1',
          lastModified: '2026-01-02T00:00:00.000Z',
          status: 'completed',
          title: 'Conversation 1',
        },
      ],
      isInitialized: true,
    })

    expect(Object.keys(application.agent).sort()).toEqual(['chat', 'conversations', 'model', 'panel'])
    expect(application.agent.conversations.activeId).toBe('conversation-1')
    expect(application.agent.conversations.items.map((item) => item.id)).toEqual(['conversation-1'])
    expect(application.agent.chat.runtime).toBeNull()
    expect(application.agent.chat.snapshot.messages).toEqual([])
    expect(application.agent.model.selectedId).toBe('deepseek-v4-flash')
    expect(application.agent.panel.collapsed).toBe(false)
    expect(application.agent.panel.mode).toBe('fixed')
    expect(application.agent.panel.width).toBe(defaultWorkspaceSidePanelWidth)
    expect(application.agent.panel).toMatchObject({
      collapsed: application.layout.sidePanel.collapsed,
      mode: application.layout.sidePanel.mode,
      width: application.layout.sidePanel.width,
    })

    application.agent.chat.clear()
    expect(application.agent.conversations.activeId).toBe('')

    await application.agent.conversations.open('conversation-1')
    expect(application.agent.conversations.activeId).toBe('conversation-1')
    expect(navigate).not.toHaveBeenCalledWith('/agent/conversation-1')

    application.agent.panel.changeMode('floating')
    expect(application.agent.panel.mode).toBe('floating')
    expect(application.layout.sidePanel.mode).toBe('floating')
    expect(window.localStorage.getItem(workspaceSidePanelModeStorageKey)).toBe('floating')
    application.agent.panel.toggleMode()
    expect(application.agent.panel.mode).toBe('fixed')
    application.agent.panel.setCollapsed(true)
    expect(application.agent.panel.collapsed).toBe(true)
    application.agent.panel.toggleCollapsed()
    expect(application.agent.panel.collapsed).toBe(false)
    application.agent.panel.setWidth(520)
    expect(application.agent.panel.width).toBe(520)
    expect(application.layout.sidePanel.width).toBe(520)
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe('520')
    application.agent.panel.setWidth(240)
    expect(application.agent.panel.width).toBe(minWorkspaceSidePanelWidth)
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe(String(minWorkspaceSidePanelWidth))
    application.agent.panel.setFloatingPosition({ x: 240, y: 96 })
    expect(application.agent.panel.floatingPosition).toEqual({ x: 240, y: 96 })
    expect(application.layout.sidePanel.floatingPosition).toEqual({ x: 240, y: 96 })
    expect(window.localStorage.getItem(workspaceSidePanelFloatingPositionStorageKey)).toBe('{"x":240,"y":96}')
    application.agent.panel.setFloatingPosition(null)
    expect(application.agent.panel.floatingPosition).toBeNull()
    expect(window.localStorage.getItem(workspaceSidePanelFloatingPositionStorageKey)).toBeNull()

    await application.agent.model.change('deepseek-v4-pro')
    expect(application.agent.model.selectedId).toBe('deepseek-v4-pro')
    expect(application.agent.model.list()).toEqual(application.agent.model.options)
    expect(application.agent.model.list()).not.toBe(application.agent.model.options)
    expect(application.agent.model.listThinking()).toEqual(['high', 'xhigh'])
    await application.agent.model.changeThinking('xhigh')
    expect(application.agent.model.thinkingLevel).toBe('xhigh')
    expect('changeThinkingLevel' in (application.agent.model as unknown as Record<string, unknown>)).toBe(false)

    const legacyAgent = application.agent as unknown as Record<string, unknown>
    expect('activeRuntime' in legacyAgent).toBe(false)
    expect('selectedSnapshot' in legacyAgent).toBe(false)
    expect('modelOptions' in legacyAgent).toBe(false)
    expect('setModel' in legacyAgent).toBe(false)
    expect('setThinkingLevel' in legacyAgent).toBe(false)
    expect('bootstrap' in application.agent.chat).toBe(false)
    expect('dispose' in application.agent.chat).toBe(false)
    const cleanup = application.agent.chat.activate()
    cleanup()
  })

  test('exposes persistent layout controls through application.layout', () => {
    expect(application.layout.sidebar.collapsed).toBe(false)
    expect(application.layout.sidebar.width).toBe(defaultManageSidebarWidth)
    expect(application.layout.sidePanel.collapsed).toBe(false)
    expect(application.layout.sidePanel.mode).toBe('fixed')
    expect(application.layout.sidePanel.width).toBe(defaultWorkspaceSidePanelWidth)
    expect(application.layout.workspacePlacement.value).toBe('resource-center')

    application.layout.sidebar.setWidth(360)
    expect(application.layout.sidebar.width).toBe(360)
    expect(window.localStorage.getItem(manageSidebarWidthStorageKey)).toBe('360')

    application.layout.sidebar.setCollapsed(true)
    expect(application.layout.sidebar.collapsed).toBe(true)
    application.layout.sidebar.toggleCollapsed()
    expect(application.layout.sidebar.collapsed).toBe(false)

    application.layout.sidebar.resetWidth()
    expect(application.layout.sidebar.width).toBe(defaultManageSidebarWidth)
    expect(window.localStorage.getItem(manageSidebarWidthStorageKey)).toBe(String(defaultManageSidebarWidth))

    expect(application.layout.sidePanel.listMode()).toEqual(['fixed', 'floating'])
    application.layout.sidePanel.changeMode('floating')
    expect(application.layout.sidePanel.mode).toBe('floating')
    expect(application.agent.panel.mode).toBe('floating')
    expect('setMode' in (application.layout.sidePanel as unknown as Record<string, unknown>)).toBe(false)
    application.layout.sidePanel.toggleMode()
    expect(application.layout.sidePanel.mode).toBe('fixed')
    application.layout.sidePanel.setWidth(540)
    expect(application.layout.sidePanel.width).toBe(540)
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe('540')
    application.layout.sidePanel.resetWidth()
    expect(application.layout.sidePanel.width).toBe(defaultWorkspaceSidePanelWidth)

    application.layout.workspacePlacement.toggle()
    expect(application.layout.workspacePlacement.value).toBe('agent-center')
    expect(window.localStorage.getItem(workspacePlacementStorageKey)).toBe('agent-center')

    expect(application.layout.workspacePlacement.list()).toEqual(['resource-center', 'agent-center'])
    application.layout.workspacePlacement.change('resource-center')
    expect(application.layout.workspacePlacement.value).toBe('resource-center')
    expect(window.localStorage.getItem(workspacePlacementStorageKey)).toBe('resource-center')
    expect('set' in (application.layout.workspacePlacement as unknown as Record<string, unknown>)).toBe(false)
  })

  test('exposes chart resource list commands through application.chart', async () => {
    const items = [createResourceItem('chart-1', 'Sales'), createResourceItem('chart-2', 'Ops')]
    useManageChartsStore.setState({
      filteredItems: items,
      items,
    })
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(items)
    ;(resourceApi.createResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(
      createResourceItem('chart-3', 'Revenue'),
    )
    ;(resourceApi.removeResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
    ;(resourceApi.renameResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)

    expect((await application.chart.list()).map((item) => item.id)).toEqual(['chart-1', 'chart-2'])

    application.chart.records.search('sales')
    expect(application.chart.records.visibleItems.map((item) => item.id)).toEqual(['chart-1'])

    application.chart.records.select(['chart-1'])
    expect(application.chart.records.selectedIds).toEqual(['chart-1'])

    await application.chart.create({ name: 'Revenue' })
    expect(resourceApi.createResource).toHaveBeenCalledWith('chart', 'Revenue')

    await application.chart.rename({ id: 'chart-1', name: 'Sales 2026' })
    expect(resourceApi.renameResource).toHaveBeenCalledWith('chart', 'chart-1', 'Sales 2026')

    await application.chart.delete('chart-1')
    expect(resourceApi.removeResource).toHaveBeenCalledWith('chart', 'chart-1')

    const disconnectChartEditor = application.chart.editor.connect('chart-1', 'user-1')
    await waitFor(() =>
      expect(resourceSession.connectResourceSession).toHaveBeenCalledWith('chart', 'chart-1', 'user-1'),
    )
    disconnectChartEditor()
    await waitFor(() => expect(resourceSession.releaseResourceSession).toHaveBeenCalledWith('chart', 'chart-1'))

    const legacyChart = application.chart as unknown as Record<string, unknown>
    expect('bootstrap' in legacyChart).toBe(false)
    expect('dispose' in legacyChart).toBe(false)
    expect('setSearchText' in legacyChart).toBe(false)
    expect('filteredItems' in legacyChart).toBe(false)
    expect('selectedRowKeys' in legacyChart).toBe(false)
    expect('connectSession' in legacyChart).toBe(false)
    expect('openCreate' in legacyChart).toBe(false)
    expect('createDraft' in legacyChart).toBe(false)
  })

  test('exposes resource workflow commands through application.chart', async () => {
    const items = [createResourceItem('chart-1', 'Sales'), createResourceItem('chart-2', 'Ops')]
    useManageChartsStore.setState({
      filteredItems: items,
      items,
      selectedRowKeys: ['chart-1', 'chart-2'],
    })
    ;(resourceApi.removeResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(items)

    application.chart.records.select(['chart-1'])
    application.chart.records.select([])
    await application.chart.open('chart-1')
    application.chart.records.select(['chart-1', 'chart-2'])
    await application.chart.records.deleteSelected()
    const cleanup = application.chart.activate()
    cleanup()

    expect(navigate).toHaveBeenCalledWith('/manage/chart/chart-1')
    expect(resourceApi.removeResource).toHaveBeenCalledWith('chart', 'chart-1')
    expect(resourceApi.removeResource).toHaveBeenCalledWith('chart', 'chart-2')
  })

  test('exposes insight and report resource-specific create behavior', async () => {
    ;(insightApi.createInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(
      createResourceItem('insight-1', 'Finding'),
    )
    ;(insightApi.fetchInsights as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    ;(resourceApi.createResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(
      createResourceItem('report-1', 'Report'),
    )
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])

    useAppPreferencesStore.setState({ locale: 'zh-CN' })
    await application.chart.create()
    expect(resourceApi.createResource).toHaveBeenCalledWith('chart', '未命名图表')

    await application.insight.create()
    expect(insightApi.createInsight).toHaveBeenCalledWith({
      content: '',
      name: '未命名洞察',
    })

    await application.report.create()
    expect(resourceApi.createResource).toHaveBeenCalledWith('report', '未命名报告')

    await application.insight.create({ content: 'Insight body', name: 'Finding' })
    expect(insightApi.createInsight).toHaveBeenCalledWith({
      content: 'Insight body',
      name: 'Finding',
    })

    await application.report.create({ name: 'Report' })
    expect(resourceApi.createResource).toHaveBeenCalledWith('report', 'Report')
  })

  test('exposes report detail commands through application.reportDetail', async () => {
    const addChart = rs.fn(async () => undefined)
    const addInsight = rs.fn(async () => undefined)
    const addPage = rs.fn(async () => undefined)
    const bootstrap = rs.fn(async () => undefined)
    const dispose = rs.fn(async () => undefined)
    const removeChart = rs.fn(async () => undefined)
    const removeInsight = rs.fn(async () => undefined)
    const removePage = rs.fn(async () => undefined)
    const selectPage = rs.fn(async () => undefined)
    const setScrolledPage = rs.fn()
    const syncActivePage = rs.fn(async () => undefined)

    useReportDetailStore.setState({
      activePageId: 'page-1',
      connectedChartId: 'chart-1',
      connectedChartIds: ['chart-1'],
      connectedInsightId: 'insight-1',
      connectedInsightIds: ['insight-1'],
      pageActionBusy: false,
      reportId: 'report-1',
      addChart,
      addInsight,
      addPage,
      bootstrap,
      dispose,
      removeChart,
      removeInsight,
      removePage,
      selectPage,
      setScrolledPage,
      syncActivePage,
    })

    await application.reportDetail.syncActivePage()
    expect(application.reportDetail).toMatchObject({
      activePageId: 'page-1',
      connectedChartId: 'chart-1',
      connectedInsightId: 'insight-1',
      reportId: 'report-1',
    })
    const cleanup = application.reportDetail.activate('report-1', 'user-1')
    await waitFor(() => expect(bootstrap).toHaveBeenCalledWith('report-1', 'user-1'))
    await application.reportDetail.addPage()
    await application.reportDetail.addChart('page-1')
    await application.reportDetail.addInsight('page-1')
    await application.reportDetail.removeChart('page-1')
    await application.reportDetail.removeInsight('page-1')
    await application.reportDetail.removePage('page-1')
    await application.reportDetail.selectPage('page-2')
    application.reportDetail.setScrolledPage('page-2')
    cleanup()

    expect(addPage).toHaveBeenCalled()
    expect(addChart).toHaveBeenCalledWith('page-1')
    expect(addInsight).toHaveBeenCalledWith('page-1')
    expect(removeChart).toHaveBeenCalledWith('page-1')
    expect(removeInsight).toHaveBeenCalledWith('page-1')
    expect(removePage).toHaveBeenCalledWith('page-1')
    expect(selectPage).toHaveBeenCalledWith('page-2')
    await waitFor(() => expect(setScrolledPage).toHaveBeenCalledWith('page-2'))
    expect(syncActivePage).toHaveBeenCalled()
    await waitFor(() => expect(dispose).toHaveBeenCalled())
    expect('bootstrap' in (application.reportDetail as unknown as Record<string, unknown>)).toBe(false)
    expect('dispose' in (application.reportDetail as unknown as Record<string, unknown>)).toBe(false)
  })
})
