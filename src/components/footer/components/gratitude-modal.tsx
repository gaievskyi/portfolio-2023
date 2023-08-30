import { useEffect } from "react"
import { motion } from "framer-motion"
import { Modal } from "@/components/ui/modal"

type GratitudeModalProps = {
  onFinish: () => void
  title?: string
  subtitle?: string
}

export const GratitudeModal = ({
  onFinish,
  title = "E-mail sent",
  subtitle = "Thank you so much for your e-mail!",
}: GratitudeModalProps) => {
  useEffect(() => {
    const disappearTimeout = setTimeout(() => {
      onFinish()
    }, 1500)

    return () => {
      clearTimeout(disappearTimeout)
    }
  }, [onFinish])

  return (
    <Modal>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 40 }}
        className="fixed text-[#e1dfdd] bg-black/80 bottom-0 left-0 w-screen h-screen z-30 flex justify-center items-center"
      >
        <div className="text-center flex flex-col items-center justify-center gap-4">
          <h1 className="text-6xl">{title}</h1>
          <p className="text-xl font-light">{subtitle}</p>
        </div>
      </motion.div>
    </Modal>
  )
}
