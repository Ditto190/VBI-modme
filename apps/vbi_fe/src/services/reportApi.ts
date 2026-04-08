import { unwrap } from './api';
import type { ReportDetail, ResourceItem } from './types';

const API_BASE = '/api/v1/reports';

export const fetchReports = () =>
  fetch(API_BASE).then((res) => unwrap<ResourceItem[]>(res));

export const fetchReport = (id: string) =>
  fetch(`${API_BASE}/${id}`).then((res) => unwrap<ReportDetail>(res));

export const createReport = (name: string) =>
  fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  }).then((res) => unwrap<ReportDetail>(res));

export const updateReport = (id: string, name: string) =>
  fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  }).then((res) => unwrap<ReportDetail>(res));

export const deleteReport = (id: string) =>
  fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then((res) =>
    unwrap<ResourceItem>(res),
  );

export const createReportPage = (id: string, title?: string) =>
  fetch(`${API_BASE}/${id}/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then((res) => unwrap<ReportDetail>(res));

export const updateReportPage = (
  reportId: string,
  pageId: string,
  input: { title?: string; chartId?: string; insightId?: string },
) =>
  fetch(`${API_BASE}/${reportId}/pages/${pageId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then((res) => unwrap<ReportDetail>(res));

export const deleteReportPage = (reportId: string, pageId: string) =>
  fetch(`${API_BASE}/${reportId}/pages/${pageId}`, {
    method: 'DELETE',
  }).then((res) => unwrap<ReportDetail>(res));
