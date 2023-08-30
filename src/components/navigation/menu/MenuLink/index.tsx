import { type MouseEventHandler, type PropsWithChildren } from "react"
import Link, { type LinkProps } from "next/link"
import { motion } from "framer-motion"

import styles from "./style.module.scss"

export const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
}

export const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
}

type MenuLinkProps = LinkProps<unknown> &
  PropsWithChildren & {
    i: number
    active: boolean
    setSelectedIndicator: (href: string) => void
  }

export const MenuLink = ({ href, i, active, setSelectedIndicator, children }: MenuLinkProps) => {
  const onHover: MouseEventHandler<HTMLDivElement> = () => {
    setSelectedIndicator(href as string)
  }

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={onHover}
      custom={i}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div variants={scale} animate={active ? "open" : "closed"} className={styles.indicator} />
      <Link href={href}>{children}</Link>
    </motion.div>
  )
}
