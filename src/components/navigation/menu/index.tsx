import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Clock } from "@/components/ui/clock"

import { Curve } from "./Curve"
import { MenuFooter } from "./MenuFooter"
import { MenuLink } from "./MenuLink"
import styles from "./style.module.scss"

export const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
}

const navItems = [
  {
    title: "Index",
    href: "/",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export const Menu = () => {
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState(pathname)

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={styles.menu}>
      <div className={styles.container}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname)
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>MENU</p>
            <Clock second={undefined} />
          </div>
          {navItems.map(({ title, href }, i) => (
            <MenuLink
              href={href}
              key={i}
              i={i}
              active={selectedIndicator == href}
              setSelectedIndicator={setSelectedIndicator}
            >
              {title}
            </MenuLink>
          ))}
        </div>
        <MenuFooter />
      </div>
      <Curve />
    </motion.div>
  )
}
