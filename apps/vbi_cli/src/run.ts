import { usage } from './help.js'
import { parseCommand } from './parse.js'
import { executeCommand } from './execute.js'
import type { CliRunDeps } from './types.js'

const formatError = (error: unknown) => (error instanceof Error ? error.message : String(error))

export const runCli = async (argv: string[], deps: CliRunDeps) => {
  try {
    const command = parseCommand(argv)
    if (command.kind === 'help') {
      deps.stdout.write(`${usage()}\n`)
      return 0
    }
    const result = await executeCommand({ ...deps, client: await deps.getClient() }, command)
    deps.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
    return 0
  } catch (error) {
    deps.stderr.write(`${formatError(error)}\n`)
    deps.stderr.write(`${usage()}\n`)
    return 1
  }
}
