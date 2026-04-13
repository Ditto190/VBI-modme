import type { PrismaService } from '../app/prisma.service';
import { toPrismaBytes } from '../common/vbi-doc';

const prefix = 'chart:';

export const buildChartRoomName = (id: string) => `${prefix}${id}`;

export const parseChartRoomName = (value: string) =>
  value.startsWith(prefix) ? value.slice(prefix.length) : null;

export const findChartRecord = (prisma: PrismaService, id: string) =>
  prisma.chart.findUnique({ where: { id } });

export const listChartUpdates = async (prisma: PrismaService, id: string) => {
  const updates = await prisma.chartCollaborationUpdate.findMany({
    where: { chartId: id },
    orderBy: { id: 'asc' },
  });
  return updates.map((item) => new Uint8Array(item.data));
};

export const clearChartUpdates = (prisma: PrismaService, id: string) =>
  prisma.chartCollaborationUpdate.deleteMany({
    where: { chartId: id },
  });

export const appendChartUpdate = (
  prisma: PrismaService,
  id: string,
  data: Uint8Array,
) =>
  prisma.chartCollaborationUpdate.create({
    data: {
      chartId: id,
      data: Buffer.from(data),
    },
  });

export const storeChartSnapshot = (
  prisma: PrismaService,
  id: string,
  data: Uint8Array,
) =>
  prisma.chart.update({
    where: { id },
    data: { data: toPrismaBytes(data) },
  });
