import { beforeEach, describe, expect, rs, test } from '@rstest/core';

rs.mock('@visactor/vbi', () => {
  const registerConnector = rs.fn();
  return {
    VBI: {
      registerConnector,
      chart: {
        createEmpty: rs.fn((connectorId: string) => ({ connectorId })),
        create: rs.fn((source: unknown) => ({ source })),
      },
    },
    __vbiMockState: { registerConnector },
  };
});

rs.mock('@visactor/vquery', () => {
  const state = {
    hasDataset: rs.fn().mockResolvedValue(false),
    dropDataset: rs.fn().mockResolvedValue(undefined),
    createDataset: rs.fn().mockResolvedValue(undefined),
    connectDataset: rs
      .fn()
      .mockResolvedValue({ query: rs.fn().mockResolvedValue({ dataset: [] }) }),
  };
  class VQuery {
    hasDataset = state.hasDataset;
    dropDataset = state.dropDataset;
    createDataset = state.createDataset;
    connectDataset = state.connectDataset;
  }
  return { VQuery, __vqueryMockState: state };
});

import {
  CONNECTOR_ID,
  createDefaultBuilder,
  createLocalConnector,
  initVBIConnector,
  setLocalDataWithSchema,
} from 'src/utils/localConnector';

describe('localConnector', () => {
  beforeEach(() => {
    rs.clearAllMocks();
    setLocalDataWithSchema([], null);
  });

  test('initVBIConnector skips fetch when local data is already set', async () => {
    const fetchMock = rs.fn();
    globalThis.fetch = fetchMock as typeof fetch;
    setLocalDataWithSchema(
      [{ city: 'HCM' }],
      [{ name: 'city', type: 'string' }],
    );

    await initVBIConnector();

    const { __vbiMockState } = (await import('@visactor/vbi')) as any;
    expect(fetchMock).not.toHaveBeenCalled();
    expect(__vbiMockState.registerConnector).toHaveBeenCalledWith(
      CONNECTOR_ID,
      expect.any(Function),
    );
  });

  test('createLocalConnector normalizes measure values to number', async () => {
    setLocalDataWithSchema(
      [{ city: 'HCM', sales: 100 }],
      [
        { name: 'city', type: 'string' },
        { name: 'sales', type: 'number' },
      ],
    );

    const { __vqueryMockState } = (await import('@visactor/vquery')) as any;
    __vqueryMockState.connectDataset.mockResolvedValue({
      query: rs.fn().mockResolvedValue({
        dataset: [{ totalSales: '123.5', city: 'HCM', ignored: 'x' }],
      }),
    });

    createLocalConnector('test-connector');
    const { __vbiMockState } = (await import('@visactor/vbi')) as any;
    const factory = __vbiMockState.registerConnector.mock.calls[0][1];
    const connector = await factory();
    const result = await connector.query({
      queryDSL: {
        select: [
          { field: 'sales', alias: 'totalSales', aggr: { func: 'sum' } },
          'city',
        ],
      },
      schema: [],
    });

    expect(result.dataset).toEqual([{ totalSales: 123.5, city: 'HCM' }]);
  });

  test('createDefaultBuilder uses default connector id', () => {
    const builder = createDefaultBuilder() as any;
    expect(builder.source.connectorId).toBe(CONNECTOR_ID);
  });
});
