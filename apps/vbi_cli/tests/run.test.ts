import { describe, expect, test, vi } from 'vitest'
import { runCli } from '../src/run.js'
import type { CliRunDeps } from '../src/types.js'

const createResource = (id: string) => ({ createdAt: '2026-04-09', id, name: 'demo', updatedAt: '2026-04-09' })

const createDeps = () => {
  const stdout: string[] = []
  const stderr: string[] = []
  const report = {
    create: vi.fn(async () => createResource('report-1')),
    createPage: vi.fn(async () => ({ ...createResource('report-1'), dsl: { pages: [] } })),
    exportSnapshot: vi.fn(async () => ({ charts: {}, insights: {}, report: { uuid: 'report-1' } })),
    getDetail: vi.fn(async () => ({ ...createResource('report-1'), dsl: { pages: [] } })),
    remove: vi.fn(async () => createResource('report-1')),
    removePage: vi.fn(async () => ({ ...createResource('report-1'), dsl: { pages: [] } })),
    rename: vi.fn(async () => createResource('report-1')),
    reorderPages: vi.fn(async () => ({
      ...createResource('report-1'),
      dsl: { pages: [{ id: 'page-2' }, { id: 'page-1' }] },
    })),
    updatePage: vi.fn(async () => ({ ...createResource('report-1'), dsl: { pages: [] } })),
  }
  const client = {
    chart: () =>
      ({
        create: vi.fn(async () => createResource('chart-1')),
        getDetail: vi.fn(async () => ({ ...createResource('chart-1'), dsl: { uuid: 'chart-1' } })),
        remove: vi.fn(async () => createResource('chart-1')),
        rename: vi.fn(async () => createResource('chart-1')),
      }) as never,
    insight: () =>
      ({
        create: vi.fn(async () => createResource('insight-1')),
        getDetail: vi.fn(async () => ({ ...createResource('insight-1'), dsl: { content: 'demo' } })),
        remove: vi.fn(async () => createResource('insight-1')),
        update: vi.fn(async () => ({ ...createResource('insight-1'), dsl: { content: 'demo' } })),
      }) as never,
    listCharts: vi.fn(async () => [createResource('chart-1')]),
    listInsights: vi.fn(async () => [createResource('insight-1')]),
    listReports: vi.fn(async () => [createResource('report-1')]),
    report: vi.fn(() => report as never),
  }
  const deps: CliRunDeps = {
    getClient: vi.fn(async () => client),
    stderr: { write: (value: string) => void stderr.push(value) },
    stdout: { write: (value: string) => void stdout.push(value) },
  }
  return { client, deps, report, stderr, stdout }
}

describe('runCli', () => {
  test('prints usage when no command is provided', async () => {
    const { deps, stderr, stdout } = createDeps()
    await expect(runCli([], deps)).resolves.toBe(0)
    expect(stdout.join('')).toContain('Usage:')
    expect(stderr).toEqual([])
  })

  test('runs report page reorder through SDK client', async () => {
    const { deps, report, stdout } = createDeps()
    await expect(runCli(['report', 'page', 'reorder', 'report-1', '--page-ids', 'page-2,page-1'], deps)).resolves.toBe(
      0,
    )
    expect(report.reorderPages).toHaveBeenCalledWith(['page-2', 'page-1'])
    expect(stdout.join('')).toContain('"page-2"')
  })

  test('reports parse errors with usage', async () => {
    const { deps, stderr } = createDeps()
    await expect(runCli(['chart', 'update', 'chart-1'], deps)).resolves.toBe(1)
    expect(stderr.join('')).toContain('--name is required')
    expect(stderr.join('')).toContain('Usage:')
  })
})
