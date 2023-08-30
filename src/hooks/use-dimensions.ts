import { useState } from "react"
import { useEffectOnce } from "usehooks-ts"

type Dimensions = {
  width: number
  height: number
}

export const useDimensions = (): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  useEffectOnce(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  })

  return dimensions
}
