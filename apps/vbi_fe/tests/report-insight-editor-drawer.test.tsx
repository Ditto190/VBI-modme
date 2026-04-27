import { afterEach, beforeEach, expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import * as Y from 'yjs';
import { VBIInsightBuilder } from '@visactor/vbi';
import { useInsightBuilderModel } from '../src/models';
import { useReportDetailStore } from '../src/stores/report-detail.store';

const { InsightEditorDrawer } = await import(
  '../src/pages/report-detail/InsightEditorDrawer'
);

const initialInsightBuilderState = useInsightBuilderModel.getState();
const initialReportDetailState = useReportDetailStore.getState();

class TestResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

const setInsightSession = (builder: VBIInsightBuilder) => {
  const onUpdate = () => {
    useInsightBuilderModel.setState((state) => ({
      sessions: {
        ...state.sessions,
        'insight-1': {
          ...state.sessions['insight-1'],
          version: state.sessions['insight-1'].version + 1,
        },
      },
    }));
  };
  builder.doc.on('update', onUpdate);
  useInsightBuilderModel.setState({
    sessions: {
      'insight-1': {
        builder,
        handle: {
          close: async () => undefined,
          getCollaborationProvider: async () => null,
          open: async () => builder,
        },
        opening: null,
        provider: null,
        refs: 1,
        stopSync: () => builder.doc.off('update', onUpdate),
        version: 0,
      },
    },
  });
};

beforeEach(() => {
  globalThis.ResizeObserver = TestResizeObserver;
  useInsightBuilderModel.setState(initialInsightBuilderState, true);
  useReportDetailStore.setState(initialReportDetailState, true);
});

afterEach(() => {
  useInsightBuilderModel.getState().sessions['insight-1']?.stopSync?.();
});

test('report insight editor follows session updates while editing', () => {
  const builder = new VBIInsightBuilder(new Y.Doc());
  builder.setContent('初始洞察');
  setInsightSession(builder);
  useReportDetailStore.setState({
    connectedInsightId: 'insight-1',
    insightEditorOpen: true,
  });

  render(<InsightEditorDrawer />);

  const editor = screen.getByPlaceholderText('输入这页的叙事、结论或备注');
  expect(editor).toHaveValue('初始洞察');

  fireEvent.change(editor, { target: { value: '更新洞察' } });

  expect(editor).toHaveValue('更新洞察');
  expect(builder.build().content).toBe('更新洞察');
});
