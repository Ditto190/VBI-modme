export const RESOURCE_TYPES = ['report', 'chart', 'insight'] as const;

export type ResourceKind = (typeof RESOURCE_TYPES)[number];
