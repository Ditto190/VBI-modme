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

const compactTokenFormatter = new Intl.NumberFormat('en-US', {
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

export const formatCompactTokenCount = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) return '0'
  if (value >= 1_000_000) return `${compactTokenFormatter.format(value / 1_000_000)}M`
  if (value >= 1_000) return `${compactTokenFormatter.format(value / 1_000)}K`
  return compactTokenFormatter.format(Math.round(value))
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

export const formatAgentContextUsage = (usage: AgentContextUsage) => {
  const used = formatCompactTokenCount(usage.usedTokens)
  const context = usage.contextWindow > 0 ? formatCompactTokenCount(usage.contextWindow) : '-'
  const percent =
    usage.contextWindow > 0
      ? `${usage.percent > 0 && usage.percent < 1 ? usage.percent.toFixed(1) : Math.round(usage.percent).toString()}%`
      : '-'

  return `${used} / ${context} · ${percent}`
}

export const attachAgentUsageDisplay = (panel: HTMLElement, readState: () => AgentStateLike) => {
  const sync = () => {
    const editor = panel.querySelector('message-editor')
    const stats = editor?.nextElementSibling instanceof HTMLElement ? editor.nextElementSibling : null
    if (!stats) return

    const text = formatAgentContextUsage(resolveAgentContextUsage(readState()))
    if (stats.dataset.vbiAgentUsageText === text && stats.querySelector('.vbi-agent-context-usage')) return

    stats.dataset.vbiAgentUsageText = text
    stats.classList.add('vbi-agent-usage-stats')
    const value = document.createElement('span')
    value.className = 'vbi-agent-context-usage'
    value.textContent = text
    stats.replaceChildren(value)
  }

  const observer = new MutationObserver(sync)
  observer.observe(panel, { childList: true, subtree: true })
  requestAnimationFrame(sync)

  return {
    disconnect: () => observer.disconnect(),
    refresh: sync,
  }
}
