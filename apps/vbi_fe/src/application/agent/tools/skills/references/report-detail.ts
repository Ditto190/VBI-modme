export const reportDetailSkill = `
# Report Detail Application API

Use application.reportDetail for report workspace page operations.

Commands:
- application.reportDetail.activate(reportId, userName)
- application.reportDetail.connect(reportId, userName)
- await application.reportDetail.addPage()
- await application.reportDetail.removePage(pageId)
- await application.reportDetail.selectPage(pageId)
- application.reportDetail.setScrolledPage(pageId)
- await application.reportDetail.syncActivePage()
- await application.reportDetail.addChart(pageId)
- await application.reportDetail.removeChart(pageId)
- await application.reportDetail.addInsight(pageId)
- await application.reportDetail.removeInsight(pageId)

State:
- application.reportDetail.reportId
- application.reportDetail.activePageId
- application.reportDetail.pages
- application.reportDetail.pageSections
- application.reportDetail.reportBuilder
- application.reportDetail.connectedChartIds
- application.reportDetail.connectedInsightIds
- application.reportDetail.pageActionBusy

Call activate when the user wants to navigate to and operate a report detail page. Keep the cleanup
function only if the script owns a temporary lifecycle. Before page commands, derive pageId from
application.reportDetail.pages or application.reportDetail.pageSections and assert it exists. Before
addChart/addInsight/removeChart/removeInsight, verify the page section has the expected hasChart or
hasInsight state for the operation. Do not invent page ids.

Example:

const cleanup = application.reportDetail.activate("report-1", "VBI Agent");
await waitFor(() => snapshot().reportDetail.reportId === "report-1");
const pages = snapshot().reportDetail.pages;
const targetPage = pages.find((page) => page.id === snapshot().reportDetail.activePageId) ?? pages[0];
assert(targetPage, "Report detail must expose at least one page before page operations");
assert(pages.some((page) => page.id === targetPage.id), "Page id must be returned by application.reportDetail.pages");
await application.reportDetail.selectPage(targetPage.id);
return json({ reportId: snapshot().reportDetail.reportId, activePageId: snapshot().reportDetail.activePageId, pages });
`.trim()
