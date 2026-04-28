import type { PrismaService } from '../app/prisma.service'
import { toPrismaBytes } from '../common/vbi-doc'

const prefix = 'insight:'

export const buildInsightRoomName = (id: string) => `${prefix}${id}`

export const parseInsightRoomName = (value: string) => (value.startsWith(prefix) ? value.slice(prefix.length) : null)

export const findInsightRecord = (prisma: PrismaService, id: string) => prisma.insight.findUnique({ where: { id } })

export const listInsightUpdates = async (prisma: PrismaService, id: string) => {
  const updates = await prisma.insightCollaborationUpdate.findMany({
    where: { insightId: id },
    orderBy: { id: 'asc' },
  })
  return updates.map((item) => new Uint8Array(item.data))
}

export const clearInsightUpdates = (prisma: PrismaService, id: string) =>
  prisma.insightCollaborationUpdate.deleteMany({
    where: { insightId: id },
  })

export const appendInsightUpdate = (prisma: PrismaService, id: string, data: Uint8Array) =>
  prisma.insightCollaborationUpdate.create({
    data: {
      insightId: id,
      data: Buffer.from(data),
    },
  })

export const storeInsightSnapshot = (prisma: PrismaService, id: string, data: Uint8Array) =>
  prisma.insight.update({
    where: { id },
    data: { data: toPrismaBytes(data) },
  })
