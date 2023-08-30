"use client"

import { useRef, useState, type MouseEventHandler, type PropsWithChildren } from "react"
import { motion } from "framer-motion"
import { useEventCallback, useMediaQuery } from "usehooks-ts"
import { useUserAgent } from "@/hooks/use-user-agent"

export function Magnetic({ children }: PropsWithChildren) {
  const { isMobile, isTablet } = useUserAgent()
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const magnet = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse: MouseEventHandler<HTMLDivElement> = useEventCallback(({ clientX, clientY }) => {
    if (!magnet.current) return
    const { height, width, left, top } = magnet.current.getBoundingClientRect()

    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x, y })
  })

  const reset = useEventCallback(() => {
    setPosition({ x: 0, y: 0 })
  })

  const { x, y } = position

  if (isMobile || isTablet || isSmallScreen) return children

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={magnet}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 180, damping: 40, mass: 0.5, restDelta: 0.0001 }}
    >
      {children}
    </motion.div>
  )
}
