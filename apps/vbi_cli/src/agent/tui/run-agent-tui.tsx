import { render } from 'ink'
import React from 'react'
import { AgentApp } from './agent-app.js'
import type { AgentRuntimeController } from '@visactor/vbi-agent'

export const runAgentTui = ({ runtime, task }: { runtime: AgentRuntimeController; task?: string }) =>
  new Promise<number>((resolve) => {
    const instance = render(
      <AgentApp onExit={(code) => (instance.unmount(), resolve(code))} runtime={runtime} task={task} />,
    )
  })
