"use client"

import { useEffect, useRef } from "react"
import { useEventCallback } from "usehooks-ts"

interface MouseEvent {
  movementY: number
  clientX: number
}

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

export const Line = () => {
  const path = useRef<SVGPathElement>(null)

  let progress = 0
  let x = 0.5
  let time = Math.PI / 2
  let reqId: number | null = null

  const setPath = useEventCallback((progress: number) => {
    const width = window.innerWidth * 1
    path.current?.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`)
  })

  useEffect(() => {
    setPath(progress)
  }, [progress, setPath])

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const manageMouseMove = useEventCallback((e: MouseEvent) => {
    const { movementY, clientX } = e

    const pathBound = path.current?.getBoundingClientRect()

    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width
      progress += movementY
      setPath(progress)
    }
  })

  const manageMouseLeave = () => {
    animateOut()
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time)
    progress = lerp(progress, 0, 0.025)
    time += 0.3

    setPath(newProgress)

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2
    progress = 0
  }

  return (
    <>
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative z-50 h-10 w-full my-[1rem]"
      />
      <svg className="absolute w-full h-[260px] top-[-100px]">
        <path ref={path} className="stroke-black dark:stroke-white stroke-[1px] fill-none" />
      </svg>
    </>
  )
}
