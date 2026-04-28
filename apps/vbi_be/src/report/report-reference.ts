import type { PrismaService } from '../app/prisma.service'
import { buildReportDSL } from '../common/vbi-doc'

type ResourceUsage = { reportId: string; pageId: string }

export const findReportUsages = async (prisma: PrismaService, target: { chartId?: string; insightId?: string }) => {
  const reports = await prisma.report.findMany()
  const usages: ResourceUsage[] = []

  for (const report of reports) {
    const dsl = buildReportDSL(new Uint8Array(report.data))
    for (const page of dsl.pages) {
      if (target.chartId && page.chartId === target.chartId) {
        usages.push({ reportId: report.id, pageId: page.id })
      }
      if (target.insightId && page.insightId === target.insightId) {
        usages.push({ reportId: report.id, pageId: page.id })
      }
    }
  }

  return usages
}
