import { message } from 'antd'
import { tRuntime } from '../i18n'

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

const getMessage = (value: unknown, fallback: string) => {
  if (typeof value === 'string' && value.trim()) return value
  if (value instanceof Error && value.message) return value.message
  if (isRecord(value) && typeof value.message === 'string') return value.message
  return fallback
}

const getDefaultApiErrorFallback = () => tRuntime('api.requestFailed')

export const notifyApiError = (error: unknown, fallback = getDefaultApiErrorFallback()) => {
  message.error(getMessage(error, fallback))
}

export const withApiErrorToast = async <T>(promise: Promise<T>, fallback = getDefaultApiErrorFallback()) => {
  try {
    return await promise
  } catch (error) {
    notifyApiError(error, fallback)
    throw error
  }
}
