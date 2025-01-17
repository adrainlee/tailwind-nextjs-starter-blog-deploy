import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  useWideContainer?: boolean
}

export default function SectionContainer({ children, useWideContainer = false }: Props) {
  return (
    <section className={`mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 ${useWideContainer ? '2xl:w-[90%] 2xl:max-w-none' : ''}`}>
      {children}
    </section>
  )
}
