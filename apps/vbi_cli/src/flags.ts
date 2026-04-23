export interface ParsedArgs {
  flags: Record<string, string>
  positionals: string[]
}

export const parseArgs = (argv: string[]): ParsedArgs => {
  const flags: Record<string, string> = {}
  const positionals: string[] = []

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]
    if (!token.startsWith('--')) {
      positionals.push(token)
      continue
    }
    const nextToken = argv[index + 1]
    if (!nextToken || nextToken.startsWith('--')) {
      flags[token] = 'true'
      continue
    }
    flags[token] = nextToken
    index += 1
  }

  return { flags, positionals }
}
