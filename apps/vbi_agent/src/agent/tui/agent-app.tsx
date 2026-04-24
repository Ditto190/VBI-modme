import { Box, Text, useInput, useStdout } from 'ink'
import React, { useEffect, useState } from 'react'
import { MarkdownText } from './markdown-text.js'
import { useBufferInput } from './use-buffer-input.js'
import type { AgentActivity, AgentRuntimeController } from '../types.js'

const colorByKind: Record<AgentActivity['kind'], string> = {
  assistant: 'cyan',
  tool: 'green',
  user: 'magenta',
}

const trimLines = (value: string, limit = 12) => value.split('\n').slice(-limit).join('\n')
const clipLines = (value: string, limit = 80) => {
  const lines = value.split('\n')
  if (lines.length <= limit) return value
  const half = Math.floor(limit / 2)
  return [...lines.slice(0, half), '...', ...lines.slice(-half)].join('\n')
}
const divider = (width: number) => '─'.repeat(Math.max(24, width - 2))

const renderActivity = (activity: AgentActivity, index: number, width: number) => (
  <Box flexDirection="column" key={`${activity.kind}-${index}`} marginBottom={1}>
    {index ? <Text color="gray">{divider(width)}</Text> : null}
    <Text bold color={colorByKind[activity.kind]}>
      [{activity.kind}]
    </Text>
    <MarkdownText color={colorByKind[activity.kind]}>{trimLines(activity.text)}</MarkdownText>
    {activity.detail ? (
      <Box flexDirection="column" paddingLeft={2}>
        <MarkdownText>{clipLines(activity.detail)}</MarkdownText>
      </Box>
    ) : null}
  </Box>
)

const promptLabel = (isRunning: boolean) => (isRunning ? 'Running... q to quit' : 'Enter to send, q to quit')

const inputHint = (isRunning: boolean, value: string) => {
  if (value) return value
  return isRunning ? 'Wait for the current turn' : 'Type a task or follow-up'
}

export const AgentApp = ({
  onExit,
  runtime,
  task,
}: {
  onExit(code: number): void
  runtime: AgentRuntimeController
  task?: string
}) => {
  const [state, setState] = useState(runtime.getState())
  const [isRunning, setIsRunning] = useState(false)
  const { stdout } = useStdout()
  const width = stdout.columns ?? 80
  const input = useBufferInput((value) => {
    const trimmed = value.trim()
    input.clear()
    if (!trimmed || isRunning) return
    setIsRunning(true)
    void runtime.start(trimmed).finally(() => setIsRunning(false))
  }, !isRunning)

  useEffect(() => runtime.subscribe(setState), [runtime])
  useEffect(() => {
    if (!task) return
    setIsRunning(true)
    void runtime.start(task).finally(() => setIsRunning(false))
  }, [runtime, task])

  useInput((value, key) => {
    if (value === 'q') onExit(state.error ? 1 : 0)
    if (key.escape) {
      input.clear()
    }
  })

  return (
    <Box flexDirection="column">
      <Text color="blue">VBI Agent Minimal Loop</Text>
      <Box flexDirection="column">
        {state.activities.slice(-10).map((activity, index) => renderActivity(activity, index, width))}
      </Box>
      <Text color="gray">{promptLabel(isRunning)}</Text>

      {state.error ? <Text color="red">{state.error}</Text> : null}

      <Box flexDirection="column">
        <Text color="gray">Message</Text>
        <Text color={input.value ? undefined : 'gray'}>{inputHint(isRunning, input.value)}</Text>
      </Box>
    </Box>
  )
}
