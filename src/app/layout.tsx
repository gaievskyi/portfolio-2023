import "@/globals.css"

import { type PropsWithChildren } from "react"
import { Splash } from "@/components/splash"

import { Providers } from "./providers"

export const metadata = {
  title: `Daniel Gaievskyi | Top notch software development services worldwide`,
  description: `Daniel Gaievskyi is a Creative Developer based in the European Union. He is an autodidact with a passion for building beautiful and interactive websites.`,
  applicationName: "Portfolio",
  authors: [{ name: "Daniel Gaievskyi", url: "gaievskyi.com" }],
  publisher: "Daniel Gaievskyi",
  keywords: ["Frontend", "Fullstack", "Backend", "Software development"],
  creator: "Daniel Gaievskyi",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
    { media: "(prefers-color-scheme: light)", color: "#e1dfdd" },
  ],
  icons: {
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  category: "Technology",
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="scroll-smooth antialiased" data-scroll-container>
        <Splash />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
