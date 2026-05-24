import type { AgentTool } from '@earendil-works/pi-agent-core'
import type { VBIAgentWorkspace } from '../types/index.js'
import { builderToolCommonRules, createScopedBuilderTool } from './builder-tool-common.js'

const chartBuilderDescription = [
  'Operate only a VBI chart builder. Globals: `chart` is the chart workspace slot, `builder` is an alias of `chart`, `workspace`, `json`, `assert`, and `console`.',
  builderToolCommonRules,
  'Open with `const b = await chart.open(id?)`. Snapshot with `await chart.snapshot(id?)`.',
  'Opened builder type: `VBIChartBuilder`. Top-level methods/properties from current source and API docs: `b.doc`, `b.dsl`, `b.adapters`, `b.undoManager`, `b.getUUID()`, `b.build()`, `b.buildVQuery()`, `await b.buildVSeed(options?)`, `await b.getSchema()`, `b.isEmpty()`, `b.applyUpdate(update, origin?)`, `b.encodeStateAsUpdate(targetStateVector?)`.',
  '`b.chartType`: `changeChartType(chartType)`, `getChartType()`, `getAvailableChartTypes()`, `getSupportedDimensionEncodings()`, `getRecommendedDimensionEncodings(dimensionCount?)`, `getSupportedMeasureEncodings()`, `getRecommendedMeasureEncodings(measureCount?)`, `toJSON()`, `observe(callback)`.',
  '`b.dimensions`: `add(field, node => ...)`, `remove(id)`, `update(id, node => ...)`, `find(predicate)`, `findAll()`, `toJSON()`, `observe(callback)`. Dimension node methods: `getId()`, `getField()`, `getEncoding()`, `getSort()`, `setAlias(alias)`, `setEncoding(encoding)`, `setSort(sort)`, `setAggregate(aggregate)`, `clearAggregate()`, `clearSort()`, `toJSON()`.',
  '`b.measures`: `add(field, node => ...)`, `remove(id)`, `update(id, node => ...)`, `find(predicate)`, `findAll()`, `toJSON()`, `observe(callback)`. Measure node methods: `getId()`, `getField()`, `getEncoding()`, `getSort()`, `getFormat()`, `setAlias(alias)`, `setEncoding(encoding)`, `setSort(sort)`, `setAggregate(aggregate)`, `setFormat(format)`, `clearFormat()`, `clearSort()`, `toJSON()`.',
  '`b.whereFilter` is row-level filtering before query aggregation. Methods: `add(field, node => ...)`, `addGroup("and"|"or", group => ...)`, `update(id, node => ...)`, `updateGroup(id, group => ...)`, `remove(idOrIndex)`, `find(predicate)`, `clear()`, `toJSON()`, `observe(callback)`. Where node methods: `getId()`, `getField()`, `setField(field)`, `getOperator()`, `setOperator(operator)`, `setValue(value)`, `setDate(predicate)`, `getDate()`, `toJSON()`. Where group methods: `getId()`, `getOperator()`, `setOperator(op)`, `add(...)`, `addGroup(...)`, `remove(idOrIndex)`, `clear()`, `toJSON()`.',
  '`b.havingFilter` is post-aggregation filtering. Methods mirror whereFilter: `add`, `addGroup`, `update`, `updateGroup`, `remove`, `find`, `clear`, `toJSON`, `observe`. Having node methods: `getId()`, `getField()`, `getOperator()`, `getAggregate()`, `setValue(value)`, `setOperator(operator)`, `setAggregate(aggregate)`, `toJSON()`. Having group methods mirror where groups.',
  '`b.theme`: `setTheme(theme)`, `getTheme()`, `toJSON()`, `observe(callback)`. `b.locale`: `setLocale(locale)`, `getLocale()`, `toJSON()`, `observe(callback)`. `b.limit`: `setLimit(limit)`, `getLimit()`, `toJSON()`, `observe(callback)`. `b.undoManager`: `undo()`, `redo()`, `canUndo()`, `canRedo()`, `clear(clearUndoStack?, clearRedoStack?)`.',
  'Connector-sensitive APIs such as `await b.getSchema()` and `await b.buildVSeed()` require the chart DSL connector id to be registered. If injected, use `workspace.connectors.register(id, connector)` or `await workspace.connectors.registerChart(chartId, connector)` before calling them.',
  'Example: `const b = await chart.open("chart-id"); b.chartType.changeChartType("bar"); b.dimensions.add("area", n => n.setAlias("Area").setEncoding("xAxis")); b.measures.add("sales", n => n.setAlias("Sales").setEncoding("yAxis").setAggregate({ func: "sum" })); return json({ dsl: b.build(), query: b.buildVQuery() });`',
].join('\n')

export const createChartBuilderTool = (workspace: VBIAgentWorkspace): AgentTool =>
  createScopedBuilderTool({
    description: chartBuilderDescription,
    label: 'VBI Chart Builder',
    name: 'vbi_chart_builder',
    slot: workspace.chart,
    slotGlobal: 'chart',
    workspace,
  })
