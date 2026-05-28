import type { AgentToolResult } from '@earendil-works/pi-agent-core'
import { listVBIAgentSkills, readVBIAgentSkill, type VBIAgentSkillName } from '../skills/skill-texts'
import { stringifyJson } from '../text-format'
import type {
  VBIAgentWorkspace,
  VBIReferenceWorkspaceSlot,
  VBIReportPageInput,
  VBIReportWorkspaceSlot,
  VBIResourceCreateInput,
  VBIResourceKind,
  VBIResourceSummary,
  VBIWorkspaceSlot,
} from '../types/index'
import type { VBIResourceToolExecutors } from './resource-tool-types'
import { clipOutput, createWorkspaceScriptToolResult, runScopedWorkspaceScript } from './workspace-script'

type VBIResourceLookupKind = VBIResourceKind | 'all'
type VBIResourceToolInput = Record<string, unknown>
type ResourceToolMethod = (...args: any[]) => unknown

const stripDsl = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripDsl)
  if (typeof value !== 'object' || value === null) return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== 'dsl')
      .map(([key, entry]) => [key, stripDsl(entry)]),
  )
}

const createResult = (summary: string, value: unknown): AgentToolResult<unknown> => {
  const text = clipOutput(stringifyJson(value))
  return {
    content: [{ text, type: 'text' }],
    details: { display: text, summary },
  }
}

const asObject = (toolName: string, input: unknown): VBIResourceToolInput => {
  if (typeof input === 'object' && input !== null && !Array.isArray(input)) return input as VBIResourceToolInput
  throw new Error(`${toolName} input must be an object`)
}

