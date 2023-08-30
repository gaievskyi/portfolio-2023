import { useState } from "react"
import { useEventCallback } from "usehooks-ts"

let ID = 0

export const useModal = () => {
  const id = ++ID
  const [isOpen, setIsOpen] = useState(false)

  const open = useEventCallback(() => setIsOpen(true))
  const close = useEventCallback(() => setIsOpen(false))
  const toggle = useEventCallback((prev) => setIsOpen(!prev))

  return { id, isOpen, open, close, toggle }
}
