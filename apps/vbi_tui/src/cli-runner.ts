import fs from 'node:fs'
import path from 'node:path'
import { config } from 'dotenv'
import { createCliAgent } from './agent/runtime.js'
import { AgentApp } from './agent/tui/agent-app.js'
import { parseAgentCommand } from './parse.js'
import { printPromptProgress } from './prompt-progress.js'
import type { Agent } from '@visactor/vbi-agent'
import type { CliIO } from './types/index.js'

const toErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

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

export const runPromptAgent = async (agent: Agent, task: string | undefined, io: CliIO = {}) => {
  const prompt = task?.trim()
  if (!prompt) {
    io.writeError?.('执行失败: Prompt is required. Use vbi -p "your task".')
    return 1
  }
  const stopPrinting = printPromptProgress(agent, io)
  try {
    await agent.prompt(prompt)
  } catch (error) {
    stopPrinting()
    io.writeError?.(`执行失败: ${toErrorMessage(error)}`)
    return 1
  }
  stopPrinting()

  if (agent.state.errorMessage) {
    io.writeError?.(`执行失败: ${agent.state.errorMessage}`)
    return 1
  }
  io.writeOutput?.('执行成功')
  return 0
}

export const runTuiAgent = (agent: Agent, task?: string) => AgentApp.run({ agent, task })

export const runCli = async (argv = process.argv.slice(2), io: CliIO = {}) => {
  try {
    loadEnv()
    const command = parseAgentCommand(argv[0] === '--' ? argv.slice(1) : argv)
    if (command.mode === 'tui' && !canRenderTui()) {
      io.writeError?.(
        '执行失败: TUI requires an interactive terminal. Use vbi -p "your task" for non-interactive mode.',
      )
      return 1
    }
    const agent = createCliAgent(command)
    return command.mode === 'tui' ? runTuiAgent(agent, command.task) : runPromptAgent(agent, command.task, io)
  } catch (error) {
    io.writeError?.(`执行失败: ${toErrorMessage(error)}`)
    return 1
  }
}
