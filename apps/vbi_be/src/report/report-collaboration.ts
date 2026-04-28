import type { PrismaService } from '../app/prisma.service'
import { toPrismaBytes } from '../common/vbi-doc'

const prefix = 'report:'

export const buildReportRoomName = (id: string) => `${prefix}${id}`

export const parseReportRoomName = (value: string) => (value.startsWith(prefix) ? value.slice(prefix.length) : null)

export const findReportRecord = (prisma: PrismaService, id: string) => prisma.report.findUnique({ where: { id } })

export const listReportUpdates = async (prisma: PrismaService, id: string) => {
  const updates = await prisma.reportCollaborationUpdate.findMany({
    where: { reportId: id },
    orderBy: { id: 'asc' },
  })
  return updates.map((item) => new Uint8Array(item.data))
}

export const clearReportUpdates = (prisma: PrismaService, id: string) =>
  prisma.reportCollaborationUpdate.deleteMany({
    where: { reportId: id },
  })

export const appendReportUpdate = (prisma: PrismaService, id: string, data: Uint8Array) =>
  prisma.reportCollaborationUpdate.create({
    data: {
      reportId: id,
      data: Buffer.from(data),
    },
  })

export const storeReportSnapshot = (prisma: PrismaService, id: string, data: Uint8Array) =>
  prisma.report.update({
    where: { id },
    data: { data: toPrismaBytes(data) },
  })
