import { useRef, type MouseEvent } from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"
import { useUserAgent } from "@/hooks/use-user-agent"

import styles from "./style.module.scss"

const animation: Variants = {
  initial: { y: "100%" },
  enter: (i) => ({ y: "0", transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i, restDelta: 0.001 } }),
}

type ProjectProps = {
  i: number
  title: string
  manageModal: (active: boolean, index: number, x: number, y: number) => void
}

export const Project = ({ i, title, manageModal }: ProjectProps) => {
  const container = useRef<HTMLDivElement>(null)
  const isInView = useInView(container)
  const _shouldReduceMotion = useReducedMotion()
  const { isMobile, isDesktop } = useUserAgent()
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const isDesktopOnly = isLargeScreen && isDesktop
  const isMobileOnly = isSmallScreen || isMobile

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    manageModal(true, i, e.clientX, e.clientY)
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    manageModal(false, i, e.clientX, e.clientY)
  }

  return (
    <motion.div
      ref={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.project}
      transition={{
        y: { type: "spring", duration: 0.5, stiffness: 200, damping: 35, restDelta: 0.001 },
      }}
      whileHover={isDesktopOnly ? { y: "-3.5rem" } : {}}
    >
      <motion.hr
        className="bg-white w-full h-[1px] absolute top-0 left-0"
        transition={{
          type: "spring",
          duration: 1,
          stiffness: 200,
          damping: 50,
          restDelta: 0.001,
        }}
        whileInView={{ x: 0 }}
        initial={{ x: "-85%" }}
      />
      <motion.h2
        className="uppercase leading-tight text-white"
        variants={animation}
        initial="initial"
        animate={isInView ? "enter" : ""}
      >
        {title}
        {isMobileOnly && (
          <>
            <span className="animate-pulse uppercase text-current text-xs">
              <br /> Touch to explore &uarr;
            </span>
            <Image src="/images/panda.jpg" width={200} height={100} alt="Project picture" />
          </>
        )}
      </motion.h2>
      <div className="flex flex-col text-right gap-6 lg:gap-12">
        <motion.p className="text-sm lg:text-lg text-white font-light">
          Design & <br /> Development
        </motion.p>
        <motion.p className="text-xs font-thin text-white/80">2023, Katowice</motion.p>
      </div>
    </motion.div>
  )
}
