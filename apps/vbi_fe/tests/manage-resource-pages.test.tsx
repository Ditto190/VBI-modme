import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type { ComponentType } from 'react'

type ResourceKind = 'chart' | 'insight' | 'report'

type ResourceItem = {
  createdAt: string
  id: string
  name: string
  updatedAt: string
}

type ResourceScenario = {
  createButton: string
  createTitle: string
  editorFallback: string
  kind: ResourceKind
  namePlaceholder: string
  pageTitle: string
  renderPage: ComponentType
}

const connectResourceSession = rs.fn()
const releaseResourceSession = rs.fn()

rs.mock('next/dynamic', () => ({
  default: () => () => null,
}))

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
  connectResourceSession,
  releaseResourceSession,
}))

const resourceApi = await import('../src/services/resourceApi')
const insightApi = await import('../src/services/insightApi')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useManageChartsStore } = await import('../src/stores/manage-charts.store')
const { useManageInsightsStore } = await import('../src/stores/manage-insights.store')
const { useReportsStore } = await import('../src/stores/reports.store')
const { ManageChartsPage } = await import('../src/views/ManageChartsPage')
const { ManageInsightsPage } = await import('../src/views/ManageInsightsPage')
const { ReportsPage } = await import('../src/views/ReportsPage')

const initialChartsState = useManageChartsStore.getState()
const initialInsightsState = useManageInsightsStore.getState()
const initialReportsState = useReportsStore.getState()

const resourcesByKind: Record<ResourceKind, ResourceItem[]> = {
  chart: [],
  insight: [],
  report: [],
}

const createResourceItem = (kind: ResourceKind, index: number): ResourceItem => ({
  id: `${kind}-${index}`,
  name: `${kind} resource ${index}`,
  createdAt: `2026-05-${String(index).padStart(2, '0')}T01:00:00.000Z`,
  updatedAt: `2026-05-${String(index).padStart(2, '0')}T02:00:00.000Z`,
})

const seedResourceItems = (kind: ResourceKind, count = 9) => {
  resourcesByKind[kind] = Array.from({ length: count }, (_, index) => createResourceItem(kind, index + 1))
}

const getRowForText = (text: string) => {
  const row = screen.getByText(text).closest('tr')
  expect(row).toBeTruthy()
  return row as HTMLTableRowElement
}

const clickVisibleDeleteConfirmation = () => {
  const deleteButtons = screen.getAllByRole('button', { name: /^Delete$/ })
  const confirmationButton = deleteButtons.at(-1)
  expect(confirmationButton).toBeTruthy()
  fireEvent.click(confirmationButton as HTMLButtonElement)
}

