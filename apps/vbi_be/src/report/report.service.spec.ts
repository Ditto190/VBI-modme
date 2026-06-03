jest.mock('../common/vbi-doc', () => ({
  buildChartDSL: jest.fn(),
  buildInsightDSL: jest.fn(),
  buildReportDSL: jest.fn(() => ({ pages: [] })),
  createChartDoc: jest.fn(),
  createInsightDoc: jest.fn(),
  createReportDoc: jest.fn((id: string, pages: unknown[]) => ({ id, pages })),
  encodeDoc: jest.fn((doc: { pages: unknown[] }) => new Uint8Array([doc.pages.length])),
  toPrismaBytes: jest.fn((data: Uint8Array) => data),
}))

import { createReportDoc } from '../common/vbi-doc'
import { ReportService } from './report.service'

describe('ReportService', () => {
  test('creates an empty report without default chart or insight resources', async () => {
    const createdAt = new Date('2026-01-01T00:00:00.000Z')
    let createdReport: { createdAt: Date; data: Uint8Array; id: string; name: string; updatedAt: Date } | null = null
    const prisma = {
      $transaction: jest.fn(),
      chart: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
      insight: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
      report: {
        create: jest.fn(async ({ data }) => {
          createdReport = {
            createdAt,
            data: data.data,
            id: data.id,
            name: data.name,
            updatedAt: createdAt,
          }
          return createdReport
        }),
        findUnique: jest.fn(async () => createdReport),
      },
    }
    const service = new ReportService(prisma as never)

    const report = await service.create({ name: ' Empty Report ' })
    const createInput = prisma.report.create.mock.calls[0]?.[0].data

    expect(prisma.$transaction).not.toHaveBeenCalled()
    expect(prisma.chart.create).not.toHaveBeenCalled()
    expect(prisma.insight.create).not.toHaveBeenCalled()
    expect(createInput.name).toBe('Empty Report')
    expect(createReportDoc).toHaveBeenCalledWith(createInput.id, [])
    expect(report.pages).toEqual([])
  })
})
