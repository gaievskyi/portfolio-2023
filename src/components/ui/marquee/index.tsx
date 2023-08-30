"use client"

import { Fragment, useRef, type PropsWithChildren } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion"
import { useMount } from "@/hooks/use-mount"

function wrap<T extends number>(min: number, max: number, value: T) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

type MarqueeProps = PropsWithChildren & {
  baseVelocity?: number
  childWidth?: number
}

export function Marquee({ children, baseVelocity = 10, childWidth = 800 }: MarqueeProps) {
  const baseX = useMotionValue(0)
  const isMounted = useMount()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 130,
    restDelta: 0.001,
  }) as MotionValue<number>

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 10], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`)

  const directionFactor = useRef(1)

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 4000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1000 // Default to 1000 if SSR
  const numberOfChildren = Math.ceil(viewportWidth / childWidth) + 10

  if (!isMounted) return

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }} suppressHydrationWarning>
        {Array.from({ length: numberOfChildren }).map((_, i) => (
          <Fragment key={i}>{children}</Fragment>
        ))}
      </motion.div>
    </div>
  )
}
