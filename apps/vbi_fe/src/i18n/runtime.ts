import type { ResourceKind } from '../types'
import { i18nApplicationStore } from '../application/i18n/store'
import { translate, type TranslationParams } from './utils'

export const tRuntime = (key: string, params?: TranslationParams) =>
  translate(i18nApplicationStore.getState().locale, key, params)

export const getResourceLabel = (kind: ResourceKind) => tRuntime(`resource.${kind}`)
