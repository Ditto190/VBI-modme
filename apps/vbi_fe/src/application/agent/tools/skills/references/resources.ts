export const resourcesSkill = `
# Resource Application API

Use application.chart, application.insight, and application.report for resource workflows.

Shared resource commands:
- await application.chart.list()
- await application.chart.create({ name })
- await application.chart.open(id)
- await application.chart.rename({ id, name })
- await application.chart.delete(id)
- application.chart.activate({ userName })
- application.chart.records.search(text)
- application.chart.records.select(ids)
- await application.chart.records.deleteSelected()
- application.chart.editor.connect(id, userName)
- await application.chart.editor.release(id)

Use the same shape for insight and report:
- application.insight.*
- application.report.*

Resource state:
- application.chart.records.loading
- application.chart.records.searchText
- application.chart.records.selectedIds
- application.chart.records.visibleItems
- application.chart.editor.builders

Call list() before open(id), rename({ id, name }), delete(id), editor.connect(id, userName), or records.select(ids).
Use ids returned from list(), not display names, once a resource has been found. Human names may be
empty or duplicated. If selecting from records.visibleItems, activate the resource list first and verify
every selected id is visible or returned by list(). Do not invent ids.

Example:

const items = await application.chart.list();
const target = items.find((item) => item.name?.includes("Revenue"));
assert(target, "No Revenue chart found");
assert(items.some((item) => item.id === target.id), "Chart id must be returned by application.chart.list()");
await application.chart.open(target.id);
application.chart.records.select([target.id]);
return json({ openedChartId: target.id, selectedIds: snapshot().chart.records.selectedIds, routeState: snapshot().chart.records });
`.trim()
