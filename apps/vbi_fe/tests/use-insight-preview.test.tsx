import { expect, test } from '@rstest/core';
import { act, render, screen } from '@testing-library/react';
import * as Y from 'yjs';
import { VBIInsightBuilder } from '@visactor/vbi';
import { useInsightPreview } from '../src/pages/report-detail/useInsightPreview';

const PreviewProbe = ({
  builder,
  insightId,
}: {
  builder: VBIInsightBuilder;
  insightId: string;
}) => {
  const { content } = useInsightPreview(insightId, builder);

  return <div>{content}</div>;
};

test('insight preview follows builder document updates', () => {
  const builder = new VBIInsightBuilder(new Y.Doc());
  builder.setContent('初始洞察');

  render(<PreviewProbe builder={builder} insightId="insight-1" />);

  expect(screen.getByText('初始洞察')).toBeInTheDocument();

  act(() => {
    builder.setContent('更新洞察');
  });

  expect(screen.getByText('更新洞察')).toBeInTheDocument();
});
