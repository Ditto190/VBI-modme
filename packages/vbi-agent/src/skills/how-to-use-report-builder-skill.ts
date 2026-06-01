export const reportBuilderSkill = `
# How to Use Report Builder Skill

Use this skill when the user asks to create, inspect, rename, remove, export, or edit a VBI report. A report is made from pages that can reference chart and insight resources.

Use <code>vbi_resource_lookup</code> first when the report, chart, or insight id is not already known.

## vbi_report input contract

Accepted fields are <code>action</code>, <code>id</code>, <code>name</code>, <code>code</code>, <code>pageAction</code>, <code>pageId</code>, <code>pageIds</code>, <code>title</code>, <code>chartId</code>, and <code>insightId</code>.

Resource actions:

- <code>action: "create"</code>: creates a report resource. Optional <code>name</code>.
- <code>action: "get"</code>: reads provider metadata for one report. Requires <code>id</code>. The tool output strips any <code>dsl</code> field; use <code>run</code> to inspect full report DSL.
- <code>action: "rename"</code>: renames one report. Requires <code>id</code> and <code>name</code>.
- <code>action: "remove"</code>: removes one report. Requires <code>id</code>.
- <code>action: "exportSnapshot"</code>: exports <code>{ report, charts, insights }</code> through the provider. Requires <code>id</code>.
- <code>action: "run"</code>: opens a report Builder and runs JavaScript. Requires <code>code</code>; optional <code>id</code>.

Page actions use <code>action: "page"</code> and require report <code>id</code>:

- <code>pageAction: "create"</code>: optional <code>title</code>. Creates a page.
- <code>pageAction: "update"</code>: requires <code>pageId</code>; optional <code>title</code>, <code>chartId</code>, <code>insightId</code>.
- <code>pageAction: "remove"</code>: requires <code>pageId</code>.
- <code>pageAction: "reorder"</code>: requires <code>pageIds: string[]</code>.

Example: create a report.

~~~json
{
  "action": "create",
  "name": "Monthly business review"
}
~~~

Example: add a report page.

~~~json
{
  "action": "page",
  "id": "report-id-from-vbi_resource_lookup",
  "pageAction": "create",
  "title": "Sales overview"
}
~~~

Example: update a report page to attach chart and insight ids.

~~~json
{
  "action": "page",
  "id": "report-id-from-vbi_resource_lookup",
  "pageAction": "update",
  "pageId": "page-id-from-report-dsl",
  "title": "Sales and profit overview",
  "chartId": "chart-id-from-vbi_resource_lookup",
  "insightId": "insight-id-from-vbi_resource_lookup"
}
~~~

Example: reorder report pages.

~~~json
{
  "action": "page",
  "id": "report-id-from-vbi_resource_lookup",
  "pageAction": "reorder",
  "pageIds": ["summary-page-id", "detail-page-id", "appendix-page-id"]
}
~~~

## Run scripts

For <code>action: "run"</code>, the script receives <code>report</code>, <code>builder</code>, <code>workspace</code>, <code>json</code>, <code>assert</code>, and <code>console</code>. <code>builder</code> is an alias of <code>report</code>.

Open with <code>const b = await report.open()</code> when the tool input has <code>id</code>; use <code>await report.open("report-id")</code> only when the script must choose the id.

The opened object is <code>VBIReportBuilder</code>. Public properties are <code>b.doc</code>, <code>b.dsl</code>, <code>b.undoManager</code>, and <code>b.page</code>.

## VBIReportBuilder interface

- <code>b.getUUID(): string</code>: stable report uuid.
- <code>b.build(): VBIReportDSL</code>: returns <code>{ uuid, pages, version }</code>. <code>pages</code> defaults to an empty array and <code>version</code> defaults to 0.
- <code>b.snapshot(): VBIReportSnapshotDSL</code>: returns <code>{ report, charts, insights }</code>. Requires a resource registry; otherwise throws <code>Report snapshot requires a resource registry</code>.
- <code>b.isEmpty(): boolean</code>: true when the report has no pages.
- <code>b.getChartBuilder(chartId)</code>: resolves a referenced chart builder from an injected registry. Returns <code>undefined</code> when missing or no registry is available.
- <code>b.getInsightBuilder(insightId)</code>: resolves a referenced insight builder from an injected registry. Returns <code>undefined</code> when missing or no registry is available.
- <code>b.encodeStateAsUpdate(targetStateVector?)</code>: returns a Yjs update.
- <code>b.applyUpdate(update, origin?)</code>: applies a Yjs update.
- <code>b.undoManager.undo()</code>, <code>redo()</code>, <code>canUndo()</code>, <code>canRedo()</code>, <code>clear(clearUndoStack?, clearRedoStack?)</code>.

Report page DSL shape:

- <code>{ id: string, title: string, chartId?: string, insightId?: string }</code>.
- Builder output defaults missing <code>chartId</code> and <code>insightId</code> to empty strings.

## b.page collection

<code>b.page</code> is <code>ReportPageCollectionBuilder</code>.

- <code>add(title, callback?)</code>: creates a page with generated id and title, optionally calls <code>callback(page)</code>, and returns the parent report builder. Because it returns the parent, chaining another page add is <code>b.page.add("A").page.add("B")</code>.
- <code>remove(pageId)</code>: removes the page if present and returns parent report builder. Missing ids are ignored.
- <code>reorder(pageIds)</code>: replaces order. <code>pageIds</code> must contain every current page id exactly once. Throws on count mismatch, duplicate ids, or unknown ids. Returns parent report builder.
- <code>update(pageId, callback)</code>: finds a page and calls <code>callback(page)</code>. Throws <code>Report page with id "..." not found</code> when missing. Returns parent report builder.
- <code>get(pageId)</code>: returns <code>ReportPageBuilder | undefined</code>.

Report page builder:

- <code>page.getId()</code>: returns page id.
- <code>page.chart</code>: getter resolving <code>VBIChartBuilder | undefined</code> through report registry.
- <code>page.insight</code>: getter resolving <code>VBIInsightBuilder | undefined</code> through report registry.
- <code>page.setTitle(title)</code>: sets title and returns page.
- <code>page.setChartId(chartRef)</code>: accepts a string id or a builder-like object with <code>getUUID()</code>; returns page.
- <code>page.setInsightId(insightRef)</code>: accepts a string id or a builder-like object with <code>getUUID()</code>; returns page.
- <code>page.toJSON()</code>: returns one report page DSL object.

Example: edit pages through the report Builder.

~~~js
const b = await report.open();
assert(b.isEmpty(), "new report is expected to start without pages");

b.page.add("Regional sales overview", page => {
  page.setChartId("regional-sales-chart-id");
  page.setInsightId("regional-sales-insight-id");
});

b.page.add("Customer segment profit", page => {
  page.setChartId("customer-segment-chart-id");
  page.setInsightId("customer-segment-insight-id");
});

b.page.add("Temporary appendix", page => {
  page.setChartId("regional-sales-chart-id");
});

const draft = b.build();
const customerSegmentPage = draft.pages[1];
const temporaryAppendixPage = draft.pages[2];

b.page.update(customerSegmentPage.id, page => {
  page.setTitle("Customer segment profit review");
});

const updated = b.page.get(customerSegmentPage.id);
assert(updated?.toJSON().title === "Customer segment profit review", "page title should update");

b.page.remove(temporaryAppendixPage.id);
const remainingIds = b.build().pages.map(page => page.id);
b.page.reorder(remainingIds);

return json({
  report: b.build(),
  snapshot: b.snapshot()
});
~~~

Example tool input for a run script.

~~~json
{
  "action": "run",
  "id": "report-id-from-vbi_resource_lookup",
  "code": "const b = await report.open();\\nb.page.add(\\"Sales overview\\", page => page.setChartId(\\"chart-id\\").setInsightId(\\"insight-id\\"));\\nreturn json({ report: b.build() });"
}
~~~

Example: sync report state.

~~~js
const source = await report.open("source-report-id");
const target = await report.open("target-report-id");
target.applyUpdate(source.encodeStateAsUpdate(), "copy-report-pages");
return json({ target: target.build() });
~~~
`.trim()
