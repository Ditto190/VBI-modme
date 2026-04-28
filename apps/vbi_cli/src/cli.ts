#!/usr/bin/env node
import { runCli } from './cli-runner.js'

const code = await runCli(process.argv.slice(2), {
  writeError: (text) => console.error(text),
  writeOutput: (text) => console.log(text),
})

process.exit(code)
