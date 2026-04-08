import { unwrap } from './api';
import type { ResourceItem } from './types';

const API_BASE = '/api/v1/charts';

export const fetchCharts = () =>
  fetch(API_BASE).then((res) => unwrap<ResourceItem[]>(res));

export const fetchChart = (id: string) =>
  fetch(`${API_BASE}/${id}`).then((res) => unwrap<ResourceItem>(res));

export const createChart = (name: string) =>
  fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  }).then((res) => unwrap<ResourceItem>(res));

export const updateChart = (id: string, name: string) =>
  fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  }).then((res) => unwrap<ResourceItem>(res));

export const deleteChart = (id: string) =>
  fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then((res) =>
    unwrap<ResourceItem>(res),
  );
