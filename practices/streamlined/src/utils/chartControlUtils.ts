import { DEMO_DEFAULT_LIMIT } from 'src/constants/builder'

export const normalizeLimit = (limit: number) => {
  return Math.max(1, Math.round(limit))
}

export const readLimit = (limit: number | undefined) => {
  return normalizeLimit(limit ?? DEMO_DEFAULT_LIMIT)
}
