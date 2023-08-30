import { useState } from "react"
import { useEffectOnce } from "usehooks-ts"

/* Detects the client device. Can be either mobile, tablet or desktop. */
export const useUserAgent = () => {
  const [agent, setAgent] = useState<"mobile" | "tablet" | "desktop" | null>(null)

  useEffectOnce(() => {
    const handleUserAgent = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent)
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent)

      if (isMobile) {
        setAgent("mobile")
      } else if (isTablet) {
        setAgent("tablet")
      } else {
        setAgent("desktop")
      }
    }

    handleUserAgent()
    window.addEventListener("resize", handleUserAgent)

    return () => {
      window.removeEventListener("resize", handleUserAgent)
    }
  })

  return {
    isMobile: agent === "mobile",
    isDesktop: agent === "desktop",
    isTablet: agent === "tablet",
  }
}
