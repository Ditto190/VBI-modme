import { useRef, useSyncExternalStore } from 'react';
import type { Doc } from 'yjs';

type DocLike = Pick<Doc, 'on' | 'off'>;

type BuilderLike = {
  doc: DocLike;
};

const subscribeBuilder = (
  builder: BuilderLike | null,
  callback: () => void,
) => {
  if (!builder) {
    return () => undefined;
  }

  builder.doc.on('update', callback);
  return () => {
    builder.doc.off('update', callback);
  };
};

export const useBuilderVersion = <TBuilder extends BuilderLike>(
  builder: TBuilder | null,
) => {
  const versionRef = useRef(0);

  return useSyncExternalStore(
    (callback) =>
      subscribeBuilder(builder, () => {
        versionRef.current += 1;
        callback();
      }),
    () => versionRef.current,
    () => 0,
  );
};

export const useBuilderSnapshot = <TBuilder extends BuilderLike, T>(
  builder: TBuilder | null,
  getSnapshot: (builder: TBuilder) => T,
  fallback: T,
) =>
  useSyncExternalStore(
    (callback) => subscribeBuilder(builder, callback),
    () => (builder ? getSnapshot(builder) : fallback),
    () => fallback,
  );
