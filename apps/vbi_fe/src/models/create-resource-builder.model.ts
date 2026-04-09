import { create } from 'zustand';
import type { ResourceKind } from '../types';
import { createReleaseController } from './resource-builder.release';
import {
  createBuilderSession,
  resetSessionConnection,
  setConnectedSession,
  setSessionOpening,
  setSessionRefs,
} from './resource-builder.session';
import type {
  BuilderByKind,
  BuilderStoreState,
} from './resource-builder.types';

export type { BuilderByKind, BuilderModel } from './resource-builder.types';

export const createResourceBuilderModel = <TKind extends ResourceKind>(
  kind: TKind,
) =>
  create<BuilderStoreState<BuilderByKind[TKind]>>((set, get) => {
    const release = createReleaseController(get, set);

    return {
      sessions: {},
      retain: (resourceId) => {
        release.cancel(resourceId);
        set((state) => ({
          sessions: {
            ...state.sessions,
            [resourceId]: setSessionRefs(
              state.sessions[resourceId] ??
                createBuilderSession(kind, resourceId),
              (state.sessions[resourceId]?.refs ?? 0) + 1,
            ),
          },
        }));
      },
      release: async (resourceId) => {
        release.cancel(resourceId);
        const session = get().sessions[resourceId];
        if (!session) return;
        if (session.refs > 1) {
          set((state) => ({
            sessions: {
              ...state.sessions,
              [resourceId]: setSessionRefs(session, session.refs - 1),
            },
          }));
          return;
        }
        set((state) => {
          const current = state.sessions[resourceId];
          if (!current) return state;
          return {
            sessions: {
              ...state.sessions,
              [resourceId]: setSessionRefs(current, 0),
            },
          };
        });
        release.schedule(resourceId, session.handle.close);
      },
      connect: async (resourceId) => {
        const current = get().sessions[resourceId];
        if (!current || current.builder) return;
        if (current.opening) return current.opening;
        const opening = (async () => {
          const builder = (await current.handle.open()) as BuilderByKind[TKind];
          const provider = await current.handle.getCollaborationProvider();
          set((state) => {
            const session = state.sessions[resourceId];
            if (!session || session.handle !== current.handle) return state;
            return {
              sessions: {
                ...state.sessions,
                [resourceId]: setConnectedSession(session, builder, provider),
              },
            };
          });
        })().catch((error) => {
          set((state) => {
            const session = state.sessions[resourceId];
            if (!session || session.handle !== current.handle) return state;
            return {
              sessions: {
                ...state.sessions,
                [resourceId]: resetSessionConnection(session),
              },
            };
          });
          throw error;
        });
        set((state) => ({
          sessions: {
            ...state.sessions,
            [resourceId]: setSessionOpening(current, opening),
          },
        }));
        return opening;
      },
    };
  });
