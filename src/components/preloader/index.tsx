"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useInterval } from "usehooks-ts"
import { cn } from "@/lib/cn"
import { useDimensions } from "@/hooks/use-dimensions"

import styles from "./style.module.scss"

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
}

export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-135vh",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
}

const words = [
  "Hello", // English
  "Привіт", // Ukrainian
  "Cześć", // Polish
  "Hallo", // German
  "Hej", // Swedish
  "Bonjour", // French
  "やあ", // Japanese
]

export const Preloader = () => {
  const [i, loop] = useState(0)

  const { width, height } = useDimensions()

  const increment = () => {
    const isLastWord = i === words.length - 1
    if (isLastWord) return
    loop((prev) => (prev + 1) % words.length)
  }

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height}  L0 0`
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height}  L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1 },
    },
  }

  useInterval(increment, 170)

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={cn(styles.introduction, "bg-white dark:bg-black")}
    >
      <AnimatePresence mode="wait">
        {width > 0 && (
          <>
            <motion.p
              key={i}
              className="text-black dark:text-white"
              variants={opacity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 60, restDelta: 0.001 }}
            >
              {words[i]}
            </motion.p>
            <svg>
              <motion.path variants={curve} initial="initial" exit="exit" className="dark:fill-black fill-white" />
            </svg>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
