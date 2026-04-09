#!/usr/bin/env node
import { runCli } from './run.js'

const exitCode = await runCli(process.argv.slice(2), {
  getClient: async () => {
    const { createCliClient } = await import('./client.js')
    return createCliClient()
  },
  stderr: process.stderr,
  stdout: process.stdout,
})

process.exitCode = exitCode
