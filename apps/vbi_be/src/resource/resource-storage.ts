import { ResourceType } from '@prisma/client';
import type { PrismaService } from '../app/prisma.service';
import type { ResourceKind } from './resource.types';

const TYPE_MAP: Record<ResourceKind, ResourceType> = {
  report: ResourceType.report,
  chart: ResourceType.chart,
  insight: ResourceType.insight,
};

export const toResourceType = (type: ResourceKind) => TYPE_MAP[type];

export const findResource = (
  prisma: PrismaService,
  type: ResourceKind,
  id: string,
) => {
  if (type === 'report') {
    return prisma.report.findUnique({ where: { id } });
  }
  if (type === 'chart') {
    return prisma.chart.findUnique({ where: { id } });
  }
  return prisma.insight.findUnique({ where: { id } });
};

export const listResourceUpdates = async (
  prisma: PrismaService,
  type: ResourceKind,
  id: string,
) => {
  const updates = await prisma.collaborationUpdate.findMany({
    where: { resourceType: toResourceType(type), resourceId: id },
    orderBy: { id: 'asc' },
  });
  return updates.map((item) => new Uint8Array(item.data));
};

export const clearResourceUpdates = (
  prisma: PrismaService,
  type: ResourceKind,
  id: string,
) => {
  return prisma.collaborationUpdate.deleteMany({
    where: { resourceType: toResourceType(type), resourceId: id },
  });
};

export const appendResourceUpdate = (
  prisma: PrismaService,
  type: ResourceKind,
  id: string,
  data: Uint8Array,
) => {
  return prisma.collaborationUpdate.create({
    data: {
      resourceType: toResourceType(type),
      resourceId: id,
      data: Buffer.from(data),
    },
  });
};
