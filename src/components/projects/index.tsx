"use client"

import { useState, type MouseEventHandler } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/cn"
import { serif } from "@/lib/fonts"
import { useMount } from "@/hooks/use-mount"
import { useUserAgent } from "@/hooks/use-user-agent"

import { Magnetic } from "../ui/magnetic"
import { Project } from "./components/project"
import styles from "./style.module.scss"

type ProjectType = {
  title: string
  src: string
}

const projects: ProjectType[] = [
  {
    title: "Vasyl Stus",
    src: "c2montreal.png",
  },
  {
    title: "Fusion",
    src: "funny.jpg",
  },
  {
    title: "Salvador Dali",
    src: "locomotive.png",
  },
  {
    title: "Captura",
    src: "silencio.png",
  },
  {
    title: "Chiara Luzzana",
    src: "officestudio.png",
  },
  {
    title: "Hirica",
    src: "panda.jpg",
  },
  {
    title: "Another",
    src: "wix.jpg",
  },
]

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
}

type Modal = {
  i: number
  active: boolean
}

export const Projects = () => {
  const isMounted = useMount()

  const [modal, setModal] = useState<Modal>({ i: 0, active: false })
  const { i, active } = modal

  const { isMobile, isDesktop } = useUserAgent()
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const isDesktopOnly = isLargeScreen && isDesktop
  const _isMobileOnly = isSmallScreen && isMobile

  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)

  const x = useSpring(motionX, { stiffness: 200, damping: 20 })
  const y = useSpring(motionY, { stiffness: 200, damping: 20 })

  const moveItems = (clientX: number, clientY: number) => {
    x.set(clientX)
    y.set(clientY)
  }

  const manageModal = (active: Modal["active"], i: Modal["i"], x: number, y: number) => {
    moveItems(x, y)
    setModal({ i, active })
  }

  const onHover: MouseEventHandler<HTMLElement> = (e) => {
    moveItems(e.clientX, e.clientY)
  }

  if (!isMounted) return

  return (
    <section onMouseMove={onHover} className={styles.projects}>
      <div className={styles.container}>
        <p
          className={cn(
            serif.className,
            "text-left text-current text-xl lg:text-5xl py-12 px-[5vw] md:px-0 md:max-w-[70vw] w-full mr-auto leading-7",
          )}
        >
          Dive into my frontend creations, blending creativity with functionality. Every design showcases my dedication
          to detail and the drive for a seamless user experience. From dynamic website layouts to interactive UIs, I
          bridge the user&apos;s needs with the digital world.
        </p>
        <div className="flex w-full h-full justify-between py-2 px-[5vw] md:px-0">
          <span className="text-xl font-thin text-current">Project</span>
          <span className="text-xl font-thin text-current">Description</span>
        </div>
        {projects.map((project, i) => (
          <Project i={i} title={project.title} manageModal={manageModal} key={i} />
        ))}
      </div>
      <div data-scroll data-scroll-speed={0.1} className="mb-12 md:mb-20">
        <Magnetic>
          <Link href="/" className="link cursor-pointer">
            <svg
              viewBox="0 0 200 200"
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
              className="link__svg"
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
                <textPath href="#link-circle" stroke="none">
                  {isMobile ? "Touch" : "Click"} to explore my works
                </textPath>
              </text>
            </svg>
          </Link>
        </Magnetic>
      </div>
      {isDesktopOnly && (
        <>
          <motion.div
            style={{ left: x, top: y }}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className={styles.modalContainer}
          >
            <div style={{ top: i * -100 + "%" }} className={styles.modalSlider}>
              {projects.map(({ src }, i) => (
                <div className={styles.modal} key={`modal_${i}`}>
                  <Image src={`/images/${src}`} width={200} height={200} alt="Project picture" />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            style={{ left: x, top: y }}
            className={styles.cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          />
          <motion.div
            style={{ left: x, top: y }}
            className={styles.cursorLabel}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          >
            <span className="text-xs mt-14">Explore</span>
          </motion.div>
        </>
      )}
    </section>
  )
}

export default Projects
