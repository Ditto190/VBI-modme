export const reportDetailSkill = `
# Report Detail Application API

Use application.getState().reportDetail for report workspace page operations.

Commands:
- application.getState().reportDetail.activate(reportId, userName)
- application.getState().reportDetail.connect(reportId, userName)
- await application.getState().reportDetail.addPage()
- await application.getState().reportDetail.removePage(pageId)
- await application.getState().reportDetail.selectPage(pageId)
- application.getState().reportDetail.setScrolledPage(pageId)
- await application.getState().reportDetail.syncActivePage()
- await application.getState().reportDetail.addChart(pageId)
- await application.getState().reportDetail.removeChart(pageId)
- await application.getState().reportDetail.addInsight(pageId)
- await application.getState().reportDetail.removeInsight(pageId)

State:
- application.getState().reportDetail.reportId
- application.getState().reportDetail.activePageId
- application.getState().reportDetail.pages
- application.getState().reportDetail.pageSections
- application.getState().reportDetail.reportBuilder
- application.getState().reportDetail.connectedChartIds
- application.getState().reportDetail.connectedInsightIds
- application.getState().reportDetail.pageActionBusy

Call activate when the user wants to navigate to and operate a report detail page. Keep the cleanup
function only if the script owns a temporary lifecycle. Before page commands, derive pageId from
application.getState().reportDetail.pages or application.getState().reportDetail.pageSections and assert it exists. Before
addChart/addInsight/removeChart/removeInsight, verify the page section has the expected hasChart or
hasInsight state for the operation. Do not invent page ids.

Example:

const cleanup = application.getState().reportDetail.activate("report-1", "VBI Agent");
await waitFor(() => snapshot().reportDetail.reportId === "report-1");
const pages = snapshot().reportDetail.pages;
const targetPage = pages.find((page) => page.id === snapshot().reportDetail.activePageId) ?? pages[0];
assert(targetPage, "Report detail must expose at least one page before page operations");
assert(pages.some((page) => page.id === targetPage.id), "Page id must be returned by application.getState().reportDetail.pages");
await application.getState().reportDetail.selectPage(targetPage.id);
return json({ reportId: snapshot().reportDetail.reportId, activePageId: snapshot().reportDetail.activePageId, pages });
`.trim()
