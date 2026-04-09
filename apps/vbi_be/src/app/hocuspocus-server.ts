import { Logger } from '@hocuspocus/extension-logger';
import { Server } from '@hocuspocus/server';
import * as Y from 'yjs';
import { PrismaService } from './prisma.service';
import { resolveRoom } from './hocuspocus-handlers';
import { loadDoc } from '../common/vbi-doc';
import { getCollaborationPort } from '../common/collaboration';

export class HocuspocusServer {
  private server: Server;

  constructor(private prisma: PrismaService) {
    this.server = new Server({
      port: getCollaborationPort(),
      address: '0.0.0.0',
      yDocOptions: { gc: false, gcFilter: () => false },
      extensions: [new Logger()],
      timeout: 30000,
      debounce: 5000,
      maxDebounce: 30000,
      quiet: true,
      onAuthenticate: () => Promise.resolve({ user: { id: 'anonymous' } }),
      onLoadDocument: async ({ documentName }) => {
        const room = resolveRoom(documentName);
        const record = await room.handler.findRecord(this.prisma, room.id);
        if (!record)
          throw new Error(`${room.handler.label} ${room.id} not found`);
        return loadDoc(
          new Uint8Array(record.data),
          await room.handler.listUpdates(this.prisma, room.id),
        );
      },
      onStoreDocument: async ({ document, documentName }) => {
        const room = resolveRoom(documentName);
        await room.handler.storeSnapshot(
          this.prisma,
          room.id,
          Y.encodeStateAsUpdate(document),
        );
      },
      onChange: async ({ documentName, update }) => {
        const room = resolveRoom(documentName);
        await room.handler.appendUpdate(this.prisma, room.id, update);
      },
    });
  }

  async start() {
    await this.server.listen(getCollaborationPort());
  }

  async stop() {
    await this.server.destroy();
  }
}
