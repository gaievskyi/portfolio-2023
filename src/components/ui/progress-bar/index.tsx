import { motion, useScroll, useSpring } from "framer-motion"

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.0001,
  })

  return <motion.div className="progress-bar" style={{ scaleX }} />
}
