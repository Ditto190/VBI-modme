import { useState, useEffect, useEffectEvent } from 'react';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import {
  VBIChartBuilder,
  VBIInsightBuilder,
  VBIReportBuilder,
} from '@visactor/vbi';
import { buildRoomName, type ResourceKind } from '../utils/resourceRoom';

const getRandomColor = () => {
  const colors = [
    '#f56a00',
    '#7265e6',
    '#ffbf00',
    '#00a2ae',
    '#1890ff',
    '#52c41a',
    '#f5222d',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

type BuilderMap = {
  chart: VBIChartBuilder;
  insight: VBIInsightBuilder;
  report: VBIReportBuilder;
};

export const useCollaborativeBuilder = <TType extends ResourceKind>(
  type: TType,
  resourceId: string,
  userName: string,
  revision = 0,
) => {
  const [builder, setBuilder] = useState<BuilderMap[TType] | null>(null);
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const roomName = resourceId ? buildRoomName(type, resourceId) : '';

  const createBuilder = useEffectEvent((doc: Y.Doc) => {
    if (type === 'chart') {
      setBuilder(() => new VBIChartBuilder(doc) as BuilderMap[TType]);
      return;
    }
    if (type === 'insight') {
      setBuilder(() => new VBIInsightBuilder(doc) as BuilderMap[TType]);
      return;
    }
    setBuilder(() => new VBIReportBuilder(doc) as BuilderMap[TType]);
  });

  const destroyBuilder = useEffectEvent(() => {
    setBuilder(null);
  });

  useEffect(() => {
    if (!roomName) {
      return;
    }

    const doc = new Y.Doc();

    const provider = new HocuspocusProvider({
      url: `ws://localhost:3000/collaboration`,
      name: roomName,
      document: doc,
    });

    // 感知协议
    provider.awareness?.setLocalStateField('user', {
      id: userName,
      name: userName,
      color: getRandomColor(),
      updatedAt: Date.now(),
    });

    // 同步状态
    provider.on('synced', ({ state }: { state: boolean }) => {
      console.log('Connection state:', state);
      setIsConnected(state);
      if (state) {
        createBuilder(doc);
        setProvider(provider);
      }
    });

    return () => {
      destroyBuilder();
      provider.destroy();
      doc.destroy();
    };
  }, [revision, roomName, userName, type]);

  return { builder, provider, isConnected };
};
