import { toast } from '../components/ui/toast'
import { tRuntime } from '../i18n'

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

const getMessage = (value: unknown, fallback: string) => {
  if (typeof value === 'string' && value.trim() && !value.trimStart().startsWith('<!DOCTYPE')) return value
  if (value instanceof Error && value.message && !value.message.trimStart().startsWith('<!DOCTYPE'))
    return value.message
  if (isRecord(value) && typeof value.message === 'string' && !value.message.trimStart().startsWith('<!DOCTYPE')) {
    return value.message
  }
  return fallback
}

const getDefaultApiErrorFallback = () => tRuntime('api.requestFailed')

const notifyApiError = (error: unknown, fallback = getDefaultApiErrorFallback()) => {
  toast.error(getMessage(error, fallback))
}

export const withApiErrorToast = async <T>(promise: Promise<T>, fallback = getDefaultApiErrorFallback()) => {
  try {
    return await promise
  } catch (error) {
    notifyApiError(error, fallback)
    throw error
  }
}
