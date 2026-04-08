export type ResourceKind = 'report' | 'chart' | 'insight';

export const buildRoomName = (type: ResourceKind, id: string) =>
  `${type}:${id}`;
