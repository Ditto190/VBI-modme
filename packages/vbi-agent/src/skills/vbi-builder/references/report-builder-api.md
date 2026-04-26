# Report Builder API

Open reports with `const r = await report.open('report-id')`, or omit the id
when the CLI was started with `--report-id`.

Common operations:

- `r.page.add(title, page => page.setChartId(chartBuilderOrId))`
- `r.page.add(title, page => page.setInsightId(insightBuilderOrId))`
- `r.page.remove(pageId)`
- `r.page.update(pageId, cb)`
- `r.page.get(pageId)`
- `r.build()`
- `r.isEmpty()`
