import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_DIR = path.resolve(__dirname, '../../../apps/website/docs/public/storybook')

function runCommand(command, env = {}) {
  execSync(command, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  })
}

function buildStorybooks() {
  console.log('🚀 Building web-component')
  runCommand('pnpm build')

  console.log('🚀 Building English Storybook (en-US)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/en-US"`, { STORYBOOK_LOCALE: 'en-US' })

  console.log('\n🚀 Building Vietnamese Storybook (vi-VN)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/vi-VN"`, { STORYBOOK_LOCALE: 'vi-VN' })

  console.log('\n🚀 Building Chinese Storybook (zh-CN)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/zh-CN"`, { STORYBOOK_LOCALE: 'zh-CN' })

  console.log('\n🚀 Building German Storybook (de-DE)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/de-DE"`, { STORYBOOK_LOCALE: 'de-DE' })

  console.log('\n🚀 Building French Storybook (fr-FR)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/fr-FR"`, { STORYBOOK_LOCALE: 'fr-FR' })

  console.log('\n🚀 Building Indonesian Storybook (id-ID)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/id-ID"`, { STORYBOOK_LOCALE: 'id-ID' })

  console.log('\n🚀 Building Japanese Storybook (ja-JP)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/ja-JP"`, { STORYBOOK_LOCALE: 'ja-JP' })

  console.log('\n🚀 Building Korean Storybook (ko-KR)...')
  runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/ko-KR"`, { STORYBOOK_LOCALE: 'ko-KR' })

  console.log(`\n✅ All Storybooks built successfully directly into:\n📁 ${OUTPUT_DIR}`)
}

buildStorybooks()
