type UsageLike = {
  cacheRead?: number
  cacheWrite?: number
  input?: number
  output?: number
  totalTokens?: number
}

type MessageLike = {
  role?: string
  usage?: UsageLike
}

type ModelLike = {
  contextWindow?: number
  maxTokens?: number
}

type AgentStateLike = {
  messages?: MessageLike[]
  model?: ModelLike
}

type AgentContextUsage = {
  contextWindow: number
  percent: number
  usedTokens: number
}

const createAbbreviatedNumberFormatter = (locale = 'en-US') =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  })

const readNumber = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : 0)

const readUsageTokens = (usage: UsageLike | undefined) => {
  const totalTokens = readNumber(usage?.totalTokens)
  if (totalTokens > 0) return totalTokens

  return (
    readNumber(usage?.input) + readNumber(usage?.output) + readNumber(usage?.cacheRead) + readNumber(usage?.cacheWrite)
  )
}

export const formatAbbreviatedTokenCount = (value: number, locale = 'en-US') => {
  const abbreviatedNumberFormatter = createAbbreviatedNumberFormatter(locale)

  if (!Number.isFinite(value) || value <= 0) return '0'
  if (value >= 1_000_000) return `${abbreviatedNumberFormatter.format(value / 1_000_000)}M`
  if (value >= 1_000) return `${abbreviatedNumberFormatter.format(value / 1_000)}K`
  return abbreviatedNumberFormatter.format(Math.round(value))
}

export const resolveAgentContextUsage = (state: AgentStateLike): AgentContextUsage => {
  const usedTokens = (state.messages ?? []).reduce((total, message) => total + readUsageTokens(message.usage), 0)
  const contextWindow = readNumber(state.model?.contextWindow) || readNumber(state.model?.maxTokens)
  const percent = contextWindow > 0 ? Math.min(100, (usedTokens / contextWindow) * 100) : 0

  return {
    contextWindow,
    percent,
    usedTokens,
  }
}

export const formatAgentContextUsage = (usage: AgentContextUsage, locale = 'en-US') => {
  const used = formatAbbreviatedTokenCount(usage.usedTokens, locale)
  const context = usage.contextWindow > 0 ? formatAbbreviatedTokenCount(usage.contextWindow, locale) : '-'
  const percent =
    usage.contextWindow > 0
      ? `${usage.percent > 0 && usage.percent < 1 ? usage.percent.toFixed(1) : Math.round(usage.percent).toString()}%`
      : '-'

  return `${used} / ${context} · ${percent}`
}
