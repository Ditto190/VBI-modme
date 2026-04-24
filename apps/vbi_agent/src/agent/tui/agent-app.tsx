import { Box, Static, Text, useInput, useStdout } from 'ink'
import React, { useEffect, useState } from 'react'
import { MarkdownText } from './markdown-text.js'
import { useBufferInput } from './use-buffer-input.js'
import type { AgentActivity, AgentRuntimeController } from '../types.js'

const colorByKind: Record<AgentActivity['kind'], string> = {
  assistant: 'cyan',
  tool: 'green',
  user: 'magenta',
}

const tailLines = (value: string, limit: number) => value.split('\n').slice(-limit).join('\n')
const divider = (width: number) => '─'.repeat(Math.max(24, width - 2))

const renderActivity = (activity: AgentActivity, index: number, width: number) => (
  <Box flexDirection="column" key={index} marginBottom={1}>
    {index ? <Text color="gray">{divider(width)}</Text> : null}
    <Text bold color={colorByKind[activity.kind]}>
      [{activity.kind}]
    </Text>
    <MarkdownText color={colorByKind[activity.kind]}>{tailLines(activity.text, 12)}</MarkdownText>
    {activity.detail ? (
      <Box flexDirection="column" paddingLeft={2}>
        <MarkdownText>{tailLines(activity.detail, 40)}</MarkdownText>
      </Box>
    ) : null}
  </Box>
)

const statusLine = (isRunning: boolean) => (isRunning ? 'Running... q to quit' : 'Enter to send, q to quit')

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
    if (value === 'q' && !input.value) onExit(state.error ? 1 : 0)
    if (key.escape) input.clear()
  })

  return (
    <>
      <Static items={state.activities}>{(activity, index) => renderActivity(activity, index, width)}</Static>
      <Box flexDirection="column">
        <Text color="blue">VBI Agent</Text>
        {state.error ? <Text color="red">{state.error}</Text> : null}
        <Text color="gray">{statusLine(isRunning)}</Text>
        <Text color="cyan">
          {'> '}
          <Text>{input.value}</Text>
          <Text color="gray">▎</Text>
        </Text>
      </Box>
    </>
  )
}
