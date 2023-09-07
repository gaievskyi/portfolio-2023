import Lenis from "@studio-freight/lenis"
import { useEffectOnce } from "usehooks-ts"

import { useUserAgent } from "./use-user-agent"

export const useSmoothScroll = () => {
  const { isMobile, isTablet } = useUserAgent()

  useEffectOnce(() => {
    if (isMobile || isTablet) return

    window.history.scrollRestoration = "manual"

    const lenis = new Lenis({
      smoothWheel: true,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.5,
      normalizeWheel: true,
      duration: 1.5,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  })
}
