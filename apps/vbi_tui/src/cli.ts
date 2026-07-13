#!/usr/bin/env node
import { runCli } from './cli-runner.js'

void runCli(process.argv.slice(2), {
  writeError: (text) => console.error(text),
  writeOutput: (text) => console.log(text),
}).then((code) => process.exit(code))
