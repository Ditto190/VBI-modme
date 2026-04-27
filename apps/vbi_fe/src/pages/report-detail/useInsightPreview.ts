import { useEffect, useState, useSyncExternalStore } from 'react';
import type { VBIInsightBuilder } from '@visactor/vbi';
import { fetchInsight } from '../../services/insightApi';

type InsightPreviewState = {
  content: string;
  loading: boolean;
  insightId: string;
};

type InsightPreviewResult = Omit<InsightPreviewState, 'insightId'>;

const initialState: InsightPreviewState = {
  content: '',
  insightId: '',
  loading: false,
};

const readBuilderContent = (builder: VBIInsightBuilder) =>
  `${builder.dsl.get('content') ?? ''}`.trim();

export const useInsightPreview = (
  insightId: string,
  builder: VBIInsightBuilder | null,
): InsightPreviewResult => {
  const [state, setState] = useState<InsightPreviewState>(initialState);
  const builderContent = useSyncExternalStore(
    (onStoreChange) => {
      if (!builder) return () => undefined;
      builder.doc.on('update', onStoreChange);
      return () => {
        builder.doc.off('update', onStoreChange);
      };
    },
    () => (builder ? readBuilderContent(builder) : ''),
    () => '',
  );

  useEffect(() => {
    if (!insightId || builder) return;

    let active = true;

    void fetchInsight(insightId)
      .then((insight) => {
        if (!active) return;
        setState({
          content: insight.content.trim(),
          insightId,
          loading: false,
        });
      })
      .catch(() => {
        if (active) {
          setState({ content: '', insightId, loading: false });
        }
      });

    return () => {
      active = false;
    };
  }, [builder, insightId]);

  if (builder) {
    return {
      content: builderContent,
      loading: false,
    };
  }

  return {
    content: state.insightId === insightId ? state.content : '',
    loading: insightId
      ? state.insightId === insightId
        ? state.loading
        : true
      : false,
  };
};
