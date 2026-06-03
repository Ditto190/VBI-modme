import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const { application, bindApplicationNavigation, setApplicationPathname } = await import('../src/application')
const { createVBIApplicationTools } = await import('../src/application/agent/tools/application-tools')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { defaultManageSidebarWidth, defaultWorkspacePlacement, useManageSidebarStore } =
  await import('../src/stores/manage-sidebar.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')
const { useReportDetailStore } = await import('../src/stores/report-detail.store')
const { defaultWorkspaceSidePanelWidth, useWorkspaceSidePanelStore } =
  await import('../src/stores/workspace-side-panel.store')
const { useReportBuilderModel } = await import('../src/models')

const initialPreferencesState = useAppPreferencesStore.getState()
const initialManageSidebarState = useManageSidebarStore.getState()
const initialNavigationState = useNavigationStore.getState()
const initialReportBuilderModelState = useReportBuilderModel.getState()
const initialReportDetailState = useReportDetailStore.getState()
const initialWorkspaceSidePanelState = useWorkspaceSidePanelStore.getState()

const readText = (result: { content: Array<{ text: string; type: string }> }) =>
  result.content.find((part) => part.type === 'text')?.text ?? ''

const readJson = <T>(result: { content: Array<{ text: string; type: string }> }) => JSON.parse(readText(result)) as T

const getTool = (name: string) => {
  const tool = createVBIApplicationTools().find((entry) => entry.name === name)
  expect(tool).toBeDefined()
  return tool
}

const createReportSession = () =>
  ({
    builder: {
      build: () => ({
        pages: [
          { chartId: 'chart-1', id: 'page-1', title: 'First page' },
          { id: 'page-2', insightId: 'insight-1', title: 'Second page' },
        ],
      }),
    },
    handle: {
      close: rs.fn(async () => undefined),
      getCollaborationProvider: rs.fn(async () => null),
      open: rs.fn(async () => null),
    },
    opening: null,
    provider: null,
    refs: 1,
    stopSync: null,
    version: 2,
  }) as never

describe('VBI application agent tools', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    window.localStorage.clear()
    useAppPreferencesStore.setState(initialPreferencesState, true)
    useManageSidebarStore.setState(initialManageSidebarState, true)
    useManageSidebarStore.setState({
      collapsed: false,
      width: defaultManageSidebarWidth,
      workspacePlacement: defaultWorkspacePlacement,
    })
    useNavigationStore.setState(initialNavigationState, true)
    useReportBuilderModel.setState(initialReportBuilderModelState, true)
    useReportDetailStore.setState(initialReportDetailState, true)
    useWorkspaceSidePanelStore.setState(initialWorkspaceSidePanelState, true)
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: null,
      mode: 'fixed',
      width: defaultWorkspaceSidePanelWidth,
    })
    setApplicationPathname('/manage/report')
  })

  test('lists and lazy-loads application skills without legacy resource tool contracts', async () => {
    const readSkill = getTool('read_skill')

    const listResult = await readSkill?.execute('call-list', { action: 'list' })
    const list = readJson<Array<{ name: string; summary: string; title: string }>>(listResult as never)
    expect(list.map((skill) => skill.name)).toEqual([
      'application_overview',
      'resources',
      'report_detail',
      'layout_preferences',
      'agent',
      'builder_api',
    ])

    const skillResult = await readSkill?.execute('call-read', { action: 'read', skill: 'builder_api' })
    const skill = readJson<{ content: string; skill: string }>(skillResult as never)
    expect(skill.skill).toBe('builder_api')
    expect(skill.content).toContain('application.chart.editor.builders')
    expect(skill.content).not.toContain('vbi_chart')
  })

  test('runs trusted scripts against theme and layout application APIs with full JSON content', async () => {
    const applicationTool = getTool('vbi_application')

    const result = await applicationTool?.execute('call-application', {
      code: `
application.theme.changeTheme("blue");
application.layout.sidePanel.setMode("floating");
application.layout.sidePanel.setWidth(520);
console.log("theme", snapshot().theme.mode);
return json({ layout: snapshot().layout.sidePanel, theme: snapshot().theme });
`,
    })
    const payload = readJson<{
      logs: string[]
      result: { layout: { mode: string; width: number }; theme: { mode: string } }
    }>(result as never)

    expect(payload.logs).toEqual(['theme blue'])
    expect(payload.result).toEqual({
      layout: expect.objectContaining({ mode: 'floating', width: 520 }),
      theme: { mode: 'blue' },
    })
    expect(application.theme.mode).toBe('blue')
    expect(application.layout.sidePanel.mode).toBe('floating')
    expect(readText(result as never)).toContain('"width": 520')
  })

  test('runs resource navigation and report detail commands through the semantic application API', async () => {
    const navigate = rs.fn()
    bindApplicationNavigation(navigate)
    useReportBuilderModel.setState({
      sessions: {
        'report-1': createReportSession(),
      },
    })
    useReportDetailStore.setState({ activePageId: 'page-1', reportId: 'report-1' })
    const applicationTool = getTool('vbi_application')

    const result = await applicationTool?.execute('call-application', {
      code: `
await application.chart.open("chart 1");
await application.report.open("report-1");
application.reportDetail.setScrolledPage("page-2");
await waitFor(() => snapshot().reportDetail.activePageId === "page-2");
return json({ reportDetail: snapshot().reportDetail });
`,
    })
    const payload = readJson<{
      result: {
        reportDetail: {
          activePageId: string
          connectedInsightId: string
          reportId: string
        }
      }
    }>(result as never)

    expect(navigate).toHaveBeenNthCalledWith(1, '/manage/chart/chart%201')
    expect(navigate).toHaveBeenNthCalledWith(2, '/manage/report/report-1')
    expect(payload.result.reportDetail).toMatchObject({
      activePageId: 'page-2',
      connectedInsightId: 'insight-1',
      reportId: 'report-1',
    })
  })
})
