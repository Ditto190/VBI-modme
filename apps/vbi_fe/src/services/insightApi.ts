import { withApiErrorToast } from './apiClient';
import {
  getResourceHandle,
  listResources,
  removeResource,
} from './resourceApi';
import type { InsightRecord } from '../types';

const mapInsightDetail = (detail: {
  id: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  dsl: { content?: string };
}): InsightRecord => ({
  id: detail.id,
  name: detail.name,
  createdAt: detail.createdAt,
  updatedAt: detail.updatedAt,
  content: detail.dsl.content ?? '',
});

const fetchInsightDetail = (id: string) =>
  getResourceHandle('insight', id).getDetail().then(mapInsightDetail);

export const fetchInsights = () => listResources('insight');

export const fetchInsight = (id: string) =>
  withApiErrorToast(fetchInsightDetail(id), '加载洞察失败');

export const createInsight = (input: { name: string; content?: string }) =>
  withApiErrorToast(
    getResourceHandle('insight')
      .create(input)
      .then((resource) => fetchInsightDetail(resource.id)),
    '创建洞察失败',
  );

export const updateInsight = (
  id: string,
  input: { name?: string; content?: string },
) =>
  withApiErrorToast(
    getResourceHandle('insight', id).update(input).then(mapInsightDetail),
    '保存洞察失败',
  );

export const deleteInsight = (id: string) => removeResource('insight', id);
