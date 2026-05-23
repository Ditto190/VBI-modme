import type { NextConfig } from 'next'

const apiOrigin = process.env.VBI_API_ORIGIN?.trim() || 'http://localhost:3030'
const collaborationOrigin = process.env.VBI_COLLABORATION_ORIGIN?.trim() || 'http://localhost:1234'

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
      {
        source: '/collaboration/:path*',
        destination: `${collaborationOrigin}/:path*`,
      },
    ]
  },
}

export default nextConfig
