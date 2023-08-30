"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { useTheme } from "next-themes"
import { useEventCallback, useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/cn"
import { useUserAgent } from "@/hooks/use-user-agent"
import { Magnetic } from "@/components/ui/magnetic"
import { ThemeToggle } from "@/components/ui/theme-toggle"

import { ProgressBar } from "../ui/progress-bar"
import styles from "./style.module.scss"

export const Navigation = () => {
  const header = useRef(null)

  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const { resolvedTheme, setTheme } = useTheme()
  const { isDesktop } = useUserAgent()

  const handleNavigationVisibility = useEventCallback(() => {
    const y = scrollY.get()
    const yPrevious = scrollY.getPrevious()

    if (y < yPrevious) {
      setHidden(false)
    } else if (y > 100 && y > yPrevious) {
      setHidden(true)
    }
  })

  const showBurger = useMediaQuery("(max-width: 1200px)")

  useMotionValueEvent(scrollY, "change", handleNavigationVisibility)

  return (
    <>
      {isDesktop && <ProgressBar />}
      <AnimatePresence mode="wait">
        {hidden || (
          <motion.header
            id="top"
            ref={header}
            className={styles.header}
            initial={{ y: "-120%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            {showBurger ? (
              <div className="flex flex-col items-center justify-center w-full gap-[6px] select-none">
                <span className="h-[1px] w-[20px] bg-current" />
                <span className="h-[1px] w-[20px] bg-current" />
              </div>
            ) : (
              <>
                <Link href="/" className={styles.logo}>
                  <p className={styles.copyright}>©</p>
                  <div className={styles.name}>
                    <p className={styles.digitalBy}>Digital by</p>
                    <div className="ml-4 flex flex-col items-end justify-end">
                      <p>Daniel</p>
                      <p>Gaievskyi</p>
                    </div>
                  </div>
                </Link>
                <ThemeToggle theme={resolvedTheme} resolvedTheme={resolvedTheme} setTheme={setTheme} />
                <nav className={styles.nav}>
                  <Magnetic>
                    <div className={cn(styles.el, "font-normal")}>
                      <Link href="/">Index</Link>
                      <div className={styles.indicatorActive} />
                    </div>
                  </Magnetic>
                  <Magnetic>
                    <div className={styles.el}>
                      <Link href="/projects">Portfolio</Link>
                      <div className={styles.indicator} />
                    </div>
                  </Magnetic>
                  <Magnetic>
                    <div className={styles.el}>
                      <Link href="/contact">Contact</Link>
                      <div className={styles.indicator} />
                    </div>
                  </Magnetic>
                </nav>
                <Magnetic>
                  <p className="cursor-pointer font-normal">Collaborate &rarr;</p>
                </Magnetic>
              </>
            )}
          </motion.header>
        )}
      </AnimatePresence>
    </>
  )
}
