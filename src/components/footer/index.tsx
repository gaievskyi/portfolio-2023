"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"
import { useUserAgent } from "@/hooks/use-user-agent"

import { ContactForm } from "./components/form"
import { Heading } from "./components/heading"
import { Socials } from "./components/socials"

type FooterProps = {
  temperature: number
}

export const Footer = ({ temperature }: FooterProps) => {
  const container = useRef<HTMLDivElement | null>(null)
  const { isDesktop } = useUserAgent()

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [750, 0])

  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const isDesktopOnly = isDesktop && isLargeScreen

  return (
    <>
      <div className="content">
        <div className="content_inner copy">
          <Heading />
          <ContactForm />
        </div>
      </div>
      <motion.footer className="fixed_footer" ref={container} style={{ y: isDesktop ? y : undefined }}>
        <div className="content">
          <div className="content_inner">
            <div className="nav">
              <div className="col">
                <Socials temperature={temperature} />
              </div>
              {isDesktopOnly && (
                <>
                  <div className="col">
                    <li>Index</li>
                    <li>Portfolio</li>
                    <li>Contact</li>
                    <li>Menu</li>
                  </div>
                  <div className="col">
                    <li>Vasyl Stus</li>
                    <li>Fusion</li>
                    <li>Salvador</li>
                    <li>Projects</li>
                  </div>
                  <div className="col">
                    <li>Email</li>
                    <li>LinkedIn</li>
                    <li>GitHub</li>
                    <li>Contact</li>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  )
}
