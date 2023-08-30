"use client"

import { type PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"
import { Provider as TextBalancerProvider } from "react-wrap-balancer"

export const runtime = "edge"

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class">
      <TextBalancerProvider>{children}</TextBalancerProvider>
    </ThemeProvider>
  )
}
