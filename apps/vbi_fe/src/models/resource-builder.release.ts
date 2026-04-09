import type {
  BuilderSession,
  BuilderStoreState,
} from './resource-builder.types';

const RELEASE_DELAY_MS = 0;

type GetState<TBuilder> = () => BuilderStoreState<TBuilder>;
type SetState<TBuilder> = (
  updater: (
    state: BuilderStoreState<TBuilder>,
  ) => Partial<BuilderStoreState<TBuilder>>,
) => void;

const removeSession = <TBuilder>(
  sessions: Record<string, BuilderSession<TBuilder>>,
  resourceId: string,
) => {
  const next = { ...sessions };
  delete next[resourceId];
  return next;
};

export const createReleaseController = <TBuilder>(
  getState: GetState<TBuilder>,
  setState: SetState<TBuilder>,
) => {
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  const cancel = (resourceId: string) => {
    const timer = timers.get(resourceId);
    if (!timer) return;
    clearTimeout(timer);
    timers.delete(resourceId);
  };

  const schedule = (resourceId: string, close: () => Promise<void>) => {
    cancel(resourceId);
    timers.set(
      resourceId,
      setTimeout(() => {
        timers.delete(resourceId);
        const session = getState().sessions[resourceId];
        if (!session || session.refs > 0) return;
        setState((state) => ({
          sessions: removeSession(state.sessions, resourceId),
        }));
        void close().catch(console.error);
      }, RELEASE_DELAY_MS),
    );
  };

  return { cancel, schedule };
};
