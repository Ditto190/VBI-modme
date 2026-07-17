import { describe, expect, test } from '@rstest/core'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const testDir = dirname(fileURLToPath(import.meta.url))
const srcRoot = resolve(testDir, '../src')
const viewsRoot = resolve(srcRoot, 'views')
const guardedRoots = [resolve(srcRoot, 'application')]
const sourceFilePattern = /\.(ts|tsx)$/
const importSpecifierPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g

const listSourceFiles = (root: string): string[] =>
  readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(root, entry.name)
    if (entry.isDirectory()) return listSourceFiles(path)
    return sourceFilePattern.test(entry.name) ? [path] : []
  })

const resolveRelativeImport = (file: string, specifier: string) => {
  if (!specifier.startsWith('.')) return null
  return resolve(dirname(file), specifier)
}

describe('frontend architecture boundaries', () => {
  test('keeps application independent from views', () => {
    const violations = guardedRoots
      .flatMap(listSourceFiles)
      .flatMap((file) => {
        const source = readFileSync(file, 'utf8')
        const matches = [...source.matchAll(importSpecifierPattern)]

        return matches
          .map((match) => match[1] ?? match[2] ?? '')
          .map((specifier) => ({ resolvedImport: resolveRelativeImport(file, specifier), specifier, file }))
          .filter(({ resolvedImport }) => resolvedImport?.startsWith(viewsRoot))
      })
      .map(({ file, specifier }) => `${file.replace(`${srcRoot}/`, 'src/')} -> ${specifier}`)

    expect(violations).toEqual([])
  })
})
