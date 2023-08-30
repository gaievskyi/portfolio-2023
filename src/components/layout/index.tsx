"use client"

import type { PropsWithChildren } from "react"
import dynamic from "next/dynamic"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

const Navigation = dynamic(() => import("@/components/navigation/").then((_module) => _module.Navigation), {
  ssr: false,
})

const Footer = dynamic(() => import("@/components/footer/").then((_module) => _module.Footer))

type LayoutProps = PropsWithChildren & {
  temperature: number
}

export const Layout = ({ children, temperature }: LayoutProps) => {
  useSmoothScroll()
  return (
    <>
      <Navigation />
      {children}
      <Footer temperature={temperature} />
    </>
  )
}

export default Layout