const readString = (input: VBIResourceToolInput, key: string) => {
  const value = input[key]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

const requireString = (toolName: string, input: VBIResourceToolInput, key: string) => {
  const value = readString(input, key)
  if (!value) throw new Error(`${toolName}.${key} is required`)
  return value
}

const readLimit = (input: VBIResourceToolInput) => {
  const value = input.limit
  if (typeof value !== 'number' || !Number.isFinite(value)) return 20
  return Math.max(1, Math.min(100, Math.floor(value)))
}

const readLookupResource = (input: VBIResourceToolInput): VBIResourceLookupKind => {
  const resource = input.resource ?? 'all'
  if (resource === 'all' || resource === 'chart' || resource === 'insight' || resource === 'report') return resource
  throw new Error('vbi_resource_lookup.resource must be all, chart, insight, or report')
}

const createInput = (resource: VBIResourceKind, input: VBIResourceToolInput): VBIResourceCreateInput => {
  const name = readString(input, 'name')
  const base = name ? { name } : {}
  return resource === 'insight' ? { ...base, content: readString(input, 'content') } : base
}

const readPageInput = (input: VBIResourceToolInput): VBIReportPageInput => ({
  chartId: readString(input, 'chartId'),
  insightId: readString(input, 'insightId'),
  title: readString(input, 'title'),
})

const readPageIds = (toolName: string, input: VBIResourceToolInput) => {
  if (Array.isArray(input.pageIds) && input.pageIds.every((pageId) => typeof pageId === 'string')) {
    return input.pageIds
  }
  throw new Error(`${toolName}.pageIds must be a string array`)
}

const filterSummaries = (items: VBIResourceSummary[], query: string | undefined, limit: number) => {
  const normalizedQuery = query?.toLowerCase()
  const filtered = normalizedQuery
    ? items.filter((item) => {
        const id = item.id.toLowerCase()
        const name = typeof item.name === 'string' ? item.name.toLowerCase() : ''
        return id.includes(normalizedQuery) || name.includes(normalizedQuery)
      })
    : items
  return filtered.slice(0, limit)
}

const requireSlot = <TSlot extends VBIWorkspaceSlot>(
  workspace: VBIAgentWorkspace,
  resource: VBIResourceKind,
  toolName: string,
) => {
  const slot = workspace[resource] as TSlot | undefined
  if (!slot) throw new Error(`${toolName} requires workspace.${resource}`)
  return slot
}

const requireMethod = <TMethod extends ResourceToolMethod>(toolName: string, target: object, methodName: string) => {
  const method = (target as unknown as Record<string, unknown>)[methodName]
  if (typeof method !== 'function') throw new Error(`${toolName} requires workspace method ${methodName}`)
  return method as TMethod
}

const createDefaultedSlot = <TBuilder>(slot: VBIWorkspaceSlot<TBuilder>, id: string | undefined) => ({
  ...slot,
  close: (nextId?: string) => slot.close?.(nextId ?? id),
  describe: (nextId?: string) => slot.describe?.(nextId ?? id),
  open: (nextId?: string) => slot.open(nextId ?? id),
  snapshot: (nextId?: string) => slot.snapshot?.(nextId ?? id),
})

const runBuilderScript = async <TBuilder>({
  code,
  id,
  slot,
  slotGlobal,
  toolName,
  workspace,
}: {
  code: string
  id?: string
  slot: VBIWorkspaceSlot<TBuilder> | undefined
  slotGlobal: VBIResourceKind
  toolName: string
  workspace: VBIAgentWorkspace
}) => {
  if (!slot) throw new Error(`${toolName} requires workspace.${slotGlobal}`)
  const scopedSlot = createDefaultedSlot(slot, id)
  const scopedWorkspace = { ...workspace, [slotGlobal]: scopedSlot }
  const scriptResult = await runScopedWorkspaceScript(scopedWorkspace, code, {
    builder: scopedSlot,
    [slotGlobal]: scopedSlot,
  })
  return createWorkspaceScriptToolResult(`${toolName} run succeeded`, scriptResult.logs, scriptResult.result)
}

const executeReportPageAction = async (report: VBIReportWorkspaceSlot, params: VBIResourceToolInput) => {
  const pageAction = requireString('vbi_report', params, 'pageAction')
  const id = requireString('vbi_report', params, 'id')
  if (pageAction === 'create') {
    const createPage = requireMethod<(id: string, input?: { title?: string }) => Promise<unknown> | unknown>(
      'vbi_report',
      report,
      'createPage',
    )
    return createPage.call(report, id, { title: readString(params, 'title') })
  }
  if (pageAction === 'remove') {
    const removePage = requireMethod<(id: string, pageId: string) => Promise<unknown> | unknown>(
      'vbi_report',
      report,
      'removePage',
    )
    return removePage.call(report, id, requireString('vbi_report', params, 'pageId'))
  }
  if (pageAction === 'reorder') {
    const reorderPages = requireMethod<(id: string, pageIds: string[]) => Promise<unknown> | unknown>(
      'vbi_report',
      report,
      'reorderPages',
    )
    return reorderPages.call(report, id, readPageIds('vbi_report', params))
  }
  if (pageAction === 'update') {
    const updatePage = requireMethod<
      (id: string, pageId: string, input: VBIReportPageInput) => Promise<unknown> | unknown
    >('vbi_report', report, 'updatePage')
    return updatePage.call(
      report,
      requireString('vbi_report', params, 'id'),
      requireString('vbi_report', params, 'pageId'),
      readPageInput(params),
    )
  }
  throw new Error('vbi_report.pageAction must be create, remove, reorder, or update')
}

export const createVBIResourceToolExecutors = (workspace: VBIAgentWorkspace): VBIResourceToolExecutors => ({
  read_skill: async (_toolCallId, input) => {
    const params = asObject('read_skill', input)
    const action = requireString('read_skill', params, 'action')
    if (action === 'list') return createResult('read_skill list completed', listVBIAgentSkills())
    if (action === 'read') {
      const skill = requireString('read_skill', params, 'skill') as VBIAgentSkillName
      return createResult(`read_skill ${skill} completed`, { skill, content: readVBIAgentSkill(skill) })
    }
    throw new Error('read_skill.action must be list or read')
  },

  vbi_resource_lookup: async (_toolCallId, input) => {
    const params = asObject('vbi_resource_lookup', input)
    const resource = readLookupResource(params)
    const query = readString(params, 'query')
    const limit = readLimit(params)
    const read = async (kind: VBIResourceKind) => {
      const slot = requireSlot(workspace, kind, 'vbi_resource_lookup')
      const list = requireMethod<() => Promise<VBIResourceSummary[]> | VBIResourceSummary[]>(
        'vbi_resource_lookup',
        slot,
        'list',
      )
      return filterSummaries(await list.call(slot), query, limit)
    }

    if (resource !== 'all') {
      return createResult(`vbi_resource_lookup ${resource} completed`, {
        resource,
        items: await read(resource),
      })
    }

    const [charts, insights, reports] = await Promise.all([read('chart'), read('insight'), read('report')])
    return createResult('vbi_resource_lookup all completed', { charts, insights, reports })
  },

  vbi_chart: async (_toolCallId, input) => {
    const params = asObject('vbi_chart', input)
    const action = requireString('vbi_chart', params, 'action')
    const chart = requireSlot<VBIReferenceWorkspaceSlot>(workspace, 'chart', 'vbi_chart')
    if (action === 'run') {
      return runBuilderScript({
        code: requireString('vbi_chart', params, 'code'),
        id: readString(params, 'id'),
        slot: chart,
        slotGlobal: 'chart',
        toolName: 'vbi_chart',
        workspace,
      })
    }
    if (action === 'create') {
      const create = requireMethod<(input?: VBIResourceCreateInput) => Promise<unknown> | unknown>(
        'vbi_chart',
        chart,
        'create',
      )
      return createResult(
        'vbi_chart create completed',
        stripDsl(await create.call(chart, createInput('chart', params))),
      )
    }

    const id = requireString('vbi_chart', params, 'id')
    if (action === 'get') return createResult('vbi_chart get completed', stripDsl(await chart.describe?.(id)))
    if (action === 'rename') {
      const rename = requireMethod<(id: string, name: string) => Promise<unknown> | unknown>(
        'vbi_chart',
        chart,
        'rename',
      )
      return createResult(
        'vbi_chart rename completed',
        stripDsl(await rename.call(chart, id, requireString('vbi_chart', params, 'name'))),
      )
    }
    if (action === 'remove') {
      const remove = requireMethod<(id: string) => Promise<unknown> | unknown>('vbi_chart', chart, 'remove')
      return createResult('vbi_chart remove completed', stripDsl(await remove.call(chart, id)))
    }
    if (action === 'references') {
      const references = requireMethod<(id: string) => Promise<unknown> | unknown>('vbi_chart', chart, 'references')
      return createResult('vbi_chart references completed', stripDsl(await references.call(chart, id)))
    }
    throw new Error('vbi_chart.action must be create, get, rename, remove, references, or run')
  },

  vbi_insight: async (_toolCallId, input) => {
    const params = asObject('vbi_insight', input)
    const action = requireString('vbi_insight', params, 'action')
    const insight = requireSlot<VBIReferenceWorkspaceSlot>(workspace, 'insight', 'vbi_insight')
    if (action === 'run') {
      return runBuilderScript({
        code: requireString('vbi_insight', params, 'code'),
        id: readString(params, 'id'),
        slot: insight,
        slotGlobal: 'insight',
        toolName: 'vbi_insight',
        workspace,
      })
    }
    if (action === 'create') {
      const create = requireMethod<(input?: VBIResourceCreateInput) => Promise<unknown> | unknown>(
        'vbi_insight',
        insight,
        'create',
      )
      return createResult(
        'vbi_insight create completed',
        stripDsl(await create.call(insight, createInput('insight', params))),
      )
    }

    const id = requireString('vbi_insight', params, 'id')
    if (action === 'get') return createResult('vbi_insight get completed', stripDsl(await insight.describe?.(id)))
    if (action === 'rename') {
      const rename = requireMethod<(id: string, name: string) => Promise<unknown> | unknown>(
        'vbi_insight',
        insight,
        'rename',
      )
      return createResult(
        'vbi_insight rename completed',
        stripDsl(await rename.call(insight, id, requireString('vbi_insight', params, 'name'))),
      )
    }
    if (action === 'remove') {
      const remove = requireMethod<(id: string) => Promise<unknown> | unknown>('vbi_insight', insight, 'remove')
      return createResult('vbi_insight remove completed', stripDsl(await remove.call(insight, id)))
    }
    if (action === 'references') {
      const references = requireMethod<(id: string) => Promise<unknown> | unknown>('vbi_insight', insight, 'references')
      return createResult('vbi_insight references completed', stripDsl(await references.call(insight, id)))
    }
    throw new Error('vbi_insight.action must be create, get, rename, remove, references, or run')
  },

  vbi_report: async (_toolCallId, input) => {
    const params = asObject('vbi_report', input)
    const action = requireString('vbi_report', params, 'action')
    const report = requireSlot<VBIReportWorkspaceSlot>(workspace, 'report', 'vbi_report')
    if (action === 'run') {
      return runBuilderScript({
        code: requireString('vbi_report', params, 'code'),
        id: readString(params, 'id'),
        slot: report,
        slotGlobal: 'report',
        toolName: 'vbi_report',
        workspace,
      })
    }
    if (action === 'create') {
      const create = requireMethod<(input?: VBIResourceCreateInput) => Promise<unknown> | unknown>(
        'vbi_report',
        report,
        'create',
      )
      return createResult(
        'vbi_report create completed',
        stripDsl(await create.call(report, createInput('report', params))),
      )
    }

    const id = requireString('vbi_report', params, 'id')
    if (action === 'get') return createResult('vbi_report get completed', stripDsl(await report.describe?.(id)))
    if (action === 'rename') {
      const rename = requireMethod<(id: string, name: string) => Promise<unknown> | unknown>(
        'vbi_report',
        report,
        'rename',
      )
      return createResult(
        'vbi_report rename completed',
        stripDsl(await rename.call(report, id, requireString('vbi_report', params, 'name'))),
      )
    }
    if (action === 'remove') {
      const remove = requireMethod<(id: string) => Promise<unknown> | unknown>('vbi_report', report, 'remove')
      return createResult('vbi_report remove completed', stripDsl(await remove.call(report, id)))
    }
    if (action === 'exportSnapshot') {
      const exportSnapshot = requireMethod<(id: string) => Promise<unknown> | unknown>(
        'vbi_report',
        report,
        'exportSnapshot',
      )
      return createResult('vbi_report exportSnapshot completed', stripDsl(await exportSnapshot.call(report, id)))
    }
    if (action === 'page')
      return createResult('vbi_report page completed', stripDsl(await executeReportPageAction(report, params)))
    throw new Error('vbi_report.action must be create, get, rename, remove, exportSnapshot, page, or run')
  },
})
