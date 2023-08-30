"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useUserAgent } from "@/hooks/use-user-agent"

import { Arrow } from "../ui/arrow"
import { Blot } from "../ui/blot"
import { Line } from "../ui/line"
import { Marquee } from "../ui/marquee"
import styles from "./style.module.scss"

export const slideUp = {
  initial: {
    y: "80vh",
  },
  enter: {
    y: 0,
    transition: { duration: 1, delay: 2, type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 },
  },
}

export const Hero = () => {
  const { isDesktop } = useUserAgent()
  const { theme } = useTheme()

  return (
    <>
      <Blot />
      <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
        <motion.div
          className={styles.description}
          data-scroll
          data-scroll-speed={0.1}
          initial={{
            opacity: 0,
            y: 200,
          }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2, type: "spring", stiffness: 120, damping: 30, restDelta: 0.001 }}
        >
          <Arrow />
          <div>
            <p>Meet</p>
            <h1 className="font-semibold not-italic">Daniel Gaievskyi,</h1>
            <h2>a Frontend Artist</h2>
          </div>
        </motion.div>
        <div className={styles.marquee}>
          <Marquee childWidth={700} baseVelocity={1}>
            <p
              style={
                theme === "dark"
                  ? {
                      WebkitTextStroke: "1px white",
                    }
                  : theme === "light"
                  ? {
                      WebkitTextStroke: "1px black",
                    }
                  : {}
              }
            >
              Frontends
            </p>
          </Marquee>
          {isDesktop ? <Line /> : <hr className="w-full h-[1px] bg-black dark:bg-white my-3 md:my-1" />}
          <Marquee childWidth={100} baseVelocity={-10}>
            <span className="text-current font-normal">Classy</span>
          </Marquee>
        </div>
      </motion.main>
    </>
  )
}

export default Hero
