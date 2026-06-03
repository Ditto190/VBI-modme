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

Call activate when the user wants to navigate to and operate a report detail page. Keep the cleanup function only if the script owns a temporary lifecycle.

Example:

const cleanup = application.reportDetail.activate("report-1", "VBI Agent");
await waitFor(() => snapshot().reportDetail.reportId === "report-1");
return json({ reportId: snapshot().reportDetail.reportId, activePageId: snapshot().reportDetail.activePageId });
`.trim()
