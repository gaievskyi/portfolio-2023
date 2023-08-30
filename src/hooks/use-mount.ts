import { useState } from "react"
import { useEffectOnce } from "usehooks-ts"

export const useMount = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffectOnce(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  })

  return isMounted
}
