import { unwrap } from './api';
import type { InsightDetail, ResourceItem } from './types';

const API_BASE = '/api/v1/insights';

export const fetchInsights = () =>
  fetch(API_BASE).then((res) => unwrap<ResourceItem[]>(res));

export const fetchInsight = (id: string) =>
  fetch(`${API_BASE}/${id}`).then((res) => unwrap<InsightDetail>(res));

export const createInsight = (input: { name: string; content?: string }) =>
  fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then((res) => unwrap<InsightDetail>(res));

export const updateInsight = (
  id: string,
  input: { name?: string; content?: string },
) =>
  fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then((res) => unwrap<InsightDetail>(res));

export const deleteInsight = (id: string) =>
  fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then((res) =>
    unwrap<ResourceItem>(res),
  );
