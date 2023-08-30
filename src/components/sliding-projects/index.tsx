"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"
import { useDimensions } from "@/hooks/use-dimensions"
import { useUserAgent } from "@/hooks/use-user-agent"

import styles from "./style.module.scss"

const images = [
  "c2.jpg",
  "decimal.jpg",
  "funny.jpg",
  "google.jpg",
  "funny.jpg",
  "locomotive.png",
  "officestudio.png",
  "panda.jpg",
  "powell.jpg",
  "silencio.png",
  "wix.jpg",
  "google.jpg",
]

const Column = ({ images, y }: { images: string[]; y: MotionValue<number> | undefined }) => (
  <motion.div className={styles.column} style={{ y }}>
    {images.map((src, i) => (
      <div key={i} className={styles.imageContainer}>
        <Image src={`/images/${src}`} alt="image" fill sizes="(max-width: 768px) 100vw" />
      </div>
    ))}
  </motion.div>
)

export const SlidingProjects = () => {
  const { isDesktop } = useUserAgent()
  const showParallaxColumn = useMediaQuery("(min-width: 768px)")

  const gallery = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(gallery, { amount: "some", once: true })
  const shouldReduceMotion = useReducedMotion()
  const dimensions = useDimensions()
  const { height } = dimensions

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  })

  const multiplier = isDesktop ? 1.5 : 0.5

  const y = useTransform(scrollYProgress, [0, 1], [0, height * multiplier])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * multiplier])

  const shouldZoom = isInView && !shouldReduceMotion

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={gallery}
        className={styles.gallery}
        initial={{ scale: 1.5 }}
        animate={shouldZoom && { scale: 1 }}
        exit={{ scale: 1.5 }}
        transition={{ duration: 1, type: "spring", stiffness: 100, damping: 50, restDelta: 0.001 }}
      >
        <Column images={[images[0], images[1], images[2]]} y={shouldReduceMotion ? undefined : y} />
        {(isDesktop || showParallaxColumn) && (
          <>
            <Column images={[images[3], images[4], images[5]]} y={y2} />
            <Column images={[images[9], images[10], images[11]]} y={y4} />
          </>
        )}
      </motion.div>
    </div>
  )
}

export default SlidingProjects
