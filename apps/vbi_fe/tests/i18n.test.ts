import { describe, expect, test } from '@rstest/core'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { useAppPreferencesStore } from '../src/stores/app-preferences.store'

const testDir = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(testDir, '..')
const localesDir = path.join(packageRoot, 'src/i18n/locales')
const sourceDir = path.join(packageRoot, 'src')

const readLocaleMessages = () =>
  Object.fromEntries(
    fs
      .readdirSync(localesDir)
      .filter((file) => file.endsWith('.json'))
      .sort()
      .map((file) => [
        file,
        JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8')) as Record<string, string>,
      ]),
  )

const walkSourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkSourceFiles(fullPath)
    return /\.(ts|tsx)$/.test(entry.name) ? [fullPath] : []
  })

const collectLiteralTranslationKeys = () => {
  const keys = new Set<string>()

  for (const file of walkSourceFiles(sourceDir)) {
    const source = fs.readFileSync(file, 'utf8')
    for (const match of source.matchAll(/\b(?:t|tRuntime|translate)\(\s*(?:[^,]+,\s*)?['"]([^'"]+)['"]/g)) {
      keys.add(match[1] ?? '')
    }
  }

  return [...keys].filter(Boolean).sort()
}

const dynamicTranslationKeys = [
  'app.language.de',
  'app.language.en',
  'app.language.fr',
  'app.language.id',
  'app.language.ja',
  'app.language.ko',
  'app.language.vi',
  'app.language.zh',
  'app.theme.amber',
  'app.theme.blue',
  'app.theme.copper',
  'app.theme.crimson',
  'app.theme.dark',
  'app.theme.emerald',
  'app.theme.forest',
  'app.theme.light',
  'app.theme.midnight',
  'app.theme.plum',
  'app.theme.rose',
  'app.theme.slate',
  'app.theme.violet',
  'app.theme.zinc',
  'resource.chart',
  'resource.insight',
  'resource.report',
]

describe('i18n messages', () => {
  test('keep locale files in lockstep', () => {
    const localeMessages = readLocaleMessages()
    const allKeys = [...new Set(Object.values(localeMessages).flatMap((messages) => Object.keys(messages)))].sort()

    for (const [file, messages] of Object.entries(localeMessages)) {
      expect({ file, keys: Object.keys(messages).sort() }).toEqual({ file, keys: allKeys })
    }
  })

  test('cover every translation key used by the app', () => {
    const localeMessages = readLocaleMessages()
    const allUsedKeys = [...new Set([...collectLiteralTranslationKeys(), ...dynamicTranslationKeys])].sort()

    for (const [file, messages] of Object.entries(localeMessages)) {
      const missingKeys = allUsedKeys.filter((key) => !(key in messages))
      expect({ file, missingKeys }).toEqual({ file, missingKeys: [] })
    }
  })

  test('persist user locale and theme selections in browser storage', () => {
    window.localStorage.clear()
    document.cookie = 'vbi.locale=; path=/; max-age=0'
    document.cookie = 'vbi.theme=; path=/; max-age=0'

    useAppPreferencesStore.getState().setLocale('ja-JP')
    useAppPreferencesStore.getState().setThemeMode('midnight')

    expect(window.localStorage.getItem('vbi.locale')).toBe('ja-JP')
    expect(window.localStorage.getItem('vbi.theme')).toBe('midnight')
    expect(document.cookie).toContain('vbi.locale=ja-JP')
    expect(document.cookie).toContain('vbi.theme=midnight')
  })
})
