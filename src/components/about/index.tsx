"use client"

import Link from "next/link"
import { cn } from "@/lib/cn"
import { serif } from "@/lib/fonts"
import { useUserAgent } from "@/hooks/use-user-agent"

import { Magnetic } from "../ui/magnetic"
import styles from "./style.module.scss"

export const slideUp = {
  initial: {
    y: "200%",
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.6, delay: 0.05 * i },
  }),
  closed: {
    y: "200%",
    transition: { duration: 0.5 },
  },
}

export const About = () => {
  const { isMobile } = useUserAgent()
  return (
    <section className={styles.description}>
      <div className={styles.container}>
        <p className={cn(serif.className, "text-center md:text-left text-white")}>
          Craft, code and smile. I am a web developer. My approach is characterized by an agile method combining
          strategy, design and technology. Oh, and the creativity too.
        </p>
        <Magnetic>
          <Link href="/" className="link cursor-pointer">
            <svg
              viewBox="0 0 200 200"
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
              className="link__svg"
              style={{
                fill: "white",
                stroke: "white",
              }}
              aria-labelledby="link1-title link1-desc"
            >
              <path
                id="link-circle"
                className="link__path"
                d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                stroke="none"
                fill="none"
              />
              <path className="link__arrow" d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115" fill="none" />
              <text className="link__text">
                <textPath href="#link-circle" stroke="none" suppressHydrationWarning>
                  {isMobile ? "Touch" : "Click"} to explore my works
                </textPath>
              </text>
            </svg>
          </Link>
        </Magnetic>
      </div>
    </section>
  )
}

export default About