const setupResourceMocks = () => {
  ;(
    resourceApi.listResources as unknown as {
      mockImplementation(implementation: (kind: ResourceKind) => Promise<ResourceItem[]>): void
    }
  ).mockImplementation(async (kind) => resourcesByKind[kind])
  ;(
    insightApi.fetchInsights as unknown as {
      mockImplementation(implementation: () => Promise<ResourceItem[]>): void
    }
  ).mockImplementation(async () => resourcesByKind.insight)
  ;(resourceApi.createResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(resourceApi.removeResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(resourceApi.renameResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(insightApi.createInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(insightApi.deleteInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(insightApi.updateInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  connectResourceSession.mockResolvedValue(undefined)
  releaseResourceSession.mockResolvedValue(undefined)
}

const renderScenarioPage = (scenario: ResourceScenario) => {
  const Page = scenario.renderPage
  render(<Page />)
}

const scenarios: ResourceScenario[] = [
  {
    createButton: 'New Chart',
    createTitle: 'New Chart',
    editorFallback: 'Chart Editor',
    kind: 'chart',
    namePlaceholder: 'Chart Name',
    pageTitle: 'Charts',
    renderPage: ManageChartsPage,
  },
  {
    createButton: 'New Insight',
    createTitle: 'New Insight',
    editorFallback: 'Insight Editor',
    kind: 'insight',
    namePlaceholder: 'Title',
    pageTitle: 'Insights',
    renderPage: ManageInsightsPage,
  },
  {
    createButton: 'New Report',
    createTitle: 'New Report',
    editorFallback: 'Report Workspace',
    kind: 'report',
    namePlaceholder: 'Report Name',
    pageTitle: 'Reports',
    renderPage: ReportsPage,
  },
]

describe('resource management pages', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useManageChartsStore.setState(initialChartsState, true)
    useManageInsightsStore.setState(initialInsightsState, true)
    useReportsStore.setState(initialReportsState, true)
    resourcesByKind.chart = []
    resourcesByKind.insight = []
    resourcesByKind.report = []
    setupResourceMocks()
  })

  afterEach(() => {
    cleanup()
  })

  scenarios.forEach((scenario) => {
    test(`${scenario.kind} management supports list, search, pagination, selection, create, edit, rename, and delete`, async () => {
      seedResourceItems(scenario.kind)
      renderScenarioPage(scenario)

      expect(await screen.findByRole('heading', { name: scenario.pageTitle })).toBeInTheDocument()
      expect(screen.getByText('9 Visible')).toBeInTheDocument()
      expect(screen.getByText(`${scenario.kind} resource 1`)).toBeInTheDocument()
      expect(screen.queryByText(`${scenario.kind} resource 9`)).not.toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: 'Next' }))
      expect(screen.getByText(`${scenario.kind} resource 9`)).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Previous' }))
      expect(screen.getByText(`${scenario.kind} resource 1`)).toBeInTheDocument()

      fireEvent.change(screen.getByRole('textbox', { name: 'Search name or ID' }), {
        target: { value: `${scenario.kind} resource 2` },
      })
      expect(screen.getByText(`${scenario.kind} resource 2`)).toBeInTheDocument()
      expect(screen.queryByText(`${scenario.kind} resource 1`)).not.toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
      expect(screen.getByRole('textbox', { name: 'Search name or ID' })).toHaveValue('')
      expect(screen.getByText(`${scenario.kind} resource 1`)).toBeInTheDocument()

      fireEvent.click(within(getRowForText(`${scenario.kind} resource 1`)).getByRole('button', { name: 'Edit' }))
      const editorDialog = await screen.findByRole('dialog')
      expect(within(editorDialog).getByText(`${scenario.kind} resource 1`)).toBeInTheDocument()
      fireEvent.click(within(editorDialog).getByRole('button', { name: 'Rename' }))
      const titleInput = within(editorDialog).getByDisplayValue(`${scenario.kind} resource 1`)
      fireEvent.change(titleInput, { target: { value: `${scenario.kind} renamed` } })
      fireEvent.blur(titleInput)

      if (scenario.kind === 'insight') {
        await waitFor(() =>
          expect(insightApi.updateInsight).toHaveBeenCalledWith(`${scenario.kind}-1`, {
            name: `${scenario.kind} renamed`,
          }),
        )
      } else {
        await waitFor(() =>
          expect(resourceApi.renameResource).toHaveBeenCalledWith(
            scenario.kind,
            `${scenario.kind}-1`,
            `${scenario.kind} renamed`,
          ),
        )
      }

      fireEvent.click(within(editorDialog).getByRole('button', { name: 'Close' }))
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      if (scenario.kind !== 'report') {
        await waitFor(() => expect(releaseResourceSession).toHaveBeenCalledWith(scenario.kind, `${scenario.kind}-1`))
      }

      fireEvent.click(screen.getByRole('button', { name: scenario.createButton }))
      const createDialog = await screen.findByRole('dialog')
      fireEvent.change(within(createDialog).getByPlaceholderText(scenario.namePlaceholder), {
        target: { value: `${scenario.kind} created` },
      })
      if (scenario.kind === 'insight') {
        fireEvent.change(within(createDialog).getByPlaceholderText('Content'), {
          target: { value: 'Insight body' },
        })
      }
      fireEvent.click(within(createDialog).getByRole('button', { name: scenario.createButton }))

      if (scenario.kind === 'insight') {
        await waitFor(() =>
          expect(insightApi.createInsight).toHaveBeenCalledWith({
            content: 'Insight body',
            name: 'insight created',
          }),
        )
      } else {
        await waitFor(() =>
          expect(resourceApi.createResource).toHaveBeenCalledWith(scenario.kind, `${scenario.kind} created`),
        )
      }

      fireEvent.click(
        within(getRowForText(`${scenario.kind} resource 2`)).getByRole('button', {
          name: `Delete ${scenario.kind} resource 2`,
        }),
      )
      clickVisibleDeleteConfirmation()
      if (scenario.kind === 'insight') {
        await waitFor(() => expect(insightApi.deleteInsight).toHaveBeenCalledWith(`${scenario.kind}-2`))
      } else {
        await waitFor(() =>
          expect(resourceApi.removeResource).toHaveBeenCalledWith(scenario.kind, `${scenario.kind}-2`),
        )
      }

      fireEvent.click(within(getRowForText(`${scenario.kind} resource 3`)).getByRole('checkbox'))
      const toolbarDelete = screen
        .getAllByRole('button', { name: 'Delete' })
        .find((button) => button.textContent === 'Delete')
      expect(toolbarDelete).toBeEnabled()
      fireEvent.click(toolbarDelete as HTMLButtonElement)
      clickVisibleDeleteConfirmation()
      if (scenario.kind === 'insight') {
        await waitFor(() => expect(insightApi.deleteInsight).toHaveBeenCalledWith(`${scenario.kind}-3`))
      } else {
        await waitFor(() =>
          expect(resourceApi.removeResource).toHaveBeenCalledWith(scenario.kind, `${scenario.kind}-3`),
        )
      }
    })
  })
})
