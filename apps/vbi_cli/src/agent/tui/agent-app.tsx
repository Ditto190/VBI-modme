import { Box, Static, Text, useInput, useStdout } from 'ink'
import React, { useEffect, useState } from 'react'
import type { AgentActivity, AgentRuntimeController } from '@visactor/vbi-agent'

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
    <Text color={colorByKind[activity.kind]}>{tailLines(activity.text, 12)}</Text>
    {activity.detail ? (
      <Box flexDirection="column" paddingLeft={2}>
        <Text>{tailLines(activity.detail, 40)}</Text>
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
  const [buffer, setBuffer] = useState('')
  const { stdout } = useStdout()
  const width = stdout.columns ?? 80

  useEffect(() => runtime.subscribe(setState), [runtime])
  useEffect(() => {
    if (!task) return
    setIsRunning(true)
    void runtime.start(task).finally(() => setIsRunning(false))
  }, [runtime, task])

  useInput(
    (input_, key) => {
      if (isRunning) return
      if (key.return) {
        const trimmed = buffer.trim()
        setBuffer('')
        if (!trimmed) return
        setIsRunning(true)
        void runtime.start(trimmed).finally(() => setIsRunning(false))
        return
      }
      if (key.backspace || key.delete) return setBuffer((c) => c.slice(0, -1))
      if (!key.ctrl && !key.meta && input_) setBuffer((c) => c + input_)
    },
    { isActive: !isRunning },
  )

  useInput((value, key) => {
    if (value === 'q' && !buffer) onExit(state.error ? 1 : 0)
    if (key.escape) setBuffer('')
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
          <Text>{buffer}</Text>
          <Text color="gray">▎</Text>
        </Text>
      </Box>
    </>
  )
}
