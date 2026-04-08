import { Server } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';
import * as Y from 'yjs';
import { PrismaService } from '../app/prisma.service';
import {
  createChartDoc,
  createInsightDoc,
  createReportDoc,
  encodeDoc,
  loadDoc,
  toPrismaBytes,
} from '../resource/resource-doc';
import {
  appendResourceUpdate,
  clearResourceUpdates,
  findResource,
  listResourceUpdates,
} from '../resource/resource-storage';
import { parseRoomName } from '../resource/resource-room';
import type { ResourceKind } from '../resource/resource.types';

export class HocuspocusServer {
  private server: Server;

  constructor(private prisma: PrismaService) {
    this.server = new Server({
      port: 1234,
      address: '0.0.0.0',
      yDocOptions: { gc: false, gcFilter: () => false }, // 关闭 GC 是为了做历史版本功能
      extensions: [new Logger()],
      timeout: 30000,
      debounce: 5000,
      maxDebounce: 30000,
      quiet: true,

      onAuthenticate: async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        // Add authentication logic here if needed
        // For example, validate JWT token from data.headers
        return { user: { id: 'anonymous' } };
      },
      onLoadDocument: async (data) => {
        const room = parseRoomName(data.documentName);
        await this.ensureResource(room.type, room.id);
        const record = await findResource(this.prisma, room.type, room.id);
        const updates = await listResourceUpdates(
          this.prisma,
          room.type,
          room.id,
        );
        return loadDoc(
          record ? new Uint8Array(record.data) : undefined,
          updates,
        );
      },
      onStoreDocument: async (data) => {
        const room = parseRoomName(data.documentName);
        await this.upsertResource(
          room.type,
          room.id,
          toPrismaBytes(Y.encodeStateAsUpdate(data.document)),
        );
        await clearResourceUpdates(this.prisma, room.type, room.id);
      },
      onChange: async (data) => {
        const room = parseRoomName(data.documentName);
        await appendResourceUpdate(
          this.prisma,
          room.type,
          room.id,
          data.update,
        );
      },
    });
  }

  async start() {
    await this.server.listen(1234);
  }

  async stop() {
    await this.server.destroy();
  }

  private async ensureResource(type: ResourceKind, id: string) {
    const record = await findResource(this.prisma, type, id);
    if (record) {
      return;
    }
    const data = this.createDefaultSnapshot(type, id);
    await this.upsertResource(type, id, data);
  }

  private async upsertResource(
    type: ResourceKind,
    id: string,
    data: Uint8Array,
  ) {
    if (type === 'report') {
      await this.prisma.report.upsert({
        where: { id },
        update: { data: toPrismaBytes(data) },
        create: { id, name: 'Untitled Report', data: toPrismaBytes(data) },
      });
      return;
    }
    if (type === 'chart') {
      await this.prisma.chart.upsert({
        where: { id },
        update: { data: toPrismaBytes(data) },
        create: { id, name: 'Untitled Chart', data: toPrismaBytes(data) },
      });
      return;
    }
    await this.prisma.insight.upsert({
      where: { id },
      update: { data: toPrismaBytes(data) },
      create: { id, name: 'Untitled Insight', data: toPrismaBytes(data) },
    });
  }

  private createDefaultSnapshot(type: ResourceKind, id: string) {
    if (type === 'report') {
      return encodeDoc(createReportDoc(id));
    }
    if (type === 'chart') {
      return encodeDoc(createChartDoc(id));
    }
    return encodeDoc(createInsightDoc(id));
  }
}
