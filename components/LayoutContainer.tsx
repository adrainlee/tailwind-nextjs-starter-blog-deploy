'use client'

import { usePathname } from 'next/navigation'
import SectionContainer from './SectionContainer'

export default function LayoutContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return <SectionContainer useWideContainer={isHomePage}>{children}</SectionContainer>
}
