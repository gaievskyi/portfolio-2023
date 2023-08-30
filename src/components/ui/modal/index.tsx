"use client"

import { createPortal } from "react-dom"
import { useMount } from "@/hooks/use-mount"

export const Modal = ({ children }: React.PropsWithChildren): React.ReactPortal | null => {
  const isMounted = useMount()

  return isMounted ? createPortal(<>{children}</>, document.body) : null
}
