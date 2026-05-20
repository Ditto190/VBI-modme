import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

describe('API docs', () => {
  test('VBI.resources page does not expand helper resource types inline', () => {
    const resourcesDoc = fs.readFileSync(
      path.join(repoRoot, 'apps/website/docs/zh-CN/vbi/api/vbiInstance/resources/index.md'),
      'utf-8',
    )

    expect(resourcesDoc).toContain('# VBI.resources')
    expect(resourcesDoc).toContain('### register')
    expect(resourcesDoc).toContain('### clear')
    expect(resourcesDoc).toContain('### snapshot')
    expect(resourcesDoc).not.toContain('# VBIResourceRegisterInput')
    expect(resourcesDoc).not.toContain('# VBIResourceRegisterResult')
    expect(resourcesDoc).not.toContain('# VBIResourceSnapshot')
  })
})
