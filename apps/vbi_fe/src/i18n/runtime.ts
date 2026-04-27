import type { ResourceKind } from '../types';
import { useAppPreferencesStore } from '../stores/app-preferences.store';
import { translate, type TranslationParams } from './utils';

export const tRuntime = (key: string, params?: TranslationParams) =>
  translate(useAppPreferencesStore.getState().locale, key, params);

export const getResourceLabel = (kind: ResourceKind) =>
  tRuntime(`resource.${kind}`);
