import { describe, expect, test } from '@rstest/core'

const { default: config } = await import('../rsbuild.config')

type ProxyConfig = {
  changeOrigin?: boolean
  pathRewrite?: Record<string, string>
  target?: string
}

const proxy = config.server?.proxy as Record<string, ProxyConfig>

describe('rsbuild runtime proxy', () => {
  test('proxies provider api requests through the backend origin', () => {
    expect(proxy['/api']).toMatchObject({
      changeOrigin: true,
      target: expect.stringMatching(/3030$/),
    })
  })

  test('strips the collaboration prefix before forwarding to the collaboration server', () => {
    expect(proxy['/collaboration']).toMatchObject({
      changeOrigin: true,
      pathRewrite: { '^/collaboration': '' },
      target: expect.stringMatching(/1234$/),
    })
  })
})
