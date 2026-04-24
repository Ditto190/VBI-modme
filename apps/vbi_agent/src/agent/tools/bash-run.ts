import { spawn } from 'node:child_process'

const append = (chunks: string[], chunk?: string | null) => {
  if (chunk) chunks.push(chunk)
}

export const runBashCommand = (command: string, cwd: string, timeoutMs: number) =>
  new Promise<{ exitCode: number | null; output: string; signal: NodeJS.Signals | null }>((resolve, reject) => {
    const child = spawn(command, { cwd, shell: true })
    const chunks: string[] = []
    const timer = setTimeout(() => child.kill('SIGTERM'), timeoutMs)

    child.stdout.on('data', (chunk) => append(chunks, chunk.toString()))
    child.stderr.on('data', (chunk) => append(chunks, chunk.toString()))
    child.on('error', reject)
    child.on('close', (exitCode, signal) => {
      clearTimeout(timer)
      resolve({ exitCode, output: chunks.join(''), signal })
    })
  })
