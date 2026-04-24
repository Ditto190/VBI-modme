export const howToUseVbiBuilderContent = `# How to use VBI Builder (for vbi_builder tool)

## Runtime
Call the vbi_builder tool with JavaScript code. Globals inside the script:
- \`client\` — resource provider factory: \`client.chart(id)\`, \`client.report(id)\`, \`client.insight(id)\`
- \`resource\` — 'chart' | 'report' | 'insight' (set by tool args)
- \`resourceId\` — UUID string
- \`json(value)\` — returns value as the script result
- \`assert(cond, msg)\` — throws on false
- \`console\` — logs captured into the tool result
Lifecycle: \`const p = client.chart(id); const b = await p.open(); ...mutate...; return json(b.build());\`
Providers auto-close after the script returns. \`open()\`, \`buildVSeed()\`, \`getSchema()\` are async — always await.

## Chart Builder (client.chart(id).open())
Top-level: \`chartType\`, \`dimensions\`, \`measures\`, \`whereFilter\`, \`havingFilter\`, \`theme\`, \`locale\`, \`limit\`, \`undoManager\`, \`build()\`, \`buildVQuery()\`, \`buildVSeed(options?)\`, \`isEmpty()\`, \`getSchema()\`.

### chartType
- \`changeChartType(type)\` / \`getChartType()\` / \`getAvailableChartTypes()\`
- \`getSupportedDimensionEncodings()\` / \`getRecommendedDimensionEncodings(count)\`
- \`getSupportedMeasureEncodings()\` / \`getRecommendedMeasureEncodings(count)\`
- Types: table, pivotTable, column, columnParallel, columnPercent, line, area, areaPercent, bar, barParallel, barPercent, pie, donut, scatter, heatmap, sunburst, treeMap, funnel, boxplot, histogram, radar, rose, roseParallel, dualAxis, circlePacking, raceBar, raceColumn, raceLine, raceScatter, racePie, raceDonut.

### dimensions (categorical)
- \`add(field, node => ...)\`, \`remove(id)\`, \`update(id, cb)\`, \`find(p)\`, \`findAll()\`, \`toJSON()\`
- DimensionNode: \`setAlias(name)\`, \`setEncoding(value)\`, \`setSort({order:'asc'|'desc'})\`, \`setAggregate({func})\`, \`clearSort()\`, \`clearAggregate()\`, \`getId()\`
- Dimension encodings (by chart): xAxis / yAxis / color / detail / tooltip / label / row / column / hierarchy (treeMap,sunburst,circlePacking) / angle (rose,radar,roseParallel) / player (race*)
- Dimension aggregate funcs (date bucketing only): toYear, toQuarter, toMonth, toWeek, toDay, toHour, toMinute, toSecond

### measures (numeric)
- \`add(field, node => ...)\`, \`remove(id)\`, \`update(id, cb)\`, \`find(p)\`, \`findAll()\`, \`toJSON()\`
- MeasureNode: \`setAlias(name)\`, \`setEncoding(value)\`, \`setAggregate({func, quantile?})\`, \`setFormat({autoFormat:true}|{...NumFormat})\`, \`setSort({order})\`, \`clearSort()\`, \`clearFormat()\`, \`getId()\`
- Measure encodings (by chart): yAxis, xAxis, primaryYAxis/secondaryYAxis (dualAxis), angle (pie,donut), radius (rose,radar,roseParallel), size (scatter,funnel,treeMap,sunburst,circlePacking), color, detail, label, tooltip, value/q1/q3/min/max/median/outliers (boxplot), value/x0/x1 (histogram)
- Measure aggregate funcs: sum, count, countDistinct, avg, min, max, variance, variancePop, stddev, median, quantile (pass \`quantile\` 0..1)

### whereFilter (row-level, pre-aggregation)
- \`add(field, node => ...)\`, \`addGroup('and'|'or', g => ...)\`, \`update(id, cb)\`, \`updateGroup(id, cb)\`, \`remove(idOrIndex)\`, \`find(p)\`, \`clear()\`
- WhereNode: \`setField(f)\`, \`setOperator(op)\`, \`setValue(v)\`, \`setDate({type:'relative'|'absolute', unit, ...})\`
- WhereGroup: \`getOperator()\`, \`setOperator('and'|'or')\`, \`add(field, cb)\`, \`addGroup(op, cb)\`, \`remove(idOrIndex)\`, \`clear()\`
- Operators: ==, !=, <, >, <=, >=, contains, startsWith, in (array), between ([min,max])

### havingFilter (group-level, post-aggregation)
- Same shape as whereFilter. Nodes need \`setAggregate({func})\` before \`setOperator/setValue\` because it filters aggregated values.

### theme / locale / limit / undoManager
- \`theme.setTheme(name)\` / \`getTheme()\`
- \`locale.setLocale('zh-CN'|'en-US'|...)\` / \`getLocale()\`
- \`limit.setLimit(n)\` / \`getLimit()\`
- \`undoManager.undo()\` / \`redo()\` / \`canUndo()\` / \`canRedo()\` / \`clear(clearUndo?, clearRedo?)\`

## Report Builder (client.report(id).open())
- \`page.add(title, page => page.setChartId(chartBuilder|uuid))\` or \`page.setInsightId(...)\`
- \`page.remove(pageId)\`, \`page.update(pageId, cb)\`, \`page.get(pageId)\`
- ReportPageBuilder: \`setTitle\`, \`setChartId\`, \`setInsightId\`, \`.chart\`, \`.insight\`, \`toJSON()\`
- \`getChartBuilder(id)\`, \`getInsightBuilder(id)\`, \`build()\`, \`isEmpty()\`

## Insight Builder (client.insight(id).open())
- \`setContent(markdown)\`, \`build()\`, \`isEmpty()\`, \`undoManager\`

## Common patterns

Bar chart of total 2024 sales by region:
\`\`\`js
const b = await client.chart(resourceId).open();
b.chartType.changeChartType('bar');
b.dimensions.add('region', n => n.setEncoding('yAxis'));
b.measures.add('sales', n => n.setEncoding('xAxis').setAggregate({ func: 'sum' }));
b.whereFilter.add('year', n => n.setOperator('==').setValue(2024));
b.limit.setLimit(100);
return json({ dsl: b.build() });
\`\`\`

Grouped column with monthly bucket, multi-measure, having:
\`\`\`js
const b = await client.chart(resourceId).open();
b.chartType.changeChartType('column');
b.dimensions.add('date', n => n.setEncoding('xAxis').setAggregate({ func: 'toMonth' }));
b.dimensions.add('category', n => n.setEncoding('color'));
b.measures.add('revenue', n => n.setEncoding('yAxis').setAggregate({ func: 'sum' }));
b.measures.add('profit',  n => n.setEncoding('yAxis').setAggregate({ func: 'sum' }));
b.whereFilter.add('status', n => n.setOperator('==').setValue('completed'));
b.havingFilter.add('revenue', n => n.setAggregate({ func: 'sum' }).setOperator('>').setValue(50000));
return json({ dsl: b.build() });
\`\`\`

Nested where groups (status='active' AND (region='A' OR region='B')):
\`\`\`js
b.whereFilter.add('status', n => n.setOperator('==').setValue('active'));
b.whereFilter.addGroup('or', g => {
  g.add('region', n => n.setOperator('==').setValue('A'));
  g.add('region', n => n.setOperator('==').setValue('B'));
});
\`\`\`

Two-page report embedding two charts:
\`\`\`js
const r = await client.report(resourceId).open();
const c1 = await client.chart('chart-1').open();
c1.chartType.changeChartType('pie');
c1.dimensions.add('product', n => n.setEncoding('color'));
c1.measures.add('sales',   n => n.setEncoding('angle').setAggregate({ func: 'sum' }));
r.page.add('Sales', p => p.setChartId(c1));
return json({ dsl: r.build() });
\`\`\`

## Gotchas
- Callbacks on \`.add/.update\` run synchronously and mutate the Y.Doc; no deferred execution.
- Switching chartType re-applies encodings; previously-invalid encodings are remapped automatically.
- Where filters raw rows; Having filters aggregated groups — don't swap them.
- Measure encoding must match the chart type (e.g. \`angle\` only for pie/donut/racePie/raceDonut). Query \`getSupportedMeasureEncodings()\` when unsure.
- \`buildVSeed()\` is async and expensive (goes to backend) — prefer \`build()\` for inspecting DSL.
- IDs are auto-generated. Use \`getId()\` inside the \`add\` callback or via \`find()\` if you need to \`update\`/\`remove\` later.
- Dimensions use \`setAggregate\` only for date bucketing; numeric aggregation belongs on measures.
`
