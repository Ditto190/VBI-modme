import fs from 'node:fs'
import path from 'node:path'
import { config } from 'dotenv'
import { render } from 'ink'
import { createElement } from 'react'
import { createCliAgentRuntime } from './agent/runtime.js'
import { AgentApp } from './agent/tui/agent-app.js'
import { parseAgentCommand } from './parse.js'
import type { AgentRuntimeController } from '@visactor/vbi-agent'

interface CliIO {
  writeError?(text: string): void
  writeOutput?(text: string): void
}

const toErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

const findLastAssistantText = (runtime: AgentRuntimeController) =>
  runtime
    .getState()
    .activities.filter((activity) => activity.kind === 'assistant')
    .at(-1)
    ?.text.trim()

const findEnvFile = (cwd: string) => {
  let current = cwd
  while (true) {
    const envFile = path.join(current, '.env')
    if (fs.existsSync(envFile)) return envFile
    const parent = path.dirname(current)
    if (parent === current) return undefined
    current = parent
  }
}

const loadEnv = () => {
  const envFile = findEnvFile(process.cwd())
  config({ path: envFile ?? '.env', quiet: true })
}

const canRenderTui = () => process.stdin.isTTY && process.stdout.isTTY

export const runPromptAgent = async (runtime: AgentRuntimeController, task: string | undefined, io: CliIO = {}) => {
  const prompt = task?.trim()
  if (!prompt) {
    io.writeError?.('执行失败: Prompt is required. Use vbi -p "your task".')
    return 1
  }
  try {
    await runtime.start(prompt)
  } catch (error) {
    io.writeError?.(`执行失败: ${toErrorMessage(error)}`)
    return 1
  }

  const state = runtime.getState()
  if (state.error) {
    io.writeError?.(`执行失败: ${state.error}`)
    return 1
  }
  const output = findLastAssistantText(runtime)
  if (output) io.writeOutput?.(output)
  io.writeOutput?.('执行成功')
  return 0
}

export const runTuiAgent = (runtime: AgentRuntimeController, task?: string) =>
  new Promise<number>((resolve) => {
    const instance = render(
      createElement(AgentApp, {
        onExit: (code: number) => {
          instance.unmount()
          resolve(code)
        },
        runtime,
        task,
      }),
    )
  })

export const runCli = async (argv = process.argv.slice(2), io: CliIO = {}) => {
  try {
    loadEnv()
    const command = parseAgentCommand(argv)
    if (command.mode === 'tui' && !canRenderTui()) {
      io.writeError?.(
        '执行失败: TUI requires an interactive terminal. Use vbi -p "your task" for non-interactive mode.',
      )
      return 1
    }
    const runtime = createCliAgentRuntime(command)
    return command.mode === 'tui' ? runTuiAgent(runtime, command.task) : runPromptAgent(runtime, command.task, io)
  } catch (error) {
    io.writeError?.(`执行失败: ${toErrorMessage(error)}`)
    return 1
  }
}
