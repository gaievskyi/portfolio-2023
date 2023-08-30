"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useLockedBody, useTimeout } from "usehooks-ts"
import { ROOT_ELEMENT } from "@/lib/constants"

import { Preloader } from "../preloader"

const SPLASH_DURATION = 2000 // 2s

export const Splash = () => {
  const [isLoading, setIsLoading] = useState(true)

  useTimeout(() => {
    window.scrollTo(0, 0)
    setIsLoading(false)
    document.body.style.cursor = "default"
  }, SPLASH_DURATION)

  useLockedBody(isLoading, ROOT_ELEMENT)

  return <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
}
