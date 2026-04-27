import { beforeEach, describe, expect, rs, test } from '@rstest/core';
import { useReportsStore } from '../src/stores/reports.store';
import { getReportsSnapshot } from '../src/stores/reports.snapshot';

rs.mock('../src/services/resourceApi', () => ({
  createResource: rs.fn(),
  listResources: rs.fn(),
  removeResource: rs.fn(),
  renameResource: rs.fn(),
}));

const resourceApi = await import('../src/services/resourceApi');
const initialReportsState = useReportsStore.getState();
const mockedListResources = resourceApi.listResources as unknown as {
  mockResolvedValue(value: unknown): void;
};
const mockedRemoveResource = resourceApi.removeResource as unknown as {
  mockResolvedValue(value: unknown): void;
};
const createReportItem = (id: string, name: string) => ({
  id,
  name,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
});

describe('reports store selection', () => {
  beforeEach(() => {
    rs.clearAllMocks();
    useReportsStore.setState(initialReportsState, true);
  });

  test('selectAllFiltered selects matching reports only', () => {
    useReportsStore.setState({
      items: [
        createReportItem('report-1', 'Sales'),
        createReportItem('report-2', 'Marketing'),
      ],
      searchText: 'sale',
    });

    useReportsStore.getState().selectAllFiltered();

    expect(getReportsSnapshot().selectedRowKeys).toEqual(['report-1']);
  });

  test('deleteSelected removes selected reports and clears selection', async () => {
    mockedRemoveResource.mockResolvedValue(undefined);
    mockedListResources.mockResolvedValue([]);
    useReportsStore.setState({ selectedRowKeys: ['report-1', 'report-2'] });

    await useReportsStore.getState().deleteSelected();

    expect(resourceApi.removeResource).toHaveBeenCalledWith(
      'report',
      'report-1',
    );
    expect(resourceApi.removeResource).toHaveBeenCalledWith(
      'report',
      'report-2',
    );
    expect(getReportsSnapshot().selectedRowKeys).toEqual([]);
  });
});
