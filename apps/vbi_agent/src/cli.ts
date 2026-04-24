#!/usr/bin/env node
import { runCli } from './run.js'
import { config } from 'dotenv'

config({ path: '.env', quiet: true })

const exitCode = await runCli(process.argv.slice(2), {
  stderr: process.stderr,
})

process.exitCode = exitCode
