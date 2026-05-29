'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { isManagedRoute } from './manage-sidebar-routes'
import { ManageLayoutPage } from './ManageLayoutPage'

export const ManagedRouteShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname() ?? ''

  if (!isManagedRoute(pathname)) return <>{children}</>

  return <ManageLayoutPage>{children}</ManageLayoutPage>
}
