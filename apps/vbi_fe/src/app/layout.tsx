import type { Metadata } from 'next'
import './globals.css'
import { VbiAppProviders } from './providers'

export const metadata: Metadata = {
  title: 'VBI Console',
  description: 'Headless BI resource management console',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='zh-CN' suppressHydrationWarning>
    <body>
      <VbiAppProviders>{children}</VbiAppProviders>
    </body>
  </html>
)

export default RootLayout
